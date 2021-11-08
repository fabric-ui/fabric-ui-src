import styles from "../styles/Vertical.module.css";
import {ArrowDropDownRounded} from "@material-ui/icons";
import React, {useState} from "react";
import PropTypes from "prop-types";
import Switcher from "../../switcher/Switcher";
import Button from "../../../inputs/button/Button";

export default function Row(props) {
    const [hidden, setHidden] = useState(false)

    return (
        <div style={{width: '100%', overflow: 'hidden'}}>
            <Button
                className={styles.button} variant={'minimal-horizontal'}
                color={hidden ? 'primary' : "secondary"}
                styles={{
                    display: props.groupName ? 'flex' : 'none',
                    alignItems: 'center',
                    padding: '8px'
                }}
                onClick={() => setHidden(!hidden)}
            >
                {props.groupName}
                <ArrowDropDownRounded
                    style={{transform: hidden ? 'rotate(180deg)' : "unset", transition: '150ms linear'}}/>
            </Button>
            <Switcher openChild={hidden ? 0 : 1}>
                <div/>
                <div>
                    {props.buttons.map((b, bI) => b.group === props.groupName ? (
                        <React.Fragment key={props.index + '-button-header-tab-' + bI}>
                            <Button
                                variant={'minimal-horizontal'}
                                className={[styles.button, styles.color].join(' ')}
                                styles={{fontWeight: 'normal', width: '100%'}}
                                highlight={props.open === bI}
                                onClick={() => {
                                    props.setOpen(bI)
                                }}>
                                <div className={styles.overflow}>
                                    {b.label}
                                </div>
                            </Button>
                        </React.Fragment>
                    ) : null)}
                </div>
            </Switcher>
        </div>
    )
}

Row.propTypes = {
    groupName: PropTypes.string,
    buttons: PropTypes.arrayOf(PropTypes.object),
    index: PropTypes.number,
    setOpen: PropTypes.func,
    open: PropTypes.number
}