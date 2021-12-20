import styles from '../styles/CardGroup.module.css'
import PropTypes from "prop-types";
import React, {useRef, useState} from "react";

export default function CardGroup(props) {
    const [buttonEnd, setButtonEnd] = useState(false)
    const [buttonStart, setButtonStart] = useState(false)
    const ref = useRef()

    return (
        <>
            <button className={styles.button} style={{right: '20px', visibility: buttonEnd ? 'visible' : 'hidden', opacity: buttonEnd ? '1' : '0'}}
                    onClick={(e) => {
                        ref.current.scrollLeft = ref.current.scrollLeft + ref.current.scrollWidth * 0.25
                        if ((ref.current.scrollWidth - ref.current.offsetWidth) < ref.current.scrollLeft)
                            setButtonEnd(true)
                        else
                            setButtonEnd(false)
                    }}>
                <span
                    style={{transform: 'rotate(-90deg)'}}
                    className="material-icons-round">arrow_drop_down</span>
            </button>
            <button className={styles.button} style={{left: '20px', visibility: buttonStart ? 'visible' : 'hidden', opacity: buttonStart ? '1' : '0'}}
                    onClick={() => {
                        const newScroll = ref.current.scrollLeft - ref.current.scrollWidth * 0.25
                        ref.current.scrollLeft = newScroll
                        if (newScroll > 0)
                            setButtonStart(true)
                        else
                            setButtonStart(false)
                    }}>
                            <span
                                style={{transform: 'rotate(90deg)'}}
                                className="material-icons-round">arrow_drop_down</span>

            </button>
            <div className={styles.groupWrapper} ref={ref} onMouseEnter={() => {
                if ((ref.current.scrollWidth - ref.current.offsetWidth) > ref.current.scrollLeft)
                    setButtonEnd(true)
                if (ref.current.scrollLeft > 0)
                    setButtonStart(true)
            }}>

                {props.children}
            </div>
        </>


    )
}
CardGroup.propTypes = {
    children: PropTypes.node
}