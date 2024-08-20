import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Grid, Typography, Box } from "@mui/material"

import MainCard from "../../components/MainCard"
import { useAppDispatch } from "../../store/store"
import { LoadingStatusTypes } from "../../store/appTypes"
import EmptyCard from "../../components/EmptyCard/EmptyCard"
import { PlanSubjectType } from "../../store/plans/plansTypes"
import { getPlanName } from "../../store/plans/plansAsyncActions"
import { clearPlan, plansSelector } from "../../store/plans/plansSlice"
import SubjectsModal from "../../components/FullPlanPage/SubjectsModal"
import { FullPlanTable } from "../../components/FullPlanPage/FullPlanTable"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { SemesterHoursModal } from "../../components/FullPlanPage/SemesterHoursModal"
import FullPlanTableActions from "../../components/FullPlanPage/FullPlanTableActions"

const FullPlanPage = () => {
  const params = useParams()

  const dispatch = useAppDispatch()

  const { plan, planSubjects, loadingStatus } = useSelector(plansSelector)

  const [searchValue, setSearchValue] = React.useState("")
  const [subjectsModalVisible, setSubjectsModalVisible] = React.useState(false)
  const [semesterHoursModalVisible, setSemesterHoursModalVisible] = React.useState(false)
  const [editingSubjectData, setEditingSubjectData] = React.useState({ name: "", cmk: 0 })
  const [selectedSemester, setSelectedSemester] = React.useState<PlanSubjectType | null>(null)
  const [subjectsModalType, setSubjectsModalType] = React.useState<"create" | "update">("create")

  React.useEffect(() => {
    if (!params.id) return
    dispatch(getPlanName(Number(params.id)))

    return () => {
      dispatch(clearPlan())
    }
  }, [params.id])

  return (
    <>
      <SubjectsModal
        planId={params.id}
        open={subjectsModalVisible}
        setOpen={setSubjectsModalVisible}
        subjectsModalType={subjectsModalType}
        editingSubjectData={editingSubjectData}
      />

      <SemesterHoursModal
        open={semesterHoursModalVisible}
        selectedSemester={selectedSemester}
        setOpen={setSemesterHoursModalVisible}
        editingSubjectData={editingSubjectData}
      />

      <Grid container>
        <Grid item sx={{ pb: 3 }}>
          <Typography variant="h5">
            {plan && loadingStatus === LoadingStatusTypes.SUCCESS ? plan.name : "Завантаження..."}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <MainCard sx={{ borderRadius: 0, position: "relative" }} content={false}>
            <div style={planSubjects && loadingStatus === LoadingStatusTypes.LOADING ? { opacity: 0.5 } : {}}>
              <Box sx={{ minHeight: "calc(100vh - 250px)" }}>
                <FullPlanTableActions
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  setSubjectsModalType={setSubjectsModalType}
                  setSubjectsModalVisible={setSubjectsModalVisible}
                />

                {!planSubjects && loadingStatus === LoadingStatusTypes.LOADING && (
                  <Box sx={{ position: "absolute", top: "40%", left: "50%", zIndex: "11" }}>
                    <LoadingSpinner />
                  </Box>
                )}

                {planSubjects && !planSubjects.length && loadingStatus !== LoadingStatusTypes.LOADING && <EmptyCard />}

                {planSubjects && planSubjects.length > 0 && (
                  <FullPlanTable
                    searchValue={searchValue}
                    planSubjects={planSubjects}
                    setSelectedSemester={setSelectedSemester}
                    setSubjectsModalType={setSubjectsModalType}
                    setEditingSubjectData={setEditingSubjectData}
                    setSubjectsModalVisible={setSubjectsModalVisible}
                    setSemesterHoursModalVisible={setSemesterHoursModalVisible}
                  />
                )}
              </Box>
            </div>
          </MainCard>
        </Grid>
      </Grid>
    </>
  )
}

export default FullPlanPage
