import PropTypes from 'prop-types'
import {useEffect, useRef, useState} from "react";
import {PieChartRounded} from "@material-ui/icons";
import Slice from "./templates/Slice";


export default function PieChart(props) {

    const [sum, setSum] = useState(1)
    const graphRef = useRef()
    const [circumference, setCircumference] = useState()
    const [filteredData, setFilteredData] = useState([])

    const updateCircumference = () => {
        let value
        if (props.height < props.width)
            value = props.height - 40
        else
            value = props.width - 40

        value = value*Math.PI


        setCircumference(value)
    }
    useEffect(() => {

        if (!(props.value === undefined || props.axis === undefined || !props.value.field || !props.axis.field)) {
            let value = 0
            let filtered = []
            props.data.forEach((e) => {
                if (!isNaN(parseInt(e[props.value.field]))) {
                    value = value + parseInt(e[props.value.field])
                    filtered.push({
                        [props.value.field]: parseInt(e[props.value.field]),
                        [props.axis.field]: e[props.axis.field]
                    })
                }
            })
            const compare = (a, b) => {
                let fA = parseInt(a[props.value.field])
                let fB = parseInt(b[props.value.field])
                if (fA < fB)
                    return 1;
                if (fA > fB)
                    return -1;
                return 0;
            }
            filtered.sort(compare);
            setFilteredData(filtered)
            setSum(value)
        }

        updateCircumference()
    }, [props.data, props.value, props.axis])

    return (
        <div>
            {props.value === undefined || props.axis === undefined || !props.value.field || !props.axis.field ?
                <PieChartRounded
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
                <div style={{height: props.height + 'px', overflow: 'hidden'}}>

                    <div style={{overflowY: 'auto', height: (props.height - 20) + 'px'}}>

                        <svg
                            width={props.height < props.width ? props.height - 40 : props.width - 40}
                            height={props.height < props.width ? props.height - 40 : props.width - 40}
                            viewBox={'0 0 100 100'}
                        >
                            {filteredData.map((e, i) => (
                                <Slice index={i} current={e}
                                       valueKey={props.value.field} sum={sum} axisLabel={props.axis.label}
                                       valueLabel={props.value.label} axisKey={props.axis.field}
                                       data={filteredData} circumference={circumference}/>
                            ))}
                        </svg>
                    </div>

                </div>
            }
        </div>
    )
}
PieChart.propTypes = {
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
