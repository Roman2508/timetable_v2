import {
  Chip,
  Stack,
  Button,
  Divider,
  Accordion,
  InputLabel,
  Typography,
  OutlinedInput,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  TextareaAutosize,
} from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import { DownOutlined } from "@ant-design/icons"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import {
  deleteTeacherReportFile,
  updateTeacherReport,
  uploadTeacherReportFile,
} from "../../../store/teacherProfile/teacherProfileAsyncActions"
import { useAppDispatch } from "../../../store/store"
import { CustomDatePicker } from "../../CustomDatePicker"
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"
import { TeacherReportType } from "../../../store/teacherProfile/teacherProfileTypes"

interface ITeachersReportItemProps {
  report: TeacherReportType
}

interface IFormFields {
  id: number
  hours: number
  doneDate: string
  plannedDate: string
  description: string
}

const TeachersReportItem: React.FC<ITeachersReportItemProps> = ({ report }) => {
  const inputRef = React.useRef(null)

  const [isLoading, setIsLoading] = React.useState(false)
  const [isFileDeleting, setIsFileDeleting] = React.useState(false)
  const [isFileUploading, setIsFileUploading] = React.useState(false)

  const dispatch = useAppDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormFields>({
    mode: "onBlur",
    defaultValues: {
      id: report.id,
      hours: report.hours,
      doneDate: report.doneDate,
      plannedDate: report.plannedDate,
      description: report.description,
    },
  })

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      await dispatch(updateTeacherReport(data))
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateStatus = async () => {
    try {
      setIsLoading(true)
      const data = {
        id: report.id,
        hours: report.hours,
        status: !report.status,
        doneDate: report.doneDate,
        plannedDate: report.plannedDate,
        description: report.description,
      }
      await dispatch(updateTeacherReport(data))
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>, reportId: number) => {
    try {
      if (!inputRef.current) return
      setIsFileUploading(true)
      // @ts-ignore
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append("file", file)
      await dispatch(uploadTeacherReportFile({ file: formData, id: reportId }))
      // @ts-ignore
      inputRef.current.value = ""
    } finally {
      setIsFileUploading(false)
    }
  }

  const handleDeleteFile = async (e: any, reportId: number, fileId: string) => {
    try {
      e.preventDefault()
      setIsFileDeleting(true)
      await dispatch(deleteTeacherReportFile({ id: reportId, fileId }))
    } finally {
      setIsFileDeleting(false)
    }
  }

  return (
    <Accordion
      sx={{
        "&.Mui-expanded": { background: "white" },
        "&.Mui-expanded .MuiAccordionSummary-root": { background: "#fafafb" },
      }}
    >
      <AccordionSummary
        expandIcon={<DownOutlined />}
        sx={{ fontWeight: 600, ".MuiAccordionSummary-content": { alignItems: "center" } }}
      >
        <Typography variant="button" sx={{ fontWeight: 600, textTransform: "inherit", maxWidth: "calc(100% - 180px)" }}>
          {report.individualWork.name}
        </Typography>

        <div style={{ marginLeft: "auto" }}>
          <Chip
            size="small"
            variant="outlined"
            label={report.hours}
            sx={{ width: "50px", mr: 1 }}
            color={report.status ? "primary" : "error"}
          />

          <Chip
            size="small"
            variant="outlined"
            sx={{ width: "106px", mr: 2 }}
            color={report.status ? "primary" : "error"}
            label={report.status ? "Виконано" : "Не виконано"}
          />
        </div>
      </AccordionSummary>

      <Divider />

      <form onSubmit={handleSubmit(onSubmit)}>
        <AccordionDetails>
          <div style={{ marginBottom: "30px", display: "flex", gap: 14 }}>
            <Controller
              name="hours"
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field }) => {
                return (
                  <Stack spacing={1} sx={{ flex: 1 }}>
                    <InputLabel>Кількість годин*</InputLabel>
                    <OutlinedInput {...field} fullWidth name="hours" type="number" error={Boolean(errors.hours)} />
                  </Stack>
                )
              }}
            />

            <Controller
              name="plannedDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <Stack spacing={1} sx={{ flex: 1 }}>
                    <InputLabel>Планована дата виконання*</InputLabel>
                    <CustomDatePicker
                      width="100%"
                      ref={field.ref}
                      name={field.name}
                      value={field.value}
                      sx={{ paddingTop: 0 }}
                      setValue={field.onChange}
                    />
                  </Stack>
                )
              }}
            />

            <Controller
              name="doneDate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <Stack spacing={1} sx={{ flex: 1 }}>
                    <InputLabel>Фактично виконано*</InputLabel>
                    <CustomDatePicker
                      width="100%"
                      ref={field.ref}
                      name={field.name}
                      value={field.value}
                      sx={{ paddingTop: 0 }}
                      setValue={field.onChange}
                    />
                  </Stack>
                )
              }}
            />
          </div>

          <Controller
            name="description"
            control={control}
            render={({ field }) => {
              return (
                <TextareaAutosize
                  {...field}
                  minRows={4}
                  maxRows={4}
                  color="neutral"
                  placeholder="Зміст роботи"
                  className="teacher-report-textarea"
                />
              )
            }}
          />
        </AccordionDetails>

        <AccordionActions sx={{ px: "16px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
              {report.files.map((file) => (
                <Link
                  key={file.id}
                  target="_blank"
                  // preview
                  to={`https://drive.google.com/file/d/${file.id}/view`}
                  // download
                  // to={`https://drive.usercontent.google.com/download?id=${file.id}&export=download&authuser=0&confirm=t`}
                >
                  <Chip
                    size="small"
                    label={file.name}
                    sx={{ mx: 1, my: 0.5 }}
                    disabled={isFileDeleting}
                    onDelete={(e) => handleDeleteFile(e, report.id, file.id)}
                  />
                </Link>
              ))}
            </div>

            <input
              type="file"
              ref={inputRef}
              style={{ display: "none" }}
              onChange={(e) => handleUploadFile(e, report.id)}
            />

            <Button
              variant="outlined"
              disabled={isFileUploading || isSubmitting}
              onClick={() => {
                /* @ts-ignore */
                inputRef.current?.click()
              }}
              sx={{ whiteSpace: "nowrap", textTransform: "initial", width: "130px" }}
            >
              {isFileUploading ? <LoadingSpinner size={24.5} disablePadding /> : "Додати файли"}
            </Button>
          </div>

          <div>
            <Button
              variant="contained"
              onClick={handleUpdateStatus}
              color={report.status ? "error" : "primary"}
              disabled={isLoading || isFileUploading || isSubmitting}
              sx={{ whiteSpace: "nowrap", textTransform: "initial", width: "120px" }}
            >
              {/* {report.status ? "Не виконано" : "Виконано"} */}
              {isLoading ? <LoadingSpinner size={24.5} disablePadding /> : report.status ? "Не виконано" : "Виконано"}
            </Button>

            <Button
              type="submit"
              variant="contained"
              color={"primary"}
              disabled={isSubmitting}
              sx={{ whiteSpace: "nowrap", textTransform: "initial", ml: 1, width: "95px" }}
            >
              {isSubmitting ? <LoadingSpinner size={24.5} disablePadding /> : "Зберегти"}
            </Button>
          </div>
        </AccordionActions>
      </form>
    </Accordion>
  )
}

export default TeachersReportItem
