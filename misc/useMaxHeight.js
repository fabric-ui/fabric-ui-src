import {useEffect, useRef, useState} from "react";

export default function useMaxHeight() {
    const [maxHeight, setMaxHeight] = useState()
    const ref = useRef()

    useEffect(() => {
        const parent = ref.current.parentNode
        const doc = document.body.getBoundingClientRect()
        const bBox = ref.current.getBoundingClientRect()

        const parentBottom = doc.height - (parent.offsetHeight + bBox.top)

        setMaxHeight((doc.height - bBox.top - (parentBottom > 0 ? Math.ceil(parentBottom) : 0)) + 'px')
    })

    return {ref, maxHeight}
}