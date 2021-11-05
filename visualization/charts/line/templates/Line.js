
import styles from "../styles/LineChart.module.css";
import PropTypes from 'prop-types'
import ToolTip from "../../../../feedback/tooltip/ToolTip";

export default function Line(props) {

    return (
        <g fill={'red'}>
            {props.last !== undefined ?
                <polyline
                    points={`${props.last.x}, ${props.last.y} ${props.point.x},${props.point.y}`}
                    fillRule={'nonzero'}
                    stroke={'#0095ff'} strokeWidth={2}/>
                // <path strokeDasharray={'1,1'}
                //       d={`m${props.point.x},${props.point.y} C${props.point.x },${props.last.y > props.point.y ? props.last.y / 2 : props.point.y / 2} ${props.point.x * 1.5},${props.last.y > props.point.y ? props.last.y / 2 : props.point.y / 2} ${props.last.x},${props.last.y}`}
                //       stroke={'#0095ff'} strokeWidth={2}/>
                :
                null}
            <defs>
                <marker
                    id={props.id}
                    x={6}
                    stroke={'#555555'}
                    strokeWidth={.3}
                    markerWidth={'12'} markerHeight={'12'}
                    overflow={'visible'}
                >
                    <text className={styles.labels} style={{fontSize: '10px'}} y={12}
                          x={props.index === 0 ? '5' : undefined} textAnchor={props.index === 0 ? 'start' : 'middle'}>
                        {props.point.axis}
                    </text>
                </marker>
            </defs>

            <line
                x1={props.point.x} x2={props.point.x}
                y1={0} y2={'100%'}
                stroke={props.index === 0 ? 'transparent' : '#e0e0e0'} strokeWidth={1}
                markerEnd={`url(#${props.id})`}
            />

            <g>
                <circle fill={'#0095ff'} cx={props.point.x} cy={props.point.y} r={4}
                        stroke={'transparent'} strokeWidth={'15'}/>
                <ToolTip justify={'end'} align={'middle'}>
                    {props.point.value}
                </ToolTip>
            </g>
        </g>
    )
}

Line.propTypes = {
    id: PropTypes.string,
    last: PropTypes.object,
    axis: PropTypes.object,
    dimensions: PropTypes.object,
    value: PropTypes.object,
    point: PropTypes.object,
    data: PropTypes.object
}
