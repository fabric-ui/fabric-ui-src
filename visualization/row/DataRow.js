import React from 'react'
import PropTypes from "prop-types";
import styles from './styles/Row.module.css'
import RowKey from "./components/RowKey";

export default function DataRow(props) {

    return (
        <div className={styles.wrapper}>
            {props.keys.map((k, i) => (
                <React.Fragment key={'key-' + k.key + '-' + i}>
                    <RowKey index={i} field={k} object={props.object} selfContained={props.selfContained}/>
                </React.Fragment>
            ))}
        </div>
    )
}

DataRow.propTypes = {
    selfContained: PropTypes.bool,
    object: PropTypes.object.isRequired,
    keys: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        key: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['number', 'string', 'bool', 'date']).isRequired,
        hoursOffset: PropTypes.number
    })).isRequired
}