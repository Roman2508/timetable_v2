import { CloseOutlined } from '@ant-design/icons'
import React, { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'

import CreateAuditoryForm from './CreateAuditoryForm'
import { AuditoriesTypes } from '../../store/auditories/auditoriesTypes'

interface IUpdateAuditoryModalProps {
  open: boolean
  editingAuditory: AuditoriesTypes | null
  setOpen: Dispatch<SetStateAction<boolean>>
}

const UpdateAuditoryModal: React.FC<IUpdateAuditoryModalProps> = ({ open, setOpen, editingAuditory }) => {
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
        <DialogTitle id="alert-dialog-title">{'Редагування аудиторії'}</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>
      <DialogContent sx={{ padding: '0 24px 20px' }}>
        <DialogContentText id="alert-dialog-description">
          <CreateAuditoryForm isOpenInModal editingAuditory={editingAuditory} handleClose={handleClose} />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateAuditoryModal
