import React, {useMemo} from "react";
import PropTypes from 'prop-types'
import styles from "../horizontal/styles/Horizontal.module.css";

export default function Wrapper(props) {
    const {biggest, iterations} = useMemo(() => {
        let biggest
        let iterations = []
        props.data.forEach((e) => {
            if (biggest === undefined)
                biggest = parseInt(e[props.value])
            else if (parseInt(e[props.value]) > biggest)
                biggest = parseInt(e[props.value])
        })

        let value = biggest
        let percent = Math.ceil(value * .2)
        let topValue = value - percent * 5

        if (topValue < 0) {
            topValue = topValue * (-1)
            value = value + topValue
            topValue = value - percent * 5
        }

        for (let i = 0; i < 6; i++) {
            iterations.push({
                value: (topValue > 0 ? topValue : value) - percent * (i),
                x: (5 - i) * 17.5
            })
        }

        biggest = iterations[0].value
        return {biggest, iterations}
    }, [props.value, props.data])


    return (
        <div className={styles.chartWrapper}>
            <div className={styles.titleInput}>
                {props.title}
            </div>
            {props.children(30, iterations, biggest)}
        </div>
    )
}

Wrapper.propTypes = {
    data: PropTypes.array,
    value: PropTypes.string,
    children: PropTypes.node,
    title: PropTypes.string,

}
