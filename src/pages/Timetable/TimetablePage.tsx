import React from 'react'
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'

import {
  clearGroupLoad,
  clearGroupOverlay,
  lastSelectedDataSelector,
} from '../../store/scheduleLessons/scheduleLessonsSlice'
import MainCard from '../../components/MainCard'
import { useAppDispatch } from '../../store/store'
import Calendar from '../../components/TimetablePage/Calendar'
import { StreamsType } from '../../store/streams/streamsTypes'
import { customDayjs } from '../../components/Calendar/Calendar'
import { TeachersType } from '../../store/teachers/teachersTypes'
import { GroupLoadStreamType } from '../../store/groups/groupsTypes'
import { settingsSelector } from '../../store/settings/settingsSlice'
import LessonsTable from '../../components/TimetablePage/LessonsTable'
import { TimetablePageHeader } from '../../components/TimetablePage/TimetablePageHeader'
import { getGroupOverlay } from '../../store/scheduleLessons/scheduleLessonsAsyncActions'
import { CopyTheScheduleModal } from '../../components/TimetablePage/CopyTheScheduleModal'

export interface ISelectedLesson {
  id: number
  name: string
  students: number
  totalHours: number
  teacher: TeachersType
  currentLessonHours: number
  subgroupNumber: number | null
  specialization: string | null
  replacement: null | TeachersType
  group: { id: number; name: string }
  stream: GroupLoadStreamType | StreamsType | null
  typeRu: 'ЛК' | 'ПЗ' | 'ЛАБ' | 'СЕМ' | 'ЕКЗ' | 'КОНС' | 'МЕТОД'
}

const TimetablePage = () => {
  const dispatch = useAppDispatch()

  const { settings } = useSelector(settingsSelector)
  const { lastOpenedSemester, lastOpenedWeek } = useSelector(lastSelectedDataSelector)

  const [weeksCount, setWeeksCount] = React.useState(0)
  const [selectedSemester, setSelectedSemester] = React.useState<1 | 2>(1)
  const [slectedGroupId, setSlectedGroupId] = React.useState<number | null>(null)
  const [selectedTeacherId, setSelectedTeacherId] = React.useState<null | number>(null)
  const [selectedAuditoryId, setSelectedAuditoryId] = React.useState<number | null>(null)
  const [isPossibleToCreateLessons, setIsPossibleToCreateLessons] = React.useState(true)
  const [selectedLesson, setSelectedLesson] = React.useState<ISelectedLesson | null>(null)
  const [copyTheScheduleModalVisible, setCopyTheScheduleModalVisible] = React.useState(false)

  // set weeks count in current semester
  React.useEffect(() => {
    if (!settings) return
    const { firstSemesterStart, firstSemesterEnd, secondSemesterStart, secondSemesterEnd } = settings

    if (!lastOpenedSemester || lastOpenedSemester === 1) {
      const endDate = customDayjs(firstSemesterEnd)
      const weeksCount = endDate.diff(firstSemesterStart, 'week', true)
      const roundedUp = Math.ceil(weeksCount)
      setWeeksCount(roundedUp + 1)
      setSelectedSemester(1)
      return
    }

    if (lastOpenedSemester === 2) {
      const endDate = customDayjs(secondSemesterEnd)
      const weeksCount = endDate.diff(secondSemesterStart, 'week', true)
      const roundedUp = Math.ceil(weeksCount)
      setWeeksCount(roundedUp + 1)
      setSelectedSemester(lastOpenedSemester)
    }
  }, [settings, lastOpenedSemester])

  React.useEffect(() => {
    // Якщо дисципліна не об'єднана в потік
    if (!selectedLesson) return

    // Якщо група не об'єднана в потік - очищаю накладки
    if (!selectedLesson.stream) {
      dispatch(clearGroupOverlay())
      return
    }

    // Якщо дисципліна об'єднана в потік і кількість груп в потоці = або < 1
    if (selectedLesson.stream.groups.length <= 1) return

    Promise.allSettled(
      selectedLesson.stream.groups.map(async (group) => {
        if (group.id === selectedLesson.group.id) return
        await dispatch(getGroupOverlay({ semester: selectedSemester, groupId: group.id }))
      })
    )
  }, [selectedLesson])

  React.useEffect(() => {
    // очищаю group load для сторінки з розподілом навантаження
    return () => {
      dispatch(clearGroupLoad())
    }
  }, [])

  return (
    <>
      <CopyTheScheduleModal
        settings={settings}
        groupId={slectedGroupId}
        open={copyTheScheduleModalVisible}
        selectedSemester={lastOpenedSemester}
        setOpen={setCopyTheScheduleModalVisible}
      />

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: 'center', p: 0 }}>
        <Grid item xs={12}>
          <TimetablePageHeader
            weeksCount={weeksCount}
            currentWeekNumber={lastOpenedWeek}
            setSlectedGroupId={setSlectedGroupId}
            selectedSemester={lastOpenedSemester}
            setSelectedLesson={setSelectedLesson}
            setSelectedTeacherId={setSelectedTeacherId}
            setSelectedAuditoryId={setSelectedAuditoryId}
          />
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', pt: '24px !important' }}>
          <Grid item xs={4} sx={{ mr: 2 }}>
            <MainCard sx={{ pb: 0, '& .MuiCardContent-root': { p: '0 !important', overflow: 'auto' } }}>
              <LessonsTable
                selectedLesson={selectedLesson}
                selectedSemester={lastOpenedSemester}
                setSelectedLesson={setSelectedLesson}
                setSelectedTeacherId={setSelectedTeacherId}
                setIsPossibleToCreateLessons={setIsPossibleToCreateLessons}
              />
            </MainCard>
          </Grid>

          <Grid item xs={8}>
            <MainCard sx={{ '& .MuiCardContent-root': { px: 1 } }}>
              <Calendar
                weeksCount={weeksCount}
                slectedGroupId={slectedGroupId}
                selectedLesson={selectedLesson}
                currentWeekNumber={lastOpenedWeek}
                selectedSemester={lastOpenedSemester}
                selectedTeacherId={selectedTeacherId}
                setSelectedLesson={setSelectedLesson}
                selectedAuditoryId={selectedAuditoryId}
                setSelectedTeacherId={setSelectedTeacherId}
                setSelectedAuditoryId={setSelectedAuditoryId}
                isPossibleToCreateLessons={isPossibleToCreateLessons}
                setCopyTheScheduleModalVisible={setCopyTheScheduleModalVisible}
              />
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export { TimetablePage }
