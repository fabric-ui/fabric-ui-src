import React, {useReducer, useState} from "react";

const actions = {
    UPDATE_SIZE: 0,
    UPDATE_VISIBILITY: 1,
    UPDATE_ORDER: 2
}
const reducer = (state, action) => {
    switch (action.type) {
        case actions.UPDATE_ORDER: {
            return state
        }
        case actions.UPDATE_SIZE: {

            let newValue = [...state]

            const i = newValue.findIndex(e => (action.payload.type === 'object' && e.key === action.payload.key && e.subfieldKey === action.payload.subfieldKey) || (action.payload.type !== 'object' && e.key === action.payload.key))
            newValue[i].additionalWidth = action.payload.size

            return newValue
        }
        case actions.UPDATE_VISIBILITY: {

            let newValue = [...state]

            const i = newValue.findIndex(e => (action.payload.type === 'object' && e.key === action.payload.key && e.subfieldKey === action.payload.subfieldKey) || (action.payload.type !== 'object' && e.key === action.payload.key))

            newValue[i].visible = !newValue[i].visible
            return newValue
        }
        default:
            return state
    }
}

export default function useList(initialKeys) {


    const [keys, keysDispatcher] = useReducer(reducer, initialKeys)
    const [openSettings, setOpenSettings] = useState(false)


    return {keys, keysDispatcher, actions, openSettings, setOpenSettings}
}
