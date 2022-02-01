import PropTypes from "prop-types";
import styles from './styles/Card.module.css'
import React from "react";
import Button from "../../inputs/button/Button";
import useAttributes from "../../misc/hooks/useAttributes";

export default function Card(props) {
  const ref = useAttributes(props.attributes)
  return (
    <Button reference={ref} onClick={props.onClick} variant={'outlined'} className={[styles.cardWrapper, props.className].join(' ')} styles={props.styles} >
      {props.children}
    </Button>
  )
}

Card.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  styles: PropTypes.object,
  className: PropTypes.string,
  attributes: PropTypes.object
}
