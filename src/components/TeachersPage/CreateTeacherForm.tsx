import React from "react"
import { useSelector } from "react-redux"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Stack, Button, MenuItem, TextField, InputLabel, OutlinedInput, FormHelperText, Tooltip } from "@mui/material"

import { useAppDispatch } from "../../store/store"
import { emailRegex } from "../../utils/emailRegex"
import { TeachersType } from "../../store/teachers/teachersTypes"
import { teachersSelector } from "../../store/teachers/teachersSlice"
import { createTeacher, updateTeacher } from "../../store/teachers/teachersAsyncActions"

interface IAuditoriesFields {
  email: string
  category: number
  lastName: string
  password: string
  firstName: string
  middleName: string
  calendarId: string
}

interface ICreateTeacherFormProps {
  isOpenInModal?: boolean
  handleClose?: () => void
  editingTeacher: TeachersType | null
}

const CreateTeacherForm: React.FC<ICreateTeacherFormProps> = ({
  isOpenInModal,
  editingTeacher,
  handleClose = () => {},
}) => {
  const dispatch = useAppDispatch()

  const { teachersCategories } = useSelector(teachersSelector)

  const {
    reset,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<IAuditoriesFields>({
    mode: "onSubmit",
    defaultValues: editingTeacher ? { ...editingTeacher, category: editingTeacher.category.id } : {},
  })

  const resetFields = () => {
    reset({ firstName: "", lastName: "", middleName: "", email: "", password: "", calendarId: "" })
  }

  const onSubmit: SubmitHandler<IAuditoriesFields> = async (data) => {
    try {
      // Якщо форму відкрито в модалці - оновлення викладача
      if (isOpenInModal) {
        if (!editingTeacher) return
        await dispatch(updateTeacher({ ...data, id: editingTeacher.id }))
        handleClose()
        resetFields()
      } else {
        // Якщо форму відкрито НЕ в модалці - створення викладача
        await dispatch(createTeacher(data))
        resetFields()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        style={
          isOpenInModal
            ? {
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)",
                gap: "0 20px",
              }
            : {}
        }
      >
        <Controller
          name="lastName"
          control={control}
          rules={{ required: "Це поле обов'язкове" }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="lastName">Прізвище*</InputLabel>
                <OutlinedInput
                  fullWidth
                  {...field}
                  id="lastName"
                  type="lastName"
                  name="lastName"
                  placeholder="Прізвище"
                  error={Boolean(errors.lastName)}
                />
                {errors.lastName && (
                  <FormHelperText error id="helper-text-lastName">
                    {errors.lastName.message}
                  </FormHelperText>
                )}
              </Stack>
            )
          }}
        />

        <Controller
          name="firstName"
          control={control}
          rules={{ required: "Це поле обов'язкове" }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="firstName">Ім'я*</InputLabel>
                <OutlinedInput
                  fullWidth
                  {...field}
                  id="firstName"
                  type="firstname"
                  name="firstName"
                  placeholder="Ім'я"
                  error={Boolean(errors.firstName)}
                />
                {errors.firstName && (
                  <FormHelperText error id="helper-text-firstName">
                    {errors.firstName.message}
                  </FormHelperText>
                )}
              </Stack>
            )
          }}
        />

        <Controller
          name="middleName"
          control={control}
          rules={{ required: "Це поле обов'язкове" }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="middleName">По батькові*</InputLabel>
                <OutlinedInput
                  fullWidth
                  {...field}
                  id="middleName"
                  type="middleName"
                  name="middleName"
                  placeholder="По батькові"
                  error={Boolean(errors.middleName)}
                />
                {errors.middleName && (
                  <FormHelperText error id="helper-text-middleName">
                    {errors.middleName.message}
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
            required: "Це поле обов'язкове",
            pattern: {
              value: emailRegex,
              message: "Не вірний формат пошти",
            },
          }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="email">Пошта*</InputLabel>
                <OutlinedInput
                  fullWidth
                  {...field}
                  id="email"
                  type="email"
                  name="email"
                  error={Boolean(errors.email)}
                  placeholder="test.teacher@pharm.zt.ua"
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

        <Controller
          name="password"
          control={control}
          rules={{
            required: "Це поле обов'язкове",
            minLength: { value: 8, message: "Мінімальна кількість символів - 8" },
          }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="password">Пароль*</InputLabel>
                <OutlinedInput
                  fullWidth
                  {...field}
                  id="password"
                  type="password"
                  name="password"
                  error={Boolean(errors.password)}
                  placeholder="********"
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
          name="calendarId"
          control={control}
          render={({ field }) => {
            return (
              <Tooltip title={field.value}>
                <Stack spacing={1} sx={{ mt: 2 }}>
                  <InputLabel htmlFor="calendarId">ID календаря</InputLabel>
                  <OutlinedInput
                    readOnly
                    fullWidth
                    {...field}
                    id="calendarId"
                    type="calendarId"
                    name="calendarId"
                    placeholder="c_test@group.calendar.google.com"
                    error={Boolean(errors.calendarId)}
                  />
                  {errors.calendarId && (
                    <FormHelperText error id="helper-text-calendarId">
                      {errors.calendarId.message}
                    </FormHelperText>
                  )}
                </Stack>
              </Tooltip>
            )
          }}
        />

        {/* <Stack spacing={1} sx={{ mt: 2 }}>
          <InputLabel htmlFor="calendarId">ID календаря</InputLabel>
          <OutlinedInput
            fullWidth
            readOnly
            id="calendarId"
            type="calendarId"
            name="calendarId"
            placeholder="https://calendar.google.com"
          />
        </Stack> */}

        <Controller
          name="category"
          control={control}
          rules={{ required: "Вкажіть категорію" }}
          render={({ field }) => {
            return (
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="category">Категорія*</InputLabel>
                <TextField
                  select
                  fullWidth
                  {...field}
                  id="category"
                  sx={{ "& .MuiInputBase-input": { py: "10.4px", fontSize: "0.875rem" } }}
                >
                  {(!teachersCategories ? [] : teachersCategories).map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            )
          }}
        />
      </div>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={isSubmitting}
        sx={{
          textTransform: "capitalize",
          width: "100%",
          p: "7.44px 15px",
          mt: 3,
        }}
      >
        {isOpenInModal && !isSubmitting ? "Оновити" : !isSubmitting ? "Створити" : "Завантаження..."}
      </Button>
    </form>
  )
}

export default CreateTeacherForm
