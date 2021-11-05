import PropTypes from "prop-types";
import getPercentage from "../../shared/getPercentage";
import React from "react";

export default function GetPoints(props) {

    const height = (props.height - 70)
    let points = []
    let data = [...props.data]
    if (props.smallest < 0) {
        data.forEach(e => {
            e[props.valueKey] = e[props.valueKey] + Math.abs(props.smallest)
        })
    }

    data.forEach((e, i) => {
        let percent = getPercentage(parseInt(e[props.valueKey]), parseInt(props.biggest), height)
        console.log(percent)
        if (!isNaN(percent)) {
            points.push({x: (props.columnWidth * i), y: (height - percent ), value: parseInt(e[props.valueKey]), axis: e[props.axisKey]})
        }
    })

    return points
}

GetPoints.propTypes = {
    axisKey: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
    valueKey: PropTypes.string,
    width: PropTypes.number,
    offset: PropTypes.number,
    biggest: PropTypes.number,
    height: PropTypes.number,
    smallest: PropTypes.number
}

