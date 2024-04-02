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
} from '@ant-design/icons'
import React, { Dispatch, SetStateAction } from 'react'

import { ISelectedTimeSlot } from './Calendar'
import { useAppDispatch } from '../../store/store'
import { ISelectedLesson } from '../../pages/TimetablePage/TimetablePage'
import { getLastnameAndInitials } from '../../utils/getLastnameAndInitials'
import { useSelector } from 'react-redux'
import { auditoriesSelector } from '../../store/auditories/auditoriesSlise'
import { createScheduleLesson } from '../../store/scheduleLessons/scheduleLessonsAsyncActions'

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

interface ILessonActionsModalProps {
  open: boolean
  currentWeekNumber: number
  selectedAuditoryId: number | null
  selectedLesson: ISelectedLesson | null
  selectedTimeSlot: ISelectedTimeSlot | null
  setOpen: Dispatch<SetStateAction<boolean>>
  setAuditoryModalVisible: Dispatch<SetStateAction<boolean>>
}

const LessonActionsModal: React.FC<ILessonActionsModalProps> = ({
  open,
  setOpen,
  selectedLesson,
  selectedTimeSlot,
  currentWeekNumber,
  selectedAuditoryId,
  setAuditoryModalVisible,
}) => {
  const dispatch = useAppDispatch()

  const { auditoriCategories } = useSelector(auditoriesSelector)

  const [selectedAuditoryName, setSelectedAuditoryName] = React.useState('')

  const handleClose = () => {
    setOpen(false)
  }

  React.useEffect(() => {
    if (!auditoriCategories) return
    let auditoryName = ''

    auditoriCategories.forEach((category) => {
      const auditory = category.auditories.find((a) => a.id === selectedAuditoryId)

      if (auditory) {
        auditoryName = auditory.name
      }
    })

    setSelectedAuditoryName(auditoryName)
  }, [selectedAuditoryId])

  if (!selectedLesson || !selectedTimeSlot) return

  const dayName = selectedTimeSlot.data.day() !== 0 ? dayNames[selectedTimeSlot.data.day() - 1] : dayNames[6]

  const onCreateScheduleLesson = () => {
    if (!selectedAuditoryId) return
    if (selectedLesson.typeRu === 'КОНС' || selectedLesson.typeRu === 'МЕТОД') return
    // change date
    const date = selectedTimeSlot.data.format('YYYY-MM-DDTHH:mm:ssZ[Z]')
    const stream = selectedLesson.stream ? selectedLesson.stream.id : null

    const payload = {
      date: '2024-01-30T18:35:55.653Z',
      stream,
      semester: 2,
      name: selectedLesson.name,
      auditory: selectedAuditoryId,
      typeRu: selectedLesson.typeRu,
      group: selectedLesson.group.id,
      students: selectedLesson.students,
      teacher: selectedLesson.teacher.id,
      lessonNumber: selectedTimeSlot.lessonNumber,
      subgroupNumber: selectedLesson.subgroupNumber,
    }
    alert(`${date} - "2024-01-30 20:35:55.653"`)
    dispatch(createScheduleLesson(payload))
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
        <Typography sx={{ ml: 2 }}>Тиждень {currentWeekNumber}</Typography>

        <div>
          {/* <Tooltip title="Оновити">
          <IconButton sx={{ mr: 1 }}>
            <EditOutlined />
          </IconButton>
        </Tooltip> */}

          <Tooltip title="Зберегти">
            <IconButton sx={{ mr: 1 }} onClick={onCreateScheduleLesson}>
              <PlusSquareOutlined />
            </IconButton>
          </Tooltip>

          <Tooltip title="Зробити заміну">
            <IconButton sx={{ mr: 1 }}>
              <SyncOutlined />
            </IconButton>
          </Tooltip>

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
          {selectedLesson.name} ({selectedLesson.typeRu}) - Група {selectedLesson.group.name}{' '}
          {selectedLesson.subgroupNumber ? `${selectedLesson.subgroupNumber} підгрупа` : ''}{' '}
          {selectedLesson.stream ? `| Потік: ${selectedLesson.stream.name}` : ''}
        </Typography>
        <Typography sx={{ fontSize: '14px', fontweight: 400, letterSpacing: '.2px', padding: '0 16px 4px' }}>
          {dayName}, {selectedTimeSlot.data.format('DD MMMM')} ⋅ {lessonsTime[selectedTimeSlot.lessonNumber - 1]}
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
              setAuditoryModalVisible(true)
            }}
          >
            <EnvironmentOutlined />
            <ListItemText
              sx={{ p: '0 0 0 10px' }}
              primary={`Аудиторія: ${selectedAuditoryName ? selectedAuditoryName : 'не вибрана'}`}
            />
          </ListItemButton>

          <ListItemButton divider sx={{ py: 0, cursor: 'default', ':hover': { background: '#fff' } }}>
            <UserOutlined />
            <ListItemText
              sx={{ p: '0 0 0 10px' }}
              primary={`Викладач: ${getLastnameAndInitials(selectedLesson.teacher)}`}
            />
          </ListItemButton>

          <ListItemButton divider disableRipple sx={{ py: 0, cursor: 'default', ':hover': { background: '#fff' } }}>
            {/* <CalendarOutlined /> */}
            <TeamOutlined />
            <ListItemText sx={{ p: '0 0 0 10px' }} primary={`Студентів: ${selectedLesson.students}`} />
          </ListItemButton>
        </List>
      </DialogContent>
    </Dialog>
  )
}

export { LessonActionsModal }