import PropTypes from "prop-types";
import React, {useState} from "react";
import styles from "./styles/Rail.module.css";
import RailActionButton from "./RailActionButton";
import RailContext from "./RailContext";

export default function NavigationRail(props) {
    const [extended, setExtended] = useState(false)
    return (
        <div
            className={styles.wrapperVertical}
        >
            <RailContext.Provider value={extended}>
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
            </RailContext.Provider>
        </div>
    )

}

NavigationRail.propTypes = {
    children: PropTypes.node
}
