import {computed} from "mobx";
import {observer} from "mobx-react";
import * as React from "react";
import {themr} from "react-css-themr";

import UserJourneyCard from "./card";
import {userJourneyStore} from "./store";

import * as styles from "./__style__/user-journey.css";
export type UserJourneyStyle = Partial<typeof styles>;

@observer
export class UserJourney extends React.Component<{theme?: UserJourneyStyle}, void> {

    @computed
    get cardComponent() {
        const {CustomCardComponent = UserJourneyCard} = userJourneyStore;
        return <CustomCardComponent {...userJourneyStore.activeCard} />;
    }

    render() {
        const {theme} = this.props;
        if (userJourneyStore.isOpen) {
            return (
                <div className={theme!.userJourney}>
                    <div className={theme!.overlay} onClick={userJourneyStore.close}/>
                    {this.cardComponent}
                </div>
            );
        }
        return null;
    }
}

export default themr("userJourney", styles)(UserJourney);
