import React from 'react'
import { Grid } from '@mui/material'

// project import
import MainCard from '../../components/MainCard'
import Calendar from '../../components/TimetablePage/Calendar'
import { GroupLoadStreamType } from '../../store/groups/groupsTypes'
import LessonsTable from '../../components/TimetablePage/LessonsTable'
import { TimetablePageHeader } from '../../components/TimetablePage/TimetablePageHeader'
import { TeachersType } from '../../store/teachers/teachersTypes'

// ==============================|| TIMETABLE ||============================== //

export interface ISelectedLesson {
  id: number
  name: string
  students: number
  teacher: TeachersType
  subgroupNumber: number | null
  stream: GroupLoadStreamType | null
  group: { id: number; name: string }
  typeRu: 'ЛК' | 'ПЗ' | 'ЛАБ' | 'СЕМ' | 'ЕКЗ' | 'КОНС' | 'МЕТОД'
}

const TimetablePage = () => {
  const [currentWeekNumber, setCurrentWeekNumber] = React.useState(1)
  const [selectedItemId, setSelectedItemId] = React.useState<number | null>(null)
  const [selectedLesson, setSelectedLesson] = React.useState<ISelectedLesson | null>(null)
  const [scheduleType, setScheduleType] = React.useState<'group' | 'teacher' | 'auditory'>('group')

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: 'center', p: 0 }}>
        <Grid item xs={12}>
          <TimetablePageHeader
            scheduleType={scheduleType}
            selectedItemId={selectedItemId}
            setScheduleType={setScheduleType}
            setSelectedItemId={setSelectedItemId}
            currentWeekNumber={currentWeekNumber}
            setCurrentWeekNumber={setCurrentWeekNumber}
          />
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', pt: '24px !important' }}>
          <Grid item xs={4} sx={{ mr: 2 }}>
            <MainCard sx={{ pb: 0, '& .MuiCardContent-root': { p: 0, overflow: 'auto' } }}>
              <LessonsTable
                scheduleType={scheduleType}
                selectedItemId={selectedItemId}
                selectedLesson={selectedLesson}
                setSelectedLesson={setSelectedLesson}
              />
            </MainCard>
          </Grid>

          <Grid item xs={8}>
            <MainCard sx={{ '& .MuiCardContent-root': { px: 1 } }}>
              <Calendar
                scheduleType={scheduleType}
                selectedItemId={selectedItemId}
                selectedLesson={selectedLesson}
                currentWeekNumber={currentWeekNumber}
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

{
  /* <Calendar
      onClick={(e) => console.log(e)}
      events={[
        {
          title: "title title title title title title title title title title ",
          start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9),
          end: customDayjs(
            new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9)
          )
            .add(1.34, "hour")
            .toDate(),
        },
      ]}
    /> */
}