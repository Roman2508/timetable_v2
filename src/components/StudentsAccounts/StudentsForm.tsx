// material-ui
import {
  Stack,
  Button,
  MenuItem,
  TextField,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Tooltip,
  Typography,
} from '@mui/material'

// project import
import React from 'react'
import { useSelector } from 'react-redux'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useAppDispatch } from '../../store/store'
import { emailRegex } from '../../utils/emailRegex'
import { TeachersType } from '../../store/teachers/teachersTypes'
import { teachersSelector } from '../../store/teachers/teachersSlice'

interface IAuditoriesFields {
  name: string

  login: string
  password: string
  email: string
  status: string
  category: number
}

interface IStudentsProps {
  isOpenInModal?: boolean
  handleClose?: () => void
  editingTeacher: TeachersType | null
}

const StudentsForm: React.FC<IStudentsProps> = ({ isOpenInModal, editingTeacher, handleClose = () => {} }) => {
  const dispatch = useAppDispatch()

  const { teachersCategories } = useSelector(teachersSelector)

  const {
    reset,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<IAuditoriesFields>({
    mode: 'onBlur',
    defaultValues: editingTeacher ? { ...editingTeacher, category: editingTeacher.category.id } : {},
  })

  const onSubmit: SubmitHandler<IAuditoriesFields> = async (data) => {
    try {
      // Якщо форму відкрито в модалці - оновлення викладача
      if (isOpenInModal) {
        if (!editingTeacher) return
        alert('await dispatch(updateTeacher({ ...data, id: editingTeacher.id }))')
        handleClose()
        reset({ status: '', email: '', login: '', name: '', password: '' })
      } else {
        // Якщо форму відкрито НЕ в модалці - створення викладача
        alert('await dispatch(createTeacher(data))')
        reset({ status: '', email: '', login: '', name: '', password: '' })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={
          isOpenInModal
            ? {
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: '0 20px',
              }
            : {}
        }
      >
        <Controller
          name="name"
          control={control}
          rules={{ required: "Це обов'язкове поле" }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="name">ПІБ*</InputLabel>
                <OutlinedInput
                  fullWidth
                  {...field}
                  id="name"
                  type="name"
                  name="name"
                  placeholder="ПІБ"
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
          name="login"
          control={control}
          rules={{ required: "Це обов'язкове поле" }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="login">Логін*</InputLabel>
                <OutlinedInput
                  fullWidth
                  {...field}
                  id="login"
                  type="login"
                  name="login"
                  placeholder="test.student"
                  error={Boolean(errors.login)}
                />
                {errors.login && (
                  <FormHelperText error id="helper-text-login">
                    {errors.login.message}
                  </FormHelperText>
                )}
              </Stack>
            )
          }}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: "Це обов'язкове поле" }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="password">Пароль*</InputLabel>
                <OutlinedInput
                  fullWidth
                  {...field}
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  error={Boolean(errors.password)}
                />
                {errors.password && (
                  <FormHelperText error id="helper-text-password">
                    {errors.password.message}
                  </FormHelperText>
                )}
              </Stack>
            )
          }}
        />

        <Controller
          name="email"
          control={control}
          rules={{
            required: "Це обов'язкове поле",
            pattern: {
              value: emailRegex,
              message: 'Не вірний формат пошти',
            },
          }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="email">Ел. пошта*</InputLabel>
                <OutlinedInput
                  fullWidth
                  {...field}
                  id="email"
                  type="email"
                  name="email"
                  error={Boolean(errors.email)}
                  placeholder="test.student@pharm.zt.ua"
                />
                {errors.email && (
                  <FormHelperText error id="helper-text-email">
                    {errors.email.message}
                  </FormHelperText>
                )}
              </Stack>
            )
          }}
        />

        <Controller
          name="status"
          control={control}
          rules={{ required: "Це обов'язкове поле" }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="status">Статус*</InputLabel>
                <TextField
                  select
                  fullWidth
                  {...field}
                  id="status"
                  sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' } }}
                >
                  {[
                    { label: 'Навчається', value: 'studying' },
                    { label: 'Відраховано', value: 'suspended' },
                    { label: 'Академічна відпустка', value: 'academic-leave' },
                  ].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
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
                <InputLabel htmlFor="category">Група*</InputLabel>
                <TextField
                  select
                  fullWidth
                  {...field}
                  id="category"
                  sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' } }}
                >
                  {(!teachersCategories ? [] : teachersCategories).map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            )
          }}
        />
      </div>

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

export { StudentsForm }
