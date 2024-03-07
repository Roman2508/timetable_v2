import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import CreateTeacherForm from './CreateTeacherForm'
import { CloseOutlined } from '@ant-design/icons'
import CreateTeachersCategoryForm from './CreateTeachersCategoryForm'

interface IUpdateTeachersCategoryFormProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const UpdateTeachersCategoryForm: React.FC<IUpdateTeachersCategoryFormProps> = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle id="alert-dialog-title">{'Редагування категорії'}</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>
      <DialogContent sx={{ padding: '0 24px 20px' }}>
        <DialogContentText id="alert-dialog-description">
          <CreateTeachersCategoryForm isOpenInModal />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateTeachersCategoryForm
