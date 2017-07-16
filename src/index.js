/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.227ae34a-eef9-4a79-bf7b-ce3ae38867bb";

/**
 * Array containing Chesterton quotes.
 */
var QUOTES = [
    "Misers get up early in the morning; and burglars, I am informed, get up the night before.",
    "A dead thing can go with the stream, but only a living thing can go against it.",
    "Fallacies do not cease to be fallacies because they become fashions.",
    "Impartiality is a pompous name for indifference, which is an elegant name for ignorance.",
    "An inconvenience is only an adventure wrongly considered; an adventure is an inconvenience rightly considered.",
    "What embitters the world is not excess of criticism, but an absence of self-criticism.",
    "Moderate strength is shown in violence, supreme strength is shown in levity.",
    "The free man owns himself. He can damage himself with either eating or drinking; he can ruin himself with gambling. If he does he is certainly a damn fool, and he might possibly be a damned soul; but if he may not, he is not a free man any more than a dog.",
    "The comedy of man survives the tragedy of man.",
    "To have a right to do a thing is not at all the same as to be right in doing it.",
    "Without authority there is no liberty. Freedom is doomed to destruction at every turn, unless there is a recognized right to freedom. And if there are rights, there is an authority to which we appeal for them.",
    "We lose our bearings entirely by speaking of the ‘lower classes’ when we mean humanity minus ourselves.",
    "Art, like morality, consists of drawing the line somewhere."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

var Quote = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Quote.prototype = Object.create(AlexaSkill.prototype);
Quote.prototype.constructor = Quote;

Quote.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Quote.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewQuoteRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Quote.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Quote.prototype.intentHandlers = {
    "GetNewQuoteIntent": function (intent, session, response) {
        handleNewQuoteRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a Chesterton quote, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new quote from the list and returns to the user.
 */
function handleNewQuoteRequest(response) {
    // Get a random Chesterton quote from the Chesterton quote list
    var quoteIndex = Math.floor(Math.random() * QUOTES.length);
    var randomQuote = QUOTES[quoteIndex];

    // Create speech output
    var speechOutput = "Here's your quote: " + randomQuote;
    var cardTitle = "Your Quote";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the ChesterQuote skill.
    var quote = new Quote();
    quote.execute(event, context);
};

