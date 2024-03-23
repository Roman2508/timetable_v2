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
import { StreamsType } from "../../store/streams/streamsTypes"
import { createStream, updateStream } from "../../store/streams/streamsAsyncActions"

interface IStreamActionsModalProps {
  open: boolean
  modalType: "create" | "update"
  selectedStream: null | StreamsType
  setOpen: Dispatch<SetStateAction<boolean>>
}

const StreamActionsModal: React.FC<IStreamActionsModalProps> = ({
  open,
  setOpen,
  modalType,
  selectedStream,
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
    if (modalType === "create") {
      setOpen(false)
      await dispatch(createStream({ name: data.name }))
      setValue("name", "")
      return
    }

    if (modalType === "update" && selectedStream) {
      setOpen(false)
      await dispatch(updateStream({ id: selectedStream.id, name: data.name }))
    }
  }

  React.useEffect(() => {
    if (modalType === "update") {
      selectedStream && setValue("name", selectedStream.name)
    } else {
      setValue("name", "")
    }
  }, [modalType, selectedStream])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {modalType === "create" && (
          <DialogTitle id="alert-dialog-title">{"Створити потік"}</DialogTitle>
        )}
        {modalType === "update" && (
          <DialogTitle id="alert-dialog-title">{"Оновити потік"}</DialogTitle>
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

export { StreamActionsModal }
