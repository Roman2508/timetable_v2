import React from "react"
import "./TimetablePage.css"

const Calendar = () => {
  return (
    <div className="calendar">
      <div className="header">
        <div className="header-left">
          <button className="current">Сьогодні</button>
          <button className="prev">Попередній тиждень</button>
          <button className="next">Наступний тиждень</button>
        </div>

        <div className="header-right">17 листопада - 24 листопада</div>
      </div>

      <div className="body">
        <div className="lessons-numbers">
          <div className="empty-cell"></div>
          {[1, 2, 3, 4, 5, 6, 7].map((el) => (
            <div className="time-number">{el}</div>
          ))}
        </div>

        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((day) => (
          <div className="day">
            <div className="day-name">{day}</div>

            {[1, 2, 3, 4, 5, 6, 7].map((el) => (
              <div className="time-slot">lesson {el}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
