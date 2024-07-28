import {
  Stack,
  Dialog,
  Button,
  IconButton,
  InputLabel,
  DialogTitle,
  OutlinedInput,
  DialogContent,
  FormHelperText,
  DialogContentText,
} from "@mui/material"
import { CloseOutlined } from "@ant-design/icons"
import React, { Dispatch, SetStateAction } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { useAppDispatch } from "../../store/store"
import { GroupLoadType } from "../../store/groups/groupsTypes"

interface IInstructionalMaterialsModalProps {
  open: boolean
  selectedLesson: GroupLoadType | null
  setOpen: Dispatch<SetStateAction<boolean>>
}

const InstructionalMaterialsModal: React.FC<IInstructionalMaterialsModalProps> = (props) => {
  const { open, setOpen, selectedLesson } = props

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
    setOpen(false)
    //   await dispatch(aaaaaaa(data.name))
    setValue("name", "")
  }

  React.useEffect(() => {
    if (!selectedLesson) return
    setValue("name", selectedLesson.name)
  }, [selectedLesson])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ "& .MuiDialog-paper": { width: "100% !important", maxWidth: "500px" } }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <DialogTitle>Тема уроку</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>

      <DialogContent sx={{ padding: "0 24px 20px" }}>
        <DialogContentText>
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

export { InstructionalMaterialsModal }
