import React from 'react'
import { useSelector } from 'react-redux'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Stack, Button, MenuItem, TextField, InputLabel, OutlinedInput, FormHelperText } from '@mui/material'

import { useAppDispatch } from '../../store/store'
import { AuditoriesTypes } from '../../store/auditories/auditoriesTypes'
import { auditoriesSelector } from '../../store/auditories/auditoriesSlise'
import { createAuditory, updateAuditory } from '../../store/auditories/auditoriesAsyncActions'

interface IAuditoriesFields {
  name: string
  seatsNumber: number
  category: number
}

interface ICreateAuditoryFormProps {
  isOpenInModal?: boolean
  handleClose?: () => void
  editingAuditory: AuditoriesTypes | null
}

const CreateAuditoryForm: React.FC<ICreateAuditoryFormProps> = ({
  isOpenInModal,
  editingAuditory,
  handleClose = () => {},
}) => {
  const dispatch = useAppDispatch()

  const { auditoriCategories } = useSelector(auditoriesSelector)

  const defaultFormValues = editingAuditory
    ? {
        name: editingAuditory.name,
        seatsNumber: editingAuditory.seatsNumber,
        category: editingAuditory.category.id,
      }
    : {}

  const {
    reset,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<IAuditoriesFields>({
    mode: 'onBlur',
    defaultValues: defaultFormValues,
  })

  const onSubmit: SubmitHandler<IAuditoriesFields> = async (data) => {
    try {
      // Якщо форму відкрито в модалці - оновлення викладача
      if (isOpenInModal) {
        if (!editingAuditory) return
        await dispatch(updateAuditory({ ...data, id: editingAuditory.id }))
        handleClose()
        reset({ name: '', seatsNumber: 1 })
      } else {
        // Якщо форму відкрито НЕ в модалці - створення викладача
        await dispatch(createAuditory(data))
        reset({ name: '', seatsNumber: 1 })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Вкажіть назву аудиторії' }}
        render={({ field }) => {
          return (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <InputLabel htmlFor="name">Назва*</InputLabel>
              <OutlinedInput
                id="name"
                {...field}
                fullWidth
                name="name"
                placeholder="111"
                error={Boolean(errors.name)}
              />
              {errors.name && (
                <FormHelperText error id="helper-text-name">
                  {errors.name.message}
                </FormHelperText>
              )}
            </Stack>
          )
        }}
      />

      <Controller
        name="seatsNumber"
        control={control}
        rules={{ required: 'Вкажіть кількість місць в аудиторії' }}
        render={({ field }) => {
          return (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <InputLabel htmlFor="seatsNumber">Кількість місць*</InputLabel>
              <OutlinedInput
                {...field}
                fullWidth
                id="seatsNumber"
                placeholder="30"
                name="seatsNumber"
                error={Boolean(errors.seatsNumber)}
              />
              {errors.seatsNumber && (
                <FormHelperText error id="helper-text-seatsNumber">
                  {errors.seatsNumber.message}
                </FormHelperText>
              )}
            </Stack>
          )
        }}
      />

      <Controller
        name="category"
        control={control}
        rules={{ required: 'Вкажіть категорію' }}
        render={({ field }) => {
          return (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <InputLabel htmlFor="category">Категорія*</InputLabel>
              <TextField
                select
                fullWidth
                {...field}
                id="category"
                sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' } }}
              >
                {(!auditoriCategories ? [] : auditoriCategories).map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
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
        {isOpenInModal && !isSubmitting ? 'Оновити' : !isSubmitting ? 'Створити' : 'Завантаження...'}
      </Button>
    </form>
  )
}

export default CreateAuditoryForm
