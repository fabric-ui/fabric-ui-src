import React, {useMemo} from 'react'
import {addHours} from "../../../inputs/date/misc/useDate";
import useLocale from "../../../misc/hooks/useLocale";

export default function useField(field, entity) {
    const translate = useLocale()
    return useMemo(() => {
        if (entity && entity[field.key] !== undefined && entity[field.key] !== null && ((field.type === 'object' && entity[field.key][field.subfieldKey]) || field.type !== 'object'))
            switch (field.type) {
                case 'string':
                    return (field.maskStart ? field.maskStart : '') + entity[field.key] + (field.maskEnd ? field.maskEnd : '')
                case 'number': {
                    let parts = entity[field.key].toString().split(".")
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")

                    return (field.maskStart ? field.maskStart : '') + (parts.join(".")) + (field.maskEnd ? field.maskEnd : '')
                }
                case 'bool':
                    return (field.maskStart ? field.maskStart : '') + (entity[field.key] ? 'Sim' : 'Não') + (field.maskEnd ? field.maskEnd : '')
                case 'date': {
                    let dateObj = new Date(entity[field.key])
                    if(field.hoursOffset !== undefined)
                        dateObj = addHours(field.hoursOffset, dateObj)
                    return (field.maskStart ? field.maskStart : '') + dateObj.toLocaleDateString() +(field.maskEnd ? field.maskEnd : '')
                }
                default:
                    return entity[field.key]
            }
        else
            return translate('empty')
    }, [field, entity])
}
