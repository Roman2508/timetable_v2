import {
  Chip,
  Stack,
  Button,
  Divider,
  TextField,
  Accordion,
  IconButton,
  InputLabel,
  Typography,
  AccordionSummary,
} from "@mui/material"
import debounse from "lodash/debounce"
import React, { Dispatch, SetStateAction } from "react"
import { DownOutlined, EditOutlined } from "@ant-design/icons"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import {
  createTeacherReport,
  deleteTeacherReport,
  updateTeacherReport,
} from "../../../store/teacherProfile/teacherProfileAsyncActions"
import { useAppDispatch } from "../../../store/store"
import { IFormState } from "./IndividualTeacherWorkForm"
import { CustomDatePicker } from "../../CustomDatePicker"
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"
import { IndividualWorkPlanType, TeacherReportType } from "../../../store/teacherProfile/teacherProfileTypes"

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

  const [isFetching, setIsFetching] = React.useState(false)
  const [isExpanded, setIsExpanded] = React.useState(addedReport ? true : false)

  const {
    watch,
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
    setIsFetching(true)
    await dispatch(deleteTeacherReport(addedReport.id))
    setIsFetching(false)
  }

  // const onCreateTeacherReport = async () => {
  //   try {
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const onEditIndividualTeacherWork = (values: IFormState) => {
    setEditingIndividualTeacherWork(values)
    window.scrollTo(0, 0)
  }

  const debouncedUpdateReport = React.useCallback(
    debounse((payload) => dispatch(updateTeacherReport(payload)), 1000),
    []
  )

  React.useEffect(() => {
    if (addedReport) {
      setIsExpanded(true)
      setValue("plannedDate", addedReport.plannedDate)
      setValue("description", addedReport.description)
    }
  }, [addedReport])

  React.useEffect(() => {
    if (!addedReport) return
    if (addedReport.description === watch("description") && addedReport.plannedDate === watch("plannedDate")) return

    const payload = {
      ...addedReport,
      plannedDate: watch("plannedDate"),
      description: watch("description"),
    }
    debouncedUpdateReport(payload)
  }, [watch("description"), watch("plannedDate")])

  return (
    <Accordion
      disableGutters
      expanded={isExpanded}
      sx={{
        boxShadow: "none",
        borderBottom: "1px solid #f0f0f0",
        "&.Mui-expanded": { background: "white" },
        "&.Mui-expanded .MuiAccordionSummary-root": { background: "#fafafb" },
        "&::before": { background: "0", height: "10px !important" },
      }}
    >
      <AccordionSummary
        onClick={() => setIsExpanded((prev) => !prev)}
        expandIcon={<DownOutlined />}
        sx={{ fontWeight: 600, ".MuiAccordionSummary-content": { alignItems: "center" } }}
      >
        <Typography variant="button" sx={{ fontWeight: 600, textTransform: "inherit", maxWidth: "calc(100% - 180px)" }}>
          {individualWork.name}
        </Typography>

        <div style={{ marginLeft: "auto" }}>
          {addedReport && (
            <Chip
              label="Заплановано"
              sx={{ userSelect: "none", mr: 1 }}
              size="small"
              variant="outlined"
              color="primary"
            />
          )}

          <Chip label={individualWork.hours} sx={{ userSelect: "none" }} size="small" variant="outlined" />

          <IconButton
            sx={{ ml: 1, mr: 2 }}
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
      </AccordionSummary>

      <Divider />

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", alignItems: "flex-end", gap: 12, margin: "16px 0 20px", paddingBottom: "32px" }}
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
            disabled={isFetching}
            onClick={onDeleteTeacherReport}
            sx={{ whiteSpace: "nowrap", textTransform: "initial", width: "160px", padding: "7.32px 15px" }}
          >
            {isFetching ? <LoadingSpinner size={24.5} disablePadding /> : "Видалити зі звіта"}
          </Button>
        ) : (
          <Button
            type="submit"
            color="primary"
            variant="outlined"
            disabled={isSubmitting}
            sx={{ whiteSpace: "nowrap", textTransform: "initial", width: "160px", padding: "7.32px 15px" }}
          >
            {isSubmitting ? <LoadingSpinner size={24.5} disablePadding /> : "Додати до звіта"}
          </Button>
        )}
      </form>
    </Accordion>
  )
}

export default IndividualTeacherWorkItem
