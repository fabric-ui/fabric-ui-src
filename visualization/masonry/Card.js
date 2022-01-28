import PropTypes from "prop-types";
import styles from './styles/Card.module.css'
import React, {useMemo} from "react";

export default function Card(props) {
  const height = useMemo(() => {
    const max = props.dimensions?.maxHeight ?props.dimensions?.maxHeight : 250,
          min = props.dimensions?.minHeight ?props.dimensions?.minHeight : 150

    return Math.floor(Math.random() * (max - min + 1) + min)
  }, [])

  return (
    <div className={styles.cardWrapper} style={{...props.styles, ...{height: props.randomHeight ? height + 'px' : undefined}}}>
      {props.children}
    </div>
  )
}

Card.propTypes = {
  children: PropTypes.node,
  styles: PropTypes.object,
  randomHeight: PropTypes.bool,
  dimensions: PropTypes.shape({
    maxHeight: PropTypes.number,
    minHeight: PropTypes.number
  })
}
