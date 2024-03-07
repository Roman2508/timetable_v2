import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

import { CloseOutlined } from '@ant-design/icons'
import CreateAuditoryForm from './CreateAuditoryForm'

interface IUpdateAuditoryModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const UpdateAuditoryModal: React.FC<IUpdateAuditoryModalProps> = ({ open, setOpen }) => {
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
          <CreateAuditoryForm isOpenInModal />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateAuditoryModal
