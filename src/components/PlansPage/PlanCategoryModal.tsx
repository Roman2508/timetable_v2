import {
  Stack,
  Button,
  Dialog,
  IconButton,
  InputLabel,
  DialogTitle,
  DialogContent,
  OutlinedInput,
  FormHelperText,
  DialogContentText,
} from '@mui/material'
import { CloseOutlined } from '@ant-design/icons'
import React, { Dispatch, SetStateAction } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useAppDispatch } from '../../store/store'
import { PlanModalInitialData, PlansActionModalTypes } from '../../pages/Plans/PlansPage'
import { createPlan, createPlanCategory, updatePlan, updatePlanCategory } from '../../store/plans/plansAsyncActions'

interface IPlanCategoryModalProps {
  open: boolean
  modalType: PlansActionModalTypes
  editingPlan: PlanModalInitialData | null
  setOpen: Dispatch<SetStateAction<boolean>>
  editingPlanCategory: PlanModalInitialData | null
  setEditingPlan: Dispatch<SetStateAction<PlanModalInitialData | null>>
  setEditingPlanCategory: Dispatch<SetStateAction<PlanModalInitialData | null>>
}

const PlanCategoryModal: React.FC<IPlanCategoryModalProps> = (props) => {
  const { open, setOpen, modalType, editingPlan, editingPlanCategory, setEditingPlan, setEditingPlanCategory } = props

  const dispatch = useAppDispatch()

  const handleClose = () => {
    reset({ name: '' })
    setOpen(false)
    setEditingPlanCategory(null)
    setEditingPlan(null)
  }

  const {
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<{ name: string }>({
    mode: 'onBlur',
    defaultValues: {
      name: editingPlanCategory ? editingPlanCategory.name : editingPlan ? editingPlan.name : '',
    },
  })

  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
    try {
      if (modalType === 'update-plan-category') {
        if (!editingPlanCategory) return
        await dispatch(updatePlanCategory({ ...data, id: editingPlanCategory.id }))
        return
      }

      if (modalType === 'create-plan-category') {
        await dispatch(createPlanCategory(data))
        return
      }

      if (modalType === 'create-plan') {
        if (!editingPlanCategory) return
        await dispatch(createPlan({ ...data, categoryId: editingPlanCategory.id }))
        return
      }

      if (modalType === 'update-plan') {
        if (!editingPlan) return
        await dispatch(updatePlan({ ...data, id: editingPlan.id }))
        return
      }
    } catch (error) {
      console.log(error)
    } finally {
      handleClose()
      reset({ name: '' })
    }
  }

  React.useEffect(() => {
    if (!editingPlanCategory || modalType === 'create-plan') return
    setValue('name', editingPlanCategory.name)
  }, [editingPlanCategory])

  React.useEffect(() => {
    if (!editingPlan || modalType !== 'update-plan') return
    setValue('name', editingPlan.name)
  }, [editingPlan])

  return (
    <Dialog open={open} onClose={handleClose}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle id="alert-dialog-title">
          {modalType === 'create-plan-category' && 'Нова категорія'}
          {modalType === 'update-plan-category' && 'Редагування категорії'}
          {modalType === 'create-plan' && 'Новий план'}
          {modalType === 'update-plan' && 'Редагувати план'}
        </DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>
      <DialogContent sx={{ padding: '0 24px 20px' }}>
        <DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              rules={{ required: modalType === 'update-plan' ? 'Вкажіть назву плану' : 'Вкажіть назву категорії' }}
              render={({ field }) => {
                return (
                  <Stack spacing={1} sx={{ mt: 2 }}>
                    <InputLabel htmlFor="name">Назва*</InputLabel>
                    <OutlinedInput
                      fullWidth
                      id="name"
                      {...field}
                      name="name"
                      type="text"
                      error={Boolean(errors.name)}
                    />
                    {errors.name && <FormHelperText error>{errors.name.message}</FormHelperText>}
                  </Stack>
                )
              }}
            />

            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              sx={{ textTransform: 'capitalize', width: '100%', p: '7.44px 15px', mt: 3 }}
            >
              {modalType.includes('update') && !isSubmitting && 'Оновити'}
              {modalType.includes('create') && !isSubmitting && 'Створити'}
              {isSubmitting && 'Завантаження...'}

              {/* {modalType === 'update-plan-category' && !isSubmitting
                ? 'Оновити'
                : modalType === 'update-plan' && !isSubmitting
                ? 'Оновити'
                : modalType === 'create-plan-category' && !isSubmitting
                ? 'Створити'
                : modalType === 'create-plan' && !isSubmitting
                ? 'Створити'
                : 'Завантаження...'} */}
            </Button>
          </form>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default PlanCategoryModal
