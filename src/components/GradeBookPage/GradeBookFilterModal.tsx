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
} from '@mui/material'
import { useSelector } from 'react-redux'
import { CloseOutlined } from '@ant-design/icons'
import { SetURLSearchParams } from 'react-router-dom'
import React, { Dispatch, SetStateAction } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useAppDispatch } from '../../store/store'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { groupsListSelector } from '../../store/groups/groupsSlice'
import { clearGradeBook } from '../../store/gradeBook/gradeBookSlice'
import { getGroupCategories } from '../../store/groups/groupsAsyncActions'
import { lessonsForGradeBookSelector } from '../../store/scheduleLessons/scheduleLessonsSlice'
import { findLessonsForSchedule } from '../../store/scheduleLessons/scheduleLessonsAsyncActions'

interface IGradeBookFilterModalProps {
  open: boolean
  searchParams: URLSearchParams
  setSearchParams: SetURLSearchParams
  setOpen: Dispatch<SetStateAction<boolean>>
  fetchGradeBook: (groupId: number, lessonId: number, semester: number, lessonType: string) => Promise<void>
}

interface IGradeBookFilterFields {
  semester: number
  group: number
  lesson: string
}

const GradeBookFilterModal: React.FC<IGradeBookFilterModalProps> = ({
  open,
  setOpen,
  searchParams,
  fetchGradeBook,
  setSearchParams,
}) => {
  const dispatch = useAppDispatch()

  const { groups } = useSelector(groupsListSelector)
  const { lessons } = useSelector(lessonsForGradeBookSelector)

  const [selectedLessonType, setSelectedLessonType] = React.useState<null | string>(null)

  const handleClose = () => {
    setOpen(false)
  }

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IGradeBookFilterFields>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<IGradeBookFilterFields> = async (data) => {
    try {
      if (!selectedLessonType) return alert('Виберіть дисципліну')
      handleClose()

      const { group, lesson, semester } = data

      setSearchParams({
        groupId: String(group),
        lessonId: String(lesson),
        semester: String(semester),
        lessonType: selectedLessonType,
      })
      dispatch(clearGradeBook())
      await fetchGradeBook(Number(group), Number(lesson), Number(semester), selectedLessonType)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (groups.length) return
    dispatch(getGroupCategories(false))
  }, [])

  React.useEffect(() => {
    if (!watch('semester') || !watch('group')) return
    dispatch(findLessonsForSchedule({ semester: watch('semester'), itemId: watch('group'), scheduleType: 'group' }))
  }, [watch('group'), watch('semester')])

  React.useEffect(() => {
    if (!watch('lesson')) return
    const findedLesson = lessons.find((el) => el.id === Number(watch('lesson')))
    if (findedLesson) setSelectedLessonType(findedLesson.typeRu)
  }, [watch('lesson')])

  React.useEffect(() => {
    const groupId = searchParams.get('groupId')
    const lessonId = searchParams.get('lessonId')
    const semester = searchParams.get('semester')

    if (!groupId || !lessonId || !semester) return

    setValue('group', Number(groupId))
    setValue('lesson', lessonId)
    setValue('semester', Number(semester))
  }, [searchParams])

  return (
    <Dialog open={open} maxWidth="sm" onClose={handleClose}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle id="alert-dialog-title">Знайти електронний журнал:</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <p style={{ color: 'red' }}>ТРЕБА ДОДАТИ РІК В ЯКОМУ ДИСЦИПЛІНА ВИВЧАЛАСЬ</p>
        <p style={{ color: 'red' }}>ТРЕБА ДОДАТИ РІК В ЯКОМУ ДИСЦИПЛІНА ВИВЧАЛАСЬ</p>
        <p style={{ color: 'red' }}>ТРЕБА ДОДАТИ РІК В ЯКОМУ ДИСЦИПЛІНА ВИВЧАЛАСЬ</p>
        <p style={{ color: 'red' }}>ТРЕБА ДОДАТИ РІК В ЯКОМУ ДИСЦИПЛІНА ВИВЧАЛАСЬ</p>
        <p style={{ color: 'red' }}>ТРЕБА ДОДАТИ РІК В ЯКОМУ ДИСЦИПЛІНА ВИВЧАЛАСЬ</p>
        <DialogContent sx={{ padding: '0 24px 20px', maxWidth: '295px' }}>
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
                    {/* {[1, 2, 3, 4, 5, 6].map((option) => ( */}
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
                    {groups.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              )
            }}
          />

          <Controller
            name="lesson"
            control={control}
            rules={{ required: 'Виберіть дисципліну' }}
            render={({ field }) => {
              return (
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <InputLabel htmlFor="lesson">Дисципліна*</InputLabel>
                  <TextField
                    select
                    fullWidth
                    {...field}
                    id="lesson"
                    sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' } }}
                  >
                    {lessons.map((option) => {
                      const unitInfo = option.subgroupNumber ? `(${option.subgroupNumber} підгрупа)` : '(Вся група)'

                      return (
                        <MenuItem key={option.id} value={option.id}>
                          {`${option.typeRu} / ${option.name} ${unitInfo}`}
                        </MenuItem>
                      )
                    })}
                  </TextField>
                </Stack>
              )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || !selectedLessonType}
            sx={{ width: '89.3px', height: '36.5px' }}
          >
            {isSubmitting ? <LoadingSpinner size={10} /> : 'Вибрати'}
            {/* <LoadingSpinner size={10} /> */}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default GradeBookFilterModal
