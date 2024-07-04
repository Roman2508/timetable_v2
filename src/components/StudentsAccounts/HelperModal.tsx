import { CloseOutlined } from '@ant-design/icons'
import React, { Dispatch, SetStateAction } from 'react'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'

interface IHelperModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const HelperModal: React.FC<IHelperModalProps> = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle>{'В якому форматі має бути Excel файл?'}</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>
      <DialogContent sx={{ padding: '0 24px 20px' }}>
        <DialogContentText>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: '1px solid #ddd' }}>name</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>login</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>password</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>email</TableCell>
                <TableCell sx={{ border: '1px solid #ddd' }}>group</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default HelperModal
