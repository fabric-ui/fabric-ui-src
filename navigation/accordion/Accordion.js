import React from 'react'
import styles from './styles/Accordion.module.css'
import PropTypes from "prop-types";
import AccordionSummary from "./AccordionSummary";
import Ripple from "../../misc/ripple/Ripple";

export default function Accordion(props){
    const summary = React.Children.toArray(props.children).find(e => e.type === AccordionSummary)
    const content = React.Children.toArray(props.children).filter(e => e.type !== AccordionSummary)
    return(
        <details className={styles.details}>
            <summary className={styles.summary}>
                {summary}
                <Ripple/>
            </summary>
            {content}
        </details>
    )

}
Accordion.propTypes={
    children: PropTypes.node,

}