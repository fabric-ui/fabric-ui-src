import PropTypes from "prop-types";
import React, {useContext, useEffect, useState} from "react";
import styles from "./styles/Modal.module.css";
import ThemeContext from "../../misc/theme/ThemeContext";
import useModal from "./useModal";

export default function Modal(props) {

    const {animations, renderContent, animate, unmountContent, target, source, getParentPosition} = useModal({
        animationStyle: props.animationStyle,
        variant: props.variant
    })
    const context = useContext(ThemeContext)

    const handleMouseDown = (event) => {
        if (!document.elementsFromPoint(event.clientX, event.clientY).includes(target.current) && alreadyRendered)
            animate(false)
    }

    const [alreadyRendered, setAlreadyRendered] = useState(false)

    useEffect(() => {
        if (props.open) {
            const position = getParentPosition()

            console.log(alreadyRendered, animations.enter)
            renderContent((
                <div
                    style={{
                        ...{
                            background: `rgba(0, 0, 0, ${props.blurIntensity !== undefined ? props.blurIntensity : .4})`
                        }, ...position
                    }}
                    className={[styles.wrapper, props.variant === 'fit' ? styles.fitContent : styles.fitPage, props.wrapperClassName, context.dark ? context.styles.dark : context.styles.light].join(' ')}
                >
                    <div
                        className={[alreadyRendered ? undefined : animations.enter, props.className].join(' ')}
                        style={props.styles}
                        ref={target}
                        onAnimationEnd={e => {
                            if(!alreadyRendered)
                                setAlreadyRendered(true)
                            if (e.target.classList.contains(animations.exit)) {
                                setAlreadyRendered(false)
                                props.handleClose()

                                unmountContent()
                            }
                        }}>
                        {props.children}
                    </div>
                </div>
            ))

        } else if (alreadyRendered)
            animate()
    }, [props.children, props.open])

    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown)
        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
        }
    }, [alreadyRendered, props.open])

    return <div ref={source} style={{display: 'none'}}/>
}

Modal.propTypes = {
    wrapperClassName: PropTypes.string,
    variant: PropTypes.oneOf(['fill', 'fit']),
    animationStyle: PropTypes.oneOf(['slide-left', 'slide-right', 'fade']),
    className: PropTypes.string,
    blurIntensity: PropTypes.number,
    styles: PropTypes.object,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.node
}
