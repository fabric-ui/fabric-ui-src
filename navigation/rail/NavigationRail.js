import PropTypes from "prop-types";
import React, {useState} from "react";
import styles from "./styles/Rail.module.css";
import RailActionButton from "./RailActionButton";
import RailContext from "./hooks/RailContext";
import Button from "../../inputs/button/Button";
import Modal from "../modal/Modal";

export default function NavigationRail(props) {
    const [extended, setExtended] = useState(false)

    const content = (
        <>
            <div className={styles.alignStart} data-variant={props.orientation ? props.orientation : 'vertical'}>
                {React.Children.toArray(props.children).filter(e => e.props.place !== 'end').map((e, i) => {
                    if (e.type === RailActionButton)
                        return e
                    else
                        return (
                            <div key={i + '-rail-node-start'} className={e.props.className} style={e.props.styles}>
                                {e}
                            </div>
                        )
                })}
            </div>
            <div className={styles.alignEnd} data-variant={props.orientation ? props.orientation : 'vertical'}>
                {React.Children.toArray(props.children).filter(e => e.props.place === 'end').map((e, i) => {
                    if (e.type === RailActionButton)
                        return e
                    else
                        return (
                            <div key={i + '-rail-node-end'} className={e.props.className} style={e.props.styles}>
                                {e}
                            </div>
                        )
                })}
            </div>
        </>
    )
    return (
        <div
            className={styles.wrapper}
            data-extended={JSON.stringify(extended)}
        >
            <Button onClick={() => setExtended(!extended)} className={styles.button}>
                <span className={'material-icons-round'}>
                    menu
                </span>
            </Button>
            <Modal
                className={styles.modal}
                open={extended} blurIntensity={0}
                handleClose={() => setExtended(false)}
                animationStyle={"slide-left"}>
                <RailContext.Provider value={true}>
                    {content}
                </RailContext.Provider>
            </Modal>
            {content}
        </div>
    )

}

NavigationRail.propTypes = {
    children: PropTypes.node,

}
