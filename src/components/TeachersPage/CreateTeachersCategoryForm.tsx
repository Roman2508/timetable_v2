// material-ui
import { Stack, Button, InputLabel, OutlinedInput, FormHelperText } from '@mui/material'
import React from 'react'

// project import
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch } from '../../store/store'
import { createTeacherCategory, updateTeacherCategory } from '../../store/teachers/teachersAsyncActions'

interface ICreateTeachersCategoryFormProps {
  isOpenInModal?: boolean
  handleClose?: () => void
  editingTeacherCategory: { id: number; name: string } | null
}

const CreateTeachersCategoryForm: React.FC<ICreateTeachersCategoryFormProps> = ({
  isOpenInModal,
  handleClose = () => {},
  editingTeacherCategory,
}) => {
  const dispatch = useAppDispatch()

  const {
    control,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<{ name: string }>({
    mode: 'onBlur',
    defaultValues: {
      name: editingTeacherCategory ? editingTeacherCategory.name : '',
    },
  })

  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
    try {
      // Якщо форма відкита в модалці - редагування категорії
      if (isOpenInModal) {
        if (!editingTeacherCategory) return
        dispatch(updateTeacherCategory({ name: data.name, id: editingTeacherCategory.id }))
      } else {
        // Якщо форма відкита НЕ в модалці - створення категорії
        await dispatch(createTeacherCategory({ name: data.name }))
        setValue('name', '')
      }
    } catch (error) {
      console.log(error)
    } finally {
      handleClose()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Вкажіть назву категорії' }}
        render={({ field }) => {
          return (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <InputLabel htmlFor={`${isOpenInModal ? isOpenInModal : ''}-name`}>Назва*</InputLabel>
              <OutlinedInput
                fullWidth
                id="name"
                {...field}
                name="name"
                type="firstname"
                placeholder="Назва ЦК"
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

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isSubmitting}
        sx={{
          textTransform: 'capitalize',
          width: '100%',
          p: '7.44px 15px',
          mt: 3,
        }}
      >
        {isOpenInModal && !isSubmitting ? 'Оновити' : !isSubmitting ? 'Створити' : 'Завантаження...'}
      </Button>
    </form>
  )
}

export default CreateTeachersCategoryForm
