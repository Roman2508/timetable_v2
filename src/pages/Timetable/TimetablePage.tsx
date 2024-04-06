import React from "react"
import { Grid } from "@mui/material"
import { useSelector } from "react-redux"

// project import
import MainCard from "../../components/MainCard"
import Calendar from "../../components/TimetablePage/Calendar"
import { customDayjs } from "../../components/Calendar/Calendar"
import { TeachersType } from "../../store/teachers/teachersTypes"
import { GroupLoadStreamType } from "../../store/groups/groupsTypes"
import { settingsSelector } from "../../store/settings/settingsSlice"
import LessonsTable from "../../components/TimetablePage/LessonsTable"
import { TimetablePageHeader } from "../../components/TimetablePage/TimetablePageHeader"
import { getLastSelectedDataToLocalStorage } from "../../utils/getLastSelectedDataToLocalStorage"

// ==============================|| TIMETABLE ||============================== //

export interface ISelectedLesson {
  id: number
  name: string
  students: number
  totalHours: number
  teacher: TeachersType
  subgroupNumber: number | null
  stream: GroupLoadStreamType | null
  group: { id: number; name: string }
  typeRu: "ЛК" | "ПЗ" | "ЛАБ" | "СЕМ" | "ЕКЗ" | "КОНС" | "МЕТОД"
}

const TimetablePage = () => {
  const { settings } = useSelector(settingsSelector)

  const [weeksCount, setWeeksCount] = React.useState(0)
  const [currentWeekNumber, setCurrentWeekNumber] = React.useState(1)
  const [selectedSemester, setSelectedSemester] = React.useState<1 | 2>(1)
  const [selectedItemId, setSelectedItemId] = React.useState<number | null>(null)
  const [selectedLesson, setSelectedLesson] = React.useState<ISelectedLesson | null>(null)
  const [scheduleType, setScheduleType] = React.useState<"group" | "teacher" | "auditory">("group")

  // set weeks count in current semester
  React.useEffect(() => {
    if (!settings) return
    const { firstSemesterStart, firstSemesterEnd, secondSemesterStart, secondSemesterEnd } =
      settings
    const { lastOpenedSemester } = getLastSelectedDataToLocalStorage()

    if (!lastOpenedSemester || lastOpenedSemester === 1) {
      const endDate = customDayjs(firstSemesterEnd)
      const weeksCount = endDate.diff(firstSemesterStart, "week")
      setWeeksCount(weeksCount)
      return
    }

    if (lastOpenedSemester === 2) {
      const endDate = customDayjs(secondSemesterEnd)
      const weeksCount = endDate.diff(secondSemesterStart, "week")
      setWeeksCount(weeksCount)
      setSelectedSemester(lastOpenedSemester)
    }
  }, [settings])

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: "center", p: 0 }}>
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

        <Grid item xs={12} sx={{ display: "flex", pt: "24px !important" }}>
          <Grid item xs={4} sx={{ mr: 2 }}>
            <MainCard sx={{ pb: 0, "& .MuiCardContent-root": { p: 0, overflow: "auto" } }}>
              <LessonsTable
                scheduleType={scheduleType}
                selectedItemId={selectedItemId}
                selectedLesson={selectedLesson}
                selectedSemester={selectedSemester}
                setSelectedLesson={setSelectedLesson}
              />
            </MainCard>
          </Grid>

          <Grid item xs={8}>
            <MainCard sx={{ "& .MuiCardContent-root": { px: 1 } }}>
              <Calendar
                weeksCount={weeksCount}
                scheduleType={scheduleType}
                selectedItemId={selectedItemId}
                selectedLesson={selectedLesson}
                selectedSemester={selectedSemester}
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
