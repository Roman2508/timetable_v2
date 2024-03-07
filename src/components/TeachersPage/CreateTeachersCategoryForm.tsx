// material-ui
import { Stack, Button, InputLabel, OutlinedInput, FormHelperText } from '@mui/material'
import React from 'react'

// project import
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

interface ICreateTeachersCategoryFormProps {
  isOpenInModal?: boolean
}

const CreateTeachersCategoryForm: React.FC<ICreateTeachersCategoryFormProps> = ({ isOpenInModal }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<{ name: string }>({
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
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
        rules={{ required: 'Вкажіть назву категорії' }}
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
                placeholder="Назва ЦК"
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

export default CreateTeachersCategoryForm
