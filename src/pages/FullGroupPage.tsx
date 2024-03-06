import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import React from "react"
import MainCard from "../components/MainCard"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

interface IGroupFilelds {
  name: string
  yearOfAdmission: number
  courseNumber: number
  students: number
  formOfEducation: "Денна" | "Заочна"
  educationPlan: number
  category: number
}

const FullGroupPage = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IGroupFilelds>({
    mode: "onBlur",
  })

  const onSubmit: SubmitHandler<IGroupFilelds> = async (data) => {
    try {
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ maxWidth: "860px", margin: "0 auto", mb: 2 }}
      >
        <Grid item>
          <Typography variant="h5">Група: PH-21-1</Typography>
        </Grid>
        <Grid item />
      </Grid>

      <form onSubmit={handleSubmit(onSubmit)}>
        <MainCard sx={{ mt: 2, p: 4, maxWidth: "860px", margin: "0 auto" }} content={false}>
          <Grid
            container
            spacing={3}
            sx={{ mb: 2, display: "flex", alignItems: errors.name ? "center" : "flex-end" }}
          >
            <Grid item xs={12} md={6}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Вкажіть шифр групи" }}
                render={({ field }) => {
                  return (
                    <Stack spacing={1}>
                      <InputLabel htmlFor="name">Шифр групи*</InputLabel>
                      <OutlinedInput
                        id="name"
                        type="firstname"
                        {...field}
                        // value={values.firstname}
                        name="name"
                        // onBlur={handleBlur}
                        // onChange={handleChange}
                        placeholder="PH-24-1"
                        fullWidth
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
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                // size="small"
                variant="outlined"
                color="secondary"
                sx={{
                  textTransform: "capitalize",
                  width: "100%",
                  p: "7.44px 15px",
                }}
              >
                Навчальний план
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
            sx={{
              mb: 2,
              display: "flex",
              alignItems: errors.yearOfAdmission ? "center" : "flex-end",
            }}
          >
            <Grid item xs={12} md={6}>
              <Controller
                name="yearOfAdmission"
                control={control}
                rules={{ required: "Вкажіть рік вступу" }}
                render={({ field }) => {
                  return (
                    <Stack spacing={1}>
                      <InputLabel htmlFor="yearOfAdmission">Рік вступу*</InputLabel>
                      <OutlinedInput
                        id="yearOfAdmission"
                        type="yearOfAdmission"
                        {...field}
                        // value={values.yearOfAdmission}
                        name="yearOfAdmission"
                        // onBlur={handleBlur}
                        // onChange={handleChange}
                        placeholder="2024"
                        fullWidth
                        error={Boolean(errors.yearOfAdmission)}
                      />
                      {errors.yearOfAdmission && (
                        <FormHelperText error id="helper-text-yearOfAdmission">
                          {errors.yearOfAdmission.message}
                        </FormHelperText>
                      )}
                    </Stack>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                // size="small"
                variant="outlined"
                color="secondary"
                sx={{
                  textTransform: "capitalize",
                  width: "100%",
                  p: "7.44px 15px",
                }}
              >
                Потоки
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
            sx={{ mb: 2, display: "flex", alignItems: errors.courseNumber ? "center" : "flex-end" }}
          >
            <Grid item xs={12} md={6}>
              <Controller
                name="courseNumber"
                control={control}
                rules={{ required: "Вкажіть номер курсу" }}
                render={({ field }) => {
                  return (
                    <Stack spacing={1}>
                      <InputLabel htmlFor="courseNumber">Курс*</InputLabel>
                      <OutlinedInput
                        id="courseNumber"
                        type="courseNumber"
                        {...field}
                        // value={values.firstname}
                        name="courseNumber"
                        // onBlur={handleBlur}
                        // onChange={handleChange}
                        placeholder="1"
                        fullWidth
                        error={Boolean(errors.courseNumber)}
                      />
                      {errors.courseNumber && (
                        <FormHelperText error id="helper-text-courseNumber">
                          {errors.courseNumber.message}
                        </FormHelperText>
                      )}
                    </Stack>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                // size="small"
                variant="outlined"
                color="secondary"
                sx={{
                  textTransform: "capitalize",
                  width: "100%",
                  p: "7.44px 15px",
                }}
              >
                Підгрупи
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
            sx={{ mb: 2, display: "flex", alignItems: errors.students ? "center" : "flex-end" }}
          >
            <Grid item xs={12} md={6}>
              <Controller
                name="students"
                control={control}
                rules={{ required: "Вкажіть кількість студентів в групі" }}
                render={({ field }) => {
                  return (
                    <Stack spacing={1}>
                      <InputLabel htmlFor="students">Кількість студентів*</InputLabel>
                      <OutlinedInput
                        id="students"
                        type="students"
                        {...field}
                        // value={values.firstname}
                        name="students"
                        // onBlur={handleBlur}
                        // onChange={handleChange}
                        placeholder="30"
                        fullWidth
                        error={Boolean(errors.students)}
                      />
                      {errors.students && (
                        <FormHelperText error id="helper-text-students">
                          {errors.students.message}
                        </FormHelperText>
                      )}
                    </Stack>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                // size="small"
                variant="outlined"
                color="secondary"
                sx={{
                  textTransform: "capitalize",
                  width: "100%",
                  p: "7.44px 15px",
                }}
              >
                Навчальний план
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid item xs={12} md={6}>
              <Controller
                name="formOfEducation"
                control={control}
                rules={{ required: "Вкажіть форму навчання" }}
                render={({ field }) => {
                  return (
                    <Stack spacing={1}>
                      <InputLabel htmlFor="formOfEducation">Форма навчання*</InputLabel>
                      <TextField
                        select
                        {...field}
                        fullWidth
                        id="formOfEducation"
                        //   value={value}
                        //   onChange={(e) => setValue(e.target.value)}
                        sx={{ "& .MuiInputBase-input": { py: "10.4px", fontSize: "0.875rem" } }}
                      >
                        {[
                          { value: "full-time", label: "Денна" },
                          { value: "partTime", label: "Заочна" },
                        ].map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Stack>
                  )
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Вкажіть форму навчання" }}
                render={({ field }) => {
                  return (
                    <Stack spacing={1}>
                      <InputLabel htmlFor="category">Категорія*</InputLabel>
                      <TextField
                        select
                        {...field}
                        fullWidth
                        id="category"
                        //   value={value}
                        //   onChange={(e) => setValue(e.target.value)}
                        sx={{ "& .MuiInputBase-input": { py: "10.4px", fontSize: "0.875rem" } }}
                      >
                        {[
                          { value: "1", label: "Фармація, промислова фармація (ДФ)" },
                          { value: "2", label: "Фармація, промислова фармація (ДФ)" },
                          { value: "3", label: "Лабораторна діагностика (ДФ)" },
                        ].map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Stack>
                  )
                }}
              />
            </Grid>
          </Grid>
        </MainCard>

        <Grid
          container
          spacing={3}
          sx={{ display: "flex", justifyContent: "flex-end", maxWidth: "860px", m: "0 auto" }}
        >
          <Grid item xs={12} md={3}>
            <Button
              color="secondary"
              sx={{
                textTransform: "capitalize",
                width: "100%",
                p: "7.44px 15px",
              }}
            >
              Відмінити
            </Button>
          </Grid>

          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: "capitalize",
                width: "100%",
                p: "7.44px 15px",
              }}
            >
              Зберегти
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default FullGroupPage
