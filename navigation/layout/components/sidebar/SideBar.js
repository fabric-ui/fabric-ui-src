import PropTypes from "prop-types";
import React, {useMemo, useState} from "react";
import styles from "./styles/SideBar.module.css";
import ToolTip from "../../../../feedback/tooltip/ToolTip";
import Button from "../../../../inputs/button/Button";
import {MenuOpenRounded} from "@material-ui/icons";

export default function SideBar(props) {
    const [open, setOpen] = useState(false)
    const buttonStyle = useMemo(() => {
        return {
            display: open ? 'flex' : 'grid',
            width: !open ? '50px' : '100%'
        }
    }, [open])
    const getContent = (button) => {
        return (
            <Button
                variant={'minimal-horizontal'}
                highlight={button.highlight}
                className={styles.buttonContainer}
                disabled={button.disabled}
                onClick={() => button.onClick()}
                styles={buttonStyle}
            >
                <div
                    className={[styles.buttonIcon, !button.highlight || open ? undefined : styles.activeButton].join(' ')}
                    style={{}}
                >
                    {button.icon}
                </div>
                <div
                    className={[styles.buttonLabel, styles.overflowEllipsis].join(' ')}
                    style={{
                        textAlign: open ? undefined : 'center',
                        opacity: !button.highlight || open ? 1 : 0
                    }}>
                    {button.label}
                </div>
            </Button>
        )
    }
    return (
        <div
            className={styles.wrapper}
            style={{width: !open ? '60px' : '225px'}}
        >

            <div className={styles.buttons}>
                <Button
                    highlight={open}
                    className={styles.button}
                    onClick={() => setOpen(!open)}
                >
                    <MenuOpenRounded style={{
                        transform: open ? undefined : 'rotate(180deg)',
                        transition: '150ms linear'
                    }}/>
                </Button>
                {props.buttons?.filter(e => e && e.position !== 'bottom').map((button, index) => !button ? null : (
                    <div key={'side-bar-button-' + index}>
                        {getContent(button)}

                        <ToolTip align={'middle'} justify={'end'} content={button.label}/>
                    </div>
                ))}

                <div className={styles.bottomOptions}>
                    {props.buttons?.filter(e => e && e.position === 'bottom').map((button, index) => !button ? null : (
                        <div key={'side-bar-bottom-button-' + index}>
                            {getContent(button)}

                            <ToolTip align={'middle'} justify={'end'} content={button.label}/>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    )

}

SideBar.propTypes = {
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            icon: PropTypes.any,
            onClick: PropTypes.func,
            highlight: PropTypes.bool,
            position: PropTypes.oneOf(['bottom', 'default'])
        })
    )
}
