import PropTypes from "prop-types";
import React, {useMemo, useState} from "react";
import styles from "./styles/SideBar.module.css";
import ToolTip from "../../feedback/tooltip/ToolTip";
import Button from "../../inputs/button/Button";
import {MenuOpenRounded} from "@material-ui/icons";

export default function Bar(props) {
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
            className={props.orientation === 'horizontal' ? styles.wrapperHorizontal : styles.wrapperVertical}
            data-extended={JSON.stringify(open)}
        >
            {props.orientation === 'horizontal' ? null :
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
            }
            <div className={styles.alignStart} data-variant={props.orientation ? props.orientation : 'vertical'}>
                {React.Children.toArray(props.children).filter(e => e.props.place !== 'end').map((e, i) => (
                    <div key={i + '-bar-node-start'} className={e.props.className} style={e.props.styles}>

                        {e}
                    </div>
                ))}
            </div>
            <div className={styles.alignEnd} data-variant={props.orientation ? props.orientation : 'vertical'}>
                {React.Children.toArray(props.children).filter(e => e.props.place === 'end').map((e, i) => (
                    <div key={i + '-bar-node-end'} className={e.props.className} style={e.props.styles}>
                        {e}
                    </div>
                ))}
            </div>
        </div>
    )

}

Bar.propTypes = {
    orientation: PropTypes.oneOf(['vertical', 'horizontal']),
    children: PropTypes.node,
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
