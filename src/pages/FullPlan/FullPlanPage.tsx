// material-ui
import { Grid, Button, TextField, Typography, IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { SearchOutlined } from '@ant-design/icons'

// project import
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import MainCard from '../../components/MainCard'
import { FullPlanTable } from '../../components/FullPlanPage/FullPlanTable'
import { useAppDispatch } from '../../store/store'
import { getPlanSubjects } from '../../store/plans/plansAsyncActions'
import { useSelector } from 'react-redux'
import { plansSelector } from '../../store/plans/plansSlice'
import SubjectsModal from '../../components/FullPlanPage/SubjectsModal'
import { LoadingStatusTypes } from '../../store/appTypes'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import EmptyCard from '../../components/EmptyCard/EmptyCard'

// ==============================|| FULL PLAN ||============================== //

const FullPlanPage = () => {
  const params = useParams()

  const dispatch = useAppDispatch()

  const { plan, loadingStatus } = useSelector(plansSelector)
  const [editingSubjectName, setEditingSubjectName] = React.useState<string>('')
  const [subjectsModalVisible, setSubjectsModalVisible] = React.useState(false)
  const [subjectsModalType, setSubjectsModalType] = React.useState<'create' | 'update'>('create')
  const [changeSemesterHoursModalVisible, setChangeSemesterHoursModalVisible] = React.useState(false)

  React.useEffect(() => {
    if (!params.id) return
    dispatch(getPlanSubjects(Number(params.id)))
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
        editingSubjectName={editingSubjectName}
      />

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: 'center' }}>
        <Grid item xs={12}>
          <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
            <Grid item xs={3}>
              <Typography variant="h5">
                {plan
                  ? plan.name && loadingStatus === LoadingStatusTypes.SUCCESS
                  : loadingStatus === LoadingStatusTypes.ERROR
                  ? ''
                  : 'Завантаження...'}
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
                sx={{ '& .css-r8nwpq-MuiInputBase-root-MuiOutlinedInput-root': { p: 0 }, width: '200px' }}
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
                setSubjectsModalType={setSubjectsModalType}
                setEditingSubjectName={setEditingSubjectName}
                setSubjectsModalVisible={setSubjectsModalVisible}
              />
            </MainCard>
          )}
        </Grid>
      </Grid>
    </>
  )
}

export { FullPlanPage }
