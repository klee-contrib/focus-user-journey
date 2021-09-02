import {useObserver} from "mobx-react";

import {useTheme} from "@focus4/styling";

import {UserJourneyCard} from "./card";
import {userJourneyStore} from "./store";

import styles from "./__style__/user-journey.css";
export type UserJourneyStyle = Partial<typeof styles>;

export function UserJourney({theme: pTheme}: {theme?: UserJourneyStyle}) {
    const theme = useTheme("userJourney", styles, pTheme);
    return useObserver(() => {
        const {CustomCardComponent = UserJourneyCard, isOpen} = userJourneyStore;
        if (isOpen) {
            return (
                <div className={theme.userJourney()}>
                    <div className={theme.overlay()} onClick={userJourneyStore.close} />
                    <CustomCardComponent {...userJourneyStore.activeCard} />
                </div>
            );
        }
        return null;
    });
}
