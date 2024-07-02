import React from 'react'
import { useSelector } from 'react-redux'
import { ColumnWidthOutlined, FilterOutlined } from '@ant-design/icons'
import { Grid, Typography, Tooltip, IconButton, Divider } from '@mui/material'

import { useAppDispatch } from '../../store/store'
import { gradeBookSelector } from '../../store/gradeBook/gradeBookSlice'
import GradeBookTable from '../../components/GradeBookPage/GradeBookTable'
import AddSummaryModal from '../../components/GradeBookPage/AddSummaryModal'
import GradeBookFilter from '../../components/GradeBookPage/GradeBookFilterModal'

const GradeBookPage = () => {
  const dispatch = useAppDispatch()

  const { gradeBook } = useSelector(gradeBookSelector)

  const [isOpenFilterModal, setIsOpenFilterModal] = React.useState(false)
  const [isOpenSummaryModal, setIsOpenSummaryModal] = React.useState(false)

  return (
    <>
      <GradeBookFilter open={isOpenFilterModal} setOpen={setIsOpenFilterModal} />
      <AddSummaryModal open={isOpenSummaryModal} setOpen={setIsOpenSummaryModal} />

      <Grid container sx={{ mb: 2, pt: 0 }}>
        <Grid item xs={12}>
          <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid item style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ mr: 1 }}>
                Електронний журнал
              </Typography>

              <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />

              <Tooltip title="Знайти групу">
                <IconButton onClick={() => setIsOpenFilterModal(true)}>
                  <FilterOutlined />
                </IconButton>
              </Tooltip>

              <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />

              <Tooltip title="Додати підсумок">
                <IconButton onClick={() => setIsOpenSummaryModal(true)}>
                  <ColumnWidthOutlined />
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item>
              <Typography variant="h5">{`Інформатика ІІ семестр. Група: PH-23-1. Викладач: Пташник Р.В.`}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <GradeBookTable gradeBook={gradeBook} />
    </>
  )
}

export default GradeBookPage
