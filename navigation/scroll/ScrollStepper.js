import React, {useEffect, useMemo, useRef, useState} from 'react'
import PropTypes from "prop-types";
import styles from './styles/Stepper.module.css'
import StepperWrapper from "./StepperWrapper";
import Button from "../../inputs/button/Button";

export default function ScrollStepper(props) {
    const [id, setId] = useState()
    useEffect(() => {
        let result = ''
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let charactersLength = characters.length
        for (let i = 0; i < 15; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        setId(result)
    }, [])

    const ref = useRef()
    const children = React.Children.toArray(props.children).filter(e => e.type === StepperWrapper)
    const [scrolled, setScrolled] = useState(0)
    return (
        <div className={[styles.wrapper, props.className].join(' ')} style={props.styles} ref={ref}>
            {children.map((child, index) => (
                <div
                    className={child.props.className}
                    style={{...child.props.styles, ...{position: 'absolute', top: 'calc(100% * ' + index + ')'}}}
                    key={id + '-stepper-child-' + index}
                    id={id + '-stepper-child-' + index}
                >
                    {child}
                </div>
            ))}
            <div className={styles.tabs}>
                {children.map((a, index) => (
                    <Button
                        variant={'filled'}
                        className={styles.button}
                        onClick={() => {
                            const el = document.getElementById(id + '-stepper-child-' + index)
                            if (el !== null) {
                                setScrolled(index)
                                ref.current.scroll(0, el.offsetTop)
                            }
                        }}>
                        <div className={styles.filler} data-filled={JSON.stringify(scrolled === index)}/>
                    </Button>
                ))}
            </div>
        </div>
    )
}
ScrollStepper.propTypes = {
    className: PropTypes.string,
    styles: PropTypes.object,
    children: PropTypes.node
}