import useChart from "./useChart";
import {useEffect} from "react";
import PropTypes from "prop-types";
import LineChart from "../line/LineChart";
import useDimensions from "./useDimensions";

const onMouseMove = ({event, points, context, draw}) => {
    let drawn = undefined

    points.forEach((p) => {

        if ((event.x - 4) <= p.x && (event.x + 4) >= p.x && (event.y - 4) <= p.y && (event.y + 4) >= p.y) {
            drawn = true

            draw(context, true)
            context.fillStyle = '#333333'
            const x = (event.width - event.x) <= 100 ? event.x - 100 : event.x
            context.roundRect(x, event.y, 100, 50, 5).fill()

            context.fillStyle = 'white'
            context.fillText(`Axis: ${p.axis}`, x + 6, event.y + 20)
            context.fillText(`Value: ${p.value}`, x + 6, event.y + 40)
        } else if (drawn === undefined)
            drawn = false
    })

    if (drawn === false)
        draw(context, true)
}


export default function useLineChart(props) {
    let xBefore, yBefore

    const drawLine = ({axis, value, position, context}) => {
        const pVariation = (value * 100) / biggest
        const height = ((pVariation * (ref.current.height - labelSpacing * 2 - 4)) / 100)
        let x = ((ref.current.width / (props.data.length - 1)) - (labelSpacing / 9 - .25)) * position + labelSpacing - 4,
            y = (ref.current.height - labelSpacing) - height - 12

        if (points.length === 0)
            setPoints(prevState => {
                return [...prevState, {x: x, y: y, axis: axis, value: value}]
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
            context.setLineDash([3, 3])

            context.lineTo(x, y);
            context.stroke();
        }

        xBefore = x
        yBefore = y
    }

    const drawChart = (ctx, clear) => {
        if (clear)
            clearCanvas()
        drawGrid()
        props.data.forEach((el, index) => {
            drawLine({
                axis: el[props.axis.field],
                value: el[props.value.field],
                context: ctx,
                position: index
            })
        })
    }

    const {
        points,
        setPoints,
        theme,
        biggest,
        ref,
        labelSpacing,
        context,
        drawGrid,
        clearCanvas,
    } = useChart({
        axisKey: props.axis.field,
        data: props.data,
        valueKey: props.value.field,
        onMouseMove: event => onMouseMove({event: event, points: points, context: context, draw: drawChart})
    })

    const {width, height} = useDimensions(ref.current)

    useEffect(() => {

        if (context) {
            context.fillStyle = theme.themes.mfc_color_primary
            context.font = "600 14px Roboto";
            drawChart(context, true)
        }
    }, [props.data, context, width, height, theme])

    useEffect(() => {
        if(points.length > 0)
            setPoints([])

    }, [width, height, props.data])

    return {ref, width, height}
}


useLineChart.propTypes = {
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
