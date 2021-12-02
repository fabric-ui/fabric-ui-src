import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from "react";
import styles from './styles/Switcher.module.css'

export default function Switcher(props) {
    const ref = useRef()
    const [currentChild, setCurrentChild] = useState()

    useEffect(() => {
        if (props.openChild !== currentChild && props.openChild < React.Children.toArray(props.children).length) {
            ref.current?.classList.add(styles.exitA)
        }

    }, [props.openChild])

    return (
        <div
            ref={ref}
            className={props.className}
            style={props.styles}
            onAnimationEnd={() => {
                setCurrentChild(props.openChild)
                ref.current?.classList.add(styles.enterA)
                ref.current?.classList.remove(styles.exitA)
            }}
        >
            {React.Children.toArray(props.children).map((c, i) => i !== currentChild ? null : (
                <React.Fragment key={i + '-child'}>
                    {c}
                </React.Fragment>
            ))}
        </div>
    )
}

Switcher.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    openChild: PropTypes.number.isRequired,
    styles: PropTypes.object
}