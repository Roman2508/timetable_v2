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
import {
  createScheduleLesson,
  updateScheduleLesson,
  deleteScheduleLesson,
} from '../../store/scheduleLessons/scheduleLessonsAsyncActions'
import { ScheduleLessonType } from '../../store/scheduleLessons/scheduleLessonsTypes'
import { deleteTeacherOverlay } from '../../store/scheduleLessons/scheduleLessonsSlice'

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
  isRemote: boolean
  isAddNewLesson: boolean
  selectedSemester: 1 | 2
  currentWeekNumber: number
  selectedAuditoryId: number | null
  selectedLesson: ISelectedLesson | null
  selectedTimeSlot: ISelectedTimeSlot | null
  setOpen: Dispatch<SetStateAction<boolean>>
  setIsAddNewLesson: Dispatch<SetStateAction<boolean>>
  setAuditoryModalVisible: Dispatch<SetStateAction<boolean>>
  setSeveralLessonsModalVisible: Dispatch<SetStateAction<boolean>>
  setSeveralLessonsList: Dispatch<SetStateAction<ScheduleLessonType[]>>
}

const LessonActionsModal: React.FC<ILessonActionsModalProps> = ({
  open,
  setOpen,
  isRemote,
  isAddNewLesson,
  selectedLesson,
  selectedTimeSlot,
  selectedSemester,
  setIsAddNewLesson,
  currentWeekNumber,
  selectedAuditoryId,
  setSeveralLessonsList,
  setAuditoryModalVisible,
  setSeveralLessonsModalVisible,
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

  const onCreateScheduleLesson = async () => {
    if (!selectedAuditoryId && !isRemote) {
      alert('Аудиторія не вибрана')
      return
    }
    if (selectedLesson.typeRu === 'КОНС' || selectedLesson.typeRu === 'МЕТОД') return

    const date = selectedTimeSlot.data.format('YYYY-MM-DD')
    const stream = selectedLesson.stream ? selectedLesson.stream.id : null

    const payload = {
      date,
      stream,
      isRemote,
      semester: selectedSemester,
      name: selectedLesson.name,
      auditory: selectedAuditoryId,
      typeRu: selectedLesson.typeRu,
      group: selectedLesson.group.id,
      hours: selectedLesson.totalHours,
      students: selectedLesson.students,
      teacher: selectedLesson.teacher.id,
      lessonNumber: selectedTimeSlot.lessonNumber,
      specialization: selectedLesson.specialization,
      subgroupNumber: selectedLesson.subgroupNumber,
    }
    const data = await dispatch(createScheduleLesson(payload))
    setOpen(false)
    const lesson = data.payload as ScheduleLessonType
    setSeveralLessonsList((prev) => [...prev, lesson])
    setIsAddNewLesson(false)
  }

  const onUpdateLesson = async () => {
    if (!auditoriCategories) return
    if (!selectedAuditoryId && !isRemote) return alert('Error')

    let lesson = {} as ScheduleLessonType

    if (!selectedAuditoryId) {
      const { payload } = await dispatch(
        updateScheduleLesson({
          id: selectedLesson.id,
          auditoryId: null,
          isRemote,
        })
      )

      lesson = payload as ScheduleLessonType
      //
    } else {
      let seatsNumber
      let auditoryName

      auditoriCategories.forEach((category) => {
        const auditory = category.auditories.find((a) => a.id === selectedAuditoryId)

        if (auditory) {
          seatsNumber = auditory.seatsNumber
          auditoryName = auditory.name
        }
      })

      if (!seatsNumber || !auditoryName) {
        return alert('Error')
      }

      const { payload } = await dispatch(
        updateScheduleLesson({
          id: selectedLesson.id,
          auditoryId: selectedAuditoryId,
          seatsNumber,
          auditoryName,
          isRemote,
        })
      )

      lesson = payload as ScheduleLessonType
    }

    setSeveralLessonsList((prev) => {
      const lessons = prev.map((el) => {
        if (el.id === lesson.id) {
          return { ...el, ...lesson }
        }

        return el
      })

      return lessons
    })

    setSeveralLessonsModalVisible(false)
    handleClose()
  }

  const onDeleteLesson = async (id: number) => {
    if (window.confirm('Ви дійсно хочете видалити ел. розкладу?')) {
      const { payload } = await dispatch(deleteScheduleLesson(id))
      const deletedItemId = payload as number
      dispatch(deleteTeacherOverlay(deletedItemId))
      handleClose()
      setIsAddNewLesson(false)
      setSeveralLessonsList((prev) => prev.filter((el) => el.id !== deletedItemId))
    }
  }

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      onClose={() => {
        handleClose()
        setIsAddNewLesson(false)
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
        <Typography sx={{ ml: 2 }}>Тиждень {currentWeekNumber}</Typography>

        <div>
          {!isAddNewLesson && (
            <Tooltip title="Видалити">
              <IconButton sx={{ mr: 1 }} onClick={() => onDeleteLesson(selectedLesson.id)}>
                <DeleteOutlined />
              </IconButton>
            </Tooltip>
          )}

          {isAddNewLesson ? (
            <Tooltip title="Зберегти">
              <IconButton sx={{ mr: 1 }} onClick={onCreateScheduleLesson}>
                <PlusSquareOutlined />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Оновити">
              <IconButton sx={{ mr: 1 }} onClick={onUpdateLesson}>
                <PlusSquareOutlined />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Зробити заміну">
            <IconButton sx={{ mr: 1 }}>
              <SyncOutlined />
            </IconButton>
          </Tooltip>

          <Tooltip title="Закрити">
            <IconButton
              sx={{ mr: 1 }}
              onClick={() => {
                handleClose()
                setIsAddNewLesson(false)
              }}
            >
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
              primary={`Аудиторія: ${
                selectedAuditoryName ? selectedAuditoryName : isRemote ? 'Дистанційно' : 'не вибрана'
              }`}
              // primary={`Аудиторія: ${selectedAuditoryName ? selectedAuditoryName : "не вибрана"}`}
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
