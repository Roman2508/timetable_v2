import { Dayjs } from 'dayjs'
import { toast } from 'sonner'
import { Button } from '@mui/material'
import { useSelector } from 'react-redux'
import React, { Dispatch, SetStateAction } from 'react'

import {
  setLastSelectedData,
  scheduleLessonsSelector,
  lastSelectedDataSelector,
} from '../../store/scheduleLessons/scheduleLessonsSlice'
import {
  getTeacherLessons,
  getAuditoryOverlay,
  getScheduleLessons,
  getTeacherOverlay,
} from '../../store/scheduleLessons/scheduleLessonsAsyncActions'
import './TimetablePage.css'
import CalendarDay from './CalendarDay'
import { useAppDispatch } from '../../store/store'
import { customDayjs } from '../Calendar/Calendar'
import getCalendarWeek from '../../utils/getCalendarWeek'
import { LessonActionsModal } from './LessonActionsModal'
import { LoadingStatusTypes } from '../../store/appTypes'
import { SelectTeacherModal } from './SelectTeacherModal'
import { SelectAuditoryModal } from './SelectAuditoryModal'
import { ISelectedLesson } from '../../pages/Timetable/TimetablePage'
import { settingsSelector } from '../../store/settings/settingsSlice'
import { ScheduleLessonType } from '../../store/scheduleLessons/scheduleLessonsTypes'
import { PutSeveralLessonsAtSameTimeModal } from './PutSeveralLessonsAtSameTimeModal'

export interface ISelectedTimeSlot {
  data: Dayjs
  lessonNumber: number
}

interface ICalendarProps {
  weeksCount: number
  selectedSemester: 1 | 2
  currentWeekNumber: number
  slectedGroupId: number | null
  selectedTeacherId: number | null
  selectedAuditoryId: number | null
  isPossibleToCreateLessons: boolean
  selectedLesson: ISelectedLesson | null
  setSelectedTeacherId: Dispatch<SetStateAction<number | null>>
  setSelectedAuditoryId: Dispatch<SetStateAction<number | null>>
  setCopyTheScheduleModalVisible: Dispatch<SetStateAction<boolean>>
  setSelectedLesson: Dispatch<SetStateAction<ISelectedLesson | null>>
}

