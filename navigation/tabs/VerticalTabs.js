import PropTypes from 'prop-types'
import React, {useState} from "react";
import styles from './styles/Vertical.module.css'
import Switcher from "../switcher/Switcher";
import Row from "./components/Row";

export default function VerticalTabs(props) {
    const [open, setOpen] = useState(0)
    const children = React.Children.toArray(props.children)
    const groups = [...new Set(children.map(item => item.props.group))]

    return (
        <div className={props.className} style={{...props.styles, ...{position: 'relative'}}}>
            <div className={styles.header}>

                    {groups.map((e, i) => (
                        <React.Fragment key={i + '-class'}>
                            <Row
                                setOpen={setOpen}
                                open={open}
                                data={e}
                                index={i}
                                buttons={children.map(item => {
                                    return {
                                        label: item.props.label,
                                        group: item.props.group,
                                        disabled: item.props.disabled
                                    }
                                })}
                                groupName={e}/>
                        </React.Fragment>
                    ))}

            </div>

            <Switcher className={children[open].props.className} styles={children[open].props.styles} openChild={open}>
                {children.map((el, index) => (
                    <React.Fragment key={index + '-tab-vertical'}>
                        {el}
                    </React.Fragment>
                ))}
            </Switcher>
        </div>
    )
}

VerticalTabs.proptypes = {
    open: PropTypes.number,
    setOpen: PropTypes.func,

    className: PropTypes.string,
    styles: PropTypes.object,
    children: PropTypes.node.isRequired,
}
