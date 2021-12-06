import React, {useState} from "react";

export default function useHeader(dispatch, actions) {
    const [open, setOpen] = useState(false)

    const getType = (object) => {
        let label = 'é'
        if (object.greater_than === true)
            label = 'maior que'
        if (object.less_than === true)
            label = 'menor que'
        if (object.equal_to === true)
            label = 'igual a'
        if (object.contains === true)
            label = 'contém'
        if (object.different_from === true)
            label = 'diferente de'
        return label
    }
    const parseDate = (val) => {
        const date = new Date(val)
        return `${date.getDay()}-${date.getMonth() + 1}-${date.getFullYear()}`
    }

    return {getType, parseDate, open, setOpen}
}