import cn from 'classnames'
import { Dayjs } from 'dayjs'
import React, { Dispatch, SetStateAction } from 'react'

import { customDayjs } from '../Calendar/Calendar'
import { useAppDispatch } from '../../store/store'
import { WeekType } from '../../utils/getCalendarWeek'
import { SettingsType } from '../../store/settings/settingsTypes'
import { ISelectedLesson } from '../../pages/Timetable/TimetablePage'
import { getLastnameAndInitials } from '../../utils/getLastnameAndInitials'
import { ScheduleLessonType } from '../../store/scheduleLessons/scheduleLessonsTypes'
import { getAuditoryOverlay } from '../../store/scheduleLessons/scheduleLessonsAsyncActions'

const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']

export const colors = {
  ['ЛК']: 'rgb(232, 255, 82)',
  ['ПЗ']: 'rgb(24, 176, 71)',
  ['ЛАБ']: 'rgb(43, 163, 185)',
  ['СЕМ']: 'rgb(82, 27, 172)',
  ['ЕКЗ']: 'rgb(176, 24, 24)',
}

interface ICalendarDayProps {
  index: number
  day: WeekType
  selectedSemester: 1 | 2
  settings: SettingsType | null
  isPossibleToCreateLessons: boolean
  selectedLesson: ISelectedLesson | null
  groupOverlay: ScheduleLessonType[] | null
  teacherLessons: ScheduleLessonType[] | null
  scheduleLessons: ScheduleLessonType[] | null
  setIsAddNewLesson: Dispatch<SetStateAction<boolean>>
  onTimeSlotClick: (data: Dayjs, lessonNumber: number) => void
  setSeveralLessonsList: Dispatch<SetStateAction<ScheduleLessonType[]>>
  handleOpenSeveralLessonModal: (
    scheduledElement: ScheduleLessonType,
    date: Dayjs,
    lessonNumber: number,
    auditoryId: number | null
  ) => void
}

