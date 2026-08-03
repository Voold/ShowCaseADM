import { useEffect, useRef, useState } from 'react'
import s from './DatePicker.module.css'
import { ChevronLeftIcon, mapDateToLocalString, useClickOutside } from '../../..'
import { getDaysAmount } from '../lib/getDaysAmount'
import { getMonthTranslation } from '../lib/getMonthTranslation'
import { WEEKDAYS } from '../config/weekdays'
import { getPaddingDays } from '../lib/getPaddingDays'

interface DatePickerProps {
  onChange?: (date: Date | null) => void
  value?: Date | null
  position?: 'left' | 'center' | 'right'
}

export function DatePicker({ onChange, value = null, position = 'center' }: DatePickerProps) {
  const [isPickerVisible, setIsPickerVisible] = useState(false)

  const [viewDate, setViewDate] = useState<Date>(value ?? new Date())

  const containerRef = useRef<HTMLDivElement>(null)
  useClickOutside(containerRef, () => setIsPickerVisible(false))

  useEffect(() => {
    if (value === null) {
      setViewDate(new Date())
    }
  }, [value])

  const shiftMonth = (delta: number) => setViewDate(d => new Date(d.getFullYear(), d.getMonth() + delta, 1))

  const changeDate = (day: number) => {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const newDate = !isActive(new Date(year, month, day)) ? new Date(year, month, day) : null

    setIsPickerVisible(false)
    onChange?.(newDate)
  }

  const isActive = (date: Date) => {
    if (!value) return false
    return date.getDate() === value.getDate() && date.getMonth() === value.getMonth() && date.getFullYear() === value.getFullYear()
  }

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const firstDayOfWeek = getPaddingDays(year, month)
  const paddingDays = Array.from({ length: firstDayOfWeek })

  const totalDays = getDaysAmount(year, month)
  const days = Array.from({ length: totalDays }, (_, i) => i + 1)
  return (
    <div className={s.container} ref={containerRef}>
      <button type='button' className={`${s.date} ${value ? '' : s.placeholder}`} onClick={() => setIsPickerVisible(v => !v)}>
        {value ? mapDateToLocalString(value) : 'Выберите дату'}
      </button>
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
              {WEEKDAYS.map(day => (
                <li className={s.weekDay} key={day}>
                  {day}
                </li>
              ))}
            </ul>
            <ul className={s.grid}>
              {paddingDays.map((_, i) => (
                <li key={`pad-${i}`} className={`${s.gridDay} ${s.empty}`}>
                  -
                </li>
              ))}
              {days.map(day => (
                <li key={day}>
                  <button
                    className={`${s.gridDay} ${isActive(new Date(year, month, day)) ? s.active : ''}`}
                    onClick={() => changeDate(day)}
                  >
                    {day.toString().padStart(2, '0')}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
