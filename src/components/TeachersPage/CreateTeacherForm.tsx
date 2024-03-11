// material-ui
import { Stack, Button, MenuItem, TextField, InputLabel, OutlinedInput, FormHelperText } from '@mui/material'

// project import
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { TeachersType } from '../../store/teachers/teachersTypes'
import { useSelector } from 'react-redux'
import { teachersSelector } from '../../store/teachers/teachersSlice'
import { useAppDispatch } from '../../store/store'
import { createTeacher, updateTeacher } from '../../store/teachers/teachersAsyncActions'
import { emailRegex } from '../../utils/emailRegex'

interface IAuditoriesFields {
  firstName: string
  middleName: string
  lastName: string
  email: string
  calendarUrl: string
  category: number
}

interface ICreateTeacherFormProps {
  isOpenInModal?: boolean
  handleClose?: () => void
  editingTeacher: TeachersType | null
}

const CreateTeacherForm: React.FC<ICreateTeacherFormProps> = ({
  isOpenInModal,
  editingTeacher,
  handleClose = () => {},
}) => {
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
        await dispatch(updateTeacher({ ...data, id: editingTeacher.id }))
        handleClose()
        reset({ calendarUrl: '', email: '', firstName: '', lastName: '', middleName: '' })
      } else {
        // Якщо форму відкрито НЕ в модалці - створення викладача
        await dispatch(createTeacher(data))
        reset({ calendarUrl: '', email: '', firstName: '', lastName: '', middleName: '' })
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
          name="lastName"
          control={control}
          rules={{ required: 'Вкажіть прізвище викладача' }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="lastName">Прізвище*</InputLabel>
                <OutlinedInput
                  id="lastName"
                  type="lastName"
                  {...field}
                  // value={values.lastName}
                  name="lastName"
                  // onBlur={handleBlur}
                  // onChange={handleChange}
                  placeholder="Прізвище"
                  fullWidth
                  error={Boolean(errors.lastName)}
                />
                {errors.lastName && (
                  <FormHelperText error id="helper-text-lastName">
                    {errors.lastName.message}
                  </FormHelperText>
                )}
              </Stack>
            )
          }}
        />

        <Controller
          name="firstName"
          control={control}
          rules={{ required: "Вкажіть ім'я викладача" }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="firstName">Ім'я*</InputLabel>
                <OutlinedInput
                  id="firstName"
                  type="firstname"
                  {...field}
                  // value={values.firstname}
                  name="firstName"
                  // onBlur={handleBlur}
                  // onChange={handleChange}
                  placeholder="Ім'я"
                  fullWidth
                  error={Boolean(errors.firstName)}
                />
                {errors.firstName && (
                  <FormHelperText error id="helper-text-firstName">
                    {errors.firstName.message}
                  </FormHelperText>
                )}
              </Stack>
            )
          }}
        />

        <Controller
          name="middleName"
          control={control}
          rules={{ required: 'Вкажіть по батькові' }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="middleName">По батькові*</InputLabel>
                <OutlinedInput
                  id="middleName"
                  type="middleName"
                  {...field}
                  // value={values.firstname}
                  name="middleName"
                  // onBlur={handleBlur}
                  // onChange={handleChange}
                  placeholder="По батькові"
                  fullWidth
                  error={Boolean(errors.middleName)}
                />
                {errors.middleName && (
                  <FormHelperText error id="helper-text-middleName">
                    {errors.middleName.message}
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
            required: 'Вкажіть пошту викладача',
            pattern: {
              value: emailRegex,
              message: 'Не вірний формат пошти',
            },
          }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="email">Пошта*</InputLabel>
                <OutlinedInput
                  fullWidth
                  {...field}
                  id="email"
                  type="email"
                  name="email"
                  error={Boolean(errors.email)}
                  placeholder="test.teacher@pharm.zt.ua"
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
          name="calendarUrl"
          control={control}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="calendarUrl">ID календаря</InputLabel>
                <OutlinedInput
                  id="calendarUrl"
                  type="calendarUrl"
                  {...field}
                  // value={values.firstname}
                  name="calendarUrl"
                  // onBlur={handleBlur}
                  // onChange={handleChange}
                  placeholder="https://calendar.google.com"
                  fullWidth
                  error={Boolean(errors.calendarUrl)}
                />
                {errors.calendarUrl && (
                  <FormHelperText error id="helper-text-calendarUrl">
                    {errors.calendarUrl.message}
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

export default CreateTeacherForm
