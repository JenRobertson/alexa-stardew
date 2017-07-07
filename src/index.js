/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a sample skill built with Amazon Alexa Skills nodejs
 * skill development kit.
 * This sample supports multiple languages (en-US, en-GB, de-GB).
 * The Intent Schema, Custom Slot and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-howto
 **/

'use strict';

const Alexa = require('alexa-sdk');
const homes = require('./reponses/homes');
const birthdays = require('./reponses/birthdays');

const APP_ID = 'amzn1.ask.skill.1a184836-9acf-46bd-9e7b-0b6b9cc730c3';

const languageStrings = {
    'en': {
        translation: {
            HOMES: homes.HOMES_EN_GB,
            SKILL_NAME: 'Stawdew Valley Helper',
            WELCOME_MESSAGE: "Welcome to %s. You can ask a question like, where does Elliot live? ... Now, what can I help you with?",
            WELCOME_REPROMT: 'For instructions on what you can say, please say help me.',
            DISPLAY_CARD_TITLE: '%s  - Ingredients for %s.',
            HELP_MESSAGE: "You can ask questions such as, where does Elliot live, or, you can say exit...Now, what can I help you with?",
            HELP_REPROMT: "You can say things like, where does Elliot live, or you can say exit...Now, what can I help you with?",
            STOP_MESSAGE: 'Goodbye!',
            VILLAGER_REPEAT_MESSAGE: 'Try saying repeat.',
            VILLAGER_NOT_FOUND_MESSAGE: "I\'m sorry, I currently do not know ",
            VILLAGER_NOT_FOUND_WITH_ITEM_NAME: 'that about %s. ',
            VILLAGER_NOT_FOUND_WITHOUT_ITEM_NAME: 'that villager ',
            VILLAGER_NOT_FOUND_REPROMPT: 'What else can I help with?',
        },
    },
    'en-GB': {
        translation: {
            HOMES: homes.HOMES_EN_GB,
            SKILL_NAME: 'British Minecraft Helper',
        },
    }
};

const handlers = {
    'LaunchRequest': function () {
        this.attributes.speechOutput = this.t('WELCOME_MESSAGE', this.t('SKILL_NAME'));
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        this.attributes.repromptSpeech = this.t('WELCOME_REPROMT');
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'HomeIntent': function () {
        const itemSlot = this.event.request.intent.slots.Villager;
        let itemName;
        if (itemSlot && itemSlot.value) {
            itemName = itemSlot.value.toLowerCase();
        }

        const cardTitle = this.t('DISPLAY_CARD_TITLE', this.t('SKILL_NAME'), itemName);
        const villagersHomes = this.t('HOMES');
        const villager = villagersHomes[itemName];

        if (villager) {
            this.attributes.speechOutput = villager;
            this.attributes.repromptSpeech = this.t('VILLAGER_REPEAT_MESSAGE');
            this.emit(':askWithCard', villager, this.attributes.repromptSpeech, cardTitle, villager);
        } else {
            let speechOutput = this.t('VILLAGER_NOT_FOUND_MESSAGE');
            const repromptSpeech = this.t('VILLAGER_NOT_FOUND_REPROMPT');
            if (itemName) {
                speechOutput += this.t('VILLAGER_NOT_FOUND_WITH_ITEM_NAME', itemName);
            } else {
                speechOutput += this.t('VILLAGER_NOT_FOUND_WITHOUT_ITEM_NAME');
            }
            speechOutput += repromptSpeech;

            this.attributes.speechOutput = speechOutput;
            this.attributes.repromptSpeech = repromptSpeech;

            this.emit(':ask', speechOutput, repromptSpeech);
        }
    },
    'BirthdayIntent': function () {
        const itemSlot = this.event.request.intent.slots.Villager;
        let itemName;
        if (itemSlot && itemSlot.value) {
            itemName = itemSlot.value.toLowerCase();
        }

        const cardTitle = this.t('DISPLAY_CARD_TITLE', this.t('SKILL_NAME'), itemName);
        const villagersHomes = this.t('HOMES');
        const villager = villagersHomes[itemName];

        if (villager) {
            this.attributes.speechOutput = villager;
            this.attributes.repromptSpeech = this.t('VILLAGER_REPEAT_MESSAGE');
            this.emit(':askWithCard', villager, this.attributes.repromptSpeech, cardTitle, villager);
        } else {
            let speechOutput = this.t('VILLAGER_NOT_FOUND_MESSAGE');
            const repromptSpeech = this.t('VILLAGER_NOT_FOUND_REPROMPT');
            if (itemName) {
                speechOutput += this.t('VILLAGER_NOT_FOUND_WITH_ITEM_NAME', itemName);
            } else {
                speechOutput += this.t('VILLAGER_NOT_FOUND_WITHOUT_ITEM_NAME');
            }
            speechOutput += repromptSpeech;

            this.attributes.speechOutput = speechOutput;
            this.attributes.repromptSpeech = repromptSpeech;

            this.emit(':ask', speechOutput, repromptSpeech);
        }
    },
    'AMAZON.HelpIntent': function () {
        this.attributes.speechOutput = this.t('HELP_MESSAGE');
        this.attributes.repromptSpeech = this.t('HELP_REPROMT');
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'Unhandled': function () {
        this.attributes.speechOutput = this.t('HELP_MESSAGE');
        this.attributes.repromptSpeech = this.t('HELP_REPROMPT');
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
