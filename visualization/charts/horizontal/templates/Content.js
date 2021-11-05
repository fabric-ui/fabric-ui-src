import PropTypes from 'prop-types'
import {useEffect, useState} from "react";
import Row from "./Row";
import LazyLoader from "../../../../misc/lazy_loader/LazyLoader";

export default function Content(props) {
    const random_hex_color_code = () => {
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        return '#' + n.slice(0, 6);
    };
    const [color, setColor] = useState()
    useEffect(() => {
        setColor(random_hex_color_code())
    }, [])

    return (
        <LazyLoader dimensions={props.height} scrollableRef={props.scrollableRef} dataLength={props.data.length} scrollOrientation={'vertical'}>
            {canRenderUntil =>
                props.data.map((e, i) => (
                    e[props.value.field] !== undefined && canRenderUntil !== undefined && i <= canRenderUntil ?
                        <g key={i + '-row-content'}>
                            <Row
                                biggest={props.biggest} axisContent={e[props.axis.field]}
                                value={parseInt(e[props.value.field])} color={color}
                                axis={props.axis.label}
                                index={i} valueLabel={props.value.label}
                                offset={(props.width) * .07}
                                width={props.width - (props.width) * .13}
                            />
                        </g>
                        :
                        null
                ))
            }
        </LazyLoader>
    )
}
Content.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    value: PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    }),
    axis: PropTypes.shape({
        label: PropTypes.string,
        field: PropTypes.string
    }),
    biggest: PropTypes.number,
    scrollableRef: PropTypes.object
}
