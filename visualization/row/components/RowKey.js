import PropTypes from "prop-types";
import useField from "../hooks/useField";
import styles from '../styles/Row.module.css'
import React from 'react'

export default function RowKey(props) {
    const data = useField(props.field, props.object)

    return (
        <div className={styles.row}>
            {data}
            {props.selfContained ?
                <div className={styles.footer}>
                    {props.field.label}
                </div>
                :
                null
            }
        </div>
    )

}

RowKey.propTypes = {
    index: PropTypes.number,
    selfContained: PropTypes.bool,
    object: PropTypes.object.isRequired,
    field: PropTypes.shape({
        label: PropTypes.string,
        key: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['number', 'string', 'bool', 'date']).isRequired,
        hoursOffset: PropTypes.number
    }).isRequired
}
