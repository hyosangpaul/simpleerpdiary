import React, { useState, useEffect } from 'react'

interface CalendarDay {
  date: number
  isCurrentMonth: boolean
  isToday: boolean
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [days, setDays] = useState<CalendarDay[]>([])

  useEffect(() => {
    generateCalendar()
  }, [currentDate])

  const generateCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const today = new Date()
    const calendarDays: CalendarDay[] = []

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)

      const isCurrentMonth = date.getMonth() === month
      const isToday = 
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()

      calendarDays.push({
        date: date.getDate(),
        isCurrentMonth,
        isToday
      })
    }

    setDays(calendarDays)
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const monthYear = currentDate.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long'
  })

  const monthNames = ['연', '월', '화', '수', '목', '금', '토']

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={previousMonth} className="nav-btn">◀</button>
        <h2>{monthYear}</h2>
        <button onClick={nextMonth} className="nav-btn">▶</button>
      </div>

      <table className="calendar-table">
        <thead>
          <tr>
            {monthNames.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, weekIdx) => (
            <tr key={weekIdx}>
              {days.slice(weekIdx * 7, weekIdx * 7 + 7).map((day, dayIdx) => (
                <td
                  key={dayIdx}
                  className={`calendar-day ${!day.isCurrentMonth ? 'other-month' : ''} ${
                    day.isToday ? 'today' : ''
                  }`}
                >
                  {day.date}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Calendar
