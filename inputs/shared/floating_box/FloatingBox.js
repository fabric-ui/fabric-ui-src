import React, {useEffect, useRef} from "react";
import PropTypes from 'prop-types'
import styles from './styles/FloatingBox.module.css'

export default function FloatingBox(props) {
    const ref = useRef()
    const handleMouseDown = (event) => {
        if (props.open && !document.elementsFromPoint(event.clientX, event.clientY).includes(ref.current))
            props.setOpen(false)
    }

    useEffect(() => {


        document.addEventListener('mousedown', handleMouseDown)
        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
        }
    }, [props.open])
    useEffect(() => {
        if (props.parentNode) {
            const p = props.parentNode.getBoundingClientRect()
            const b = ref.current.parentNode?.getBoundingClientRect()
            const childOffset = b.y - p.y

            if (childOffset > p.height / 2) {
                ref.current.style.top = '0'
                ref.current.style.transform = 'translateY(calc(-100% + 16px))'
            } else {
                ref.current.style.top = 'calc(100% - 16px)'
                ref.current.style.transform = 'none'
            }
        }
    }, [props.parentNode])
    return (
        <div
            style={{
                visibility: !props.open ? 'hidden' : 'visible',
                opacity: !props.open ? '0' : '1',
                width: props.width
            }}
            className={styles.selectBox} ref={ref}

        >
            {props.children}
        </div>
    )
}

FloatingBox.propTypes = {
    parentNode: PropTypes.object,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    children: PropTypes.node,
    width: PropTypes.string,
}