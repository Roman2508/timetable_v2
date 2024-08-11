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
} from '@mui/material'
import { CloseOutlined } from '@ant-design/icons'
import React, { Dispatch, SetStateAction } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import {
  createInstructionalMaterials,
  updateInstructionalMaterials,
} from '../../../store/teacherProfile/teacherProfileAsyncActions'
import { useAppDispatch } from '../../../store/store'
import { GroupLoadType } from '../../../store/groups/groupsTypes'
import { InstructionalMaterialsType } from '../../../store/teacherProfile/teacherProfileTypes'

interface IInstructionalMaterialsModalProps {
  open: boolean
  actionType: 'create' | 'update'
  selectedLesson: GroupLoadType | null
  setOpen: Dispatch<SetStateAction<boolean>>
  editingTheme: InstructionalMaterialsType | null
}

const InstructionalMaterialsModal: React.FC<IInstructionalMaterialsModalProps> = (props) => {
  const { open, setOpen, editingTheme, actionType, selectedLesson } = props

  const dispatch = useAppDispatch()

  const {
    watch,
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({ mode: 'onChange' })

  const handleClose = () => {
    setOpen(false)
    clearErrors('name')
  }

  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
    if (!selectedLesson) return alert('Урок не вибраний')
    if (!editingTheme) return alert('Тема не вибрана')
    setOpen(false)

    if (actionType === 'create') {
      const payload = { name: data.name, lessonNumber: editingTheme.lessonNumber, lessonId: selectedLesson.id }
      await dispatch(createInstructionalMaterials(payload))
      return
    }

    if (actionType === 'update') {
      const payload = {
        name: data.name,
        id: editingTheme.id,
        lessonId: selectedLesson.id,
        lessonNumber: editingTheme.lessonNumber,
      }
      await dispatch(updateInstructionalMaterials(payload))
    }

    setValue('name', '')
  }

  React.useEffect(() => {
    if (!editingTheme) return
    setValue('name', editingTheme.name)
  }, [editingTheme])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ '& .MuiDialog-paper': { width: '100% !important', maxWidth: '500px' } }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle>Тема уроку</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>

      <DialogContent sx={{ padding: '0 24px 20px' }}>
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
                      value={watch('name')}
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
              sx={{ width: '100%', mt: 3 }}
              disabled={!!errors.name || !watch('name')}
            >
              {actionType === 'create' ? 'Зберегти' : 'Оновити'}
            </Button>
          </form>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export { InstructionalMaterialsModal }
