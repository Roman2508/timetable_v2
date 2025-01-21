import {
  Box,
  Chip,
  Stack,
  Button,
  Select,
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

import ActionDrawer from '../ActionDrawer/ActionDrawer'
import { userRoles, UserType } from '../../store/auth/authTypes'
import { CloseOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

interface IUsersActionsDrawer {
  isOpenActionDrawer: boolean
  editedUser: UserType | null
  setIsOpenActionDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

interface IUserFormFields {
  email: string
  role: typeof userRoles
  password: string
}

const UsersActionsDrawer: React.FC<IUsersActionsDrawer> = (props) => {
  const { isOpenActionDrawer, setIsOpenActionDrawer, editedUser } = props

  const [personName, setPersonName] = React.useState<string[]>([])
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
  })

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event
    setValue(
      'role',
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const onSubmit: SubmitHandler<IUserFormFields> = async (data) => {
    try {
      console.log(data)
      // Якщо editMode === 'update' - оновлення викладача
      //   if (editMode === 'update') {
      //     if (!editingsStudent) return
      //     const { payload } = await dispatch(updateStudent({ ...data, id: editingsStudent.id }))
      //     const newStudent = payload as StudentType
      //     setSelectedStudent(newStudent)
      //     return
      //   }
      //   if (editMode === 'create') {
      //     // Якщо editMode === 'create' - створення викладача
      //     const { status, ...rest } = data
      //     const { payload } = await dispatch(createStudent(rest))
      //     if (payload) {
      //       reset(defaultValues)
      //     }
      //   }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (!editedUser) return

    setValue('email', editedUser.email)
    setValue('role', editedUser.role)
  }, [editedUser])

  return (
    <ActionDrawer
      isOpen={isOpenActionDrawer}
      setIsOpen={setIsOpenActionDrawer}
      drawerSx={{ minWidth: '560px', padding: '20px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ pb: 2 }}>
          Оновити користувача
        </Typography>

        <IconButton onClick={() => setIsOpenActionDrawer(false)}>
          <CloseOutlined />
        </IconButton>
      </div>

      <Typography variant="subtitle1">Doe Doe John</Typography>

      <form style={{ marginBottom: '40px' }} onSubmit={handleSubmit(onSubmit)}>
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

        <Button variant="contained" type="submit" sx={{ width: '100%', mt: 4 }} disabled={isSubmitting}>
          Зберегти
        </Button>
      </form>
    </ActionDrawer>
  )
}

export default UsersActionsDrawer
