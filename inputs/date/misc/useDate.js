import React, {useEffect, useMemo, useState} from "react";

const NAMES = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
]
export function addHours(h, dateObject) {
    dateObject.setTime(dateObject.getTime() + (h*60*60*1000));
    return dateObject;
}
export default function useDate(value, pattern, hoursOffset) {
    const [parsedDate, setDate] = useState({year: (new Date()).getFullYear()})
    const calendar = useMemo(() => {
        let months = []
        NAMES.forEach((data, i) => {
            let date = new Date(parsedDate.year, i + 1, 0).getDate()
            months.push({
                month: data,
                days: date
            })
        })
        return months
    }, [parsedDate.year])

    const splitDate = (date) => {
        let day, month, year
        let response
        try {
            if (date && typeof (date) === 'string') {
                const d = date.split(pattern.search('/') > -1 ? '/' : '-')
                let indexes = [pattern.indexOf('dd'), pattern.indexOf('mm'),pattern.indexOf('yyyy')]
                indexes.sort(function(a, b) {
                    return a - b;
                })

                day = d.length >= 1 ? parseInt(d[indexes.indexOf(pattern.indexOf('dd'))]) : undefined
                month = d.length >= 2 ? parseInt(d[indexes.indexOf(pattern.indexOf('mm')) ]) : undefined
                year = d.length === 3 ? parseInt(d[indexes.indexOf(pattern.indexOf('yyyy'))]) : (new Date()).getFullYear()
            }
        } finally {
            response = {
                day: day,
                month: month,
                year: year,
                valid: (day === undefined || (day > 0 && day <= 31)) && (month === undefined || (month > 0 && month <= 12))
            }
        }
        return response
    }

    useEffect(() => {
        if (value)
            setDate(splitDate(value))
    }, [value])

    const [initialized, setInitialized] = useState(false)
    const [changed, setChanged] = useState(false)
    const parseDate = (day, month, year) => {
        return pattern.replace('dd', day < 10 ? '0' + day : day).replace('mm', month < 10 ? '0' + month : month).replace('yyyy', year)
    }
    useEffect(() => {
        const timestamp = Date.parse(value);
        let parsed = new Date(value)
        parsed = !isNaN(timestamp) ? `${parsed.getFullYear()}/${parsed.getMonth() + 1}/${parsed.getDate()}` : new Date(parsed.getTime() - parsed.getTimezoneOffset() * 60000).toLocaleDateString()

        const date = `${parsedDate.year}/${parsedDate.month}/${parsedDate.day}`
        if (!isNaN(timestamp) && parsed !== date && !initialized) {
            setInitialized(true)
            let d = new Date(value)
            if(hoursOffset !== undefined)
                d = addHours(hoursOffset, d)

            setDate(splitDate(parseDate(d.getDate(), d.getMonth() + 1, d.getFullYear())))
        }
    }, [value])


    return {calendar, date: parsedDate, initialized, setChanged, changed, parseDate}
}