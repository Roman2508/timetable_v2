import {
  CalendarOutlined,
  CloseOutlined,
  EditOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  PlusSquareOutlined,
  SyncOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import React, { Dispatch, SetStateAction } from 'react'
import {
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Tooltip,
} from '@mui/material'

import { useAppDispatch } from '../../store/store'

interface ILessonActionsModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const LessonActionsModal: React.FC<ILessonActionsModalProps> = ({ open, setOpen }) => {
  const dispatch = useAppDispatch()

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ '& .MuiPaper-root': { width: '400px' } }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
        <Typography sx={{ ml: 2 }}>Тиждень 1</Typography>

        <div>
          {/* <Tooltip title="Оновити">
          <IconButton sx={{ mr: 1 }}>
            <EditOutlined />
          </IconButton>
        </Tooltip> */}

          <Tooltip title="Зберегти">
            <IconButton sx={{ mr: 1 }}>
              <PlusSquareOutlined />
            </IconButton>
          </Tooltip>

          <Tooltip title="Зробити заміну">
            <IconButton sx={{ mr: 1 }}>
              <SyncOutlined />
            </IconButton>
          </Tooltip>

          <Tooltip title="Зробити заміну">
            <IconButton sx={{ mr: 1 }} onClick={handleClose}>
              <CloseOutlined />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <DialogContent sx={{ padding: '0', mt: 1 }}>
        <Typography
          variant="h4"
          sx={{
            padding: '0 16px 4px',
            fontSize: '20px',
            fontWeight: 400,
            lineHeight: '28px',
            color: 'rgb(60, 64, 67)',
          }}
        >
          Інформаційні технології у фармації (ЛК) - Група 202 2 підгрупа
        </Typography>
        <Typography sx={{ fontSize: '14px', fontweight: 400, letterSpacing: '.2px', padding: '0 16px 4px' }}>
          Середа, 27 березня ⋅ 10:00 – 11:20
        </Typography>

        <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 1 } }}>
          <ListItemButton divider sx={{ mt: 1, py: 0 }} onClick={() => {}}>
            <FileTextOutlined />
            <ListItemText primary={'Додати коментар'} sx={{ p: '0 0 0 10px' }} />
          </ListItemButton>

          <ListItemButton divider sx={{ py: 0 }} onClick={() => {}}>
            <EnvironmentOutlined />
            <ListItemText primary={'Аудиторія: 217'} sx={{ p: '0 0 0 10px' }} />
          </ListItemButton>

          <ListItemButton divider sx={{ py: 0, cursor: 'default', ':hover': { background: '#fff' } }}>
            <UserOutlined />
            <ListItemText primary={'Викладач: Пташник Р.В.'} sx={{ p: '0 0 0 10px' }} />
          </ListItemButton>

          <ListItemButton divider disableRipple sx={{ py: 0, cursor: 'default', ':hover': { background: '#fff' } }}>
            {/* <CalendarOutlined /> */}
            <TeamOutlined />
            <ListItemText primary={'Студентів: 22'} sx={{ p: '0 0 0 10px' }} />
          </ListItemButton>
        </List>
      </DialogContent>
    </Dialog>
  )
}

export { LessonActionsModal }
