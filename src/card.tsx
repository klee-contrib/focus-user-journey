import i18next from "i18next";
import {computed} from "mobx";
import * as React from "react";
import {themr} from "react-css-themr";
import {FontIcon} from "react-toolbox/lib/font_icon";

import UserJourneyNavigation from "./navigation";

import * as styles from "./__style__/user-journey-card.css";
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

export class UserJourneyCard extends React.Component<UserJourneyCardProps, void> {

    @computed
    get background() {
        return this.props.order % 4;
    }

    @computed
    get image() {
        if (this.props.getImg) {
            return <img src={this.props.getImg()} />;
        }
        return null;
    }

    render() {
        const {i18nPrefix = "focus", theme} = this.props;
        return (
            <div className={`${theme!.card}`}>
                <div className={theme!.close}>
                    {i18next.t(`${i18nPrefix}.userJourney.close`)}
                    <FontIcon icon="clear" />
                </div>
                <div className={theme!.description}>
                    {this.image}
                    <div className={theme!.text}>
                        {this.props.text}
                    </div>
                </div>
                <UserJourneyNavigation i18nPrefix={i18nPrefix} />
            </div>
        );
    }
}

export default themr("userJourneyCard", styles)(UserJourneyCard);
