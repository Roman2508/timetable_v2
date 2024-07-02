import { useSelector } from 'react-redux'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Stack, Button, MenuItem, TextField, InputLabel } from '@mui/material'

import { useAppDispatch } from '../../store/store'
import { groupsListSelector } from '../../store/groups/groupsSlice'
import { getGroup, getGroupCategories } from '../../store/groups/groupsAsyncActions'
import { getGrades } from '../../store/gradeBook/gradeBookAsyncActions'
import { lessonsForGradeBookSelector } from '../../store/scheduleLessons/scheduleLessonsSlice'
import { findLessonStudents, findLessonsForSchedule } from '../../store/scheduleLessons/scheduleLessonsAsyncActions'
import { groupLessonsByFields } from '../../utils/groupLessonsByFields'

interface IStudentsDivideFilterProps {}

interface IGradeBookFilterFields {
  semester: number
  group: number
}

const StudentsDivideFilter: React.FC<IStudentsDivideFilterProps> = ({}) => {
  const dispatch = useAppDispatch()

  const { groups } = useSelector(groupsListSelector)

  const {
    watch,
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<IGradeBookFilterFields>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<IGradeBookFilterFields> = async (data) => {
    try {
      dispatch(findLessonStudents({ semester: data.semester, groupId: data.group }))

      // CREATE GET_GROUP_SHORT METHOD AND REPLACE THIS:
      dispatch(getGroup(String(data.group)))
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (groups.length) return
    dispatch(getGroupCategories(false))
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', alignItems: 'flex-end', gap: 20 }}>
      <Controller
        name="group"
        control={control}
        rules={{ required: 'Виберіть групу' }}
        defaultValue={0}
        render={({ field }) => {
          return (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <InputLabel htmlFor="group">Група*</InputLabel>
              <TextField
                select
                fullWidth
                {...field}
                id="group"
                value={field.value ?? ''}
                sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem', width: '140px' } }}
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
        name="semester"
        control={control}
        rules={{ required: 'Виберіть семестр' }}
        render={({ field }) => {
          return (
            <Stack spacing={1}>
              <InputLabel htmlFor="semestr">Семестр*</InputLabel>
              <TextField
                select
                fullWidth
                {...field}
                id="semestr"
                value={field.value ? field.value : ''}
                sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem', width: '70px' } }}
              >
                {[1, 2, 3, 4, 5, 6].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          )
        }}
      />

      <Button
        type="submit"
        color="primary"
        variant="outlined"
        disabled={isSubmitting || !watch('group') || !watch('semester')}
        sx={{ textTransform: 'capitalize', width: '100%', p: '7.44px 15px', mt: 1.5 }}
      >
        Знайти
      </Button>
    </form>
  )
}

export default StudentsDivideFilter
