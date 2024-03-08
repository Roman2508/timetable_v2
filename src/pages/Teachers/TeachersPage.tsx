// material-ui
import { Grid, Typography } from '@mui/material'

// project import
import React from 'react'
import MainCard from '../../components/MainCard'
import CreateTeacherForm from '../../components/TeachersPage/CreateTeacherForm'
import UpdateTeacherModal from '../../components/TeachersPage/UpdateTeacherModal'
import { AccordionItemsList } from '../../components/AccordionItemsList/AccordionItemsList'
import CreateTeachersCategoryForm from '../../components/TeachersPage/CreateTeachersCategoryForm'
import UpdateTeachersCategoryForm from '../../components/TeachersPage/UpdateTeachersCategoryForm'

// ==============================|| PLANS ||============================== //

const teachers = [
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
          <Grid item xs={8} sx={{ borderRadius: '8px', border: '1px solid #e6ebf1', overflow: 'hidden' }}>
            {/* TEACHERS LIST */}
            <AccordionItemsList
              items={teachers}
              setIsUpdateItemModalOpen={setIsUpdateTeacherModalOpen}
              setIsUpdateCategoryModalOpen={setIsUpdateCategoryModalOpen}
            />
            {/* // TEACHERS LIST */}
          </Grid>

          <Grid item xs={4} sx={{ ml: 2 }}>
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
        </Grid>
      </Grid>
    </>
  )
}

export { TeachersPage }
