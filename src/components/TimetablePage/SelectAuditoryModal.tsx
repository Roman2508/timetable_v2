import {
  List,
  Dialog,
  Tooltip,
  IconButton,
  Typography,
  ListItemText,
  DialogContent,
  ListItemButton,
} from '@mui/material'
import {
  SyncOutlined,
  TeamOutlined,
  UserOutlined,
  CloseOutlined,
  FileTextOutlined,
  PlusSquareOutlined,
  EnvironmentOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import React, { Dispatch, SetStateAction } from 'react'

import { ISelectedTimeSlot } from './Calendar'
import { useAppDispatch } from '../../store/store'
import { ISelectedLesson } from '../../pages/Timetable/TimetablePage'
import { getLastnameAndInitials } from '../../utils/getLastnameAndInitials'
import { auditoriesSelector } from '../../store/auditories/auditoriesSlise'
import { createScheduleLesson, deleteScheduleLesson } from '../../store/scheduleLessons/scheduleLessonsAsyncActions'

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <Typography sx={{ ml: 2 }}>Тиждень 1</Typography>

        <div>
          <Tooltip title="Закрити">
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
          1111
        </Typography>
        <Typography sx={{ fontSize: '14px', fontweight: 400, letterSpacing: '.2px', padding: '0 16px 4px' }}>
          1111
        </Typography>

        <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 1 } }}>
          <ListItemButton divider sx={{ mt: 1, py: 0 }} onClick={() => {}}>
            <FileTextOutlined />
            <ListItemText primary={'Додати коментар'} sx={{ p: '0 0 0 10px' }} />
          </ListItemButton>

          <ListItemButton
            divider
            sx={{ py: 0 }}
            onClick={() => {
              handleClose()
            }}
          >
            <EnvironmentOutlined />
            <ListItemText sx={{ p: '0 0 0 10px' }} primary={`Аудиторія: `} />
          </ListItemButton>

          <ListItemButton divider sx={{ py: 0, cursor: 'default', ':hover': { background: '#fff' } }}>
            <UserOutlined />
            <ListItemText sx={{ p: '0 0 0 10px' }} primary={`Викладач: `} />
          </ListItemButton>

          <ListItemButton divider disableRipple sx={{ py: 0, cursor: 'default', ':hover': { background: '#fff' } }}>
            {/* <CalendarOutlined /> */}
            <TeamOutlined />
            <ListItemText sx={{ p: '0 0 0 10px' }} primary={`Студентів:`} />
          </ListItemButton>
        </List>
      </DialogContent>
    </Dialog>
  )
}

export { LessonActionsModal }
