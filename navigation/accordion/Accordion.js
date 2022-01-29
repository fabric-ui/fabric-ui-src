import React, {useEffect, useRef, useState} from 'react'
import styles from './styles/Accordion.module.css'
import PropTypes from "prop-types";
import AccordionSummary from "./AccordionSummary";
import Button from "../../inputs/button/Button";

export default function Accordion(props) {
  const summary = React.Children.toArray(props.children).find(e => e.type === AccordionSummary)
  const content = React.Children.toArray(props.children).filter(e => e.type !== AccordionSummary)
  const ref = useRef()

  const [open, setOpen] = useState(true)
  const [maxHeight, setMaxHeight] = useState(undefined)

  useEffect(() => {
      setMaxHeight(ref.current.scrollHeight)
  }, [])

  return (
    <div className={styles.details} ref={ref} style={maxHeight ? {height: open  ? maxHeight + 'px' : '38px'} : undefined}>
      <Button
        onClick={() => setOpen(!open)}
        className={[styles.summary, summary?.props.className].join(' ')}
        styles={summary?.props.styles}
      >
        <span style={{transform: !open ? 'rotate(-90deg)' : undefined, fontSize: '1.25rem', transition: '150ms linear'}}
              className={'material-icons-round'}>expand_more</span>
        {summary}
      </Button>
      {open ? content : null}
    </div>
  )

}
Accordion.propTypes = {
  children: PropTypes.node
}
