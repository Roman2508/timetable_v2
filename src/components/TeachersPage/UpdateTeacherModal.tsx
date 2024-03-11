import { CloseOutlined } from '@ant-design/icons'
import CreateTeacherForm from './CreateTeacherForm'
import React, { Dispatch, SetStateAction } from 'react'
import { TeachersType } from '../../store/teachers/teachersTypes'
import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'

interface IUpdateTeacherModalProps {
  open: boolean
  editingTeacher: TeachersType | null
  setOpen: Dispatch<SetStateAction<boolean>>
}

const UpdateTeacherModal: React.FC<IUpdateTeacherModalProps> = ({ open, setOpen, editingTeacher }) => {
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
        <DialogTitle id="alert-dialog-title">{'Редагування викладача'}</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>
      <DialogContent sx={{ padding: '0 24px 20px' }}>
        <DialogContentText id="alert-dialog-description">
          <CreateTeacherForm isOpenInModal editingTeacher={editingTeacher} handleClose={handleClose} />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateTeacherModal
