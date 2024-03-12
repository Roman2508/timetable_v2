import {
  Stack,
  Button,
  Dialog,
  MenuItem,
  TextField,
  IconButton,
  InputLabel,
  DialogTitle,
  DialogContent,
  OutlinedInput,
  FormHelperText,
  DialogContentText,
} from "@mui/material"
import { useSelector } from "react-redux"
import { CloseOutlined } from "@ant-design/icons"
import React, { Dispatch, SetStateAction } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { useAppDispatch } from "../../store/store"
import { teachersSelector } from "../../store/teachers/teachersSlice"
import { getTeachersCategories } from "../../store/teachers/teachersAsyncActions"
import { createPlanSubjects, updatePlanSubjectsName } from "../../store/plans/plansAsyncActions"

interface ISubjectsModalProps {
  open: boolean
  planId?: string
  editingSubjectName: string
  subjectsModalType: "create" | "update"
  setOpen: Dispatch<SetStateAction<boolean>>
}

const SubjectsModal: React.FC<ISubjectsModalProps> = ({
  open,
  setOpen,
  planId,
  subjectsModalType,
  editingSubjectName,
}) => {
  const dispatch = useAppDispatch()

  const { teachersCategories } = useSelector(teachersSelector)

  const {
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<{ name: string; cmk: number }>({ mode: "onBlur" })

  const handleClose = () => {
    setOpen(false)
  }

  React.useEffect(() => {
    if (subjectsModalType === "update") {
      if (!editingSubjectName) return
      setValue("name", editingSubjectName)
      return
    }

    if (subjectsModalType === "create") {
      setValue("name", "")
    }
  }, [editingSubjectName, subjectsModalType, open])

  React.useEffect(() => {
    if (teachersCategories) return
    dispatch(getTeachersCategories())
  }, [])

  const onSubmit: SubmitHandler<{ name: string; cmk: number }> = async (data) => {
    try {
      if (subjectsModalType === "create") {
        if (!planId) return
        await dispatch(
          createPlanSubjects({ name: data.name, planId: Number(planId), cmk: data.cmk })
        )
        handleClose()
        reset({ name: "" })
        return
      }

      if (subjectsModalType === "update") {
        await dispatch(
          updatePlanSubjectsName({
            newName: data.name,
            oldName: editingSubjectName,
            planId: Number(planId),
            cmk: data.cmk,
          })
        )
        handleClose()
        reset({ name: "" })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <DialogTitle id="alert-dialog-title">
          {subjectsModalType === "create" ? "Додати дисципліну" : "Редагування дисципліни"}
        </DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>
      <DialogContent sx={{ padding: "0 24px 20px" }}>
        <DialogContentText id="alert-dialog-description">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Вкажіть назву дисципліни" }}
              render={({ field }) => {
                return (
                  <Stack spacing={1} sx={{ mt: 2 }}>
                    <InputLabel htmlFor="name">Назва дисципліни*</InputLabel>
                    <OutlinedInput
                      id="name"
                      {...field}
                      fullWidth
                      name="name"
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

            <Controller
              name="cmk"
              control={control}
              rules={{ required: "Вкажіть категорію" }}
              render={({ field }) => {
                return (
                  <Stack spacing={1} sx={{ mt: 2 }}>
                    <InputLabel htmlFor="category">ЦК*</InputLabel>
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

            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              sx={{ textTransform: "capitalize", width: "100%", p: "7.44px 15px", mt: 3 }}
            >
              {!isSubmitting && subjectsModalType === "create"
                ? "Створити"
                : !isSubmitting && subjectsModalType === "update"
                ? "Оновити"
                : "Завантаження..."}
            </Button>
          </form>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default SubjectsModal
