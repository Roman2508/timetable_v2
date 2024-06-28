import {
  Box,
  Tab,
  Grid,
  Tabs,
  Select,
  Button,
  Divider,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
  CircularProgress,
  Stack,
  TextField,
} from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

import MainCard from '../../components/MainCard'
import TeachingLessonsControlTable from '../../components/TeachingLessonsControlPage/TeachingLessonsControlTable'

const TeachingLessonsControl = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: 'center', p: 0 }}>
        <Grid item xs={12}>
          <Typography variant="h5">Контроль вичитки</Typography>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', pt: '24px !important' }}>
          <Grid item xs={12} sx={{ mr: 2 }}>
            <MainCard sx={{ '& .MuiCardContent-root': { px: 3 } }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <InputLabel htmlFor="category">Структурний підрозділ*</InputLabel>
                  <TextField
                    select
                    size="small"
                    id="category"
                    sx={{ width: '280px' }}
                    //   value={String(lastSelectedStructuralUnitId)}
                    //   onChange={(e) => {
                    //     dispatch(setLastSelectedData({ lastSelectedStructuralUnitId: Number(e.target.value) }))
                    //   }}
                  >
                    {[{ value: 1, label: '123' }].map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>

                <Stack spacing={1} sx={{ mt: 2 }}>
                  <InputLabel htmlFor="category">Група*</InputLabel>
                  <TextField
                    select
                    size="small"
                    id="category"
                    //   value={String(lastSelectedItemId)}
                    //   onChange={(e) => {
                    //     dispatch(setLastSelectedData({ lastSelectedItemId: Number(e.target.value) }))
                    //     // setSelectedAuditoryId(null)
                    //   }}
                    sx={{ width: '120px' }}
                  >
                    {[{ value: 1, label: '123' }].map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>

                <Stack spacing={1} sx={{ mt: 2 }}>
                  <InputLabel htmlFor="semester">Семестр*</InputLabel>
                  <TextField
                    select
                    size="small"
                    id="category"
                    defaultValue={1}
                    //   value={selectedSemester}
                    //   onChange={(e) => {
                    //     const semester = Number(e.target.value) as 1 | 2
                    //     // setSelectedSemester(semester)
                    //     // setLastSelectedDataToLocalStorage({ lastOpenedSemester: semester })
                    //     dispatch(setLastSelectedData({ lastOpenedSemester: semester }))
                    //   }}
                    sx={{ width: '120px' }}
                  >
                    {[
                      { value: 1, label: 1 },
                      { value: 2, label: 2 },
                    ].map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>

                <Stack spacing={1} sx={{ mt: 2 }}>
                  <InputLabel htmlFor="category">Дисципліна*</InputLabel>
                  <TextField
                    select
                    size="small"
                    id="category"
                    //   value={currentWeekNumber}
                    //   onChange={(e) => {
                    //     // setCurrentWeekNumber(Number(e.target.value))
                    //     // setLastSelectedDataToLocalStorage({ lastOpenedWeek: Number(e.target.value) })
                    //     dispatch(setLastSelectedData({ lastOpenedWeek: Number(e.target.value) }))
                    //   }}
                    sx={{ width: '280px' }}
                  >
                    {[{ value: 1, label: '123' }].map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              </div>

              <TeachingLessonsControlTable />
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default TeachingLessonsControl
