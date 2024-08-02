import {
  Chip,
  Stack,
  Button,
  Divider,
  InputLabel,
  OutlinedInput,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  TextareaAutosize,
} from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import { DownOutlined } from "@ant-design/icons"

import {
  getTeacherReport,
  deleteTeacherReportFile,
  uploadTeacherReportFile,
} from "../../../store/teacherProfile/teacherProfileAsyncActions"
import { useAppDispatch } from "../../../store/store"
import { CustomDatePicker } from "../../CustomDatePicker"
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"
import { TeacherReportType } from "../../../store/teacherProfile/teacherProfileTypes"

interface ITeachersReportItemProps {
  report: TeacherReportType
}

const TeachersReportItem: React.FC<ITeachersReportItemProps> = ({ report }) => {
  const inputRef = React.useRef(null)

  const [isFileDeleting, setIsFileDeleting] = React.useState(false)
  const [isFileUploading, setIsFileUploading] = React.useState(false)

  const dispatch = useAppDispatch()

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>, reportId: number) => {
    try {
      if (!inputRef.current) return
      setIsFileUploading(true)
      // @ts-ignore
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append("file", file)
      console.log({ file: formData, id: reportId })
      //   await dispatch(uploadTeacherReportFile({ file: formData, id: reportId }))
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

  React.useEffect(() => {
    dispatch(getTeacherReport(17))
  }, [])

  return (
    <>
      <AccordionSummary expandIcon={<DownOutlined />} sx={{ fontWeight: 600 }}>
        {report.individualWork.name}
        <Chip
          size="small"
          variant="outlined"
          label={report.status ? "Виконано" : "Не виконано"}
          color={report.status ? "primary" : "error"}
          sx={{ width: "106px", ml: "auto", mr: 2 }}
        />
      </AccordionSummary>

      <Divider />

      <AccordionDetails>
        <div style={{ marginBottom: "30px", display: "flex", gap: 14 }}>
          <Stack spacing={1} sx={{ flex: 1 }}>
            <InputLabel htmlFor="hours">Кількість годин</InputLabel>
            <OutlinedInput
              fullWidth
              type="number"
              id="hours"
              name="hours"
              value={report.hours ? report.hours : report.individualWork.hours}
            />
          </Stack>

          <Stack spacing={1} sx={{ flex: 1 }}>
            <InputLabel>Планована дата виконання</InputLabel>
            <CustomDatePicker
              value={report.plannedDate}
              width="100%"
              sx={{ paddingTop: 0 }}
              setValue={(e) => console.log("firstSemesterEnd", e)}
            />
          </Stack>

          <Stack spacing={1} sx={{ flex: 1 }}>
            <InputLabel>Фактично виконано</InputLabel>
            <CustomDatePicker
              value={report.doneDate}
              width="100%"
              sx={{ paddingTop: 0 }}
              setValue={(e) => console.log("firstSemesterEnd", e)}
            />
          </Stack>
        </div>

        <TextareaAutosize
          color="neutral"
          placeholder="Зміст роботи"
          minRows={4}
          maxRows={4}
          value={report.description}
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "4px",
            padding: "10px",
            fontSize: "16px",
            outline: "none",
            resize: "none",
            width: "100%",
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
            disabled={isFileUploading}
            onClick={() => {
              /* @ts-ignore */
              inputRef.current?.click()
            }}
            sx={{ whiteSpace: "nowrap", textTransform: "initial", width: "130px" }}
          >
            {isFileUploading ? <LoadingSpinner size={20} disablePadding /> : "Додати файли"}
          </Button>
        </div>

        <div>
          <Button
            variant="contained"
            disabled={isFileUploading}
            sx={{ whiteSpace: "nowrap", textTransform: "initial" }}
          >
            Позначити як виконане
          </Button>
        </div>
      </AccordionActions>
    </>
  )
}

export default TeachersReportItem
