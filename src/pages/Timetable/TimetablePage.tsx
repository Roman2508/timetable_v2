import React from 'react'
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'

// project import
import MainCard from '../../components/MainCard'
import { useAppDispatch } from '../../store/store'
import Calendar from '../../components/TimetablePage/Calendar'
import { StreamsType } from '../../store/streams/streamsTypes'
import { customDayjs } from '../../components/Calendar/Calendar'
import { TeachersType } from '../../store/teachers/teachersTypes'
import { GroupLoadStreamType } from '../../store/groups/groupsTypes'
import { settingsSelector } from '../../store/settings/settingsSlice'
import LessonsTable from '../../components/TimetablePage/LessonsTable'
import { clearGroupOverlay } from '../../store/scheduleLessons/scheduleLessonsSlice'
import { TimetablePageHeader } from '../../components/TimetablePage/TimetablePageHeader'
import { getGroupOverlay } from '../../store/scheduleLessons/scheduleLessonsAsyncActions'
import { CopyTheScheduleModal } from '../../components/TimetablePage/CopyTheScheduleModal'
import { getLastSelectedDataToLocalStorage } from '../../utils/getLastSelectedDataToLocalStorage'

// ==============================|| TIMETABLE ||============================== //

export interface ISelectedLesson {
  id: number
  name: string
  students: number
  totalHours: number
  teacher: TeachersType
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

  const [weeksCount, setWeeksCount] = React.useState(0)
  const [currentWeekNumber, setCurrentWeekNumber] = React.useState(1)
  const [selectedSemester, setSelectedSemester] = React.useState<1 | 2>(1)
  const [selectedItemId, setSelectedItemId] = React.useState<number | null>(null)
  const [selectedTeacherId, setSelectedTeacherId] = React.useState<null | number>(null)
  const [selectedAuditoryId, setSelectedAuditoryId] = React.useState<number | null>(null)
  const [isPossibleToCreateLessons, setIsPossibleToCreateLessons] = React.useState(true)
  const [selectedLesson, setSelectedLesson] = React.useState<ISelectedLesson | null>(null)
  const [copyTheScheduleModalVisible, setCopyTheScheduleModalVisible] = React.useState(false)
  const [scheduleType, setScheduleType] = React.useState<'group' | 'teacher' | 'auditory'>('group')

  // set weeks count in current semester
  React.useEffect(() => {
    if (!settings) return
    const { firstSemesterStart, firstSemesterEnd, secondSemesterStart, secondSemesterEnd } = settings
    const { lastOpenedSemester } = getLastSelectedDataToLocalStorage()

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
  }, [settings, selectedSemester])

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

    const fetchGroupsOverlay = async (groupId: number) => {
      await dispatch(getGroupOverlay({ semester: selectedSemester, groupId }))
    }

    Promise.allSettled(
      selectedLesson.stream.groups.map(async (group) => {
        if (group.id === selectedLesson.group.id) return
        await fetchGroupsOverlay(group.id)
      })
    )
  }, [selectedLesson])

  return (
    <>
      <CopyTheScheduleModal
        settings={settings}
        groupId={selectedItemId}
        open={copyTheScheduleModalVisible}
        selectedSemester={selectedSemester}
        setOpen={setCopyTheScheduleModalVisible}
      />

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: 'center', p: 0 }}>
        <Grid item xs={12}>
          <TimetablePageHeader
            weeksCount={weeksCount}
            scheduleType={scheduleType}
            selectedItemId={selectedItemId}
            setScheduleType={setScheduleType}
            selectedSemester={selectedSemester}
            setSelectedItemId={setSelectedItemId}
            currentWeekNumber={currentWeekNumber}
            setSelectedSemester={setSelectedSemester}
            setCurrentWeekNumber={setCurrentWeekNumber}
            setSelectedAuditoryId={setSelectedAuditoryId}
          />
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', pt: '24px !important' }}>
          <Grid item xs={4} sx={{ mr: 2 }}>
            <MainCard sx={{ pb: 0, '& .MuiCardContent-root': { p: '0 !important', overflow: 'auto' } }}>
              <LessonsTable
                scheduleType={scheduleType}
                selectedItemId={selectedItemId}
                selectedLesson={selectedLesson}
                selectedSemester={selectedSemester}
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
                scheduleType={scheduleType}
                selectedItemId={selectedItemId}
                selectedLesson={selectedLesson}
                selectedSemester={selectedSemester}
                currentWeekNumber={currentWeekNumber}
                selectedTeacherId={selectedTeacherId}
                setSelectedLesson={setSelectedLesson}
                selectedAuditoryId={selectedAuditoryId}
                setCurrentWeekNumber={setCurrentWeekNumber}
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

// TODO:
// 4. При зміні selectedItemId <Calendar /> 2 рази підвантажується
// 6. Заміна викладача
// 8. Можливість ставити декілька елементів розкладу в один час, якщо це підгрупи або спец. групи
//    - МОЖЛИВІ НАКЛАДКИ АУДИТОРІЙ (ТРЕБА ЗРОБИТИ ПЕРЕВІРКУ ЧИ АУДИТОРІЯ ВІЛЬНА)
//    - МОЖЛИВІ НАКЛАДКИ ВИКЛАДАЧІВ

// 9. Кнопка "Сьогодні" в <Calendar />

// 12. Можливість закрити для викладача, групи або аудиторії певні дати
// 15. Не оновлюється auditory overlay коли вибирати дисципліну не з таблиці а з календаря (date slot) ???

// 17. При виборі аудиторії, при подвійному кліку з'являються зайняті аудиторії ???
// 21. При зміні типу розкладу треба очищати teachers overlay
// 22. Екз.конс. треба дозволити ставити в розклад
// 23. Не правильно видаляються з redux store ел.розкладу які поділені на підгрупи
// 24. При копіюванні підгруп, які стоять в один час вставлється лише 1 підгрупа 2 рази
// 25. Якщо у викладача стоїть заміна - треба заборонити ставити йому інші пари в той час
// 26. При зміні типу розкладу (group | teacher | auditory) треба очищати overlay
// 27. При зміні групи в розкладі треба очищати список всіх виставлених уроків
// 28. Якщо в списку спец.груп вибрано, що дисципліна не читається - треба приховати її в schedule-lessons