const Calendar: React.FC<ICalendarProps> = ({
  weeksCount,
  slectedGroupId,
  selectedLesson,
  selectedSemester,
  currentWeekNumber,
  setSelectedLesson,
  selectedTeacherId,
  selectedAuditoryId,
  setSelectedTeacherId,
  setSelectedAuditoryId,
  isPossibleToCreateLessons,
  setCopyTheScheduleModalVisible,
}) => {
  const dispatch = useAppDispatch()

  const { settings } = useSelector(settingsSelector)
  const { scheduleLessons, teacherLessons, groupOverlay, loadingStatus } = useSelector(scheduleLessonsSelector)
  const { lastSelectedScheduleType, lastSelectedItemId, lastOpenedSemester } = useSelector(lastSelectedDataSelector)

  const [isRemote, setIsRemote] = React.useState(false)
  const [modalVisible, setModalVisible] = React.useState(false)
  const [isAddNewLesson, setIsAddNewLesson] = React.useState(false)
  const [teacherModalVisible, setTeacherModalVisible] = React.useState(false)
  const [auditoryModalVisible, setAuditoryModalVisible] = React.useState(false)

  const [severalLessonsModalVisible, setSeveralLessonsModalVisible] = React.useState(false)
  const [replacementTeacherId, setReplacementTeacherId] = React.useState<number | null>(null)
  const [severalLessonsList, setSeveralLessonsList] = React.useState<ScheduleLessonType[]>([])
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<ISelectedTimeSlot | null>(null)
  const [currentWeekDays, setCurrentWeekDays] = React.useState(getCalendarWeek(currentWeekNumber))

  React.useEffect(() => {
    if (!lastSelectedItemId) return
    dispatch(getScheduleLessons({ id: lastSelectedItemId, semester: selectedSemester, type: lastSelectedScheduleType }))
    // if (!slectedGroupId) return
    // dispatch(getScheduleLessons({ id: slectedGroupId, semester: selectedSemester, type: lastSelectedScheduleType }))
  }, [/* slectedGroupId,  */ selectedSemester, lastSelectedScheduleType, lastSelectedItemId])

  React.useEffect(() => {
    if (!selectedTeacherId) return
    dispatch(getTeacherLessons({ id: selectedTeacherId, semester: selectedSemester, type: 'teacher' }))
  }, [selectedTeacherId, selectedSemester])

  React.useEffect(() => {
    if (!settings) return
    const { firstSemesterStart, firstSemesterEnd, secondSemesterStart, secondSemesterEnd } = settings

    if (selectedSemester === 1) {
      setCurrentWeekDays(getCalendarWeek(currentWeekNumber, firstSemesterStart, firstSemesterEnd))
    }
    if (selectedSemester === 2) {
      setCurrentWeekDays(getCalendarWeek(currentWeekNumber, secondSemesterStart, secondSemesterEnd))
    }
  }, [currentWeekNumber, settings, selectedSemester])

  React.useEffect(() => {
    if (!selectedTimeSlot) return
    const date = customDayjs(selectedTimeSlot?.data, { format: 'YYYY.MM.DD' }).format('YYYY.MM.DD')
    dispatch(getTeacherOverlay({ date, lessonNumber: selectedTimeSlot.lessonNumber }))
  }, [selectedTimeSlot])

  const setToday = () => {
    if (!settings) return

    const now = customDayjs()

    Array(weeksCount)
      .fill(null)
      .forEach((_, index) => {
        const weekNumber = index + 1

        const { firstSemesterStart, firstSemesterEnd, secondSemesterEnd, secondSemesterStart } = settings

        let weekDays

        if (lastOpenedSemester === 1) {
          weekDays = getCalendarWeek(weekNumber, firstSemesterStart, firstSemesterEnd)
        } else {
          weekDays = getCalendarWeek(weekNumber, secondSemesterStart, secondSemesterEnd)
        }

        const isAfter = now.isAfter(weekDays[0].data)
        const isBefore = now.isBefore(weekDays[6].data)

        if (isBefore && isAfter) {
          dispatch(setLastSelectedData({ lastOpenedWeek: weekNumber }))
        }
      })
  }

  const isTodayDisabled = () => {
    if (!settings || weeksCount < 1) return true

    const { firstSemesterStart, firstSemesterEnd, secondSemesterEnd, secondSemesterStart } = settings

    let semesterStart
    let semesterEnd

    if (lastOpenedSemester === 1) {
      semesterStart = getCalendarWeek(1, firstSemesterStart, firstSemesterEnd)[0]
      semesterEnd = getCalendarWeek(weeksCount, firstSemesterStart, firstSemesterEnd)[6]
    } else {
      semesterStart = getCalendarWeek(1, secondSemesterStart, secondSemesterEnd)[0]
      semesterEnd = getCalendarWeek(weeksCount, secondSemesterStart, secondSemesterEnd)[6]
    }

    const isTodayBeforeFirstSemesterDate = customDayjs().isBefore(semesterStart.data)
    const isTodayAfterLastSemesterDate = customDayjs().isAfter(semesterEnd.data)

    if (isTodayBeforeFirstSemesterDate || isTodayAfterLastSemesterDate) {
      return true
    }

    return false
  }

  // select date and time and open creating lessons modal
  const onTimeSlotClick = (data: Dayjs, lessonNumber: number, skip = true) => {
    // skip = Якщо skip = true то необхідно перевірити чи вибрано дисципліну, якщо false то така перевірка не потрібна
    // бо був клік на виставлений ел.розкладу в календарі
    if (!selectedLesson && skip) {
      toast.warning('Дисципліна не вибрана', { duration: 3000 })
      return
    }
    // if (!selectedLesson) return alert("Дисципліна не вибрана")
    setSelectedTimeSlot({ data, lessonNumber })
    setModalVisible(true)
  }

  const onGetAuditoryOverlay = (_date: Dayjs, lessonNumber: number, auditoryId: number) => {
    const date = customDayjs(_date).format('YYYY.MM.DD')
    dispatch(getAuditoryOverlay({ date, lessonNumber, auditoryId }))
  }

  // on click in schedule lesson item
  const onEditLesson = (lesson: ScheduleLessonType, data: Dayjs, lessonNumber: number) => {
    const auditory = lesson.auditory ? lesson.auditory.id : null
    setIsRemote(!auditory)
    setSelectedAuditoryId(auditory)
    setSelectedLesson({
      id: lesson.id,
      name: lesson.name,
      typeRu: lesson.typeRu,
      stream: lesson.stream,
      teacher: lesson.teacher,
      totalHours: lesson.hours,
      students: lesson.students,
      replacement: lesson.replacement,
      subgroupNumber: lesson.subgroupNumber,
      specialization: lesson.specialization,
      currentLessonHours: lesson.currentLessonHours,
      group: { id: lesson.group.id, name: lesson.group.name },
    })
    setSelectedTeacherId(lesson.teacher.id)
    const replacement = lesson.replacement ? lesson.replacement.id : null
    setReplacementTeacherId(replacement)
    onTimeSlotClick(data, lessonNumber, false)
  }

  const handleOpenSeveralLessonModal = (
    scheduledElement: ScheduleLessonType,
    date: Dayjs,
    lessonNumber: number,
    auditoryId: number | null
  ) => {
    // selectedLesson - елемент розкладу, який зараз вибраний
    // scheduledElement - елемент розкладу, який вже виставлений

    const auditory = auditoryId ? auditoryId : 0

    if (!selectedLesson) {
      onEditLesson(scheduledElement, date, lessonNumber)
      onGetAuditoryOverlay(date, lessonNumber, auditory)
      return
    }

    const isLessonsSame =
      scheduledElement.name === selectedLesson?.name &&
      scheduledElement.group.id === selectedLesson?.group.id &&
      scheduledElement.stream?.id === selectedLesson?.stream?.id &&
      scheduledElement.subgroupNumber === selectedLesson?.subgroupNumber &&
      scheduledElement.typeRu === selectedLesson?.typeRu &&
      scheduledElement.specialization === selectedLesson?.specialization

    // Якщо виставлений ел. розкладу і вибраний - це одна і та ж дисципліна
    if (isLessonsSame) {
      onEditLesson(scheduledElement, date, lessonNumber)
      onGetAuditoryOverlay(date, lessonNumber, auditory)
      return
    }

    // Якщо дисципліна на яку нажато в календарі немає підгруп або спецгруп - вона не може читатись одночасно з іншою
    const isScheduleElementCanStandWithOther = scheduledElement.subgroupNumber || scheduledElement.specialization
    // Дисципліна яку вибрано може читатись одночасно з іншими коли вона має підгрупу або спецгрупу
    const isSelectedLessonHasSubgroupsOrSpecialization = selectedLesson.subgroupNumber || selectedLesson.specialization

    if (isScheduleElementCanStandWithOther && isSelectedLessonHasSubgroupsOrSpecialization) {
      // Перевіряю чи може вибрана дисципліна стояти з іншими в один час
      // Може якщо вона розбита на підгрупи або якщо вона має спец. групи
      // if (selectedLesson.subgroupNumber || selectedLesson.specialization) {
      setSelectedTimeSlot({ data: date, lessonNumber })
      setSeveralLessonsModalVisible(true)
    } else {
      // Якщо дисципліна не поділена на підгрупи і не має спец. груп
      onEditLesson(scheduledElement, date, lessonNumber)
      onGetAuditoryOverlay(date, lessonNumber, auditory)
    }
  }

  return (
    <>
      <LessonActionsModal
        isRemote={isRemote}
        open={modalVisible}
        setOpen={setModalVisible}
        isAddNewLesson={isAddNewLesson}
        selectedLesson={selectedLesson}
        selectedSemester={selectedSemester}
        selectedTimeSlot={selectedTimeSlot}
        currentWeekNumber={currentWeekNumber}
        setIsAddNewLesson={setIsAddNewLesson}
        selectedAuditoryId={selectedAuditoryId}
        setSeveralLessonsList={setSeveralLessonsList}
        setTeacherModalVisible={setTeacherModalVisible}
        setAuditoryModalVisible={setAuditoryModalVisible}
        setSeveralLessonsModalVisible={setSeveralLessonsModalVisible}
      />

      <SelectAuditoryModal
        isRemote={isRemote}
        setIsRemote={setIsRemote}
        open={auditoryModalVisible}
        setOpen={setAuditoryModalVisible}
        selectedAuditoryId={selectedAuditoryId}
        setSelectedAuditoryId={setSelectedAuditoryId}
        setLessonActionsModalVisible={setModalVisible}
      />

      <SelectTeacherModal
        open={teacherModalVisible}
        setOpen={setTeacherModalVisible}
        setSelectedLesson={setSelectedLesson}
        replacementTeacherId={replacementTeacherId}
        setLessonActionsModalVisible={setModalVisible}
        setReplacementTeacherId={setReplacementTeacherId}
        selectedLessonId={selectedLesson ? selectedLesson.id : null}
      />

      <PutSeveralLessonsAtSameTimeModal
        settings={settings}
        selectedLesson={selectedLesson}
        open={severalLessonsModalVisible}
        selectedTimeSlot={selectedTimeSlot}
        setIsAddNewLesson={setIsAddNewLesson}
        setSelectedLesson={setSelectedLesson}
        severalLessonsList={severalLessonsList}
        setOpen={setSeveralLessonsModalVisible}
        setActionsModalVisible={setModalVisible}
        setSelectedTeacherId={setSelectedTeacherId}
        onGetAuditoryOverlay={onGetAuditoryOverlay}
        setSelectedAuditoryId={setSelectedAuditoryId}
      />

      <div className="calendar">
        <div className="header">
          <div className="header-left">
            <Button
              color="secondary"
              variant="outlined"
              onClick={setToday}
              sx={{ mr: 1, padding: '0px 10px' }}
              disabled={isTodayDisabled()}
            >
              Сьогодні
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              disabled={currentWeekNumber === 1}
              sx={{ mr: 1, padding: '0px 10px' }}
              onClick={() => dispatch(setLastSelectedData({ lastOpenedWeek: currentWeekNumber - 1 }))}
              // onClick={() => setCurrentWeekNumber((prev) => prev - 1)}
            >
              Попередній тиждень
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ padding: '0px 10px' }}
              disabled={currentWeekNumber === weeksCount}
              onClick={() => dispatch(setLastSelectedData({ lastOpenedWeek: currentWeekNumber + 1 }))}
              // onClick={() => setCurrentWeekNumber((prev) => prev + 1)}
            >
              Наступний тиждень
            </Button>
          </div>

          <div className="header-right" style={{ userSelect: 'none' }}>
            {lastSelectedScheduleType === 'group' && (
              <Button
                variant="outlined"
                color="secondary"
                sx={{ padding: '0px 10px' }}
                onClick={() => setCopyTheScheduleModalVisible(true)}
              >
                Копіювати розклад
              </Button>
            )}

            {/* <p>
              {currentWeekDays[0].start} - {currentWeekDays[6].end}
            </p> */}
          </div>
        </div>

        <div className="body" style={loadingStatus === LoadingStatusTypes.LOADING ? { opacity: '.3' } : {}}>
          <div className="lessons-numbers">
            <div className="empty-cell"></div>
            {[1, 2, 3, 4, 5, 6, 7].map((el) => (
              <div className="time-number" key={el} style={{ userSelect: 'none' }}>
                {el}
              </div>
            ))}
          </div>

          {currentWeekDays?.map((day, index) => (
            <CalendarDay
              day={day}
              index={index}
              key={day.start}
              settings={settings}
              groupOverlay={groupOverlay}
              selectedLesson={selectedLesson}
              teacherLessons={teacherLessons}
              scheduleLessons={scheduleLessons}
              onTimeSlotClick={onTimeSlotClick}
              selectedSemester={selectedSemester}
              setIsAddNewLesson={setIsAddNewLesson}
              setSeveralLessonsList={setSeveralLessonsList}
              isPossibleToCreateLessons={isPossibleToCreateLessons}
              handleOpenSeveralLessonModal={handleOpenSeveralLessonModal}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Calendar
