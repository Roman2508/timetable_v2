import React, { Dispatch, SetStateAction } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Stack, Button, MenuItem, TextField, InputLabel, OutlinedInput } from '@mui/material'

import { IndividualTeacherWordTypes } from '../../../store/teacherProfile/teacherProfileTypes'

export interface IFormState {
  name: string
  hours: number
  category: `${IndividualTeacherWordTypes}`
}

const categoriesTypes: `${IndividualTeacherWordTypes}`[] = [
  'Методична робота',
  'Наукова робота',
  'Організаційна робота',
]

const initialFormValues = { name: '', hours: 0, category: IndividualTeacherWordTypes.METHODICAL_WORK }

interface IIndividualTeacherWorkFormProps {
  editingIndividualTeacherWork: IFormState | null
  setEditingIndividualTeacherWork: Dispatch<SetStateAction<IFormState | null>>
}

export const IndividualTeacherWorkForm: React.FC<IIndividualTeacherWorkFormProps> = (props) => {
  const { editingIndividualTeacherWork, setEditingIndividualTeacherWork } = props

  const {
    reset,
    watch,
    control,
    setValue,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<IFormState>({
    mode: 'onBlur',
    defaultValues: initialFormValues,
  })

  const isSomeFieldIsEmpty = !watch('name') || !watch('hours') || !watch('category')

  const onSubmit: SubmitHandler<IFormState> = async (data) => {
    try {
      console.log(data)
      // await dispatch(createIndividualTeacherWork(data))
      reset(initialFormValues)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (!editingIndividualTeacherWork) return
    setValue('name', editingIndividualTeacherWork.name)
    setValue('hours', editingIndividualTeacherWork.hours)
    setValue('category', editingIndividualTeacherWork.category)
  }, [editingIndividualTeacherWork])

  return (
    <form style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{ required: 'Вкажіть кількість місць в аудиторії' }}
        render={({ field }) => {
          return (
            <Stack spacing={1} sx={{ mt: 2, flex: 1 }}>
              <InputLabel htmlFor="name">Кількість місць*</InputLabel>
              <OutlinedInput {...field} fullWidth id="name" name="name" />
            </Stack>
          )
        }}
      />

      <Controller
        name="hours"
        control={control}
        rules={{ required: 'Вкажіть кількість місць в аудиторії' }}
        render={({ field }) => {
          return (
            <Stack spacing={1} sx={{ mt: 2, flex: 1 }}>
              <InputLabel htmlFor="hours">Години*</InputLabel>
              <OutlinedInput {...field} fullWidth id="hours" name="hours" type="number" />
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
            <Stack spacing={1} sx={{ mt: 2, flex: 1 }}>
              <InputLabel htmlFor="category">Категорія*</InputLabel>
              <TextField
                select
                {...field}
                id="category"
                sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' } }}
              >
                {categoriesTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          )
        }}
      />

      {editingIndividualTeacherWork?.name && (
        <Button
          type="button"
          color="primary"
          variant="outlined"
          disabled={isSubmitting || isSomeFieldIsEmpty}
          onClick={() => setEditingIndividualTeacherWork(initialFormValues)}
          sx={{ textTransform: 'capitalize', width: '100%', p: '7.6px 15px', mt: 3, maxWidth: '120px' }}
        >
          Відмінити
        </Button>
      )}

      <Button
        type="submit"
        color="primary"
        variant="contained"
        disabled={isSubmitting || isSomeFieldIsEmpty}
        sx={{ textTransform: 'capitalize', width: '100%', p: '8.4px 15px', mt: 3, maxWidth: '120px' }}
      >
        {editingIndividualTeacherWork?.name ? 'Оновити' : 'Cтворити'}
      </Button>
    </form>
  )
}
