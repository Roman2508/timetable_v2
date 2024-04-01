import React, { Dispatch, SetStateAction } from 'react'
import { Button } from '@mui/material'

import './TimetablePage.css'
import getCalendarWeek from '../../utils/getCalendarWeek'
import { LessonActionsModal } from './LessonActionsModal'
import { ISelectedLesson } from '../../pages/TimetablePage/TimetablePage'
import { Dayjs } from 'dayjs'
import { SelectAuditory } from './SelectAuditory'
import { useAppDispatch } from '../../store/store'
import { useSelector } from 'react-redux'
import { scheduleLessonsSelector } from '../../store/scheduleLessons/scheduleLessonsSlice'
import { getScheduleLessons } from '../../store/scheduleLessons/scheduleLessonsAsyncActions'
import { customDayjs } from '../Calendar/Calendar'
import { getLastnameAndInitials } from '../../utils/getLastnameAndInitials'

const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']

const colors = {
  ['ЛК']: 'rgb(232, 255, 82)',
  ['ПЗ']: 'rgb(24, 176, 71)',
  ['ЛАБ']: 'rgb(43, 163, 185)',
  ['СЕМ']: 'rgb(82, 27, 172)',
  ['ЕКЗ']: 'rgb(176, 24, 24)',
}

export interface ISelectedTimeSlot {
  data: Dayjs
  lessonNumber: number
}

interface ICalendarProps {
  currentWeekNumber: number
  selectedItemId: number | null
  selectedLesson: ISelectedLesson | null
  scheduleType: 'group' | 'teacher' | 'auditory'
  setCurrentWeekNumber: Dispatch<SetStateAction<number>>
}

const Calendar: React.FC<ICalendarProps> = ({
  scheduleType,
  selectedItemId,
  selectedLesson,
  currentWeekNumber,
  setCurrentWeekNumber,
}) => {
  const dispatch = useAppDispatch()

  const { scheduleLessons } = useSelector(scheduleLessonsSelector)

  const [modalVisible, setModalVisible] = React.useState(false)
  const [auditoryModalVisible, setAuditoryModalVisible] = React.useState(false)
  const [selectedAuditoryId, setSelectedAuditoryId] = React.useState<number | null>(null)
  const [weeksCount, setWeeksCount] = React.useState(getCalendarWeek(currentWeekNumber).length)
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<ISelectedTimeSlot | null>(null)
  const [currentWeekDays, setCurrentWeekDays] = React.useState(getCalendarWeek(currentWeekNumber))

  React.useEffect(() => {
    if (!selectedItemId) return
    dispatch(getScheduleLessons({ id: selectedItemId, semester: 2, type: scheduleType }))
  }, [selectedItemId])

  React.useEffect(() => {
    setCurrentWeekDays(getCalendarWeek(currentWeekNumber))
    // setWeeksCount()
  }, [currentWeekNumber])

  const onTimeSlotClick = (data: Dayjs, lessonNumber: number) => {
    if (!selectedLesson) return alert('Дисципліна не вибрана')
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
            <Button variant="outlined" color="secondary" sx={{ mr: 1, padding: '0px 10px' }}>
              Сьогодні
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              disabled={currentWeekNumber === 1}
              sx={{ mr: 1, padding: '0px 10px' }}
              onClick={() => setCurrentWeekNumber((prev) => prev - 1)}
            >
              Попередній тиждень
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ padding: '0px 10px' }}
              disabled={currentWeekNumber === weeksCount}
              onClick={() => setCurrentWeekNumber((prev) => prev + 1)}
            >
              Наступний тиждень
            </Button>
          </div>

          <div className="header-right" style={{ userSelect: 'none' }}>
            {currentWeekDays[0].start} - {currentWeekDays[6].end}
          </div>
        </div>

        <div className="body">
          <div className="lessons-numbers">
            <div className="empty-cell"></div>
            {[1, 2, 3, 4, 5, 6, 7].map((el) => (
              <div className="time-number" key={el} style={{ userSelect: 'none' }}>
                {el}
              </div>
            ))}
          </div>

          {currentWeekDays?.map((day, index) => (
            <div className="day" key={day.start}>
              <div className="day-name" style={{ userSelect: 'none' }}>
                {dayNames[index]} {day.start}
              </div>

              {[1, 2, 3, 4, 5, 6, 7].map((lessonNumber) => {
                const lesson = scheduleLessons?.find((el) => {
                  const lessonDate = customDayjs(el.date).format('DD.MM')
                  return lessonDate === day.start && el.lessonNumber === lessonNumber
                })
                const teacherName = lesson ? getLastnameAndInitials(lesson.teacher) : ''

                return (
                  <div
                    className="time-slot"
                    key={lessonNumber}
                    onClick={() => onTimeSlotClick(day.data, lessonNumber)}
                    style={lesson ? { backgroundColor: colors[lesson.typeRu] } : {}}
                  >
                    {lesson && `${lesson.name} (${lesson.typeRu}) - ${teacherName}`}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Calendar
