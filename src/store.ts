import {autobind} from "core-decorators";
import {action, computed, observable} from "mobx";

import {UserJourneyCardProps} from "./card";

export interface UserJourneyInit {
    /** List of cards. */
    cards: UserJourneyCardProps[];
    /** Custom card component. */
    CustomCardComponent?: React.ComponentClass<UserJourneyCardProps>;
}

/**
 * Class to pilot the state of the user journey.
 */
@autobind
export class UserJourneyStore {

    /**
     * the index of the active step.
     */
    @observable
    private activeStep = 0;

    /**
     * The state of the journey. true -> the journey is diplayed, false _> the journey isn't.
     */
    @observable
    private open = true;

    /**
     * All the cards of the journey.
     */
    @observable
    private cards: UserJourneyCardProps[];

    /**
     * Callback called when the journey closes with the cards used during the journey.
     */
    private callBack?: (cards: UserJourneyCardProps[]) => void;

    /**
     * Custom card component.
     */
    private customCardComponent?: React.ComponentClass<UserJourneyCardProps>;

    /**
     * Go to the next card. Close the journey if it's the last one.
     */
    next() {
        if (this.activeStep < this.cards.length - 1) {
            this.activeStep++;
        } else {
            this.close();
        }
    }

    /**
     * Go to the last card.
     */
    last() {
        this.activeStep = this.cards.length;
    }

    /**
     * Go the the previous card. Stop at the first one.
     */
    previous() {
        if (this.activeStep > 0) {
            this.activeStep--;
        }
    }

    /**
     * Go to the first card.
     */
    first() {
        this.activeStep = 0;
    }

    /**
     * Go to the designated index.
     * @param index index to go to.
     */
    goTo(index: number) {
        this.activeStep = index;
    }

    /**
     * Close the journey and call the callback function.
     */
    close() {
        this.open = false;
        if (this.callBack) {
            this.callBack(this.cards);
        }
    }

    /**
     * Start the user journey from the first card.
     */
    @action
    start() {
        this.open = true;
        this.activeStep = 0;
    }

    /**
     * Init the journey with the given configuration.
     * @param conf Configuration of the journey.
     * @param callback Callback function called at the end of the journey.
     */
    init(conf: UserJourneyInit, callback?: (cards: UserJourneyCardProps[]) => void) {
        this.cards = conf.cards.sort((a, b) =>
            a.order - b.order);
        this.callBack = callback;
        this.activeStep = 0;
        this.customCardComponent = conf.CustomCardComponent;
    }

    /**
     * clear the state of the user journey.
     */
    clear() {
        this.cards = [];
        this.activeStep = 0;
        this.open = false;
        this.callBack = undefined;
        this.customCardComponent = undefined;
    }

    /**
     * Return the props of the active card.
     */
    @computed
    get activeCard() {
        return this.cards[this.activeStep];
    }

    /**
     * Return the index of the active card.
     */
    @computed
    get activeIndex() {
        return this.activeStep;
    }

    /**
     * Return the state of the journey.
     */
    @computed
    get isOpen() {
        return this.open;
    }

    get CustomCardComponent() {
        return this.customCardComponent;
    }

    @computed
    get isLastCard() {
        return this.activeStep === this.cards.length - 1;
    }

    @computed
    get nbOfCards() {
        return this.cards.length;
    }

    @computed
    get allCards() {
        return this.cards;
    }
}

export const userJourneyStore = new UserJourneyStore();
