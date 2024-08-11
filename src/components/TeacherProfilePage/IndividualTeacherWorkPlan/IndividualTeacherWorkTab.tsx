import React from "react"
import { useSelector } from "react-redux"
import { Chip, Stack, Divider, Typography, OutlinedInput } from "@mui/material"

import {
  clearTeacherReports,
  teacherProfileSelector,
  clearIndividualTeacherWork,
} from "../../../store/teacherProfile/teacherProfileSlice"
import EmptyCard from "../../EmptyCard/EmptyCard"
import { useAppDispatch } from "../../../store/store"
import { customDayjs } from "../../Calendar/Calendar"
import { menuSelector } from "../../../store/menu/menuSlice"
import { sortItemsByKey } from "../../../utils/sortItemsByKey"
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"
import IndividualTeacherWorkItem from "./IndividualTeacherWorkItem"
import { IndividualWorkPlanType } from "../../../store/teacherProfile/teacherProfileTypes"
import { categoriesTypes, IFormState, IndividualTeacherWorkForm } from "./IndividualTeacherWorkForm"
import { getIndividualTeacherWork, getTeacherReport } from "../../../store/teacherProfile/teacherProfileAsyncActions"

const IndividualTeacherWorkTab = () => {
  const { drawerOpen } = useSelector(menuSelector)
  const { individualWorkPlan, report } = useSelector(teacherProfileSelector)

  const dispatch = useAppDispatch()

  const [plannedHours, setPlannedHours] = React.useState(0)
  const [showedYear, setShowedYear] = React.useState<number>(customDayjs().year())
  const [editingIndividualTeacherWork, setEditingIndividualTeacherWork] = React.useState<IFormState | null>(null)

  React.useEffect(() => {
    dispatch(clearTeacherReports())
    dispatch(getIndividualTeacherWork())
    dispatch(clearIndividualTeacherWork())
    dispatch(getTeacherReport({ year: showedYear, id: 17 }))
  }, [showedYear])

  React.useEffect(() => {
    if (!report) return
    const plannedActivities = report.filter((el) => el.status)
    const plannedHours = plannedActivities.reduce((acc, cur) => Number(cur.hours) + acc, 0)
    setPlannedHours(plannedHours)
  }, [report])

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          right: 0,
          bottom: 0,
          zIndex: "99",
          position: "fixed",
          textAlign: "center",
          left: drawerOpen ? 260 : 0,
        }}
      >
        <Typography
          variant="h5"
          style={{
            width: "100%",
            padding: "16px",
            background: "#fff",
            display: "inline-block",
            maxWidth: drawerOpen ? "1620px" : "1770px",
          }}
        >
          Заплановано на навчальний рік {plannedHours} годин.
        </Typography>
      </div>

      <div
        style={{
          gap: 5,
          width: "205px",
          display: "flex",
          margin: "0 auto",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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

      <div>
        <IndividualTeacherWorkForm
          editingIndividualTeacherWork={editingIndividualTeacherWork}
          setEditingIndividualTeacherWork={setEditingIndividualTeacherWork}
        />
      </div>

      {!individualWorkPlan ? (
        <LoadingSpinner />
      ) : !individualWorkPlan.length ? (
        <EmptyCard />
      ) : (
        categoriesTypes.map((category) => {
          if (!individualWorkPlan) return
          const individualWork = individualWorkPlan.filter((w) => w.type === category)

          return (
            <div key={category}>
              <br />
              <br />
              <Divider>
                <Chip label={category} size="medium" />
              </Divider>
              <br />
              <br />

              {sortItemsByKey(individualWork, "name").map((el: IndividualWorkPlanType) => {
                const addedReport = report?.find((r) => r.individualWork.id === el.id)

                return (
                  <IndividualTeacherWorkItem
                    key={el.id}
                    individualWork={el}
                    showedYear={showedYear}
                    addedReport={addedReport}
                    setEditingIndividualTeacherWork={setEditingIndividualTeacherWork}
                  />
                )
              })}
            </div>
          )
        })
      )}

      <br />
      <br />
    </div>
  )
}

export default IndividualTeacherWorkTab
