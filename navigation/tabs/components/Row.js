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
                    display: props.data.label ? 'flex' : 'none',
                    alignItems: 'center',
                    padding: '8px'
                }}
                onClick={() => setHidden(!hidden)}
            >
                {props.data.label}
                <ArrowDropDownRounded
                    style={{transform: hidden ? 'rotate(180deg)' : "unset", transition: '150ms linear'}}/>
            </Button>
            <Switcher openChild={hidden ? 0 : 1}>
                <div/>
                <div>
                    {props.data.buttons.map((b, bI) => (
                        <React.Fragment key={props.index + '-button-header-tab-' + bI}>
                            <Button
                                variant={'minimal-horizontal'}
                                className={[styles.button, styles.color, props.open.classSelected === props.index && props.open.rowSelected === bI ? styles.highlight : undefined].join(' ')}
                                styles={{fontWeight: 'normal', width: '100%'}}
                                highlight={props.open.classSelected === props.index && props.open.rowSelected === bI}
                                onClick={() => {
                                    props.setOpen({classSelected: props.index, rowSelected: bI})
                                }}>
                                <div className={styles.overflow}>
                                    {b.label}
                                </div>
                            </Button>
                        </React.Fragment>
                    ))}
                </div>
            </Switcher>
        </div>
    )
}

Row.propTypes = {
    data: PropTypes.shape({
        label: PropTypes.string,
        buttons: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                children: PropTypes.node,
                onClick: PropTypes.func
            })
        ),
    }),
    index: PropTypes.number,
    setOpen: PropTypes.func,
    open: PropTypes.object
}