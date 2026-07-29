import { useRef, useState } from 'react'
import s from './DatePicker.module.css'
import { ChevronLeftIcon, mapDateToLocalString, useClickOutside } from '../../..'
import { getDaysAmount } from '../lib/getDaysAmount'
import { getMonthTranslation } from '../lib/getMonthTranslation'
import { WEEKDAYS } from '../config/weekdays'

interface DatePickerProps {
  onChange?: (date: Date | null) => void
  position?: 'left' | 'center' | 'right'
}

export function DatePicker({ onChange, position = 'center' }: DatePickerProps) {
  const [isPickerVisible, setIsPickerVisible] = useState(false)

  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [month, setMonth] = useState<number>(new Date().getMonth())
  const [date, setDate] = useState<Date | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  useClickOutside(containerRef, () => setIsPickerVisible(false))

  const shiftMonth = (delta: number) => {
    const d = new Date(year, month + delta, 1)
    setMonth(d.getMonth())
    setYear(d.getFullYear())
  }

  const changeDate = (day: number) => {
    if (isActive(day)) setDate(null)
    else setDate(new Date(year, month, day))

    setIsPickerVisible(false)
    onChange?.(date)
  }

  const isActive = (day: number) => {
    if (!date) return false
    return day === date.getDate() && month === date.getMonth() && year === date.getFullYear()
  }

  const days = Array.from({ length: getDaysAmount(year, month) }, (_, i) => (i + 1).toString().padStart(2, '0'))
  return (
    <div className={s.container} ref={containerRef}>
      <p className={`${s.date} ${date ? '' : s.placeholder}`} onClick={() => setIsPickerVisible(v => !v)}>
        {date ? mapDateToLocalString(date) : 'Выберите дату'}
      </p>
      {isPickerVisible && (
        <div className={`${s.picker} ${s[position]}`}>
          <div className={s.header}>
            <ChevronLeftIcon className={s.chevron} onClick={() => shiftMonth(-1)} />
            <h6 className={s.title}>
              {getMonthTranslation(month)} {year}
            </h6>
            <ChevronLeftIcon className={s.chevron} onClick={() => shiftMonth(+1)} />
          </div>
          <div className={s.calendar}>
            <ul className={s.weekDays}>
              {WEEKDAYS.map((day, i) => (
                <li className={s.weekDay} key={i}>
                  {day}
                </li>
              ))}
            </ul>
            <ul className={s.grid}>
              {days.map((day, i) => (
                <li className={`${s.gridDay} ${isActive(Number(day)) ? s.active : ''}`} key={i} onClick={() => changeDate(Number(day))}>
                  {day}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
