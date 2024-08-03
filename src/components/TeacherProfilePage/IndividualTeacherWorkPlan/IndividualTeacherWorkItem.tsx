import { EditOutlined } from "@ant-design/icons"
import React, { Dispatch, SetStateAction } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Chip, Button, Checkbox, TextField, IconButton, FormControlLabel, Stack, InputLabel } from "@mui/material"

import { useAppDispatch } from "../../../store/store"
import { IFormState } from "./IndividualTeacherWorkForm"
import { CustomDatePicker } from "../../CustomDatePicker"
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"
import { IndividualWorkPlanType, TeacherReportType } from "../../../store/teacherProfile/teacherProfileTypes"
import { createTeacherReport, deleteTeacherReport } from "../../../store/teacherProfile/teacherProfileAsyncActions"

interface IFormFields {
  plannedDate: string
  description: string
}

interface IIndividualTeacherWorkItemProps {
  showedYear: number
  addedReport?: TeacherReportType
  individualWork: IndividualWorkPlanType
  setEditingIndividualTeacherWork: Dispatch<SetStateAction<IFormState | null>>
}

const IndividualTeacherWorkItem: React.FC<IIndividualTeacherWorkItemProps> = (props) => {
  const { individualWork, setEditingIndividualTeacherWork, showedYear, addedReport } = props

  const dispatch = useAppDispatch()

  const [isDeleting, setIsDeleting] = React.useState(false)
  const [isChecked, setIsChecked] = React.useState(addedReport ? true : false)

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IFormFields>({ mode: "onBlur" })

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      const payload = {
        teacher: 17,
        year: showedYear,
        hours: individualWork.hours,
        plannedDate: data.plannedDate,
        description: data.description,
        individualWork: individualWork.id,
      }

      await dispatch(createTeacherReport(payload))
    } catch (err) {
      console.log(err)
    }
  }

  const onDeleteTeacherReport = async () => {
    if (!addedReport) return
    setIsDeleting(true)
    await dispatch(deleteTeacherReport(addedReport.id))
    setIsDeleting(false)
  }

  const onEditIndividualTeacherWork = (values: IFormState) => {
    setEditingIndividualTeacherWork(values)
    window.scrollTo(0, 0)
  }

  React.useEffect(() => {
    if (addedReport) {
      setIsChecked(true)
    }

    if (addedReport) {
      setValue("plannedDate", addedReport.plannedDate)
      setValue("description", addedReport.description)
    }
  }, [addedReport, addedReport])

  return (
    <div style={{ padding: "16px", border: "1px solid #f0f0f0", margin: "10px 0" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            flex: 1,
            width: "calc(100% - 50px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            label={individualWork.name}
            sx={{ userSelect: "none" }}
            control={<Checkbox value={isChecked} checked={isChecked} onChange={() => setIsChecked((prev) => !prev)} />}
          />

          <Chip label={individualWork.hours} sx={{ userSelect: "none", mr: 1 }} size="small" variant="outlined" />
        </div>

        <IconButton
          onClick={() =>
            onEditIndividualTeacherWork({
              id: individualWork.id,
              name: individualWork.name,
              type: individualWork.type,
              hours: individualWork.hours,
            })
          }
        >
          <EditOutlined />
        </IconButton>
      </div>

      {isChecked && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", alignItems: "flex-end", gap: 12, margin: "16px 0 20px" }}
        >
          <Controller
            name="plannedDate"
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <Stack spacing={1}>
                  <InputLabel>Дата виконання*</InputLabel>
                  <CustomDatePicker
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
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <Stack spacing={1} sx={{ flex: 1 }}>
                  <InputLabel>Зміст роботи*</InputLabel>
                  <TextField {...field} fullWidth sx={{ "& .MuiInputBase-input": { py: "10.51px" } }} />
                </Stack>
              )
            }}
          />

          {addedReport ? (
            <Button
              type="button"
              color="error"
              variant="outlined"
              disabled={isDeleting}
              onClick={onDeleteTeacherReport}
              sx={{ whiteSpace: "nowrap", textTransform: "initial", width: "160px" }}
            >
              {isDeleting ? <LoadingSpinner size={24.5} disablePadding /> : "Видалити зі звіта"}
            </Button>
          ) : (
            <Button
              type="submit"
              color="primary"
              variant="outlined"
              disabled={isSubmitting}
              sx={{ whiteSpace: "nowrap", textTransform: "initial", width: "160px" }}
            >
              {isSubmitting ? <LoadingSpinner size={24.5} disablePadding /> : "Додати до звіта"}
            </Button>
          )}
        </form>
      )}
    </div>
  )
}

export default IndividualTeacherWorkItem
