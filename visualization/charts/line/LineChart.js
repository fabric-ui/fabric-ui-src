import React, {useEffect} from "react";
import PropTypes from 'prop-types'
import useChart from "../shared/useChart";
import shared from "../shared/Charts.module.css";
import useLineChart from "../shared/useLineChart";


export default function LineChart(props) {
    const {ref, width, height} = useLineChart(props)

    return (
        <div className={shared.wrapper}>
            <h1 className={shared.title}>
                {props.title}
            </h1>
            <canvas ref={ref} width={width - 30} height={height - 30}/>
        </div>
    )
}
LineChart.propTypes = {
    value: PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    }),
    axis: PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    }),

    data: PropTypes.arrayOf(PropTypes.object),
    width: PropTypes.number,
    height: PropTypes.number,
    title: PropTypes.string,
    legends: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    })),

    color: PropTypes.string
}
