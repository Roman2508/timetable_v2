import React, { Dispatch, SetStateAction } from "react"
import cn from "classnames"
import { Dayjs } from "dayjs"

import { customDayjs } from "../Calendar/Calendar"
import { WeekType } from "../../utils/getCalendarWeek"
import { ISelectedLesson } from "../../pages/Timetable/TimetablePage"
import { getLastnameAndInitials } from "../../utils/getLastnameAndInitials"
import { ScheduleLessonType } from "../../store/scheduleLessons/scheduleLessonsTypes"
import { useAppDispatch } from "../../store/store"
import { getAuditoryOverlay } from "../../store/scheduleLessons/scheduleLessonsAsyncActions"

const dayNames = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"]

const colors = {
  ["ЛК"]: "rgb(232, 255, 82)",
  ["ПЗ"]: "rgb(24, 176, 71)",
  ["ЛАБ"]: "rgb(43, 163, 185)",
  ["СЕМ"]: "rgb(82, 27, 172)",
  ["ЕКЗ"]: "rgb(176, 24, 24)",
}

interface ICalendarDayProps {
  index: number
  day: WeekType
  selectedLesson: ISelectedLesson | null
  teacherLessons: ScheduleLessonType[] | null
  scheduleLessons: ScheduleLessonType[] | null
  setIsAddNewLesson: Dispatch<SetStateAction<boolean>>
  onTimeSlotClick: (data: Dayjs, lessonNumber: number) => void
  onEditLesson: (lesson: ScheduleLessonType, data: Dayjs, lessonNumber: number) => void
}

const CalendarDay: React.FC<ICalendarDayProps> = ({
  day,
  index,
  onEditLesson,
  selectedLesson,
  teacherLessons,
  scheduleLessons,
  onTimeSlotClick,
  setIsAddNewLesson,
}) => {
  const dispatch = useAppDispatch()

  const onGetAuditoryOverlay = (_date: Dayjs, lessonNumber: number) => {
    const date = customDayjs(_date).format("YYYY.MM.DD")

    dispatch(getAuditoryOverlay({ date, lessonNumber }))
  }

  return (
    <div className="day">
      <div className="day-name" style={{ userSelect: "none" }}>
        {dayNames[index]} {day.start}
      </div>

      {[1, 2, 3, 4, 5, 6, 7].map((lessonNumber) => {
        const lesson = scheduleLessons?.find((el) => {
          const lessonDate = customDayjs(el.date).format("DD.MM")
          return lessonDate === day.start && el.lessonNumber === lessonNumber
        })

        // Накладки
        const overlay = teacherLessons?.find((el) => {
          const lessonDate = customDayjs(el.date).format("DD.MM")
          return lessonDate === day.start && el.lessonNumber === lessonNumber
        })

        const teacherName = lesson ? getLastnameAndInitials(lesson.teacher) : ""
        const overlayTeacherName = overlay ? getLastnameAndInitials(overlay.teacher) : ""

        const isSame =
          selectedLesson?.group?.id !== undefined &&
          selectedLesson?.group?.id === lesson?.group?.id &&
          selectedLesson?.typeRu === lesson?.typeRu &&
          selectedLesson?.subgroupNumber === lesson?.subgroupNumber &&
          selectedLesson?.stream?.id === lesson?.stream?.id &&
          selectedLesson?.name === lesson?.name

        return (
          <React.Fragment key={`${day.start}-${lessonNumber}`}>
            {/* Виставлений елемент розкладу */}
            {lesson && (
              <div
                className={cn("time-slot", { selected: isSame })}
                onClick={() => {
                  onEditLesson(lesson, day.data, lessonNumber)
                  onGetAuditoryOverlay(day.data, lessonNumber)
                }}
                style={lesson ? { backgroundColor: colors[lesson.typeRu] } : {}}
              >
                {lesson && `${lesson.name} (${lesson.typeRu})`}
                <br />
                {lesson && teacherName}
                <br />
                {lesson && lesson.auditory.name}
              </div>
            )}

            {/* Накладки викладача */}
            {!lesson && overlay && (
              <div className={"time-slot"} style={{ color: "red", cursor: "default" }}>
                {`${overlay.name} (${overlay.typeRu})`}
                <br />
                {overlay.group.name}
                <br />
                {overlayTeacherName}
                <br />
                {overlay.auditory.name}
              </div>
            )}

            {/* Пустий слот */}
            {!lesson && !overlay && (
              <div
                className={"time-slot"}
                onClick={() => {
                  setIsAddNewLesson(true)
                  onTimeSlotClick(day.data, lessonNumber)
                  onGetAuditoryOverlay(day.data, lessonNumber)
                }}
              ></div>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default CalendarDay
