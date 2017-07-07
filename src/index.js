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
const homes = require('./responses/homes');
const birthdays = require('./responses/birthdays');

const APP_ID = 'amzn1.ask.skill.1a184836-9acf-46bd-9e7b-0b6b9cc730c3';

const languageStrings = {
    'en': {
        translation: {
            SKILL_NAME: 'Stawdew Valley Helper',
            WELCOME_MESSAGE: "Welcome to %s. You can ask a question like, where does Elliot live? ... Now, what can I help you with?",
            WELCOME_REPROMT: 'For instructions on what you can say, please say help me.',
            DISPLAY_CARD_TITLE: '%s  - Info about %s.',
            HELP_MESSAGE: "You can ask questions such as, where does Elliot live, or, you can say exit...Now, what can I help you with?",
            HELP_REPROMT: "You can say things like, where does Elliot live, or you can say exit...Now, what can I help you with?",
            STOP_MESSAGE: 'Goodbye!',

            HOMES: homes.HOMES_EN_GB,
            HOME_REPEAT_MESSAGE: 'Try saying repeat.',
            HOME_NOT_FOUND_MESSAGE: "I\'m sorry, I currently don\'t know ",
            HOME_NOT_FOUND_WITH_ITEM_NAME: 'where %s lives',
            HOME_NOT_FOUND_WITHOUT_ITEM_NAME: 'that villager',
            HOME_NOT_FOUND_REPROMPT: '. What else can I help with?',

            BIRTHDAYS: birthdays.BIRTHDAYS_EN_GB,
            BIRTHDAYS_REPEAT_MESSAGE: 'Try saying repeat.',
            BIRTHDAYS_NOT_FOUND_MESSAGE: "I\'m sorry, I currently don\'t know ",
            BIRTHDAYS_NOT_FOUND_WITH_ITEM_NAME: ' %s\ birthday',
            BIRTHDAYS_NOT_FOUND_WITHOUT_ITEM_NAME: 'that villager',
            BIRTHDAYS_NOT_FOUND_REPROMPT: '. What else can I help with?',
        },
    },
    'en-GB': {
        translation: {
            HOMES: homes.HOMES_EN_GB,
            SKILL_NAME: 'British Stardew Valley Helper',
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
        const villagerSlot = this.event.request.intent.slots.Villager;
        let villagerName;
        if (villagerSlot && villagerSlot.value) {
            villagerName = villagerSlot.value.toLowerCase();
        }

        const cardTitle = this.t('DISPLAY_CARD_TITLE', this.t('SKILL_NAME'), villagerName);
        const homes = this.t('HOMES');
        const home = homes[villagerName];

        if (home) {
            this.attributes.speechOutput = home;
            this.attributes.repromptSpeech = this.t('HOME_REPEAT_MESSAGE');
            this.emit(':askWithCard', home, this.attributes.repromptSpeech, cardTitle, home);
        } else {
            let speechOutput = this.t('HOME_NOT_FOUND_MESSAGE');
            const repromptSpeech = this.t('HOME_NOT_FOUND_REPROMPT');
            if (villagerName) {
                speechOutput += this.t('HOME_NOT_FOUND_WITH_ITEM_NAME', villagerName);
            } else {
                speechOutput += this.t('HOME_NOT_FOUND_WITHOUT_ITEM_NAME');
            }
            speechOutput += repromptSpeech;

            this.attributes.speechOutput = speechOutput;
            this.attributes.repromptSpeech = repromptSpeech;

            this.emit(':ask', speechOutput, repromptSpeech);
        }
    },
     'BirthdayIntent': function () {
        const villagerSlot = this.event.request.intent.slots.Villager;
        let villagerName;
        if (villagerSlot && villagerSlot.value) {
            villagerName = villagerSlot.value.toLowerCase();
        }

        const cardTitle = this.t('DISPLAY_CARD_TITLE', this.t('SKILL_NAME'), villagerName);
        const birthdays = this.t('BIRTHDAYS');
        const birthday = birthdays[villagerName];

        if (birthday) {
            this.attributes.speechOutput = birthday;
            this.attributes.repromptSpeech = this.t('BIRTHDAYS_REPEAT_MESSAGE');
            this.emit(':askWithCard', birthday, this.attributes.repromptSpeech, cardTitle, birthday);
        } else {
            let speechOutput = this.t('BIRTHDAYS_NOT_FOUND_MESSAGE');
            const repromptSpeech = this.t('BIRTHDAYS_NOT_FOUND_REPROMPT');
            if (villagerName) {
                speechOutput += this.t('BIRTHDAYS_NOT_FOUND_WITH_ITEM_NAME', villagerName);
            } else {
                speechOutput += this.t('BIRTHDAYS_NOT_FOUND_WITHOUT_ITEM_NAME');
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
