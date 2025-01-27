import {
  Box,
  Chip,
  Stack,
  Button,
  Select,
  Divider,
  MenuItem,
  IconButton,
  InputLabel,
  Typography,
  OutlinedInput,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { CloseOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

import cutUserName from '../../utils/cutUserName'
import { useAppDispatch } from '../../store/store'
import ActionDrawer from '../ActionDrawer/ActionDrawer'
import { StudentsForm } from '../StudentsAccounts/StudentsForm'
import { userRoles, UserType } from '../../store/auth/authTypes'
import CreateTeacherForm from '../TeachersPage/CreateTeacherForm'
import { createUser, updateUser } from '../../store/auth/authAsyncActions'
import { getGroupCategories } from '../../store/groups/groupsAsyncActions'
import { getTeachersCategories } from '../../store/teachers/teachersAsyncActions'

interface IUsersActionsDrawer {
  isOpenActionDrawer: boolean
  editedUser: UserType | null
  actionMode: 'create' | 'update'
  setEditedUser: React.Dispatch<React.SetStateAction<UserType | null>>
  setIsOpenActionDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

interface IUserFormFields {
  email: string
  role: (typeof userRoles)[number][]
  roleId?: number
  password: string
}

const isShowFormInputs = (roles: (typeof userRoles)[number][], actionMode: 'create' | 'update') => {
  if (actionMode === 'create' && !roles.includes('TEACHER') && !roles.includes('STUDENT')) {
    return true
  }
  if (actionMode === 'update') {
    return true
  }
  return false
}

const UsersActionsDrawer: React.FC<IUsersActionsDrawer> = (props) => {
  const { isOpenActionDrawer, setIsOpenActionDrawer, editedUser, setEditedUser, actionMode } = props

  const dispatch = useAppDispatch()

  const [showPassword, setShowPassword] = React.useState(false)

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUserFormFields>({
    mode: 'onBlur',
    defaultValues: { email: '', password: '', role: [] },
  })

  const handleChange = (e: SelectChangeEvent<typeof userRoles>) => {
    const value = e.target.value
    let roles = typeof value === 'string' ? value.split(',') : value

    // Одночасно може бути роль викладач або студент
    // Якщо раніше була роль "викладач" то при виборі ролі "студент", роль "викладач" видаляється
    if (watch('role').includes('TEACHER') && roles[roles.length - 1] === 'STUDENT') {
      roles = roles.filter((el) => el !== 'TEACHER')
    }

    // Якщо раніше була роль "студент" то при виборі ролі "викладач", роль "студент" видаляється
    if (watch('role').includes('STUDENT') && roles[roles.length - 1] === 'TEACHER') {
      roles = roles.filter((el) => el !== 'STUDENT')
    }

    // console.log(roles)
    setValue('role', roles as (typeof userRoles)[number][])
  }

  const onSubmit: SubmitHandler<IUserFormFields> = async (data) => {
    try {
      if (actionMode === 'update') {
        if (!editedUser) return
        const { payload } = await dispatch(updateUser({ ...data, id: editedUser.id }))
        if (payload) {
          setIsOpenActionDrawer(false)
        }
        return
      }

      if (actionMode === 'create') {
        await dispatch(createUser({ ...data }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (actionMode === 'create') {
      setEditedUser(null)
      reset({ email: '', role: [], password: '' })
    }

    if (editedUser) {
      setValue('email', editedUser.email)
      setValue('role', [...editedUser.role])
    }
  }, [editedUser, actionMode])

  React.useEffect(() => {
    if (watch('role').includes('TEACHER')) {
      dispatch(getTeachersCategories(false))
    }

    if (watch('role').includes('STUDENT')) {
      dispatch(getGroupCategories(false))
    }
  }, [watch('role')])

  return (
    <ActionDrawer
      isOpen={isOpenActionDrawer}
      setIsOpen={setIsOpenActionDrawer}
      drawerSx={{ minWidth: '560px', padding: '20px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ pb: 2 }}>
          {actionMode === 'create' ? 'Створити користувача' : 'Оновити користувача'}
        </Typography>

        <IconButton onClick={() => setIsOpenActionDrawer(false)}>
          <CloseOutlined />
        </IconButton>
      </div>

      {editedUser && <Typography variant="subtitle1">{cutUserName(editedUser)}</Typography>}

      <form style={{ marginBottom: '40px' }} onSubmit={handleSubmit(onSubmit)}>
        {isShowFormInputs(watch('role'), actionMode) && (
          <>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Це обов'язкове поле" }}
              render={({ field }) => {
                return (
                  <Stack spacing={1} sx={{ mt: 2 }}>
                    <InputLabel htmlFor="email">Ел.пошта*</InputLabel>
                    <OutlinedInput
                      fullWidth
                      {...field}
                      id="email"
                      type="email"
                      name="email"
                      placeholder="test@mail.com"
                      error={Boolean(errors.email)}
                    />
                    {errors.email && <FormHelperText error>{errors.email.message}</FormHelperText>}
                  </Stack>
                )
              }}
            />

            <Controller
              name="password"
              control={control}
              rules={actionMode === 'create' ? { required: "Це обов'язкове поле" } : {}}
              render={({ field }) => {
                return (
                  <Stack spacing={1} sx={{ mt: 2 }}>
                    <InputLabel htmlFor="password">Пароль</InputLabel>
                    <OutlinedInput
                      fullWidth
                      {...field}
                      id="password"
                      sx={{ pr: 0 }}
                      name="password"
                      placeholder="********"
                      error={Boolean(errors.password)}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <IconButton onClick={() => setShowPassword(!showPassword)} type="button">
                          {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        </IconButton>
                      }
                    />
                    {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
                  </Stack>
                )
              }}
            />
          </>
        )}

        <Controller
          name="role"
          control={control}
          rules={{ required: "Це обов'язкове поле" }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="role">Ролі*</InputLabel>
                <Select
                  multiple
                  {...field}
                  // @ts-ignore
                  value={watch('role')}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value.toLowerCase()}
                          onDelete={() => {
                            const newRoles = watch('role').filter((el) => el !== value)
                            setValue('role', newRoles)
                          }}
                          onMouseDown={(event) => {
                            event.stopPropagation()
                          }}
                        />
                      ))}
                    </Box>
                  )}
                  sx={{ maxWidth: '520px' }}
                  //   MenuProps={MenuProps}
                >
                  {userRoles.map((name) => (
                    <MenuItem key={name} value={name} /* style={getStyles(name, personName, theme)} */>
                      {name.toLowerCase()}
                    </MenuItem>
                  ))}
                </Select>
                {errors.role && <FormHelperText error>{errors.role.message}</FormHelperText>}
              </Stack>
            )
          }}
        />

        {isShowFormInputs(watch('role'), actionMode) && (
          <Button variant="contained" type="submit" sx={{ width: '100%', mt: 4 }} disabled={isSubmitting}>
            Оновити
          </Button>
        )}
      </form>

      {actionMode === 'create' && watch('role').includes('TEACHER') && (
        <>
          <Divider sx={{ mb: 1 }} />
          <CreateTeacherForm editingTeacher={null} />
        </>
      )}

      {actionMode === 'create' && watch('role').includes('STUDENT') && (
        <>
          <Divider sx={{ mb: 1 }} />
          <StudentsForm editMode="create" editingsStudent={null} />
        </>
      )}
    </ActionDrawer>
  )
}

export default UsersActionsDrawer
