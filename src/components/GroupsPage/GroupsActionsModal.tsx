import {
  Stack,
  Dialog,
  IconButton,
  InputLabel,
  DialogTitle,
  OutlinedInput,
  DialogContent,
  FormHelperText,
  DialogContentText,
  Button,
} from "@mui/material"
import { CloseOutlined } from "@ant-design/icons"
import React, { Dispatch, SetStateAction } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { useAppDispatch } from "../../store/store"
import { GroupCategoriesType } from "../../store/groups/groupsTypes"
import { createGroupCategory, updateGroupCategory } from "../../store/groups/groupsAsyncActions"

interface IGroupsActionsModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  activeGroupCategory: null | GroupCategoriesType
  modalType: "create-category" | "update-category"
  setActiveGroupCategory: Dispatch<SetStateAction<null | GroupCategoriesType>>
}

const GroupsActionsModal: React.FC<IGroupsActionsModalProps> = ({
  open,
  setOpen,
  modalType,
  activeGroupCategory,
  setActiveGroupCategory,
}) => {
  const dispatch = useAppDispatch()

  const handleClose = () => {
    setOpen(false)
  }

  const {
    watch,
    control,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<{ name: string }>({
    mode: "onChange",
  })

  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
    if (modalType === "create-category") {
      setOpen(false)
      await dispatch(createGroupCategory(data.name))
      setValue("name", "")
      return
    }

    if (modalType === "update-category" && activeGroupCategory) {
      setOpen(false)
      await dispatch(updateGroupCategory({ id: activeGroupCategory.id, name: data.name }))
      setActiveGroupCategory((prev) => {
        if (prev) {
          return { ...prev, name: data.name }
        } else {
          return prev
        }
      })
    }
  }

  React.useEffect(() => {
    if (modalType === "update-category") {
      activeGroupCategory && setValue("name", activeGroupCategory.name)
    } else {
      setValue("name", "")
    }
  }, [modalType, activeGroupCategory])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {modalType === "create-category" && (
          <DialogTitle id="alert-dialog-title">{"Створити структурний підрозділ"}</DialogTitle>
        )}
        {modalType === "update-category" && (
          <DialogTitle id="alert-dialog-title">{"Оновити структурний підрозділ"}</DialogTitle>
        )}

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
              rules={{ required: "Це поле обов'язкове" }}
              render={({ field }) => {
                return (
                  <Stack spacing={1} sx={{ mt: 2 }}>
                    <InputLabel htmlFor="modal-name">Назва*</InputLabel>
                    <OutlinedInput
                      fullWidth
                      {...field}
                      name="name"
                      id="modal-name"
                      value={watch("name")}
                      placeholder="Назва"
                      error={Boolean(errors.name)}
                    />
                    {errors.name && (
                      <FormHelperText error id="helper-text-modal-name">
                        {errors.name.message}
                      </FormHelperText>
                    )}
                  </Stack>
                )
              }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ width: "100%", mt: 3 }}
              disabled={!!errors.name || !watch("name")}
            >
              Зберегти
            </Button>
          </form>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export { GroupsActionsModal }
