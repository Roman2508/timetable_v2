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
import MainCard from '../../components/MainCard'
import CreateTeacherForm from '../../components/TeachersPage/CreateTeacherForm'
import CreateTeachersCategoryForm from '../../components/TeachersPage/CreateTeachersCategoryForm'
import UpdateTeacherModal from '../../components/TeachersPage/UpdateTeacherModal'
import React from 'react'
import UpdateTeachersCategoryForm from '../../components/TeachersPage/UpdateTeachersCategoryForm'

// ==============================|| PLANS ||============================== //

const plans = [
  {
    id: 1,
    name: 'ЦК Хімічних дисциплін',
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
    name: 'ЦК Фармацевтичних дисциплін',
    items: [
      { id: 1, name: 'Фармація, промислова фармація (ДФ)' },
      { id: 2, name: 'Фармація, промислова фармація (ДФ)' },
      { id: 5, name: 'Фармація, промислова фармація (ДФ)' },
    ],
  },
  {
    id: 3,
    name: 'ЦК Медико-біологічних дисциплін',
    items: [
      { id: 6, name: 'Фармація, промислова фармація (ЗФ)' },
      { id: 7, name: 'Фармація, промислова фармація (ДФ)' },
      { id: 8, name: 'Фармація, промислова фармація (ЗФ)' },
    ],
  },
  {
    id: 4,
    name: 'ЦК Загальноосвітніх дисциплін',
    items: [
      { id: 9, name: 'Фармація, промислова фармація (ЗФ)' },
      { id: 10, name: 'Фармація, промислова фармація (ЗФ)' },
      { id: 11, name: 'Лабораторна діагностика (ДФ)' },
    ],
  },
  {
    id: 5,
    name: 'ЦК Гумарітарних дисциплін',
    items: [
      { id: 9, name: 'Фармація, промислова фармація (ЗФ)' },
      { id: 10, name: 'Фармація, промислова фармація (ЗФ)' },
      { id: 11, name: 'Лабораторна діагностика (ДФ)' },
    ],
  },
]

const TeachersPage = () => {
  const [isUpdateTeacherModalOpen, setIsUpdateTeacherModalOpen] = React.useState(false)
  const [isUpdateCategoryModalOpen, setIsUpdateCategoryModalOpen] = React.useState(false)

  return (
    <>
      <UpdateTeacherModal open={isUpdateTeacherModalOpen} setOpen={setIsUpdateTeacherModalOpen} />
      <UpdateTeachersCategoryForm open={isUpdateCategoryModalOpen} setOpen={setIsUpdateCategoryModalOpen} />

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: 'center' }}>
        {/* Категорії (відділення) */}
        <Grid item xs={12} md={10}>
          <Grid container>
            <Grid item>
              <Typography variant="h5">Викладачі</Typography>
            </Grid>
            <Grid item />
          </Grid>
        </Grid>

        <Grid item xs={12} md={10} sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Grid item xs={4} sx={{ mr: 2 }}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <MainCard>
                <Typography variant="button" sx={{ textAlign: 'center', display: 'block', textTransform: 'uppercase' }}>
                  Додати нового викладача
                </Typography>

                <CreateTeacherForm />
              </MainCard>
            </Grid>

            <Grid item xs={12}>
              <MainCard>
                <Typography variant="button" sx={{ textAlign: 'center', display: 'block', textTransform: 'uppercase' }}>
                  Додати нову категорію
                </Typography>

                <CreateTeachersCategoryForm />
              </MainCard>
            </Grid>
          </Grid>

          <Grid item xs={8} sx={{ borderRadius: '8px', border: '1px solid #e6ebf1', overflow: 'hidden' }}>
            {plans.map((planCategory) => (
              <Accordion key={planCategory.id} sx={{ boxShadow: 0, border: '' }}>
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
                    sx={{
                      color: 'text.secondary',
                      display: 'flex',
                      justifyContent: 'end',
                      alignItems: 'center',
                      mr: 4,
                    }}
                  >
                    Викладачів: {planCategory.items.length}
                  </Typography>

                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsUpdateCategoryModalOpen(true)
                    }}
                    sx={{ mr: '5px' }}
                  >
                    <EditOutlined />
                  </IconButton>

                  <IconButton onClick={(e) => e.stopPropagation()} sx={{ mr: '15px' }}>
                    <DeleteOutlined />
                  </IconButton>
                </AccordionSummary>

                <AccordionDetails sx={{ p: 0 }}>
                  <List>
                    {planCategory.items.map((plan) => (
                      <div>
                        <Divider />
                        <ListItem
                          disablePadding
                          key={plan.id}
                          sx={{ '&:hover .MuiButtonBase-root': { display: 'block' } }}
                        >
                          <ListItemButton>
                            <ListItemText primary={plan.name} />
                          </ListItemButton>

                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation()
                              setIsUpdateTeacherModalOpen(true)
                            }}
                            sx={{ mr: '5px', display: 'none' }}
                          >
                            <EditOutlined />
                          </IconButton>

                          <IconButton onClick={(e) => e.stopPropagation()} sx={{ mr: '5px', display: 'none' }}>
                            <DeleteOutlined />
                          </IconButton>
                        </ListItem>
                      </div>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export { TeachersPage }
