import PropTypes from 'prop-types'
import React, {useMemo, useRef, useState} from 'react'
import styles from './styles/DateField.module.css'
import {ArrowBackIosRounded, CalendarTodayRounded} from "@material-ui/icons";
import Dates from "./misc/Dates";
import FloatingBox from "../floating_box/FloatingBox";
import Button from "../button/Button";
import TextField from "../text/TextField";

export default function DateField(props) {
    const [open, setOpen] = useState()
    const date = useMemo(() => {
        let day, month, year

        if (props.value) {
            const d = props.value.split('/')
            day = d.length >= 1 ? parseInt(d[0]) : undefined
            month = d.length >= 2 ? parseInt(d[1]) : undefined
            year = d.length === 3 ? parseInt(d[2]) : undefined
        }

        return {
            day: day,
            month: month,
            year: year,
            valid: (!day || (day > 0 && day <= 31)) && (!month || (month > 0 && month <= 12))
        }
    }, [props.value])

    const ref = useRef()

    const getDays = (month) => {
        let res = []
        if ((month - 1) < Dates.length) {
            let days = Dates[month - 1].days;
            for (let i = 0; i < days; i++) {
                res.push(
                    <Button
                        styles={{padding: '8px', width: '35px', height: '35px'}}
                        highlight={date.day === (i + 1)}
                        variant={'minimal'}
                        onClick={() => {
                            const currentDate = new Date()
                            const newDay = i + 1

                            setOpen(false)
                            props.handleChange(`${newDay < 10 ? ('0' + newDay) : newDay}/${month < 10 ? ('0' + month) : month}/${!date.year ? currentDate.getFullYear() : date.year}`)
                        }}
                    >
                        {i + 1}
                    </Button>
                )
            }
        }
        return res
    }

    return (
        <div  ref={ref} style={{position: 'relative', width: props.width, height: 'fit-content'}}>
            <TextField
                handleChange={e => props.handleChange(e.target.value)}
                disabled={props.disabled}
                width={'100%'} highlight={open}
                value={props.value}
                size={props.size} colorVariant={date.valid ? 'primary' : 'secondary'}
                placeholder={props.label} label={props.label}
                mask={'99/99/9999'}
                maskEnd={(
                    <Button onClick={() => setOpen(true)}>
                        <CalendarTodayRounded style={{fontSize: '1.2rem'}}/>
                    </Button>
                )} noMargin={true}
                required={props.required}
            />
            <FloatingBox parentNode={ref.current?.parentNode} open={open} setOpen={setOpen} reference={ref.current}>
                <div className={styles.calendar}>
                    <div className={styles.monthContainer}>
                        <button className={styles.buttonContainer} style={{width: 'fit-content', margin: 'unset'}}
                                onClick={() => {
                                    const d = new Date()
                                    const newDay = date.day ? date.day : d.getDate()
                                    const newMonth = (date.month && date.month === 1) || (!date.month && d.getMonth() === 1) ? 12 : (date.month ? date.month : d.getMonth()) - 1
                                    const newYear = newMonth === 12 ? (date.year ? date.year - 1 : d.getFullYear() - 1) : (date.year ? date.year : d.getFullYear())
                                    props.handleChange(`${newDay < 10 ? ('0' + newDay) : newDay}/${newMonth < 10 ? ('0' + newMonth) : newMonth}/${newYear}`)
                                }}>
                            <ArrowBackIosRounded style={{fontSize: '1.2rem'}}/>
                        </button>
                        <div className={styles.currentDate}>
                            <div>
                                {!date.month || date.month > 12 || date.month < 1 ? Dates[(new Date()).getMonth()].month : Dates[date.month - 1].month}
                            </div>
                            -
                            <div>
                                {!date.year ? new Date().getFullYear() : date.year}
                            </div>
                        </div>
                        <button className={styles.buttonContainer} style={{width: 'fit-content', margin: 'unset'}}
                                onClick={() => {
                                    const d = new Date()
                                    const newDay = date.day ? date.day : d.getDate()
                                    const newMonth = (date.month && date.month === 12) || (!date.month && d.getMonth() === 12) ? 1 : (date.month ? date.month : d.getMonth()) + 1
                                    const newYear = newMonth === 1 ? (date.year ? date.year + 1 : d.getFullYear() + 1) : (date.year ? date.year : d.getFullYear())
                                    props.handleChange(`${newDay < 10 ? ('0' + newDay) : newDay}/${newMonth < 10 ? ('0' + newMonth) : newMonth}/${newYear}`)

                                }}>
                            <ArrowBackIosRounded style={{fontSize: '1.2rem', transform: 'rotate(180deg'}}/>
                        </button>
                    </div>

                    <div className={styles.daysContainer}>
                        {getDays(!date.month || date.month > 12 || date.month < 1 ? (new Date()).getMonth() : date.month).map(e => e)}
                    </div>
                </div>

            </FloatingBox>
        </div>
    )
}

DateField.propTypes = {
    width: PropTypes.string,
    label: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'default'])
}
