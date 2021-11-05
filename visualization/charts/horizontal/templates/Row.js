import getPercentage from "../../shared/getPercentage";
import styles from "../styles/Horizontal.module.css";
import PropTypes from "prop-types";
import {useRef} from "react";
import ToolTip from "../../../../feedback/tooltip/ToolTip";

export default function Row(props) {
    const ref = useRef()


    return (
        <g ref={ref}>
            <foreignObject
                style={{fontSize: '13px', width: (props.offset) + 'px', height: '20px'}}
                y={20 * (props.index) + ((props.index + 1) * 20 / 2)}
                x={0} className={styles.labels}>
                <div className={styles.label}>
                    {props.axisContent}
                </div>
            </foreignObject>


            <rect
                x={props.offset}
                width={getPercentage(props.value, props.biggest, props.width)}
                height={20}
                y={20 * (props.index) + ((props.index + 1) * 20 / 2)}
                fill={props.color}
                stroke={props.color}
                strokeWidth={2}
                fillOpacity={props.value / props.biggest}
                markerEnd={ref.current}
            >
                <ToolTip justify={'end'} align={'middle'}>
                    <div className={styles.overview}>
                        {props.value}
                    </div>
                </ToolTip>
            </rect>

        </g>
    )
}

Row.propTypes = {
    width: PropTypes.number,
    index: PropTypes.number,
    axis: PropTypes.object,
    axisContent: PropTypes.string,
    value: PropTypes.number,
    valueLabel: PropTypes.string,
    biggest: PropTypes.number,
    color: PropTypes.string,
    offset: PropTypes.number
}

