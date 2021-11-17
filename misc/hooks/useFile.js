import {useEffect, useState} from "react";

export default function useFile(pathname, asJson){
    const [data, setData] = useState()
    useEffect(() => {
        fetch(pathname).then(res => {
            if(!asJson)
                res.text().then(text => {
                    setData(text)
                }).catch(e => console.log(e))
            else
                res.json().then(json => {
                    console.log(json)
                    setData(json)
                }).catch(e => console.log(e))
        }).catch(e => console.log(e))
    }, [pathname])

    return data
}