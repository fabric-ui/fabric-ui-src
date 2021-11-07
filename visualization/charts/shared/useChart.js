import {useContext, useEffect, useMemo, useRef, useState} from "react";
import PropTypes from "prop-types";
import ThemeContext from "../../../misc/theme/ThemeContext";

export default function useChart(props) {
    const theme = useContext(ThemeContext)

    const ref = useRef()
    const [points, setPoints] = useState([])
    const [context, setContext] = useState()

    const biggest = useMemo(() => {
        const values = props.data.map(e => e[props.valueKey])
        return Math.max(...values)
    }, [props.data])

    const total = useMemo(() => {
        return props.data.reduce((total, el) => {
            return total + el[props.valueKey]
        }, 0)
    }, [props.data])

    const randomColor = () => {
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        return '#' + n.slice(0, 6);
    };

    const handleMouseMove = (event) => {
        if (context) {
            // let mouseX = event.clientX - ref.current.offsetLeft
            // let mouseY = event.clientY - ref.current.offsetTop
            // let hit = false;
            //
            // points.forEach((e, index) => {
            //     let dx = mouseX - e.x;
            //     let dy = mouseY - e.y;
            //     if ((dx * dx + dy * dy) < ref.current.width / 2) {
            //         context?.fillRect(e.x, e.y, 100, 20);
            //
            //         context.fillStyle = 'white'
            //         context?.fillRect(e.x, e.y, 100, 20)
            //
            //         context.strokeStyle = '#e0e0e0'
            //         context?.strokeRect(e.x, e.y, 100, 20)
            //
            //         context?.fillText(e.value, 5, 15);
            //         hit = true;
            //     }
            // })

            // if (!hit)
            // props.render(context)
        }
    }

    useEffect(() => {

        const ctx = ref.current?.getContext('2d')
        setContext(ctx)
        ctx.fillStyle = theme.themes.mfc_color_primary
        ctx.font = "600 14px Roboto";
    }, [])

    useEffect(() => {
        props.render(context)
        ref.current?.addEventListener('mousemove', handleMouseMove)
        return () => {
            ref.current?.removeEventListener('mousemove', handleMouseMove)
        }
    }, [props.data, context])

    return {
        biggest,
        total,
        randomColor,
        points,
        setPoints,
        ref,
        theme
    }
}

useChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    valueKey: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired
}