import PropTypes from 'prop-types'
import React, {useMemo, useState} from "react";
import styles from './styles/Vertical.module.css'
import Switcher from "../switcher/Switcher";
import Row from "./components/Row";
import useMaxHeight from "../../misc/useMaxHeight";

export default function VerticalTabs(props) {
    const [open, setOpen] = useState({classSelected: 0, rowSelected: 0})

    const openTab = useMemo(() => {
        let indexClass = 0
        props.classes.forEach((e, i) => {
            if (open.classSelected > i)
                indexClass = indexClass + e.buttons.length
        })
        return indexClass + open.rowSelected
    }, [open, props.classes])
    const {ref, maxHeight} = useMaxHeight()
    return (
        <div className={styles.wrapper} ref={ref} style={{maxHeight: maxHeight}}>
            <div className={styles.header}>
                {props.children}
                <div className={styles.tabs}>
                    {props.classes.map((e, i) => (
                        <React.Fragment key={i + '-class'}>
                            <Row setOpen={setOpen} open={open} data={e} index={i}/>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <Switcher openChild={openTab} className={[styles.content, props.className].join(' ')}>
                {props.classes.map((e, i) => e.buttons.map((b, bI) => (
                    <React.Fragment key={i + '-vertical-tabs-child-' + bI}>
                        {b.children}
                    </React.Fragment>
                )))}
            </Switcher>
        </div>
    )
}

VerticalTabs.proptypes = {
    className: PropTypes.string,
    classes: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        buttons: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                children: PropTypes.node,
                onClick: PropTypes.func
            })
        ),
    })),
    children: PropTypes.node
}
