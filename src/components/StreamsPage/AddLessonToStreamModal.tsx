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
import { addLessonToStream, deleteLessonFromStream } from '../../store/streams/streamsAsyncActions'
import { convertLessonsForCompare, isCombinedInStream, isFieldNull } from '../../utils/compateStreamFilelds'

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
  label: 'Лекції' | 'Практичні' | 'Лабораторні' | 'Семінари' | 'Екзамени'
  value: 'lectures' | 'practical' | 'laboratory' | 'seminars' | 'exams'
  isChecked: boolean
  isDisabled: boolean
}

const initialFormValues: IinitialFormValues[] = [
  { label: 'Лекції', value: 'lectures', isChecked: false, isDisabled: false },
  { label: 'Практичні', value: 'practical', isChecked: false, isDisabled: false },
  { label: 'Лабораторні', value: 'laboratory', isChecked: false, isDisabled: false },
  { label: 'Семінари', value: 'seminars', isChecked: false, isDisabled: true },
  { label: 'Екзамени', value: 'exams', isChecked: false, isDisabled: false },
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
    reset,
    control,
    formState: { errors, isSubmitting },
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

      const lessonsIds = selectedLessons.map((el) => {
        const l = el.filter((l) => {
          return combinedLessonKeys.some((s) => s === l.typeEn)
        })
        return l[0]?.id
      })

      console.log(combinedLessonKeys)

      combinedLessonKeys.map(async (k) => {
        if (data[k]) {
          // data[k] === true = дисципліна об'єднана в потік
          const payload = {
            lessonsIds: lessonsIds,
            streamId: selectedStream.id,
            streamName: selectedStream.name,
          }

          // await dispatch(addLessonToStream(payload))
        } else {
          // data[k] !== true = дисципліна НЕ об'єднана в потік

          const convertedLessons = convertLessonsForCompare(selectedLessons)

          convertedLessons.map(async (el) => {
            const payload = {
              typeEn: k,
              streamId: selectedStream.id,
              name: el.name,
              // @ts-ignore
              hours: el[k].hours,
              semester: el.semester,
              subgroupNumber: el.subgroupNumber,
            }

            // await dispatch(deleteLessonFromStream(payload))
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
