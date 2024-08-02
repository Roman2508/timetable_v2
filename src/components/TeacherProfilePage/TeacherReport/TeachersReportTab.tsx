import {
  Chip,
  Stack,
  Button,
  Divider,
  Accordion,
  InputLabel,
  OutlinedInput,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  TextareaAutosize,
} from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { DownOutlined } from "@ant-design/icons"

import {
  getTeacherReport,
  deleteTeacherReportFile,
  uploadTeacherReportFile,
} from "../../../store/teacherProfile/teacherProfileAsyncActions"
import TeachersReportItem from "./TeacherReportItem"
import { useAppDispatch } from "../../../store/store"
import { CustomDatePicker } from "../../CustomDatePicker"
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"
import { TeacherReportType } from "../../../store/teacherProfile/teacherProfileTypes"
import { teacherProfileSelector } from "../../../store/teacherProfile/teacherProfileSlice"

const TeachersReportTab: React.FC = () => {
  const [isFileDeleting, setIsFileDeleting] = React.useState(false)
  const [isFileUploading, setIsFileUploading] = React.useState(false)
  const [inputRefs, setInputRefs] = React.useState<React.RefObject<HTMLInputElement>[]>([])

  const dispatch = useAppDispatch()

  const { report } = useSelector(teacherProfileSelector)

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>, reportId: number, index: number) => {
    try {
      if (!inputRefs[index].current) return
      setIsFileUploading(true)
      // @ts-ignore
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append("file", file)

      await dispatch(uploadTeacherReportFile({ file: formData, id: reportId }))
      inputRefs[index].current.value = ""
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
    const fetchData = async () => {
      const { payload } = await dispatch(getTeacherReport(17))
      const reports = payload as TeacherReportType[]

      for (let i = 0; i <= reports.length; i++) {
        setInputRefs((prev) => [...prev, React.createRef()])
      }
    }

    fetchData()
  }, [])

  return (
    <div style={{ position: "relative" }}>
      <div style={{ marginBottom: "30px" }}>
        <Button variant="outlined" sx={{ mr: 1 }} style={{ textTransform: "initial" }}>
          Експортувати звіт в PDF
        </Button>

        <Button variant="outlined" style={{ textTransform: "initial" }}>
          Експортувати звіт в WORD
        </Button>
      </div>

      {(report ? report : []).map((el: TeacherReportType, index: number) => {
        return (
          <Accordion
            key={el.id}
            sx={{
              "&.Mui-expanded": { /* margin: "32px 0 !important" */ background: "white" },
              "&.Mui-expanded .MuiAccordionSummary-root": {
                /* margin: "32px 0 !important" */ background: "#fafafb",
              },
            }}
          >
            {/* <TeachersReportItem report={el} /> */}
            <AccordionSummary expandIcon={<DownOutlined />} sx={{ fontWeight: 600 }}>
              {el.individualWork.name}
              <Chip
                size="small"
                variant="outlined"
                label={el.status ? "Виконано" : "Не виконано"}
                color={el.status ? "primary" : "error"}
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
                    value={el.hours ? el.hours : el.individualWork.hours}
                  />
                </Stack>

                <Stack spacing={1} sx={{ flex: 1 }}>
                  <InputLabel>Планована дата виконання</InputLabel>
                  <CustomDatePicker
                    value={el.plannedDate}
                    width="100%"
                    sx={{ paddingTop: 0 }}
                    setValue={(e) => console.log("firstSemesterEnd", e)}
                  />
                </Stack>

                <Stack spacing={1} sx={{ flex: 1 }}>
                  <InputLabel>Фактично виконано</InputLabel>
                  <CustomDatePicker
                    value={el.doneDate}
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
                value={el.description}
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
                  {el.files.map((file) => (
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
                        onDelete={(e) => handleDeleteFile(e, el.id, file.id)}
                      />
                    </Link>
                  ))}
                </div>

                <input
                  type="file"
                  ref={inputRefs[index]}
                  style={{ display: "none" }}
                  onChange={(e) => handleUploadFile(e, el.id, index)}
                />

                <Button
                  variant="outlined"
                  disabled={isFileUploading}
                  onClick={() => inputRefs[index]?.current?.click()}
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
          </Accordion>
        )
      })}
    </div>
  )
}

export default TeachersReportTab
