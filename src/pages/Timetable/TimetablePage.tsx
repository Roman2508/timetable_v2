import React from 'react'
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux'

// project import
import MainCard from '../../components/MainCard'
import Calendar from '../../components/TimetablePage/Calendar'
import { StreamsType } from '../../store/streams/streamsTypes'
import { customDayjs } from '../../components/Calendar/Calendar'
import { TeachersType } from '../../store/teachers/teachersTypes'
import { GroupLoadStreamType } from '../../store/groups/groupsTypes'
import { settingsSelector } from '../../store/settings/settingsSlice'
import LessonsTable from '../../components/TimetablePage/LessonsTable'
import { TimetablePageHeader } from '../../components/TimetablePage/TimetablePageHeader'
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
  group: { id: number; name: string }
  stream: GroupLoadStreamType | StreamsType | null
  typeRu: 'ЛК' | 'ПЗ' | 'ЛАБ' | 'СЕМ' | 'ЕКЗ' | 'КОНС' | 'МЕТОД'
}

const TimetablePage = () => {
  const { settings } = useSelector(settingsSelector)

  const [weeksCount, setWeeksCount] = React.useState(0)
  const [currentWeekNumber, setCurrentWeekNumber] = React.useState(1)
  const [selectedSemester, setSelectedSemester] = React.useState<1 | 2>(1)
  const [selectedItemId, setSelectedItemId] = React.useState<number | null>(null)
  const [selectedTeacherId, setSelectedTeacherId] = React.useState<null | number>(null)
  const [selectedLesson, setSelectedLesson] = React.useState<ISelectedLesson | null>(null)
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

  return (
    <>
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
                setCurrentWeekNumber={setCurrentWeekNumber}
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
// 3. Копіювання розкладу
// 4. При зміні selectedItemId <Calendar /> 2 рази підвантажується

// 6. Заміна викладача
// 7. Примітки
// 8. Можливість ставити декілька елементів розкладу в один час, якщо це підгрупи або спец. групи
//    - МОЖЛИВІ НАКЛАДКИ АУДИТОРІЙ (ТРЕБА ЗРОБИТИ ПЕРЕВІРКУ ЧИ АУДИТОРІЯ ВІЛЬНА)
// 9. Кнопка "Сьогодні" в <Calendar />
// 10. --------- Можливість замість аудиторії ставити дистанційно
// 11. Ставити розклад в Google Calendar
// 12. Можливість закрити для викладача, групи або аудиторії певні дати
// 13. Коли План === Факт треба заборонити виставляти ел. розкладу
