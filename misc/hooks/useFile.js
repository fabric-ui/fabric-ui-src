import React, {useEffect, useState} from 'react'

export default function useFile(pathname, asJson){
    const [data, setData] = useState()
    useEffect(() => {
        fetch(pathname).then(res => {
            if(!asJson)
                res.text().then(text => {
                    setData(text)
                }).catch(e =>{})
            else
                res.json().then(json => {

                    setData(json)
                }).catch(e => {})
        }).catch(e => {})
    }, [pathname])

    return data
}
