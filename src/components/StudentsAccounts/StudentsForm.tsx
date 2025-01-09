import { useSelector } from 'react-redux'
import React, { Dispatch, SetStateAction } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Stack, Button, MenuItem, TextField, InputLabel, OutlinedInput, FormHelperText } from '@mui/material'

import { useAppDispatch } from '../../store/store'
import { emailRegex } from '../../utils/emailRegex'
import { groupsSelector } from '../../store/groups/groupsSlice'
import { StudentType } from '../../store/students/studentsTypes'
import { createStudent, updateStudent } from '../../store/students/studentsAsyncActions'

interface IStudentFields {
  name: string
  login: string
  password: string
  email: string
  status: 'Навчається' | 'Відраховано' | 'Академічна відпустка'
  group: number
}

interface IStudentsProps {
  editMode: 'create' | 'update'
  editingsStudent: StudentType | null
  setEditMode: Dispatch<SetStateAction<'create' | 'update'>>
  setSelectedStudent: Dispatch<SetStateAction<StudentType | null>>
}

const defaultValues = {
  status: 'Навчається',
  email: '',
  login: '',
  name: '',
  password: '',
  group: 0,
} as const

const StudentsForm: React.FC<IStudentsProps> = ({ editMode, setEditMode, editingsStudent, setSelectedStudent }) => {
  const dispatch = useAppDispatch()

  const { groupCategories } = useSelector(groupsSelector)

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IStudentFields>({
    mode: 'onBlur',
    defaultValues: editingsStudent ? { ...editingsStudent, group: editingsStudent.group.id } : defaultValues,
  })

  const onSubmit: SubmitHandler<IStudentFields> = async (data) => {
    try {
      // Якщо editMode === 'update' - оновлення викладача
      if (editMode === 'update') {
        if (!editingsStudent) return
        const { payload } = await dispatch(updateStudent({ ...data, id: editingsStudent.id }))
        const newStudent = payload as StudentType
        setSelectedStudent(newStudent)
        return
      }

      if (editMode === 'create') {
        // Якщо editMode === 'create' - створення викладача
        const { status, ...rest } = data
        const { payload } = await dispatch(createStudent(rest))
        if (payload) {
          reset(defaultValues)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (!editingsStudent) return
    setValue('name', editingsStudent.name)
    setValue('login', editingsStudent.login)
    setValue('password', editingsStudent.password)
    setValue('email', editingsStudent.email)
    setValue('status', editingsStudent.status)
    setValue('group', editingsStudent.group.id)
  }, [editingsStudent])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Це обов'язкове поле" }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="name">ПІБ*</InputLabel>
                <OutlinedInput
                  fullWidth
                  {...field}
                  id="name"
                  type="name"
                  name="name"
                  placeholder="ПІБ"
                  error={Boolean(errors.name)}
                />
                {errors.name && (
                  <FormHelperText error id="helper-text-name">
                    {errors.name.message}
                  </FormHelperText>
                )}
              </Stack>
            )
          }}
        />

        <Controller
          name="login"
          control={control}
          rules={{ required: "Це обов'язкове поле" }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="login">Логін*</InputLabel>
                <OutlinedInput
                  fullWidth
                  {...field}
                  id="login"
                  type="login"
                  name="login"
                  placeholder="test.student"
                  error={Boolean(errors.login)}
                />
                {errors.login && (
                  <FormHelperText error id="helper-text-login">
                    {errors.login.message}
                  </FormHelperText>
                )}
              </Stack>
            )
          }}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: "Це обов'язкове поле" }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="password">Пароль*</InputLabel>
                <OutlinedInput
                  fullWidth
                  {...field}
                  id="password"
                  name="password"
                  placeholder="Пароль"
                  error={Boolean(errors.password)}
                />
                {errors.password && (
                  <FormHelperText error id="helper-text-password">
                    {errors.password.message}
                  </FormHelperText>
                )}
              </Stack>
            )
          }}
        />

        <Controller
          name="email"
          control={control}
          rules={{
            required: "Це обов'язкове поле",
            pattern: {
              value: emailRegex,
              message: 'Не вірний формат пошти',
            },
          }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="email">Ел. пошта*</InputLabel>
                <OutlinedInput
                  fullWidth
                  {...field}
                  id="email"
                  type="email"
                  name="email"
                  error={Boolean(errors.email)}
                  placeholder="test.student@pharm.zt.ua"
                />
                {errors.email && (
                  <FormHelperText error id="helper-text-email">
                    {errors.email.message}
                  </FormHelperText>
                )}
              </Stack>
            )
          }}
        />

        {editMode === 'update' && (
          <Controller
            name="status"
            control={control}
            rules={{ required: "Це обов'язкове поле" }}
            render={({ field }) => {
              return (
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <InputLabel htmlFor="status">Статус*</InputLabel>
                  <TextField
                    select
                    fullWidth
                    {...field}
                    id="status"
                    sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' } }}
                  >
                    {['Навчається', 'Відраховано', 'Академічна відпустка'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>
              )
            }}
          />
        )}

        <Controller
          name="group"
          control={control}
          rules={{ required: "Це обов'язкове поле" }}
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
                  {(!groupCategories ? [] : groupCategories).map((category) =>
                    category.groups.map((group) => (
                      <MenuItem key={group.id} value={group.id} sx={{ width: '100%' }}>
                        {group.name}
                      </MenuItem>
                    ))
                  )}
                </TextField>
              </Stack>
            )
          }}
        />
      </div>

      <div style={{ display: 'flex', marginTop: '24px' }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
          sx={{
            textTransform: 'capitalize',
            p: '7.44px 15px',
            width: editMode === 'update' ? '50%' : '100%',
            mr: editMode === 'update' ? 1 : 0,
          }}
        >
          {editMode === 'update' && !isSubmitting
            ? 'Оновити'
            : editMode === 'create' && !isSubmitting
            ? 'Створити'
            : 'Завантаження...'}
        </Button>

        {editMode === 'update' && (
          <Button
            variant="outlined"
            sx={{ width: '50%', ml: 1 }}
            onClick={() => {
              reset(defaultValues)
              setEditMode('create')
              setSelectedStudent(null)
            }}
          >
            Відмінити
          </Button>
        )}
      </div>
    </form>
  )
}

export { StudentsForm }

/* 
                  {(!groupCategories ? [] : groupCategories).map((category) => (
                    <MenuItem
                      disableRipple
                      disableGutters
                      disableTouchRipple
                      component={'li'}
                      key={category.id}
                      sx={{
                        cursor: 'default',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        '&:hover': { backgroundColor: '#fff' },
                      }}
                    >
                      <ListSubheader
                        sx={{ fontWeight: 700, color: 'rgba(38, 38, 38, .9)', lineHeight: '40px', cursor: 'default' }}
                      >
                        {category.name}
                      </ListSubheader>

                      <ul>
                        {category.groups.map((group) => (
                          <MenuItem key={group.id} value={group.id} sx={{ width: '100%' }}>
                            {group.name}
                          </MenuItem>
                        ))}
                      </ul>
                    </MenuItem>
                  ))}
*/
