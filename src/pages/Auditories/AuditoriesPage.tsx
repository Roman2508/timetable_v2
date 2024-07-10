// material-ui
import { Grid, Typography } from '@mui/material'

// project import
import React from 'react'
import { useSelector } from 'react-redux'
import MainCard from '../../components/MainCard'
import { useAppDispatch } from '../../store/store'
import { auditoriesSelector } from '../../store/auditories/auditoriesSlise'
import CreateAuditoryForm from '../../components/AuditoriesPage/CreateAuditoryForm'
import UpdateAuditoryModal from '../../components/AuditoriesPage/UpdateAuditoryModal'
import { AccordionItemsList } from '../../components/AccordionItemsList/AccordionItemsList'
import CreateAuditoryCategoryForm from '../../components/AuditoriesPage/CreateAuditoryCategoryForm'
import UpdateAuditoryCategoryForm from '../../components/AuditoriesPage/UpdateAuditoryCategoryModal'
import {
  deleteAuditory,
  deleteAuditoryCategory,
  getAuditoryCategories,
} from '../../store/auditories/auditoriesAsyncActions'
import { LoadingStatusTypes } from '../../store/appTypes'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import { AuditoriesTypes } from '../../store/auditories/auditoriesTypes'

// ==============================|| AUDITORIES ||============================== //

const AuditoriesPage = () => {
  const dispatch = useAppDispatch()

  const { auditoriCategories, loadingStatus } = useSelector(auditoriesSelector)

  const [isAuditoryModalOpen, setIsAuditoryModalOpen] = React.useState(false)
  const [isAuditoryCategoryModalOpen, setIsAuditoryCategoryModalOpen] = React.useState(false)
  const [editingAuditory, setEditingAuditory] = React.useState<AuditoriesTypes | null>(null)
  const [editingAuditoryCategory, setEditingAuditoryCategory] = React.useState<{
    id: number
    name: string
  } | null>(null)

  React.useEffect(() => {
    if (auditoriCategories) return

    dispatch(getAuditoryCategories())
  }, [])

  const onDeleteAuditory = (id: number) => {
    try {
      if (window.confirm('Ви дійсно хочете видалити викладача?')) {
        dispatch(deleteAuditory(id))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onDeleteAuditoryCategory = (id: number, auditoriesCount: number) => {
    try {
      if (!window.confirm('Ви дійсно хочете видалити категорію?')) return

      if (auditoriesCount > 0) {
        alert('В категорії не повинно бути аудиторій')
      } else {
        dispatch(deleteAuditoryCategory(id))
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <UpdateAuditoryModal
        open={isAuditoryModalOpen}
        setOpen={setIsAuditoryModalOpen}
        editingAuditory={editingAuditory}
      />

      <UpdateAuditoryCategoryForm
        open={isAuditoryCategoryModalOpen}
        setOpen={setIsAuditoryCategoryModalOpen}
        editingAuditoryCategory={editingAuditoryCategory}
      />

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
          <Grid
            item
            xs={8}
            sx={{ borderRadius: '8px', border: '1px solid #e6ebf1', overflow: 'hidden', backgroundColor: '#fff' }}
          >
            {/* AUDITORIES LIST */}
            {!auditoriCategories && loadingStatus === LoadingStatusTypes.LOADING && <LoadingSpinner />}
            {!auditoriCategories?.length && loadingStatus !== LoadingStatusTypes.LOADING && <EmptyCard />}
            {auditoriCategories?.length && (
              <AccordionItemsList
                items={auditoriCategories}
                /* @ts-ignore */
                onEditItem={setEditingAuditory}
                onDeleteItem={onDeleteAuditory}
                onEditMainItem={setEditingAuditoryCategory}
                onDeleteMainItem={onDeleteAuditoryCategory}
                setIsUpdateItemModalOpen={setIsAuditoryModalOpen}
                setIsUpdateCategoryModalOpen={setIsAuditoryCategoryModalOpen}
              />
            )}
            {/* // AUDITORIES LIST */}
          </Grid>

          <Grid item xs={4} sx={{ ml: 2 }}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <MainCard>
                <Typography variant="button" sx={{ textAlign: 'center', display: 'block', textTransform: 'uppercase' }}>
                  Додати нову аудиторію
                </Typography>

                <CreateAuditoryForm editingAuditory={null} />
              </MainCard>
            </Grid>

            <Grid item xs={12}>
              <MainCard>
                <Typography variant="button" sx={{ textAlign: 'center', display: 'block', textTransform: 'uppercase' }}>
                  Додати нову категорію
                </Typography>

                <CreateAuditoryCategoryForm editingAuditoryCategory={null} />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default AuditoriesPage
