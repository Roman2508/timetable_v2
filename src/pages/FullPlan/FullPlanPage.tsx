import React, { useCallback } from 'react'
import debounse from 'lodash/debounce'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import { Grid, Button, TextField, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material'

import MainCard from '../../components/MainCard'
import { useAppDispatch } from '../../store/store'
import { LoadingStatusTypes } from '../../store/appTypes'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import { PlanSubjectType } from '../../store/plans/plansTypes'
import { clearPlan, plansSelector } from '../../store/plans/plansSlice'
import SubjectsModal from '../../components/FullPlanPage/SubjectsModal'
import { FullPlanTable } from '../../components/FullPlanPage/FullPlanTable'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { getPlanName, getPlanSubjects } from '../../store/plans/plansAsyncActions'
import { SemesterHoursModal } from '../../components/FullPlanPage/SemesterHoursModal'

const FullPlanPage = () => {
  const params = useParams()

  const dispatch = useAppDispatch()

  const { plan, planSubjects, loadingStatus } = useSelector(plansSelector)

  const [searchValue, setSearchValue] = React.useState('')
  const [] = React.useState()
  const [subjectsModalVisible, setSubjectsModalVisible] = React.useState(false)
  const [showedSemesters, setShowedSemesters] = React.useState(() => [1, 2, 3, 4, 5, 6])
  const [semesterHoursModalVisible, setSemesterHoursModalVisible] = React.useState(false)
  const [editingSubjectData, setEditingSubjectData] = React.useState({ name: '', cmk: 0 })
  const [selectedSemester, setSelectedSemester] = React.useState<PlanSubjectType | null>(null)
  const [subjectsModalType, setSubjectsModalType] = React.useState<'create' | 'update'>('create')

  const debouncedGetResponce = React.useCallback(
    debounse((payload) => dispatch(getPlanSubjects(payload)), 1000),
    []
  )

  const fetchLessonsBySemesters = () => {
    let semesters = ''
    showedSemesters.forEach((el) => {
      if (!semesters.length) semesters = semesters.concat(String(el))
      else semesters = semesters.concat(`,${el}`)
    })
    const payload = { id: Number(params.id), semesters }
    // dispatch(getPlanSubjects(payload))
    debouncedGetResponce(payload)
  }

  React.useEffect(() => {
    if (!params.id) return
    dispatch(getPlanName(Number(params.id)))

    return () => {
      dispatch(clearPlan())
    }
  }, [params.id])

  React.useEffect(() => {
    fetchLessonsBySemesters()
  }, [showedSemesters])

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
                value={searchValue}
                placeholder="Знайти..."
                onChange={(e) => setSearchValue(e.target.value)}
                InputProps={{ endAdornment: <SearchOutlined style={{ opacity: 0.5 }} /> }}
                sx={{ '& .css-r8nwpq-MuiInputBase-root-MuiOutlinedInput-root': { p: 0, pr: 1.5 }, width: '200px' }}
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
          {!planSubjects && loadingStatus === LoadingStatusTypes.LOADING && <LoadingSpinner />}

          {planSubjects && !planSubjects.length && loadingStatus !== LoadingStatusTypes.LOADING && <EmptyCard />}

          {planSubjects && planSubjects.length > 0 && (
            <MainCard sx={{ border: 0, borderRadius: 0, position: 'relative' }} content={false}>
              {planSubjects && loadingStatus === LoadingStatusTypes.LOADING && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', zIndex: '11' }}>
                  <LoadingSpinner />
                </div>
              )}

              <div style={planSubjects && loadingStatus === LoadingStatusTypes.LOADING ? { opacity: 0.5 } : {}}>
                <FullPlanTable
                  searchValue={searchValue}
                  planSubjects={planSubjects}
                  setSelectedSemester={setSelectedSemester}
                  setSubjectsModalType={setSubjectsModalType}
                  setEditingSubjectData={setEditingSubjectData}
                  setSubjectsModalVisible={setSubjectsModalVisible}
                  setSemesterHoursModalVisible={setSemesterHoursModalVisible}
                />
              </div>
            </MainCard>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export default FullPlanPage
