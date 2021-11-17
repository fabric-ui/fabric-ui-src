import PropTypes from 'prop-types'
import styles from "./styles/FormRow.module.css";
import React, {useEffect, useMemo, useRef, useState} from "react";
import Button from "../button/Button";
import shared from './styles/Form.module.css'
import ToolTip from "../../feedback/tooltip/ToolTip";
import useLocale from "../../misc/hooks/useLocale";

export default function FormRow(props) {
    useEffect(() => {
        setIndex(Array.prototype.indexOf.call(ref.current.parentNode.children, ref.current) + 1)
    }, [])
    const children = React.Children.toArray(props.children)
    const completed = useMemo(() => {
        let res = true
        children.forEach(e => {

            const isText = typeof e.props.value === 'string' ? (e.props.value.length > 0) : true
            res = res && (!e.props.required || (e.props.value !== undefined && e.props.value !== null && isText && e.props.required))
        })

        return res
    }, [props.children])

    const [open, setOpen] = useState(true)
    const [index, setIndex] = useState()
    const ref = useRef()
    const translate = useLocale()
    return (
        <div className={styles.wrapper} ref={ref} data-completed={completed}>
            <div className={styles.legendContent}>
                <ToolTip content={!completed ? translate('not_completed')  :translate('complete')} justify={"start"} align={'middle'}/>
                <div className={[styles.indicator, !completed ? styles.notCompleted : undefined].join(' ')}/>
                <Button
                    onClick={() => setOpen(!open)}
                    highlight={!open}
                    color={'secondary'}
                    className={shared.buttonContainer}>
                    <span
                        style={{transform: open ? undefined : 'rotate(180deg)', transition: 'inherit'}}
                        className="material-icons-round">arrow_drop_down</span>

                </Button>
                <h1 className={styles.legend}>{props.title ? props.title : (translate('step') + ' ' + index)}</h1>
            </div>
            {open ? props.children : null}
        </div>
    )
}

FormRow.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
}
