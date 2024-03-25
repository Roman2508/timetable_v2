import {
  Stack,
  Dialog,
  Button,
  Checkbox,
  FormGroup,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
} from '@mui/material'
import { CloseOutlined } from '@ant-design/icons'
import React, { Dispatch, SetStateAction } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useAppDispatch } from '../../store/store'
import { StreamsType } from '../../store/streams/streamsTypes'

interface IAddLessonToStreamModalProps {
  open: boolean
  selectedStream: null | StreamsType
  setOpen: Dispatch<SetStateAction<boolean>>
}

interface IFormFields {
  lectures: boolean
  practical: boolean
  laboratory: boolean
  seminars: boolean
  exams: boolean
}

const initialFormValues = [
  { label: 'Лекції', value: 'lectures', isChecked: true, isDisabled: false },
  { label: 'Практичні', value: 'practical', isChecked: false, isDisabled: false },
  { label: 'Лабораторні', value: 'laboratory', isChecked: false, isDisabled: false },
  { label: 'Семінари', value: 'seminars', isChecked: false, isDisabled: true },
  { label: 'Екзамени', value: 'exams', isChecked: false, isDisabled: false },
] as const

const AddLessonToStreamModal: React.FC<IAddLessonToStreamModalProps> = ({ open, setOpen, selectedStream }) => {
  const dispatch = useAppDispatch()

  const {
    reset,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<IFormFields>({
    mode: 'onBlur',
    // defaultValues: editingTeacher
    //   ? { ...editingTeacher, category: editingTeacher.category.id }
    //   : {},
  })

  const onSubmit: SubmitHandler<IFormFields> = (data) => {
    try {
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  React.useEffect(() => {}, [selectedStream])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle id="alert-dialog-title">{"Об'єднати в потік"}</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>

      <DialogContent sx={{ padding: '0 24px 20px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            {initialFormValues.map((el) => (
              <Controller
                key={el.value}
                name={el.value}
                control={control}
                rules={{ required: 'Вкажіть категорію' }}
                render={({ field }) => {
                  return (
                    <Stack spacing={1}>
                      <FormControlLabel
                        disabled={el.isDisabled}
                        control={<Checkbox defaultChecked={el.isChecked} />}
                        label={el.label}
                        {...field}
                      />
                    </Stack>
                  )
                }}
              />
            ))}
          </FormGroup>
        </form>
      </DialogContent>

      <DialogActions>
        <Button disabled={isSubmitting} variant="contained">
          Зберегти
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { AddLessonToStreamModal }
