import React from "react";
import styles from './styles/Empty.module.css'
import PropTypes from "prop-types";

export default function Empty(props) {
    return (
        <div className={styles.content}>
            <span style={{fontSize: '130px'}} className="material-icons-round">folder</span>
            <h5 className={styles.label}>{props.customLabel ? props.customLabel : "Lista vazia, nada encontrado."}</h5>
        </div>
    )
}

Empty.propTypes={
    customLabel: PropTypes.string
}
