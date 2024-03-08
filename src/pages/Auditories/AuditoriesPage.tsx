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
import React from 'react'
import MainCard from '../../components/MainCard'
import CreateAuditoryForm from '../../components/AuditoriesPage/CreateAuditoryForm'
import UpdateAuditoryModal from '../../components/AuditoriesPage/UpdateAuditoryModal'
import CreateAuditoryCategoryForm from '../../components/AuditoriesPage/CreateAuditoryCategoryForm'
import UpdateAuditoryCategoryForm from '../../components/AuditoriesPage/UpdateAuditoryCategoryForm'
import { AccordionItemsList } from '../../components/AccordionItemsList/AccordionItemsList'

// ==============================|| AUDITORIES ||============================== //

const auditories = [
  {
    id: 1,
    name: '1 поверх',
    auditories: [
      { id: 1, name: 'Фармація, промислова фармація (ДФ)' },
      { id: 2, name: 'Фармація, промислова фармація (ДФ)' },
      { id: 3, name: 'Фармація, промислова фармація (ДФ)' },
      { id: 4, name: 'Фармація, промислова фармація (ДФ)' },
      { id: 5, name: 'Фармація, промислова фармація (ДФ)' },
    ],
  },
  {
    id: 2,
    name: '2 поверх',
    auditories: [
      { id: 6, name: 'Фармація, промислова фармація (ЗФ)' },
      { id: 7, name: 'Фармація, промислова фармація (ДФ)' },
      { id: 8, name: 'Фармація, промислова фармація (ЗФ)' },
    ],
  },
  {
    id: 3,
    name: '3 поверх',
    auditories: [
      { id: 9, name: 'Фармація, промислова фармація (ЗФ)' },
      { id: 10, name: 'Фармація, промислова фармація (ЗФ)' },
      { id: 11, name: 'Лабораторна діагностика (ДФ)' },
    ],
  },
  {
    id: 3,
    name: '4 поверх',
    auditories: [
      { id: 9, name: 'Фармація, промислова фармація (ЗФ)' },
      { id: 10, name: 'Фармація, промислова фармація (ЗФ)' },
      { id: 11, name: 'Лабораторна діагностика (ДФ)' },
    ],
  },
]

const AuditoriesPage = () => {
  const [isAuditoryModalOpen, setIsAuditoryModalOpen] = React.useState(false)
  const [isAuditoryCategoryModalOpen, setIsAuditoryCategoryModalOpen] = React.useState(false)

  return (
    <>
      <UpdateAuditoryModal open={isAuditoryModalOpen} setOpen={setIsAuditoryModalOpen} />
      <UpdateAuditoryCategoryForm open={isAuditoryCategoryModalOpen} setOpen={setIsAuditoryCategoryModalOpen} />

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: 'center' }}>
        <Grid item xs={12} md={10}>
          <Grid container>
            <Grid item>
              <Typography variant="h5">Аудиторії</Typography>
            </Grid>
            <Grid item />
          </Grid>
        </Grid>

        <Grid item xs={12} md={10} sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Grid item xs={8} sx={{ borderRadius: '8px', border: '1px solid #e6ebf1', overflow: 'hidden' }}>
            <AccordionItemsList
              items={auditories}
              setIsUpdateItemModalOpen={setIsAuditoryModalOpen}
              setIsUpdateCategoryModalOpen={setIsAuditoryCategoryModalOpen}
            />
          </Grid>

          <Grid item xs={4} sx={{ ml: 2 }}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <MainCard>
                <Typography variant="button" sx={{ textAlign: 'center', display: 'block', textTransform: 'uppercase' }}>
                  Додати нову аудиторію
                </Typography>

                <CreateAuditoryForm />
              </MainCard>
            </Grid>

            <Grid item xs={12}>
              <MainCard>
                <Typography variant="button" sx={{ textAlign: 'center', display: 'block', textTransform: 'uppercase' }}>
                  Додати нову категорію
                </Typography>

                <CreateAuditoryCategoryForm />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export { AuditoriesPage }
