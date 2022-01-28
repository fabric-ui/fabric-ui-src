import React from 'react'
import PropTypes from "prop-types";

export default function DropdownOptions(props){
  return props.children
}
DropdownOptions.propTypes={
  children: PropTypes.node.isRequired
}
