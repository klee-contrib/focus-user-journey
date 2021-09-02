import i18next from "i18next";

import {useTheme} from "@focus4/styling";
import {FontIcon} from "@focus4/toolbox";

import {UserJourneyNavigation} from "./navigation";

import styles from "./__style__/user-journey-card.css";
export type UserJourneyCardStyle = Partial<typeof styles>;

export interface UserJourneyCardProps {
    /** Card's title. */
    cardTitle?: string;
    /** Function to retrieve the img source. */
    getImg?: () => string;
    /** Default value: "focus" */
    i18nPrefix?: string;
    /** Order of the card in the journey. */
    order: number;
    /** Text of the card. */
    text: string;
    /** CSS. */
    theme?: UserJourneyCardStyle;
}

export function UserJourneyCard({i18nPrefix = "focus", getImg, text, theme: pTheme}: UserJourneyCardProps) {
    const theme = useTheme("userJourneyCard", styles, pTheme);
    return (
        <div className={`${theme.card()}`}>
            <div className={theme.close()}>
                {i18next.t(`${i18nPrefix}.userJourney.close`)}
                <FontIcon>clear</FontIcon>
            </div>
            <div className={theme.description()}>
                {getImg ? <img src={getImg()} /> : null}
                <div className={theme.text()}>{text}</div>
            </div>
            <UserJourneyNavigation i18nPrefix={i18nPrefix} />
        </div>
    );
}
