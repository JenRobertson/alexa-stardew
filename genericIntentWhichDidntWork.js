function genericIntent(responseFileName){
    const responseName = responseFileName.toUpperCase();

    const villagerSlot = this.event.request.intent.slots.Villager;
    let villagerName;
    if (villagerSlot && villagerSlot.value) {
        villagerName = villagerSlot.value.toLowerCase();
    }

    const cardTitle = this.t('DISPLAY_CARD_TITLE', this.t('SKILL_NAME'), villagerName);
    const responses = this.t(responseName);
    const response = responses[villagerName];

    if (response) {
        this.attributes.speechOutput = response;
        this.attributes.repromptSpeech = this.t(`${responseName}_REPEAT_MESSAGE`);
        this.emit(':askWithCard', response, this.attributes.repromptSpeech, cardTitle, response);
    } else {
        let speechOutput = this.t(`${responseName}_NOT_FOUND_MESSAGE`);
        const repromptSpeech = this.t(`${responseName}_NOT_FOUND_REPROMPT`);
        if (villagerName) {
            speechOutput += this.t(`${responseName}_NOT_FOUND_WITH_ITEM_NAME`, villagerName);
        } else {
            speechOutput += this.t(`${responseName}_NOT_FOUND_WITHOUT_ITEM_NAME`);
        }
        speechOutput += repromptSpeech;

        this.attributes.speechOutput = speechOutput;
        this.attributes.repromptSpeech = repromptSpeech;

        this.emit(':ask', speechOutput, repromptSpeech);
    }
}
