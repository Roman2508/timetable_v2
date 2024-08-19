import React from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { Grid, Typography, Tooltip, IconButton, Divider, Paper, Box } from '@mui/material'
import { ColumnWidthOutlined, FilterOutlined, PrinterOutlined, SnippetsOutlined } from '@ant-design/icons'

import { useAppDispatch } from '../../store/store'
import { gradeBookSelector } from '../../store/gradeBook/gradeBookSlice'

const SchedulingСonstraints = () => {
  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams] = useSearchParams()

  const { gradeBook, loadingStatus } = useSelector(gradeBookSelector)

  const [isOpenFilterModal, setIsOpenFilterModal] = React.useState(false)
  const [isOpenSummaryModal, setIsOpenSummaryModal] = React.useState(false)
  const [gradeBookLessonDates, setGradeBookLessonDates] = React.useState<{ date: string }[]>([])

  return (
    <>
      <Grid container sx={{ mb: 2, pt: 0 }}>
        <Grid item xs={12}>
          <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid item style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ mr: 1 }}>
                Обмеження розкладу
              </Typography>

              <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />

              <Tooltip title="213312213">
                <IconButton onClick={() => setIsOpenFilterModal(true)}>
                  <FilterOutlined />
                </IconButton>
              </Tooltip>

              <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />

              <Tooltip title="2311313">
                <IconButton onClick={() => setIsOpenSummaryModal(true)} disabled={!gradeBook}>
                  <ColumnWidthOutlined />
                </IconButton>
              </Tooltip>

              <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />

              <Tooltip title="213321213">
                <IconButton onClick={() => {}} disabled={!gradeBook}>
                  <SnippetsOutlined />
                </IconButton>
              </Tooltip>

              <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />

              <Tooltip title="1231223">
                <IconButton onClick={() => {}} disabled={!gradeBook}>
                  <PrinterOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Box>filter</Box>
        <Box>calendar</Box>
      </Paper>
    </>
  )
}

export default SchedulingСonstraints
