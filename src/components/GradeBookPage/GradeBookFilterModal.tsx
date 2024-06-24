import {
  Stack,
  Dialog,
  Button,
  MenuItem,
  TextField,
  IconButton,
  InputLabel,
  DialogTitle,
  DialogContent,
  DialogActions,
  OutlinedInput,
  FormHelperText,
} from '@mui/material'
import { CloseOutlined } from '@ant-design/icons'
import React, { Dispatch, SetStateAction } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { customDayjs } from '../Calendar/Calendar'

interface IGradeBookFilterModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

interface IGradeBookFilterFields {
  year: number
  semester: number
  group: number
  lessonName: string
}

const GradeBookFilterModal: React.FC<IGradeBookFilterModalProps> = ({ open, setOpen }) => {
  const getAvailableYears = (): number[] => {
    const years: number[] = []
    const currentYear = customDayjs().year()
    Array(5)
      .fill(null)
      .map((_, index) => {
        const year = currentYear - index
        years.push(year)
      })
    return years.reverse()
  }

  const handleClose = () => {
    setOpen(false)
  }

  const {
    reset,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<IGradeBookFilterFields>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<IGradeBookFilterFields> = async (data) => {
    try {
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle id="alert-dialog-title">Знайти електронний журнал:</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>

      <DialogContent sx={{ padding: '0 24px 20px', maxWidth: '295px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="year"
            control={control}
            rules={{ required: 'Виберіть рік' }}
            render={({ field }) => {
              return (
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <InputLabel htmlFor="year">Рік*</InputLabel>
                  <TextField
                    select
                    fullWidth
                    {...field}
                    id="year"
                    sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' } }}
                  >
                    {getAvailableYears().map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              )
            }}
          />

          <Controller
            name="semester"
            control={control}
            rules={{ required: 'Виберіть семестр' }}
            render={({ field }) => {
              return (
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <InputLabel htmlFor="semestr">Семестр*</InputLabel>
                  <TextField
                    select
                    fullWidth
                    {...field}
                    id="semestr"
                    sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' } }}
                  >
                    {[1, 2].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              )
            }}
          />

          <Controller
            name="group"
            control={control}
            rules={{ required: 'Виберіть групу' }}
            render={({ field }) => {
              return (
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <InputLabel htmlFor="group">Група*</InputLabel>
                  <TextField
                    select
                    fullWidth
                    {...field}
                    id="group"
                    sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' } }}
                  >
                    {['LD-23-1', 'PH-22-1', 'PH-23-1', 'PH-24-1'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              )
            }}
          />

          <Controller
            name="lessonName"
            control={control}
            rules={{ required: 'Виберіть дисципліну' }}
            render={({ field }) => {
              return (
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <InputLabel htmlFor="lessonName">Дисципліна*</InputLabel>
                  <TextField
                    select
                    fullWidth
                    {...field}
                    id="lessonName"
                    sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' } }}
                  >
                    {[
                      'ПЗ / Інформатика (1 підгрупа)',
                      'ПЗ / Інформатика (2 підгрупа)',
                      'ЛК / Інформаційні технології у фармації (Вся група)',
                      'ПЗ / Інформаційні технології у фармації (1 підгрупа)',
                      'ПЗ / Інформаційні технології у фармації (2 підгрупа)',
                    ].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              )
            }}
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" disabled={isSubmitting}>
          Вибрати
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default GradeBookFilterModal
