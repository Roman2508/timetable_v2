// material-ui
import { Stack, Button, MenuItem, TextField, InputLabel, OutlinedInput, FormHelperText, Grid } from '@mui/material'
import React from 'react'

// project import
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

interface IAuditoriesFields {
  firstName: string
  middleName: number
  lastName: number
  email: string
  calendarUrl: string
  category: number
}

interface ICreateTeacherFormProps {
  isOpenInModal?: boolean
}

const CreateTeacherForm: React.FC<ICreateTeacherFormProps> = ({ isOpenInModal }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IAuditoriesFields>({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<IAuditoriesFields> = async (data) => {
    try {
      console.log(data)
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
          rules={{ required: 'Вкажіть по батькові' }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="email">Пошта*</InputLabel>
                <OutlinedInput
                  id="email"
                  type="email"
                  {...field}
                  // value={values.firstname}
                  name="email"
                  // onBlur={handleBlur}
                  // onChange={handleChange}
                  placeholder="test.teacher@pharm.zt.ua"
                  fullWidth
                  error={Boolean(errors.email)}
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
                  {...field}
                  fullWidth
                  id="category"
                  //   value={value}
                  //   onChange={(e) => setValue(e.target.value)}
                  sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' } }}
                >
                  {[
                    { value: '1', label: 'Фармація, промислова фармація (ДФ)' },
                    { value: '2', label: 'Фармація, промислова фармація (ДФ)' },
                    { value: '3', label: 'Лабораторна діагностика (ДФ)' },
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
      </div>

      <Button
        variant="contained"
        color="primary"
        sx={{
          textTransform: 'capitalize',
          width: '100%',
          p: '7.44px 15px',
          mt: 3,
        }}
      >
        {isOpenInModal ? 'Оновити' : 'Створити'}
      </Button>
    </form>
  )
}

export default CreateTeacherForm
