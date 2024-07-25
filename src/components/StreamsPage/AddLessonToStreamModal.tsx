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
import { GroupLoadType } from '../../store/groups/groupsTypes'
import { isFieldNull, getIdsByType, isCombinedInStream } from '../../utils/compateStreamFilelds'
import { addLessonToStream, deleteLessonFromStream } from '../../store/streams/streamsAsyncActions'

interface IAddLessonToStreamModalProps {
  open: boolean
  selectedStream: null | StreamsType
  selectedLessons: GroupLoadType[][]
  setOpen: Dispatch<SetStateAction<boolean>>
}

interface IFormFields {
  lectures: boolean
  practical: boolean
  laboratory: boolean
  seminars: boolean
  exams: boolean
}

interface IinitialFormValues {
  label: 'Лекції' | 'Практичні' | 'Лабораторні' | 'Семінари' | 'Екзамен'
  value: 'lectures' | 'practical' | 'laboratory' | 'seminars' | 'exams'
  isChecked: boolean
  isDisabled: boolean
}

const initialFormValues: IinitialFormValues[] = [
  { label: 'Лекції', value: 'lectures', isChecked: false, isDisabled: false },
  { label: 'Практичні', value: 'practical', isChecked: false, isDisabled: false },
  { label: 'Лабораторні', value: 'laboratory', isChecked: false, isDisabled: false },
  { label: 'Семінари', value: 'seminars', isChecked: false, isDisabled: true },
  { label: 'Екзамен', value: 'exams', isChecked: false, isDisabled: false },
]

const AddLessonToStreamModal: React.FC<IAddLessonToStreamModalProps> = ({
  open,
  setOpen,
  selectedStream,
  selectedLessons,
}) => {
  const dispatch = useAppDispatch()

  const [formData, setFormData] = React.useState(initialFormValues)

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<IFormFields>({ mode: 'onBlur' })

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      if (!selectedStream) return
      const allLessonkeys = Object.keys(data) as IinitialFormValues['value'][]
      const combinedLessonKeys = allLessonkeys.filter((k) => typeof data[k] === 'boolean')

      combinedLessonKeys.map(async (k) => {
        if (data[k]) {
          // data[k] === true = дисципліна об'єднана в потік
          const lessonsIds = getIdsByType(selectedLessons, k)

          const payload = {
            lessonsIds,
            streamId: selectedStream.id,
            streamName: selectedStream.name,
          }

          await dispatch(addLessonToStream(payload))

          setFormData((prev) => {
            const newValue = prev.map((el) => {
              if (el.value === k) {
                return { ...el, isChecked: true }
              }

              return el
            })

            return newValue
          })
        } else {
          // data[k] !== true = дисципліна НЕ об'єднана в потік
          const lessonsIds = getIdsByType(selectedLessons, k)
          await dispatch(deleteLessonFromStream({ lessonsIds }))

          setFormData((prev) => {
            const newValue = prev.map((el) => {
              if (el.value === k) {
                return { ...el, isChecked: false }
              }

              return el
            })

            return newValue
          })
        }
      })
    } catch (error) {
      console.error(error)
    } finally {
      handleClose()
    }
  }

  React.useEffect(() => {
    setFormData((prev) => {
      const newFormData = prev.map((el) => {
        const isDisabled = isFieldNull(selectedLessons, el.value)
        const isChecked = isCombinedInStream(selectedLessons, el.value)

        return { ...el, isDisabled, isChecked }
      })

      return newFormData
    })
  }, [selectedLessons])

  return (
    <Dialog open={open} onClose={handleClose}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle>Об'єднати в потік</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ padding: '0 24px 20px' }}>
          <FormGroup>
            {formData.map((el) => (
              <Controller
                key={el.value}
                name={el.value}
                control={control}
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
        </DialogContent>

        <DialogActions>
          <Button type="submit" disabled={isSubmitting} variant="contained">
            Зберегти
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export { AddLessonToStreamModal }
