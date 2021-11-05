import PropTypes from 'prop-types'
import styles from './styles/LineChart.module.css'
import {useEffect, useRef, useState} from "react";
import {TimelineRounded} from "@material-ui/icons";
import GetPoints from "./templates/getPoints";
import Line from "./templates/Line";

export default function LineChart(props) {

    const [points, setPoints] = useState([])
    const offset = 26
    const [columnWidth, setColumnWidth] = useState(50)
    const chartRef = useRef()


    const [dimensions, setDimensions] = useState({
        width: undefined,
        height: undefined
    })
    const [biggest, setBiggest] = useState(null)
    useEffect(() => {
        if (props.value && props.axis && props.value.field && props.axis.field) {
            let {b, s} = {}
            props.data.forEach((e) => {
                if (b === undefined && s === undefined) {
                    b = parseInt(e[props.value.field])
                    s = parseInt(e[props.value.field])
                }
                if (parseInt(e[props.value.field]) > b)
                    b = parseInt(e[props.value.field])

                if (parseInt(e[props.value.field]) < s)
                    s = parseInt(e[props.value.field])
            })


            setBiggest(b)


            setPoints(GetPoints({
                valueKey: props.value.field,
                data: props.data,
                width: props.width,
                offset: offset,
                axisKey: props.axis.field,
                biggest: b,
                height: props.height,
                smallest: s,
                columnWidth: columnWidth,
                noScroll: ((props.width - offset) / props.data.length) + props.data.length - 1 <= props.width
            }))

            setDimensions({
                width: props.width - 40,
                height: props.height - 40
            })
        }

        setColumnWidth((.1 * dimensions.width))
    }, [props.data, props.value, props.axis])

    return (
        <div>
            {props.value === undefined || props.axis === undefined || !props.value.field || !props.axis.field ?
                <TimelineRounded
                    style={{
                        transform: 'translate(-50%, -50%)',
                        top: '50%',
                        left: '50%',
                        fontSize: (props.height > props.width ? (props.height) / 2 : props.width / 2) + 'px',
                        color: props.color ? props.color : '#0095ff',
                        position: "absolute"
                    }}
                />
                :
                <>
                    <div className={styles.header}>
                        Cafe
                    </div>
                    <div style={{display: 'flex', height: dimensions.height, width: '100%'}}>

                        <div className={styles.axisLabel}
                             style={{width: '40px', padding: '12px 0px 12px 0'}}>
                            <svg
                                overflow={'visible'}

                                width={'100%'}
                                height={'100%'}
                            >
                                <g>
                                    <line x1={'100%'} x2={props.width} y2={'0'} y1={'0'}
                                          stroke={'#e0e0e0'} strokeWidth={1}/>
                                    <text x={10} y={5} fill={'#555555'} style={{fontSize: '10px'}}>
                                        {biggest}
                                    </text>
                                </g>
                                <g>
                                    <line x1={'100%'} x2={props.width}
                                          y2={(dimensions.height - 32) / 2}
                                          y1={(dimensions.height - 32) / 2}
                                          stroke={'#e0e0e0'} strokeWidth={1}/>
                                    <text y={(dimensions.height - 22) / 2} fill={'#555555'}  x={10}
                                          style={{fontSize: '10px'}}>
                                        {biggest / 2}
                                    </text>
                                </g>
                                <g>
                                    <line x1={'100%'} x2={props.width}
                                          y2={dimensions.height - 24}
                                          y1={dimensions.height - 24}
                                          stroke={'#e0e0e0'} strokeWidth={1}/>
                                    <text x={10} y={'100%'} fill={'#555555'} style={{fontSize: '.7rem'}}>
                                        {0}
                                    </text>
                                </g>
                            </svg>
                        </div>
                        <div ref={chartRef} style={{
                            width: dimensions.width,
                            height: dimensions.height,
                            overflow: 'hidden',
                            padding: '12px 4px 12px 0',
                        }}>
                            <svg
                                overflow={'visible'}
                                width={columnWidth * (props.data.length - 1) + 8}
                                height={'100%'}
                            >
                                {points.map((p, i) => (
                                    <g key={props.id + '-point-' + i}>
                                        <Line
                                            value={props.value} axis={props.axis}
                                            dimensions={dimensions} last={i > 0 ? points[i - 1] : undefined}
                                            point={p} data={props.data[i]} index={i}
                                            id={props.id + '-marker-' + i}
                                        />
                                    </g>
                                ))}
                            </svg>
                        </div>

                    </div>
                    <div
                        onScroll={e => {
                            const labels = document.getElementById(props.id + '-labels')
                            chartRef.current.scrollLeft = e.target.scrollLeft
                        }}
                        style={{
                            width: dimensions.width + 'px',
                            // scrollBehavior: 'smooth',
                            marginLeft: 'auto',
                            height: '10px',
                            overflowX: 'auto',
                            padding: '0px 4px 0 0',
                            // overflowY: 'visible',
                        }}>
                        <svg
                            width={columnWidth * (props.data.length - 1) + 8}
                            height={'100%'}
                        />
                    </div>
                </>
            }
        </div>
    )
}
LineChart.propTypes = {
    id: PropTypes.string,
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
    setTitle: PropTypes.func,
    legends: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    })),
    color: PropTypes.string
}
