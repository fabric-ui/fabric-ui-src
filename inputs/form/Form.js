import styles from './styles/Form.module.css'
import React, {useEffect, useRef, useState} from "react";
import Header from "./templates/Header";
import PropTypes from "prop-types";


export default function Form(props) {

    const [disabled, setDisabled] = useState(false)
    const contentRef = useRef()
    useEffect(() => {
        const childNodes = contentRef.current.childNodes
        let completed = true

        childNodes.forEach((e) => {
            completed = completed && JSON.parse(e.getAttribute('data-completed'))
        })

        setDisabled(!completed || !props.hook.changed)
    })
    // const {ref, maxHeight} = useMaxHeight()
    const [scrolled, setScrolled] = useState(false)

    return (
        <div
            onScroll={event => {
                if (event.target.scrollTop > 0)
                    setScrolled(true)
                else
                    setScrolled(false)
            }}
            className={styles.wrapper}
            // style={{maxHeight: maxHeight}}
            // ref={ref}
        >
            <Header {...props} disabled={disabled} scrolled={scrolled}/>
            <div className={styles.content} ref={contentRef}>
                {props.children(props.hook.data, props.hook.handleChange)}
            </div>
        </div>
    )
}

Form.propTypes = {
    returnButton: PropTypes.bool,
    title: PropTypes.string,

    hook: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,

    create: PropTypes.bool,
    dependencies: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        type: PropTypes.oneOf(['string', 'number', 'object', 'bool', 'date', 'array'])
    })),
    handleSubmit: PropTypes.func.isRequired,
    metadata: PropTypes.shape({
        lastModified: PropTypes.any,
        creator: PropTypes.any,
    }),
    handleClose: PropTypes.func,
    submitLabel: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.any, label: PropTypes.string, onClick: PropTypes.func,
        disabled: PropTypes.bool
    }))
}