const CalendarDay: React.FC<ICalendarDayProps> = ({
  day,
  index,
  settings,
  groupOverlay,
  selectedLesson,
  teacherLessons,
  scheduleLessons,
  onTimeSlotClick,
  selectedSemester,
  setIsAddNewLesson,
  setSeveralLessonsList,
  isPossibleToCreateLessons,
  handleOpenSeveralLessonModal,
}) => {
  const dispatch = useAppDispatch()

  // if true day is outside the semester
  const [isDayOutsideTheSemester, setIsDayOutsideTheSemester] = React.useState(false)

  const onGetAuditoryOverlay = (_date: Dayjs, lessonNumber: number, auditoryId: number) => {
    const date = customDayjs(_date).format('YYYY.MM.DD')
    dispatch(getAuditoryOverlay({ date, lessonNumber, auditoryId }))
  }

  const checkIsAvailable = () => {
    // if return true day is outside the semester
    if (!settings) return false

    const semesterStart =
      settings && selectedSemester === 1 ? settings.firstSemesterStart : settings.secondSemesterStart
    const semesterEnd = settings && selectedSemester === 1 ? settings.firstSemesterEnd : settings.secondSemesterEnd

    const isDayBeforeStartOfSemester = customDayjs(day.data).isBefore(semesterStart)
    const isDayAfterEndOfSemester = customDayjs(day.data).isAfter(semesterEnd)

    if (isDayBeforeStartOfSemester || isDayAfterEndOfSemester) return true
    else return false
  }

  React.useEffect(() => {
    setIsDayOutsideTheSemester(checkIsAvailable())
  }, [selectedSemester])

  return (
    <div className="day">
      <div className="day-name" style={{ userSelect: 'none' }}>
        {dayNames[index]} {day.start}
      </div>

      {[1, 2, 3, 4, 5, 6, 7].map((lessonNumber) => {
        const lesson = scheduleLessons?.filter((el) => {
          const lessonDate = customDayjs(el.date).format('DD.MM')
          return lessonDate === day.start && el.lessonNumber === lessonNumber
        })

        // Накладки викладача
        const overlayTeacher = teacherLessons?.find((el) => {
          const lessonDate = customDayjs(el.date).format('DD.MM')
          return lessonDate === day.start && el.lessonNumber === lessonNumber
        })

        // Накладки групи (якщо вона об'єднана в потік)
        const overlayGroup = groupOverlay?.find((el) => {
          const lessonDate = customDayjs(el.date).format('DD.MM')
          return lessonDate === day.start && el.lessonNumber === lessonNumber
        })

        const overlay = overlayGroup ? overlayGroup : overlayTeacher

        const overlayTeacherName = overlay ? getLastnameAndInitials(overlay.teacher) : ''

        return (
          <React.Fragment key={`${day.start}-${lessonNumber}`}>
            {/* Виставлений елемент розкладу */}
            {!!lesson?.length && (
              <div
                className={'time-slot'}
                style={lesson && lesson[0] ? { backgroundColor: colors[lesson[0].typeRu] } : {}}
              >
                {!!lesson.length &&
                  lesson.map((l) => {
                    const teacherName = lesson && lesson[0] ? getLastnameAndInitials(l.teacher) : ''

                    const severalLessonsClassName =
                      lesson.length === 1
                        ? 'lesson-1'
                        : lesson.length === 2
                        ? 'lesson-2'
                        : lesson.length === 3
                        ? 'lesson-3'
                        : 'lesson-4'

                    const isSame =
                      selectedLesson?.group?.id !== undefined &&
                      lesson !== undefined &&
                      selectedLesson?.group?.id === l.group?.id &&
                      selectedLesson?.typeRu === l.typeRu &&
                      selectedLesson?.subgroupNumber === l.subgroupNumber &&
                      selectedLesson?.stream?.id === l.stream?.id &&
                      selectedLesson?.name === l.name

                    return (
                      <div
                        key={l.id}
                        onClick={() => {
                          setSeveralLessonsList(lesson)
                          handleOpenSeveralLessonModal(l, day.data, lessonNumber, l.auditory ? l.auditory.id : null)
                        }}
                        className={cn(severalLessonsClassName, { selected: isSame })}
                        style={{ backgroundColor: colors[l.typeRu] }}
                      >
                        <p className="time-slot-lesson-name">{l.name}</p>

                        <p>
                          {`(${l.typeRu}) 
                          ${l.subgroupNumber ? ` підгр.${l.subgroupNumber}` : ''} 
                          ${l.stream ? ` Потік ${l.stream.name} ` : ''}`}
                          {l.specialization ? `${l.specialization} спец.` : ''}
                        </p>

                        <p>{teacherName}</p>
                        <p>{l.auditory ? `${l.auditory.name} ауд.` : 'Дистанційно'}</p>
                      </div>
                    )
                  })}
              </div>
            )}

            {/* Накладки викладача або групи */}
            {!lesson?.length && overlay && (
              <div className={'time-slot'} style={{ color: 'red', cursor: 'default', padding: '2px 4px' }}>
                {overlay && (
                  <>
                    <p className="time-slot-lesson-name">{overlay.name}</p>
                    {overlayGroup && <p>Група {overlay.group.name}</p>}

                    <p>
                      {`(${overlay.typeRu}) 
                      ${overlay.subgroupNumber ? ` підгр.${overlay.subgroupNumber}` : ''} 
                      ${overlay.stream ? ` Потік ${overlay.stream.name} ` : ''}`}
                      {overlay.specialization ? `${overlay.specialization} спец.` : ''}
                    </p>

                    <p>{overlayTeacherName}</p>
                    <p>{overlay.auditory ? `${overlay.auditory.name} ауд.` : 'Дистанційно'}</p>
                  </>
                )}
              </div>
            )}

            {/* Пустий слот */}
            {!lesson?.length && !overlay && (
              <div
                style={isDayOutsideTheSemester ? { background: '#ededed', cursor: 'default' } : {}}
                className={'time-slot'}
                onClick={() => {
                  // check is day outside a semester dates range
                  if (!isDayOutsideTheSemester) {
                    // Чи план !== факт
                    if (!isPossibleToCreateLessons) {
                      return alert('Вже виставлено всі ел. розкладу')
                    }

                    setIsAddNewLesson(true)
                    onTimeSlotClick(day.data, lessonNumber)
                    onGetAuditoryOverlay(day.data, lessonNumber, 0)
                  }
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
