import React from 'react'
import PropTypes from "prop-types";

export default function AccordionSummary(props){

    return(
       props.children ? props.children : <></>
    )

}
AccordionSummary.propTypes={
    children: PropTypes.node,
  className: PropTypes.string,
  styles: PropTypes.object
}
