import PropTypes from "prop-types";
import styles from './styles/Masonry.module.css'
import React, {useEffect, useMemo, useRef, useState} from "react";
import Card from "./Card";

export default function Masonry(props) {
    const children = React.Children.toArray(props.children).filter(c => c.type === Card)
    const [quantityColumn, setQuantityColumn] = useState(0)
    const resizeObs = useRef()
    const ref = useRef()
    const callback = () => {
        const q = Math.floor(ref.current?.offsetWidth / 250)
        setQuantityColumn( q <= 0 ? 1 : q)
    }

    useEffect(() => {
        resizeObs.current = new ResizeObserver(callback)
        resizeObs.current.observe(ref.current)
    }, [])

    const columns = useMemo(() => {
        let newColumns = Array(quantityColumn)
        let onColumn = 0
        children.forEach(child => {
            if (newColumns[onColumn] !== undefined)
                newColumns[onColumn].push(child)
            else
                newColumns[onColumn] = [child]

            if (onColumn < quantityColumn - 1)
                onColumn += 1
            else
                onColumn = 0
        })

        return newColumns
    }, [quantityColumn])

    return (
        <div ref={ref} className={styles.wrapper}>
            {columns.map(column => (
                <div className={styles.column}>
                    {column.map(row => row)}
                </div>
            ))}
        </div>
    )
}

Masonry.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    width: PropTypes.string
}
