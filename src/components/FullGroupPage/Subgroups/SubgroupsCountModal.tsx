import {
  Stack,
  Table,
  Dialog,
  Tooltip,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
  OutlinedInput,
  TableContainer,
} from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { EditOutlined, CheckOutlined, CloseOutlined, DeleteOutlined, CloseSquareOutlined } from '@ant-design/icons'

import { useAppDispatch } from '../../../store/store'

interface ISubgroupsCountModalProps {
  open: boolean
  groupId: number
  setOpen: Dispatch<SetStateAction<boolean>>
}

const SubgroupsCountModal: React.FC<ISubgroupsCountModalProps> = ({ open, groupId, setOpen }) => {
  const dispatch = useAppDispatch()

  const {
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<{ name: string }>({ mode: 'onBlur' })

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
    try {
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog
      open={open}
      maxWidth={'sm'}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <DialogTitle>{'Спеціалізовані підгрупи'}</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>

      <DialogContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: 'flex',
            alignItems: 'cener',
            justifyContent: 'center',
            gap: 10,
            marginTop: '20px',
          }}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <Stack spacing={1}>
                  <OutlinedInput
                    id="name"
                    {...field}
                    name="name"
                    error={Boolean(errors.name)}
                    placeholder="Назва підгрупи*"
                  />
                </Stack>
              )
            }}
          />
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { SubgroupsCountModal }
