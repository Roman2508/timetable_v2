import {
  Stack,
  Button,
  Dialog,
  TextField,
  IconButton,
  InputLabel,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material"
import { CloseOutlined } from "@ant-design/icons"
import React, { Dispatch, SetStateAction } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { useAppDispatch } from "../../store/store"
import { PlanSubjectType } from "../../store/plans/plansTypes"
import { IFormFields, formFields } from "./FullPlanPageFormFields"

interface ISemesterHoursModalProps {
  open: boolean
  selectedSemester: PlanSubjectType | null
  setOpen: Dispatch<SetStateAction<boolean>>
  setSelectedSemester: Dispatch<SetStateAction<PlanSubjectType | null>>
}

const SemesterHoursModal: React.FC<ISemesterHoursModalProps> = ({
  open,
  setOpen,
  selectedSemester,
  setSelectedSemester,
}) => {
  const dispatch = useAppDispatch()

  const {
    reset,
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<IFormFields>({ mode: "onBlur" })

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      // await dispatch(createPlanSubjects({ ...data, planId: Number(planId) }))
    } catch (error) {
      console.log(error)
    }
  }
  console.log(selectedSemester)
  React.useEffect(() => {
    if (!selectedSemester) return
    reset(selectedSemester)

    // return () => setSelectedSemester(null)
  }, [selectedSemester])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <DialogTitle id="alert-dialog-title">
          {selectedSemester && selectedSemester.name}
        </DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>
      <DialogContent sx={{ padding: "0 24px 20px" }}>
        <DialogContentText id="alert-dialog-description">
          <Typography>60 / 60</Typography>

          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            {formFields.map((el) => (
              <Controller
                name={el.value}
                control={control}
                rules={{ required: "Вкажіть назву категорії" }}
                render={({ field }) => {
                  return (
                    <Stack
                      spacing={1}
                      sx={{ mt: 1, display: "flex", flexDirection: "row", alignItems: "center" }}
                    >
                      <InputLabel
                        htmlFor={el.value}
                        sx={{ flexGrow: 1, mt: "8px !important", mr: "16px !important" }}
                      >
                        {el.label}
                      </InputLabel>

                      <TextField
                        fullWidth
                        id={el.value}
                        size="small"
                        {...field}
                        type="number"
                        name={el.value}
                        placeholder=""
                        sx={{
                          maxWidth: "100px",
                          mr: "8px !important",
                          "& .MuiInputBase-root": { p: 0 },
                        }}
                      />
                    </Stack>
                  )
                }}
              />
            ))}

            <div style={{ display: "flex", gap: 20 }}>
              <Button
                type="button"
                color="error"
                variant="outlined"
                disabled={isSubmitting}
                sx={{ textTransform: "capitalize", width: "50%", p: "7.44px 15px", mt: 3 }}
              >
                {!isSubmitting ? "Видалити" : "Завантаження..."}
              </Button>

              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={isSubmitting}
                sx={{ textTransform: "capitalize", width: "50%", p: "7.44px 15px", mt: 3 }}
              >
                {!isSubmitting ? "Зберегти" : "Завантаження..."}
              </Button>
            </div>
          </form>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export { SemesterHoursModal }
