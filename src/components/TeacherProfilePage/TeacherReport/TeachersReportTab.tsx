import React from "react"
import { useSelector } from "react-redux"
import { Button, OutlinedInput, Stack, Typography } from "@mui/material"

import EmptyCard from "../../EmptyCard/EmptyCard"
import TeachersReportItem from "./TeacherReportItem"
import { useAppDispatch } from "../../../store/store"
import { customDayjs } from "../../Calendar/Calendar"
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"
import { TeacherReportType } from "../../../store/teacherProfile/teacherProfileTypes"
import { getTeacherReport } from "../../../store/teacherProfile/teacherProfileAsyncActions"
import { clearTeacherReports, teacherProfileSelector } from "../../../store/teacherProfile/teacherProfileSlice"

const TeachersReportTab: React.FC = () => {
  const dispatch = useAppDispatch()

  const [showedYear, setShowedYear] = React.useState(customDayjs().year())

  const { report } = useSelector(teacherProfileSelector)

  const getDoneHours = () => {
    if (!report) return
    const doneActivities = report.filter((el) => el.status)
    return doneActivities.reduce((acc, cur) => cur.hours + acc, 0)
  }

  React.useEffect(() => {
    dispatch(clearTeacherReports())
    dispatch(getTeacherReport({ year: showedYear, id: 17 }))
  }, [showedYear])

  return (
    <div style={{ position: "relative" }}>
      <div style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <Button variant="outlined" sx={{ mr: 1 }} style={{ textTransform: "initial" }}>
            Експортувати звіт в PDF
          </Button>

          <Button variant="outlined" style={{ textTransform: "initial" }}>
            Експортувати звіт в WORD
          </Button>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 5 }}>
          <Typography variant="button" sx={{ textTransform: "inherit" }}>
            Звіт за
          </Typography>
          <Stack spacing={1}>
            <OutlinedInput
              fullWidth
              name="hours"
              type="number"
              value={showedYear}
              onChange={(e) => setShowedYear(Number(e.target.value))}
              sx={{ width: "70px", input: { padding: "8.2px 2px 8.2px 16px" } }}
            />
          </Stack>
          <Typography variant="button" sx={{ textTransform: "inherit", width: "77px" }}>
            - {showedYear + 1} н.р.
          </Typography>
        </div>
      </div>

      {!!report?.length && (
        <Typography variant="h5" sx={{ textAlign: "center", mb: 4 }}>
          Всього виконано за н.р. {getDoneHours()} годин.
        </Typography>
      )}

      {!report ? (
        <LoadingSpinner />
      ) : !report.length ? (
        <EmptyCard />
      ) : (
        report.map((el: TeacherReportType) => <TeachersReportItem key={el.id} report={el} />)
      )}
    </div>
  )
}

export default TeachersReportTab
