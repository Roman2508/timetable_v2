// material-ui
import { Grid, Button, TextField, Typography, IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { SearchOutlined } from '@ant-design/icons'

// project import
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import MainCard from '../../components/MainCard'
import { useAppDispatch } from '../../store/store'
import { LoadingStatusTypes } from '../../store/appTypes'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import { clearPlan, plansSelector } from '../../store/plans/plansSlice'
import { getPlanSubjects } from '../../store/plans/plansAsyncActions'
import SubjectsModal from '../../components/FullPlanPage/SubjectsModal'
import { FullPlanTable } from '../../components/FullPlanPage/FullPlanTable'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { SemesterHoursModal } from '../../components/FullPlanPage/SemesterHoursModal'
import { PlanSubjectType } from '../../store/plans/plansTypes'

// ==============================|| FULL PLAN ||============================== //

const FullPlanPage = () => {
  const params = useParams()

  const dispatch = useAppDispatch()

  const { plan, loadingStatus } = useSelector(plansSelector)
  const [editingSubjectData, setEditingSubjectData] = React.useState({ name: '', cmk: 0 })
  const [subjectsModalVisible, setSubjectsModalVisible] = React.useState(false)
  const [subjectsModalType, setSubjectsModalType] = React.useState<'create' | 'update'>('create')
  const [semesterHoursModalVisible, setSemesterHoursModalVisible] = React.useState(false)
  const [selectedSemester, setSelectedSemester] = React.useState<PlanSubjectType | null>(null)

  React.useEffect(() => {
    if (!params.id) return
    dispatch(getPlanSubjects(Number(params.id)))

    return () => {
      dispatch(clearPlan())
    }
  }, [])

  const [showedSemesters, setShowedSemesters] = React.useState(() => [1, 2])

  const handleShowedSemesters = (_: React.MouseEvent<HTMLElement>, newSemesters: number[]) => {
    setShowedSemesters(newSemesters)
  }

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

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: 'center' }}>
        <Grid item xs={12}>
          <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
            <Grid item xs={3}>
              <Typography variant="h5">
                {plan && loadingStatus === LoadingStatusTypes.SUCCESS ? plan.name : 'Завантаження...'}
              </Typography>
            </Grid>

            <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Button
                sx={{ mr: 3, whiteSpace: 'nowrap' }}
                variant="outlined"
                onClick={() => {
                  setSubjectsModalType('create')
                  setSubjectsModalVisible(true)
                }}
              >
                Додати дисципліну
              </Button>
              <TextField
                size="small"
                placeholder="Знайти..."
                sx={{
                  '& .css-r8nwpq-MuiInputBase-root-MuiOutlinedInput-root': { p: 0 },
                  width: '200px',
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchOutlined />
                    </IconButton>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Typography sx={{ mr: 2 }}>Семестри:</Typography>

              <ToggleButtonGroup value={showedSemesters} onChange={handleShowedSemesters} aria-label="text formatting">
                {[1, 2, 3, 4, 5, 6].map((el) => (
                  <ToggleButton key={el} value={el} sx={{ py: 0.55 }}>
                    {el}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {!plan && loadingStatus === LoadingStatusTypes.LOADING && <LoadingSpinner />}
          {!plan?.subjects?.length && loadingStatus !== LoadingStatusTypes.LOADING && <EmptyCard />}
          {plan?.subjects?.length && (
            <MainCard sx={{ border: 0, borderRadius: 0 }} content={false}>
              <FullPlanTable
                plan={plan}
                setSelectedSemester={setSelectedSemester}
                setSubjectsModalType={setSubjectsModalType}
                setEditingSubjectData={setEditingSubjectData}
                setSubjectsModalVisible={setSubjectsModalVisible}
                setSemesterHoursModalVisible={setSemesterHoursModalVisible}
              />
            </MainCard>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default FullPlanPage 
