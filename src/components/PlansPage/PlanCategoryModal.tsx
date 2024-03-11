import {
  Stack,
  Button,
  Dialog,
  IconButton,
  InputLabel,
  DialogTitle,
  DialogContent,
  OutlinedInput,
  FormHelperText,
  DialogContentText,
} from "@mui/material"
import { CloseOutlined } from "@ant-design/icons"
import React, { Dispatch, SetStateAction } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { useAppDispatch } from "../../store/store"
import {
  createPlan,
  createPlanCategory,
  updatePlanCategory,
} from "../../store/plans/plansAsyncActions"

interface IPlanCategoryModalProps {
  open: boolean
  modalType: "create" | "update" | "create-plan"
  setOpen: Dispatch<SetStateAction<boolean>>
  editingPlanCategory: { id: number; name: string } | null
}

const PlanCategoryModal: React.FC<IPlanCategoryModalProps> = ({
  open,
  setOpen,
  modalType,
  editingPlanCategory,
}) => {
  const dispatch = useAppDispatch()

  const handleClose = () => {
    reset({ name: "" })
    setOpen(false)
  }

  const {
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<{ name: string }>({
    mode: "onBlur",
    defaultValues: {
      name: editingPlanCategory ? editingPlanCategory.name : "",
    },
  })

  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
    try {
      // Якщо форму відкрито в модалці - оновлення викладача
      if (modalType === "update") {
        if (!editingPlanCategory) return
        await dispatch(updatePlanCategory({ ...data, id: editingPlanCategory.id }))
        handleClose()
        reset({ name: "" })
        return
      }

      if (modalType === "create") {
        // Якщо форму відкрито НЕ в модалці - створення викладача
        await dispatch(createPlanCategory(data))
        handleClose()
        reset({ name: "" })
        return
      }

      if (modalType === "create-plan") {
        if (!editingPlanCategory) return
        await dispatch(createPlan({ ...data, categoryId: editingPlanCategory.id }))
        handleClose()
        reset({ name: "" })
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (!editingPlanCategory || modalType === "create-plan") return
    setValue("name", editingPlanCategory.name)
  }, [editingPlanCategory])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <DialogTitle id="alert-dialog-title">
          {modalType === "create" && "Нова категорія"}
          {modalType === "update" && "Редагування категорії"}
          {modalType === "create-plan" && "Новий план"}
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
              rules={{ required: "Вкажіть назву категорії" }}
              render={({ field }) => {
                return (
                  <Stack spacing={1} sx={{ mt: 2 }}>
                    <InputLabel htmlFor="name">Назва*</InputLabel>
                    <OutlinedInput
                      fullWidth
                      id="name"
                      {...field}
                      name="name"
                      type="text"
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

            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              sx={{ textTransform: "capitalize", width: "100%", p: "7.44px 15px", mt: 3 }}
            >
              {modalType === "update" && !isSubmitting
                ? "Оновити"
                : modalType === "create" && !isSubmitting
                ? "Створити"
                : modalType === "create-plan" && !isSubmitting
                ? "Створити"
                : "Завантаження..."}
            </Button>
          </form>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default PlanCategoryModal
