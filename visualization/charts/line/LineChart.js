import PropTypes from 'prop-types'
import {useContext, useEffect, useMemo, useRef, useState} from "react";
import useChart from "../shared/useChart";
import shared from "../shared/Charts.module.css";
import ThemeContext from "../../../misc/theme/ThemeContext";

export default function LineChart(props) {

    let xBefore, yBefore
    const drawBar = ({axis, value, position, context}) => {
        const labelSpacing = ref.current.height * 0.1
        const pVariation = (value * 100) / biggest
        const height = (pVariation * (ref.current.height - labelSpacing)) / 100


        let x, y
        x = ((ref.current.width / (props.data.length - 1)) - 7.5) * position + 15

        y = (ref.current.height - labelSpacing) - height + 10


        setPoints(prevState => {
            return [...prevState, {x: x, y: y}]
        })

        context.strokeStyle = props.color ? props.color : '#0095ff'
        context.fillStyle = props.color ? props.color : '#0095ff'

        context.beginPath();
        context.arc(x, y, 4, 0, 2 * Math.PI);
        context.fill();
        context.stroke();

        if (position > 0) {
            context.beginPath();
            context.moveTo(xBefore, yBefore);
            context.lineTo(x, y);
            context.stroke();
        }

        xBefore = x
        yBefore = y

        context.fillStyle = theme.themes.mfc_color_primary
        context.fillText(axis, x - 8, ref.current.height - 16);
    }

    const render = (context) => {
        if (context) {
            context.clearRect(0, 0, ref.current.width, ref.current.height);
            props.data.forEach((el, index) => {

                drawBar({
                    axis: el[props.axis.field],
                    value: el[props.value.field],
                    context: context,
                    position: index
                })
            })
        }
    }

    const {
        biggest,
        ref,
        setPoints,
        theme
    } = useChart({
        data: props.data,
        valueKey: props.value.field,
        render: render
    })


    return (
        <div className={shared.wrapper}>
            <h1 className={shared.title}>
                {props.title}
            </h1>
            <canvas ref={ref} width={props.width} height={props.height}/>
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
