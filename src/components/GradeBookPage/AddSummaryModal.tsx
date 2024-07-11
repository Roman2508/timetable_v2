import {
  Tab,
  Tabs,
  List,
  Stack,
  Dialog,
  Button,
  ListItem,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  InputLabel,
  DialogTitle,
  ListItemIcon,
  ListItemText,
  DialogContent,
} from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { CloseOutlined, DeleteOutlined } from '@ant-design/icons'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useAppDispatch } from '../../store/store'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { deleteSummaryGradesLocally } from '../../store/gradeBook/gradeBookSlice'
import { addSummary, deleteSummary } from '../../store/gradeBook/gradeBookAsyncActions'
import { GradeBookSummaryType, GradeBookType } from '../../store/gradeBook/gradeBookTypes'

interface IAddSummaryModalProps {
  open: boolean
  gradeBook: GradeBookType | null
  setOpen: Dispatch<SetStateAction<boolean>>
}

interface IGradeBookFilterFields {
  type: (typeof summaryTypes)[number]['value']
  afterLesson: number
}

export const summaryTypes = [
  { label: 'Тематична оцінка (ср.знач.)', value: 'MODULE_AVERAGE' },
  { label: 'Рейтинг з модуля (сума)', value: 'MODULE_SUM' },
  { label: 'Семестрова оцінка (ср.знач.)', value: 'LESSON_AVERAGE' },
  { label: 'Рейтинг з дисципліни (сума)', value: 'LESSON_SUM' },
  { label: 'Модульний контроль', value: 'MODULE_TEST' },
  { label: 'Додатковий рейтинг', value: 'ADDITIONAL_RATE' },
  { label: 'Поточний рейтинг', value: 'CURRENT_RATE' },
  { label: 'Екзамен', value: 'EXAM' },
] as const

const AddSummaryModal: React.FC<IAddSummaryModalProps> = ({ open, setOpen, gradeBook }) => {
  const dispatch = useAppDispatch()

  const [summaryType, setSummaryType] = React.useState<'add' | 'delete'>('add')

  const summarySortedList = JSON.parse(JSON.stringify(gradeBook ? gradeBook.summary : [])).sort(
    (a: GradeBookSummaryType, b: GradeBookSummaryType) => {
      if (a.afterLesson < b.afterLesson) return -1
      if (a.afterLesson > b.afterLesson) return 1
      return 0
    }
  )

  const handleClose = () => {
    setOpen(false)
  }

  const handleChangeSummaryType = (_: React.SyntheticEvent, newValue: 'add' | 'delete') => {
    setSummaryType(newValue)
  }

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IGradeBookFilterFields>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<IGradeBookFilterFields> = async (data) => {
    try {
      if (!gradeBook) return

      if (data.type === 'LESSON_AVERAGE' || data.type === 'LESSON_SUM' || data.type === 'EXAM') {
        await dispatch(addSummary({ id: gradeBook.id, type: data.type, afterLesson: gradeBook.lesson.hours }))
        return
      } else {
        await dispatch(addSummary({ id: gradeBook.id, ...data }))
      }

      setOpen(false)
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  const onDeleteSummary = async (type: (typeof summaryTypes)[number]['value'], afterLesson: number) => {
    try {
      if (!gradeBook) return
      if (window.confirm('Ви дійсно хочете видалити підсумок?')) {
        // delete summary
        await dispatch(deleteSummary({ id: gradeBook.id, type, afterLesson }))
        // delete all summary grades
        dispatch(deleteSummaryGradesLocally({ id: gradeBook.id, type, afterLesson }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={open} maxWidth="sm" onClose={handleClose} sx={{ '& .MuiDialog-paper': { width: '340px' } }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle id="alert-dialog-title">Підсумок:</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>

      <DialogContent sx={{ padding: '0 24px 10px' }}>
        <Tabs value={summaryType} onChange={handleChangeSummaryType}>
          <Tab label="Створити" sx={{ width: '50%' }} value={'add'} />
          <Tab label="Видалити" sx={{ width: '50%' }} value={'delete'} />
        </Tabs>

        {summaryType === 'add' && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="type"
              control={control}
              rules={{ required: 'Виберіть групу' }}
              defaultValue={summaryTypes[0].value}
              render={({ field }) => {
                return (
                  <Stack spacing={1} sx={{ mt: 2 }}>
                    <InputLabel htmlFor="type">Підсумок:</InputLabel>
                    <TextField
                      select
                      fullWidth
                      {...field}
                      id="type"
                      defaultValue={summaryTypes[0].value}
                      onChange={(e) => {
                        field.onChange(e)
                        if (!gradeBook) return

                        const selectedSummary = e.target.value
                        if (
                          selectedSummary === 'EXAM' ||
                          selectedSummary === 'LESSON_SUM' ||
                          selectedSummary === 'LESSON_AVERAGE'
                        ) {
                          setValue('afterLesson', gradeBook.lesson.hours)
                        }
                      }}
                      sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' } }}
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
              name="afterLesson"
              control={control}
              rules={{ required: 'Виберіть' }}
              defaultValue={1}
              render={({ field }) => {
                return (
                  <Stack spacing={1} sx={{ mt: 2 }}>
                    <InputLabel htmlFor="afterLesson">Після навчального заняття №:</InputLabel>
                    <TextField
                      select
                      fullWidth
                      {...field}
                      id="afterLesson"
                      disabled={
                        watch('type') === 'LESSON_AVERAGE' || watch('type') === 'LESSON_SUM' || watch('type') === 'EXAM'
                      }
                      sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' } }}
                    >
                      {Array(gradeBook ? gradeBook.lesson.hours : 1)
                        .fill(null)
                        .map((_, index) => (
                          <MenuItem key={index + 1} value={index + 1}>
                            {index + 1}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Stack>
                )
              }}
            />

            <div style={{ textAlign: 'end', paddingTop: '20px' }}>
              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                sx={{ width: '93px', height: '36.5px' }}
              >
                {isSubmitting ? <LoadingSpinner size={20} disablePadding /> : 'Вибрати'}
              </Button>
            </div>
          </form>
        )}

        {summaryType === 'delete' && (
          <div style={{ height: '228px', overflow: 'auto' }}>
            {gradeBook && gradeBook.summary.length < 1 && (
              <Typography sx={{ textAlign: 'center', mt: 3 }} variant="body1">
                Пусто
              </Typography>
            )}
            <List>
              {summarySortedList.map((summary: GradeBookSummaryType, index: number) => (
                <ListItem key={index} sx={{ p: '4px 8px', alignItems: 'flex-end' }}>
                  <ListItemText sx={{ m: 0 }}>
                    <Typography sx={{ flex: 1 }} variant="caption">
                      {summary.afterLesson} урок
                    </Typography>
                    <Typography sx={{ flex: 1 }}>
                      {summaryTypes.find((el) => el.value === summary.type)?.label}
                    </Typography>
                  </ListItemText>

                  <ListItemIcon onClick={() => onDeleteSummary(summary.type, summary.afterLesson)}>
                    <IconButton>
                      <DeleteOutlined />
                    </IconButton>
                  </ListItemIcon>
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AddSummaryModal
