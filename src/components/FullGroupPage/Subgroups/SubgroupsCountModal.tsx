import {
  Stack,
  Dialog,
  Button,
  MenuItem,
  TextField,
  InputLabel,
  IconButton,
  DialogTitle,
  DialogContent,
} from '@mui/material'
import { CloseOutlined } from '@ant-design/icons'
import React, { Dispatch, SetStateAction } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useAppDispatch } from '../../../store/store'
import { GroupLoadType } from '../../../store/groups/groupsTypes'
import { SubgroupsCountList, getLessonSubgroups } from '../../../utils/getLessonSubgroups'

interface ISubgroupsCountModalProps {
  open: boolean
  groupId: number
  selectedLesson: GroupLoadType[] | null
  setOpen: Dispatch<SetStateAction<boolean>>
}

const lessonsTypes = [
  { label: 'Лекції', value: 'lectures' },
  { label: 'Практичні', value: 'practical' },
  { label: 'Лабораторні', value: 'laboratory' },
  { label: 'Семінари', value: 'seminars' },
  { label: 'Екзамени', value: 'exams' },
] as const

interface IFieldsType {
  lectures: string
  practical: string
  laboratory: string
  seminars: string
  exams: string
}

const SubgroupsCountModal: React.FC<ISubgroupsCountModalProps> = ({ open, groupId, setOpen, selectedLesson }) => {
  const dispatch = useAppDispatch()

  const [initialFormValues, setInitialFormValues] = React.useState<SubgroupsCountList[]>([])

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<IFieldsType>({ mode: 'onBlur' })

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit: SubmitHandler<IFieldsType> = async (data) => {
    try {
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (!selectedLesson) return
    const data = getLessonSubgroups(selectedLesson)
    setInitialFormValues(data)
  }, [selectedLesson])

  return (
    <Dialog
      open={open}
      maxWidth={'sm'}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <DialogTitle>{'Спеціалізовані підгрупи'}</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {initialFormValues.map((lessonType) => (
            <Controller
              control={control}
              key={lessonType.typeEn}
              name={lessonType.typeEn}
              render={({ field }) => {
                return (
                  <Stack>
                    <InputLabel htmlFor="name">{lessonType.label}*</InputLabel>
                    <TextField
                      select
                      fullWidth
                      id="name"
                      {...field}
                      defaultValue={lessonType.count}
                      disabled={lessonType.isDisabled}
                      sx={{ width: '100%', pb: 2, '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' } }}
                    >
                      {['1', '2', '3', '4'].map((el) => (
                        <MenuItem key={`${lessonType}_${el}`} value={el}>
                          {el}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                )
              }}
            />
          ))}

          <Button type="submit" variant="contained" sx={{ p: '7.44px 15px', width: '100%' }} disabled={isSubmitting}>
            Зберегти
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { SubgroupsCountModal }
