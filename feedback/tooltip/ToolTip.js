import React, {useEffect, useRef} from "react";

import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import styles from './styles/ToolTip.module.css'


export default function ToolTip(props) {
  const toolTip = (
    <div className={styles.container}>
      <div className={styles.content}>
        {props.content === undefined ? props.children : props.content}
      </div>
    </div>
  )
  const ref = useRef()
  const mountingPoint = useRef();
  const handleMouseMove = (event) => {

    mountingPoint.current.style.left = (event.clientX + 10) + 'px'
    mountingPoint.current.style.top = (event.clientY + 10) + 'px'
  }
  const hover = (event) => {
    mountingPoint.current.style.position = 'fixed'
    mountingPoint.current.style.zIndex = '999'

    if (ref.current?.parentNode) {
      ReactDOM.render(
        toolTip,
        mountingPoint.current
      )
      mountingPoint.current.style.left = (event.clientX + 10) + 'px'
      mountingPoint.current.style.top = (event.clientY + 10) + 'px'
      document.addEventListener('mousemove', handleMouseMove)

      ref.current?.parentNode.addEventListener('mouseleave', () => {

        document.removeEventListener('mousemove', handleMouseMove)
        ReactDOM.unmountComponentAtNode(
          mountingPoint.current
        )
      }, {once: true})
    }
  }

  useEffect(() => {
    if (!mountingPoint.current) {
      mountingPoint.current = document.createElement("div")
      document.body.appendChild(mountingPoint.current)
    }
    ref.current?.parentNode.addEventListener('mouseenter', hover)

    return () => ref.current?.parentNode.removeEventListener('mouseenter', hover)
  }, [props.children, props.content])
  useEffect(() => {
    return () => {
      try {
        ReactDOM.unmountComponentAtNode(
          mountingPoint.current
        )
        document.body.removeChild(mountingPoint.current)
      } catch (e) {
      }
    }
  }, [])

  return <div ref={ref} style={{display: 'none'}}/>
}

ToolTip.propTypes = {
  content: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.string,
  justify: PropTypes.oneOf(['end', 'middle', 'start']),
  align: PropTypes.oneOf(['end', 'middle', 'start'])
}
