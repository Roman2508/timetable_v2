// material-ui
import {
  Grid,
  List,
  Divider,
  ListItem,
  Accordion,
  IconButton,
  Typography,
  ListItemText,
  ListItemButton,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import { DownOutlined } from '@ant-design/icons'
import { EditOutlined } from '@ant-design/icons'
import { DeleteOutlined } from '@ant-design/icons'

// project import
import { Link } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'
import { plansSelector } from '../../store/plans/plansSlice'
import { useAppDispatch } from '../../store/store'
import { getPlansCategories } from '../../store/plans/plansAsyncActions'

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

const PlansPage = () => {
  const dispatch = useAppDispatch()

  const { plansCategories, loadingStatus } = useSelector(plansSelector)

  React.useEffect(() => {
    if (plansCategories) return

    dispatch(getPlansCategories())
  }, [])

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: 'center' }}>
      {/* Категорії (відділення) */}
      <Grid item xs={12} md={9}>
        <Grid container>
          <Grid item>
            <Typography variant="h5">Плани</Typography>
          </Grid>
          <Grid item />
        </Grid>
      </Grid>

      <Grid item xs={12} md={9}>
        {(!plansCategories ? [] : plansCategories).map((planCategory) => (
          <Accordion key={planCategory.id} disableGutters>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<DownOutlined />}>
              <Typography
                sx={{
                  flexGrow: 1,
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                }}
                variant="h6"
              >
                {planCategory.name}
              </Typography>

              <Typography
                sx={{ color: 'text.secondary', display: 'flex', justifyContent: 'end', alignItems: 'center', mr: 4 }}
              >
                Планів в категорії: {planCategory.plans.length}
              </Typography>

              <IconButton onClick={(e) => e.stopPropagation()} sx={{ mr: '5px' }}>
                <EditOutlined />
              </IconButton>

              <IconButton onClick={(e) => e.stopPropagation()} sx={{ mr: '15px' }}>
                <DeleteOutlined />
              </IconButton>
            </AccordionSummary>

            <AccordionDetails>
              <List>
                {planCategory.plans.map((plan) => (
                  <Link to={`/plans/${plan.id}`} style={{ color: 'inherit' }}>
                    <Divider />
                    <ListItem disablePadding key={plan.id}>
                      <ListItemButton>
                        <ListItemText primary={plan.name} />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
    </Grid>
  )
}

export { PlansPage }
