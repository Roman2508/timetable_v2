// material-ui
import {
  Box,
  Grid,
  List,
  Stack,
  Button,
  MenuItem,
  TextField,
  Typography,
  ListItemText,
  ListItemButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItem,
  Divider,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  InputAdornment,
} from '@mui/material'
import { SearchOutlined } from '@ant-design/icons'

// project import
import MainCard from '../../components/MainCard'
import { Link } from 'react-router-dom'
import { FullPlanTable } from '../../components/FullPlanPage/FullPlanTable'
import React from 'react'

// ==============================|| PLANS ||============================== //

const plans = [
  {
    id: 1,
    name: 'Фармація, промислова фармація (ДФ)',
    items: [
      { id: 1, name: 'Фармація, промислова фармація (ДФ)' },
      { id: 2, name: 'Фармація, промислова фармація (ДФ)' },
      { id: 3, name: 'Фармація, промислова фармація (ДФ)' },
      { id: 4, name: 'Фармація, промислова фармація (ДФ)' },
      { id: 5, name: 'Фармація, промислова фармація (ДФ)' },
    ],
  },
  {
    id: 2,
    name: 'Фармація, промислова фармація (ЗФ)',
    items: [
      { id: 6, name: 'Фармація, промислова фармація (ЗФ)' },
      { id: 7, name: 'Фармація, промислова фармація (ДФ)' },
      { id: 8, name: 'Фармація, промислова фармація (ЗФ)' },
    ],
  },
  {
    id: 3,
    name: 'Лабораторна діагностика (ДФ)',
    items: [
      { id: 9, name: 'Фармація, промислова фармація (ЗФ)' },
      { id: 10, name: 'Фармація, промислова фармація (ЗФ)' },
      { id: 11, name: 'Лабораторна діагностика (ДФ)' },
    ],
  },
]

const FullPlanPage = () => {
  const [showedSemesters, setShowedSemesters] = React.useState(() => [1, 2])

  const handleShowedSemesters = (_: React.MouseEvent<HTMLElement>, newSemesters: number[]) => {
    setShowedSemesters(newSemesters)
  }

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: 'center' }}>
      <Grid item xs={12}>
        <Grid container sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid item xs={3}>
            <Typography variant="h5">План групи PH-24-1</Typography>
          </Grid>

          <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button sx={{ mr: 3, whiteSpace: 'nowrap' }} variant="outlined">
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
        <MainCard sx={{ border: 0, borderRadius: 0 }} content={false}>
          <FullPlanTable />
        </MainCard>
      </Grid>
    </Grid>
  )
}

export { FullPlanPage }
