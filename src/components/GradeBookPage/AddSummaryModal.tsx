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
} from "@mui/material"
import { CloseOutlined } from "@ant-design/icons"
import React, { Dispatch, SetStateAction } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { customDayjs } from "../Calendar/Calendar"

interface IAddSummaryModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

interface IGradeBookFilterFields {
  year: number
  semester: number
  group: number
  lessonName: string
}

const summaryTypes = [
  { label: "Рейтинг з модуля (середнє значення)", value: "MODULE_AVERAGE" },
  { label: "Рейтинг з модуля (сума)", value: "MODULE_SUM" },
  { label: "Рейтинг з дисципліни (середнє значення)", value: "LESSON_AVERAGE" },
  { label: "Рейтинг з дисципліни (сума)", value: "LESSON_SUM" },
  { label: "Модульний контроль", value: "MODULE_TEST" },
  { label: "Додатковий рейтинг", value: "ADDITIONAL_RATE" },
]

const AddSummaryModal: React.FC<IAddSummaryModalProps> = ({ open, setOpen }) => {
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
  } = useForm<IGradeBookFilterFields>({ mode: "onBlur" })

  const onSubmit: SubmitHandler<IGradeBookFilterFields> = async (data) => {
    try {
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={open} maxWidth="sm" onClose={handleClose} sx={{ "& .MuiDialog-paper": { width: "340px" } }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <DialogTitle id="alert-dialog-title">Додати підсумок:</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>

      <DialogContent sx={{ padding: "0 24px 20px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="group"
            control={control}
            rules={{ required: "Виберіть групу" }}
            render={({ field }) => {
              return (
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <InputLabel htmlFor="group">Підсумок:</InputLabel>
                  <TextField
                    select
                    fullWidth
                    {...field}
                    id="group"
                    sx={{ "& .MuiInputBase-input": { py: "10.4px", fontSize: "0.875rem" } }}
                  >
                    {summaryTypes.map((option) => (
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
            name="semester"
            control={control}
            rules={{ required: "Виберіть" }}
            render={({ field }) => {
              return (
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <InputLabel htmlFor="semestr">Після навчального заняття №:</InputLabel>
                  <TextField
                    select
                    fullWidth
                    {...field}
                    id="semestr"
                    sx={{ "& .MuiInputBase-input": { py: "10.4px", fontSize: "0.875rem" } }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((option) => (
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

export default AddSummaryModal
