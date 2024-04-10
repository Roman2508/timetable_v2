import {
  List,
  Dialog,
  Tooltip,
  IconButton,
  Typography,
  ListItemText,
  DialogContent,
  ListItemButton,
  DialogActions,
  Button,
} from '@mui/material'
// import './TimetablePage.css'
import React, { Dispatch, SetStateAction } from 'react'
import { TeamOutlined, UserOutlined, CloseOutlined, FileTextOutlined, EnvironmentOutlined } from '@ant-design/icons'

import { ISelectedTimeSlot } from './Calendar'
import { useAppDispatch } from '../../store/store'

const dayNames = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота', 'Неділя']

const lessonsTime = [
  '08:30 – 09:50',
  '10:00 – 11:20',
  '12:00 – 13:20',
  '13:30 – 14:50',
  '15:00 – 16:20',
  '16:30 – 17:50',
  '18:00 – 19:20',
]

interface IPutSeveralLessonsAtSameTimeModalProps {
  open: boolean
  selectedTimeSlot: ISelectedTimeSlot | null
  setOpen: Dispatch<SetStateAction<boolean>>
}

const PutSeveralLessonsAtSameTimeModal: React.FC<IPutSeveralLessonsAtSameTimeModalProps> = ({
  open,
  setOpen,
  selectedTimeSlot,
}) => {
  const dispatch = useAppDispatch()

  const [dayName, setDayName] = React.useState('')

  React.useEffect(() => {
    if (!selectedTimeSlot) return
    const dayName = selectedTimeSlot.data.day() !== 0 ? dayNames[selectedTimeSlot.data.day() - 1] : dayNames[6]
    setDayName(dayName)
  }, [selectedTimeSlot])

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
        <Typography sx={{ ml: 2 }}>
          {dayName}, {selectedTimeSlot?.data.format('DD MMMM')} ⋅{' '}
          {lessonsTime[selectedTimeSlot ? selectedTimeSlot.lessonNumber - 1 : 0]}
        </Typography>

        <Tooltip title="Закрити">
          <IconButton sx={{ mr: 1 }} onClick={handleClose}>
            <CloseOutlined />
          </IconButton>
        </Tooltip>
      </div>

      <DialogContent sx={{ padding: '20px 60px' }}>
        {Array(2)
          .fill(null)
          .map((_, index) => (
            <div key={index} className={'lesson-slot'} style={{ marginBottom: '10px' }} onClick={() => {}}>
              {`${'lesson.name'} (${'lesson.typeRu'})`}
              <br />
              {'teacherName'}
              <br />
              {'lesson.auditory.name'} ауд.
              <br />
              {'lesson.auditory.name'} ауд.
            </div>
          ))}

        <Button
          sx={{
            width: '100%',
            borderRadius: '4px',
            color: '#262626',
            boxShadow:
              'rgba(0, 0, 0, 0.32) 0px 2px 1px -1px, rgba(0, 0, 0, 0.1) 1px 1px 2px 1px, rgba(0, 0, 0, 0.22) 0px 1px 3px 0px',
            ':hover': {
              boxShadow:
                'rgba(0, 0, 0, 0.32) 0px 2px 1px -1px, rgba(0, 0, 0, 0.1) 1px 1px 2px 1px, rgba(0, 0, 0, 0.22) 0px 1px 3px 0px',
            },
          }}
        >
          Додати
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export { PutSeveralLessonsAtSameTimeModal }
