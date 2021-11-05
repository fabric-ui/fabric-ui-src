import styles from './styles/Ripple.module.css'
import PropTypes from 'prop-types'
import React, {useEffect, useRef} from "react";

export default function Ripple(props) {
    const ref = useRef()

    const addRipple = (e) => {
        const target = document.createElement('span')
        const parent = ref.current.parentNode
        parent.appendChild(target)
        if (props.opacity)
            target.style.setProperty('--opacity', props.opacity)
        if (props.accentColor)
            target.style.setProperty('--accent-color', props.accentColor)
        const rect = ref.current.parentNode.getBoundingClientRect()

        const bigger = rect.width > rect.height ? rect.width : rect.height
        target.style.setProperty('--size',  bigger+ 'px')
        target.style.setProperty('--x', (e.clientX - rect.x) + 'px')
        target.style.setProperty('--y', (e.clientY - rect.y) + 'px')
        target.classList.add(styles.ripple)

        target.addEventListener('animationend', () => {
            ref.current?.parentNode.removeChild(target)
        }, {once: true})
    }
    useEffect(() => {
        if (!props.disabled)
            ref.current?.parentNode.addEventListener('mousedown', addRipple)
        return () => {
            ref.current?.parentNode.removeEventListener('mousedown', addRipple)
        }
    }, [props])


    return <div ref={ref} style={{display: 'none'}}/>

}
Ripple.propTypes = {
    disabled: PropTypes.bool,
    accentColor: PropTypes.string,
    opacity: PropTypes.number
}