import PropTypes from 'prop-types'
import {useContext, useEffect, useMemo, useRef, useState} from "react";
import useChart from "../shared/useChart";
import Bar from "../shared/Bar";
import shared from '../shared/Charts.module.css'
import ThemeContext from "../../../misc/theme/ThemeContext";

export default function HorizontalChart(props) {

    const drawBar = ({axis, value, position, context}) => {
        const length = props.data.length


        const width = (((value * 100) / biggest) * (ref.current.width - ref.current.width * 0.1)) / 100
        const height = (ref.current.height / length)

        const x = ref.current.width * 0.1
        const y = position * height

        const bar = new Bar({
            x: x,
            y: y,
            value: value,
            label: axis,
            color: randomColor(),
            width: width,
            height: height
        })

        bar.draw(context)

        setPoints(prevState => {
            return [...prevState, {x: x, y: y, value: value}]
        })

        context.fillStyle = theme.themes.mfc_color_primary
        context.fillText(axis, 0, y + 7 + height / 2);
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
        randomColor,
        setPoints,
        ref,
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
HorizontalChart.propTypes = {
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
