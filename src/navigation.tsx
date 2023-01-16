import i18next from "i18next";
import {useObserver} from "mobx-react";

import {useTheme} from "@focus4/styling";
import {Button} from "@focus4/toolbox";

import {userJourneyStore} from "./store";

import styles from "./__style__/user-journey-navigation.css";
export type UserJourneyNavigationStyle = Partial<typeof styles>;

export function UserJourneyNavigation({
    i18nPrefix = "focus",
    theme: pTheme
}: {
    i18nPrefix?: string;
    theme?: UserJourneyNavigationStyle;
}) {
    const theme = useTheme("userJourneyNavigation", styles, pTheme);
    return useObserver(() => {
        const {allCards, activeIndex} = userJourneyStore;
        return (
            <div className={theme.navigation()}>
                <div className={theme.progress()}>
                    {allCards.map((card, index) => {
                        const isActive = index === activeIndex ? theme!.active : "";
                        return (
                            <div
                                onClick={() => userJourneyStore.goTo(index)}
                                key={card.order}
                                className={`${theme!.dot} ${isActive}`}
                            />
                        );
                    })}
                </div>
                <Button
                    theme={{button: theme.button(), "button--raised": theme.raised()}}
                    raised
                    onClick={userJourneyStore.next}
                    label={
                        userJourneyStore.isLastCard
                            ? i18next.t(`${i18nPrefix}.userJourney.last`)!
                            : i18next.t(`${i18nPrefix}.userJourney.next`)!
                    }
                />
                <div className={theme.skip()} onClick={userJourneyStore.close}>
                    {i18next.t(`${i18nPrefix}.userJourney.skip`)}
                </div>
            </div>
        );
    });
}
