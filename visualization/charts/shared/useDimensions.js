import {useEffect, useRef, useState} from "react";

export default function useDimensions(element){
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    let resizeObs

    const callback = () => {
        setWidth(element.parentNode.offsetWidth)
        setHeight(element.parentNode.offsetHeight)
    }

    useEffect(() => {
        if(element){
            resizeObs = new ResizeObserver(callback)
            resizeObs.observe(element.parentNode)
        }
    }, [element])

    return {width, height}
}