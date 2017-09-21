import i18next from "i18next";
import {computed} from "mobx";
import * as React from "react";
import {themr} from "react-css-themr";
import {Button} from "react-toolbox/lib/button";

import {userJourneyStore} from "./store";

import * as styles from "./__style__/user-journey-navigation.css";
export type UserJourneyNavigationStyle = Partial<typeof styles>;

export class UserJourneyNavigation extends React.Component<{i18nPrefix?: string, theme?: UserJourneyNavigationStyle}, void> {

    @computed
    get buttonLabel() {
        const {i18nPrefix = "focus"} = this.props;
        return userJourneyStore.isLastCard ? i18next.t(`${i18nPrefix}.userJourney.last`) : i18next.t(`${i18nPrefix}.userJourney.next`);
    }
    render() {
        const {i18nPrefix = "focus", theme} = this.props;
        const {allCards, activeIndex} = userJourneyStore;
        return (
            <div className={theme!.navigation}>
                <div className={theme!.progress}>
                    {allCards.map((card, index) => {
                        const isActive = index === activeIndex ? theme!.active : "";
                        return <div onClick={() => userJourneyStore.goTo(index)} key={card.order} className={`${theme!.dot} ${isActive}`}/>;
                    })}
                </div>
                <Button theme={{button: theme!.button, raised: theme!.raised}} raised onClick={userJourneyStore.next} label={this.buttonLabel} />
                <div className={theme!.skip} onClick={userJourneyStore.close}>{i18next.t(`${i18nPrefix}.userJourney.skip`)}</div>
            </div>
        );
    }
}

export default themr("userJourneyNavigation", styles)(UserJourneyNavigation);
