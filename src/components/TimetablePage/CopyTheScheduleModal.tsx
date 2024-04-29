import {
  List,
  Dialog,
  Tooltip,
  IconButton,
  Typography,
  ListItemText,
  DialogContent,
  ListItemButton,
  Divider,
  DialogActions,
  Button,
} from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { TeamOutlined, UserOutlined, CloseOutlined, FileTextOutlined, EnvironmentOutlined } from '@ant-design/icons'

import { useAppDispatch } from '../../store/store'

interface ICopyTheScheduleModalProps {
  open: boolean
  currentWeekNumber: number
  setOpen: Dispatch<SetStateAction<boolean>>
}

const CopyTheScheduleModal: React.FC<ICopyTheScheduleModalProps> = ({ open, setOpen, currentWeekNumber }) => {
  const dispatch = useAppDispatch()

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      onClose={() => {
        handleClose()
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ '& .MuiPaper-root': { width: '400px' } }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <Typography sx={{ ml: 2 }}>Копіювати розклад</Typography>

        <div>
          <Tooltip title="Закрити">
            <IconButton sx={{ mr: 1 }} onClick={() => handleClose()}>
              <CloseOutlined />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <DialogContent sx={{ padding: '0', mt: 1 }}>
        <Divider />

        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%' }}>
            <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 1 } }}>
              {Array(20)
                .fill(null)
                .map((el, i) => (
                  <ListItemButton key={i} divider sx={{ py: 0 }} onClick={() => {}}>
                    <ListItemText primary={`${i + 1}. (29.04 - 05.05)`} sx={{ p: '0 0 0 10px' }} />
                  </ListItemButton>
                ))}
            </List>
          </div>

          <div>
            <Divider orientation="vertical" />
          </div>

          <div style={{ width: '50%' }}>
            <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 1 } }}>
              {Array(20)
                .fill(null)
                .map((el, i) => (
                  <ListItemButton key={i} divider sx={{ py: 0 }} onClick={() => {}}>
                    <ListItemText primary={`${i + 1}. (29.04 - 05.05)`} sx={{ p: '0 0 0 10px' }} />
                  </ListItemButton>
                ))}
            </List>
          </div>
        </div>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 2 }}>
        <Button variant="contained">Копіювати</Button>
      </DialogActions>
    </Dialog>
  )
}

export { CopyTheScheduleModal }
