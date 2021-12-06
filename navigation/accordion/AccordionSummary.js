import React from 'react'
import styles from './styles/Accordion.module.css'
import PropTypes from "prop-types";

export default function AccordionSummary(props){

    return(
       props.children ? props.children : <></>
    )

}
AccordionSummary.propTypes={
    children: PropTypes.node,
}