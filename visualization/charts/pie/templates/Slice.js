import styles from "../styles/PieChart.module.css";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import ToolTip from "../../../../feedback/tooltip/ToolTip";

export default function Slice(props) {
    const percentage = (props.current[props.valueKey] / props.sum) * 100
    const [color, setColor] = useState()

    const [offset, setOffset] = useState(0)
    const random_hex_color_code = () => {
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        return '#' + n.slice(0, 6);
    };
    useEffect(() => {
        let s = 0
        for(let i = 0; i < props.index; i++){
            s = s + (props.data[i][props.valueKey]/props.sum) * 100
        }
        setOffset(s)

        setColor(random_hex_color_code())
    }, [])


    return (
        <g style={{display: percentage > 0 ? undefined : 'none'}}>
            <circle r={'25%'} cx={'50%'}
                    cy={'50%'}
                    strokeWidth={'50%'}
                    stroke={color}
                    strokeDasharray={`${percentage * props.circumference / 100} ${props.circumference}`}
                    strokeDashoffset={props.index > 0 ? (offset * props.circumference / 100)   : undefined}
                    // transform={'rotate(-90deg) translate(-50%)'}
            />
            <ToolTip color={'#f4f5fa'}>
                <div className={styles.overview}>
                    <div className={styles.toolTipAxis}>
                        TOTAL: {props.sum}
                    </div>
                    <div className={styles.toolTipAxis}>
                        VALUE: {percentage * props.sum/100}
                    </div>
                    <div className={styles.toolTipAxis}>
                        Percent: {percentage}
                    </div>
                    <div className={styles.toolTipAxis}>
                        {props.axisLabel}: {props.current[props.axisKey]}
                    </div>
                    <div className={styles.toolTipValue}>
                        {props.valueLabel}: {props.current[props.valueKey]}
                    </div>
                    <div className={styles.toolTipValue}>
                        Color: {color}
                    </div>
                </div>
            </ToolTip>
        </g>
    )
}

Slice.propTypes = {
    data: PropTypes.array,
    current: PropTypes.object,
    last: PropTypes.object,
    index: PropTypes.number,
    valueKey: PropTypes.string,
    axisKey: PropTypes.string,
    axisLabel: PropTypes.string,
    valueLabel: PropTypes.string,
    sum: PropTypes.number,
    circumference: PropTypes.number
}

