import {FolderRounded} from "@material-ui/icons";
import React from "react";
import styles from './styles/Empty.module.css'
import PropTypes from "prop-types";

export default function Empty(props) {
    return (
        <div className={styles.content}>
            <FolderRounded style={{fontSize: '130px'}}/>
            <h5 className={styles.label}>{props.customLabel ? props.customLabel : "Lista vazia, nada encontrado."}</h5>
        </div>
    )
}

Empty.propTypes={
    customLabel: PropTypes.string
}
