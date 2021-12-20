import ACTIONS from "./dataActions";

import React from "react";

function makeId() {
    let result = ''
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let charactersLength = characters.length
    for (let i = 0; i < 24; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

export default function dataReducer(currentState, action) {
    switch (action.type) {
        case ACTIONS.EMPTY: {
            return []
        }
        case ACTIONS.PUSH: {
            if (Array.isArray(action.payload)) {
                let data = [...currentState].map(e => e.data)
                let value = [...new Set([...data, ...action.payload])]

                value = value.map(e => {
                    return {id: makeId(), data: e}
                })

                return value
            } else return currentState
        }
        default:
            return currentState
    }
}
