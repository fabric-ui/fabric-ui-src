import PropTypes from 'prop-types'
import React, {useState} from "react";
import styles from './styles/Tabs.module.css'
import Switcher from "../switcher/Switcher";
import Button from "../../inputs/button/Button";
import Tab from "./Tab";
import ToolTip from "../../feedback/tooltip/ToolTip";

export default function Tabs(props) {
    const [open, setOpen] = useState(0)
    const children = React.Children.toArray(props.children).filter(e => e.type === Tab)
    return (
        <div className={props.className} style={props.styles} data-open-tab={open}>
            <div className={styles.header}
                 style={{
                     justifyContent: props.align === 'end' ? 'flex-end' : props.align === 'start' ? 'flex-start' : undefined,
                     width: props.indicator === 'fit' ? 'fit-content' : undefined,
                     margin: props.indicator === 'fit' ? 'auto' : undefined
                 }}>
                <div className={styles.tabs}>
                    {children.map((e, i) => (
                        <React.Fragment key={i + '-button-header-tab'}>
                            <Button
                                variant={'minimal'}
                                highlight={open === i}

                                className={styles.button}
                                onClick={() => {
                                    setOpen(i)
                                }}>
                                {e.props.label}
                                <ToolTip content={e.props.label}/>
                            </Button>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <Switcher className={children[open]?.props.className} styles={children[open]?.props.styles}
                      openChild={open}>
                {children.map((el, index) => (
                    <React.Fragment key={index + '-tab'}>
                        {el}
                    </React.Fragment>
                ))}
            </Switcher>
        </div>
    )
}

Tabs.propTypes = {
    open: PropTypes.number,
    setOpen: PropTypes.func,


    align: PropTypes.oneOf(['start', 'end', 'center']),
    className: PropTypes.string,
    styles: PropTypes.object,
    children: PropTypes.node.isRequired,
    indicator: PropTypes.oneOf(['stretch', 'fit'])

}
