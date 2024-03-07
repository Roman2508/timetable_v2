// material-ui
import { Stack, Button, MenuItem, TextField, InputLabel, OutlinedInput, FormHelperText } from '@mui/material'
import React from 'react'

// project import
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

interface IAuditoriesFields {
  name: string
  seatsCount: number
  category: number
}

interface ICreateAuditoryFormProps {
  isOpenInModal?: boolean
}

const CreateAuditoryForm: React.FC<ICreateAuditoryFormProps> = ({ isOpenInModal }) => {
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
                type="firstname"
                {...field}
                // value={values.firstname}
                name="name"
                // onBlur={handleBlur}
                // onChange={handleChange}
                placeholder="PH-24-1"
                fullWidth
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
        name="seatsCount"
        control={control}
        rules={{ required: 'Вкажіть кількість місць в аудиторії' }}
        render={({ field }) => {
          return (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <InputLabel htmlFor="seatsCount">Кількість місць*</InputLabel>
              <OutlinedInput
                id="seatsCount"
                type="seatsCount"
                {...field}
                // value={values.firstname}
                name="seatsCount"
                // onBlur={handleBlur}
                // onChange={handleChange}
                placeholder="30"
                fullWidth
                error={Boolean(errors.seatsCount)}
              />
              {errors.seatsCount && (
                <FormHelperText error id="helper-text-seatsCount">
                  {errors.seatsCount.message}
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

export default CreateAuditoryForm
