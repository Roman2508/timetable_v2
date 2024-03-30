import React, { Dispatch, SetStateAction } from "react"
import { Button } from "@mui/material"

import "./TimetablePage.css"
import getCalendarWeek from "../../utils/getCalendarWeek"
import { LessonActionsModal } from "./LessonActionsModal"
import { ISelectedLesson } from "../../pages/TimetablePage/TimetablePage"
import { Dayjs } from "dayjs"
import { SelectAuditory } from "./SelectAuditory"

const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"]

export interface ISelectedTimeSlot {
  data: Dayjs
  lessonNumber: number
}

interface ICalendarProps {
  currentWeekNumber: number
  selectedLesson: ISelectedLesson | null
  setCurrentWeekNumber: Dispatch<SetStateAction<number>>
}

const Calendar: React.FC<ICalendarProps> = ({
  selectedLesson,
  currentWeekNumber,
  setCurrentWeekNumber,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false)
  const [auditoryModalVisible, setAuditoryModalVisible] = React.useState(false)
  const [selectedAuditoryId, setSelectedAuditoryId] = React.useState<number | null>(null)
  const [weeksCount, setWeeksCount] = React.useState(getCalendarWeek(currentWeekNumber).length)
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<ISelectedTimeSlot | null>(null)
  const [currentWeekDays, setCurrentWeekDays] = React.useState(getCalendarWeek(currentWeekNumber))

  React.useEffect(() => {
    setCurrentWeekDays(getCalendarWeek(currentWeekNumber))
    // setWeeksCount()
  }, [currentWeekNumber])

  const onTimeSlotClick = (data: Dayjs, lessonNumber: number) => {
    if (!selectedLesson) return alert("Дисципліна не вибрана")
    setSelectedTimeSlot({ data, lessonNumber })
    setModalVisible(true)
  }

  return (
    <>
      <LessonActionsModal
        open={modalVisible}
        setOpen={setModalVisible}
        selectedLesson={selectedLesson}
        selectedTimeSlot={selectedTimeSlot}
        currentWeekNumber={currentWeekNumber}
        selectedAuditoryId={selectedAuditoryId}
        setAuditoryModalVisible={setAuditoryModalVisible}
      />

      <SelectAuditory
        open={auditoryModalVisible}
        setOpen={setAuditoryModalVisible}
        selectedAuditoryId={selectedAuditoryId}
        setSelectedAuditoryId={setSelectedAuditoryId}
        setLessonActionsModalVisible={setModalVisible}
      />

      <div className="calendar">
        <div className="header">
          <div className="header-left">
            <Button variant="outlined" color="secondary" sx={{ mr: 1, padding: "0px 10px" }}>
              Сьогодні
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              disabled={currentWeekNumber === 1}
              sx={{ mr: 1, padding: "0px 10px" }}
              onClick={() => setCurrentWeekNumber((prev) => prev - 1)}
            >
              Попередній тиждень
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ padding: "0px 10px" }}
              disabled={currentWeekNumber === weeksCount}
              onClick={() => setCurrentWeekNumber((prev) => prev + 1)}
            >
              Наступний тиждень
            </Button>
          </div>

          <div className="header-right" style={{ userSelect: "none" }}>
            {currentWeekDays[0].start} - {currentWeekDays[6].end}
          </div>
        </div>

        <div className="body">
          <div className="lessons-numbers">
            <div className="empty-cell"></div>
            {[1, 2, 3, 4, 5, 6, 7].map((el) => (
              <div className="time-number" key={el} style={{ userSelect: "none" }}>
                {el}
              </div>
            ))}
          </div>

          {currentWeekDays?.map((day, index) => (
            <div className="day" key={day.start}>
              <div className="day-name" style={{ userSelect: "none" }}>
                {dayNames[index]} {day.start}
              </div>

              {[1, 2, 3, 4, 5, 6, 7].map((lessonNumber) => (
                <div
                  className="time-slot"
                  key={lessonNumber}
                  onClick={() => onTimeSlotClick(day.data, lessonNumber)}
                >
                  {/* lesson {el} */}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Calendar
