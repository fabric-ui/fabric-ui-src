import PropTypes from "prop-types";
import styles from './styles/Card.module.css'
import React from "react";

export default function Card(props) {
    return (
        <div className={styles.cardWrapper}>
          {props.children}
        </div>
    )
}

Card.propTypes = {
    children: PropTypes.node
}
