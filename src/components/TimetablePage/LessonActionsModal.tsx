import {
  List,
  Dialog,
  Tooltip,
  IconButton,
  Typography,
  ListItemText,
  DialogContent,
  ListItemButton,
  TextField,
} from '@mui/material'
import {
  SyncOutlined,
  TeamOutlined,
  UserOutlined,
  CloseOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  EnvironmentOutlined,
  HourglassOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import React, { Dispatch, SetStateAction } from 'react'

import {
  createScheduleLesson,
  updateScheduleLesson,
  deleteScheduleLesson,
} from '../../store/scheduleLessons/scheduleLessonsAsyncActions'
import { ISelectedTimeSlot } from './Calendar'
import { useAppDispatch } from '../../store/store'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { ISelectedLesson } from '../../pages/Timetable/TimetablePage'
import { getLastnameAndInitials } from '../../utils/getLastnameAndInitials'
import { auditoriesSelector } from '../../store/auditories/auditoriesSlise'
import { ScheduleLessonType } from '../../store/scheduleLessons/scheduleLessonsTypes'
import { deleteTeacherOverlay, scheduleLessonsSelector } from '../../store/scheduleLessons/scheduleLessonsSlice'

const DAY_NAMES = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота', 'Неділя']

const LESSONS_TIME = [
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
  selectedAuditoryName: string
  selectedAuditoryId: number | null
  selectedLesson: ISelectedLesson | null
  selectedTimeSlot: ISelectedTimeSlot | null
  setOpen: Dispatch<SetStateAction<boolean>>
  setIsAddNewLesson: Dispatch<SetStateAction<boolean>>
  setSelectedAuditoryName: Dispatch<SetStateAction<string>>
  setTeacherModalVisible: Dispatch<SetStateAction<boolean>>
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
  selectedAuditoryName,
  setSeveralLessonsList,
  setTeacherModalVisible,
  setAuditoryModalVisible,
  setSelectedAuditoryName,
  setSeveralLessonsModalVisible,
}) => {
  const dispatch = useAppDispatch()

  const { auditoriCategories } = useSelector(auditoriesSelector)
  const { auditoryOverlay, teacherOverlay, groupLoad } = useSelector(scheduleLessonsSelector)

  const [isLoading, setIsLoading] = React.useState(false)
  const [studentsCount, setStudentsCount] = React.useState(0)
  const [currentLessonHours, setCurrentLessonHours] = React.useState(2)

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
  }, [selectedAuditoryId, auditoriCategories])

  React.useEffect(() => {
    if (!selectedLesson) return
    setCurrentLessonHours(selectedLesson.currentLessonHours)
  }, [selectedLesson])

  React.useEffect(() => {
    if (!selectedLesson || !groupLoad) return

    const selectedGroupLoadLesson = groupLoad.find((el) => {
      return (
        el.name === selectedLesson.name &&
        el.group.id === selectedLesson.group.id &&
        el.stream?.id === selectedLesson.stream?.id &&
        el.subgroupNumber === selectedLesson.subgroupNumber &&
        el.typeRu === selectedLesson.typeRu &&
        el.specialization === selectedLesson.specialization &&
        el.hours === selectedLesson.totalHours
      )
    })

    if (selectedGroupLoadLesson) {
      setStudentsCount(selectedGroupLoadLesson.students.length)
    }
  }, [selectedLesson, groupLoad])

  if (!selectedLesson || !selectedTimeSlot) return

  const dayName = selectedTimeSlot.data.day() !== 0 ? DAY_NAMES[selectedTimeSlot.data.day() - 1] : DAY_NAMES[6]

  const onCreateScheduleLesson = async () => {
    try {
      setIsLoading(true)

      if (!selectedAuditoryId && !isRemote) {
        alert('Аудиторія не вибрана')
        return
      }
      if (selectedLesson.typeRu === 'МЕТОД') return

      const date = selectedTimeSlot.data.format('YYYY-MM-DD')
      const stream = selectedLesson.stream ? selectedLesson.stream.id : null

      const payload = {
        date,
        stream,
        isRemote,
        currentLessonHours,
        id: selectedLesson.id,
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
      if (lesson) {
        setSeveralLessonsList((prev) => [...prev, lesson])
      }
      setIsAddNewLesson(false)
    } finally {
      setIsLoading(false)
    }
  }

  const onUpdateLesson = async () => {
    try {
      setIsLoading(true)
      if (!auditoriCategories) return
      if (!selectedAuditoryId && !isRemote) return alert('Error')

      let lesson = {} as ScheduleLessonType

      if (!selectedAuditoryId) {
        const { payload } = await dispatch(
          updateScheduleLesson({
            id: selectedLesson.id,
            currentLessonHours,
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
            isRemote,
            seatsNumber,
            auditoryName,
            currentLessonHours,
            id: selectedLesson.id,
            auditoryId: selectedAuditoryId,
          })
        )

        if (!payload) return alert('Error')

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
    } finally {
      setIsLoading(false)
    }
  }

  const onDeleteLesson = async (id: number) => {
    try {
      if (!window.confirm('Ви дійсно хочете видалити ел. розкладу?')) return
      setIsLoading(true)
      const { payload } = await dispatch(deleteScheduleLesson(id))
      const deletedItemId = payload as number
      dispatch(deleteTeacherOverlay(deletedItemId))
      handleClose()
      setIsAddNewLesson(false)

      setSeveralLessonsList((prev) => {
        const lessons = prev.filter((el) => el.id !== deletedItemId)
        if (!lessons.length) {
          setSeveralLessonsModalVisible(false)
        }
        return lessons
      })
    } finally {
      setIsLoading(false)
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
      sx={{ '& .MuiPaper-root': { width: '440px' } }}
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
              <IconButton sx={{ mr: 1 }} onClick={() => onDeleteLesson(selectedLesson.id)} disabled={isLoading}>
                <DeleteOutlined />
              </IconButton>
            </Tooltip>
          )}

          {isAddNewLesson ? (
            <Tooltip title="Зберегти">
              <IconButton sx={{ mr: 1 }} onClick={onCreateScheduleLesson} disabled={isLoading}>
                <PlusSquareOutlined />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Оновити">
              <IconButton sx={{ mr: 1 }} onClick={onUpdateLesson} disabled={isLoading}>
                <PlusSquareOutlined />
              </IconButton>
            </Tooltip>
          )}

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
          {/* &nbsp; */}
          {selectedLesson.name} ({selectedLesson.typeRu}) - Група {selectedLesson.group.name}
          {selectedLesson.subgroupNumber ? `. ${selectedLesson.subgroupNumber} підгрупа` : ''}{' '}
          <span style={{ whiteSpace: 'nowrap' }}>
            {selectedLesson.stream ? `Потік: ${selectedLesson.stream.name}` : ''}
          </span>
        </Typography>

        <Typography sx={{ fontSize: '14px', fontweight: 400, letterSpacing: '.2px', padding: '0 16px 4px' }}>
          {dayName}, {selectedTimeSlot.data.format('DD MMMM')} ⋅ {LESSONS_TIME[selectedTimeSlot.lessonNumber - 1]}
        </Typography>

        <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 1 } }}>
          {!isAddNewLesson && (
            <ListItemButton
              divider
              sx={{ mt: 1, py: 0 }}
              onClick={() => setTeacherModalVisible(true)}
              disabled={!teacherOverlay}
            >
              <SyncOutlined />
              <ListItemText
                primary={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {!auditoryOverlay ? (
                      <>
                        Зробити заміну:
                        <LoadingSpinner size={22} disablePadding />
                      </>
                    ) : (
                      `${
                        selectedLesson.replacement
                          ? `Заміна! ${getLastnameAndInitials(selectedLesson.replacement)}`
                          : 'Зробити заміну'
                      }`
                    )}
                  </div>
                }
                sx={{ p: '0 0 0 10px' }}
              />
            </ListItemButton>
          )}

          <ListItemButton
            divider
            sx={{ py: 0 }}
            onClick={() => {
              handleClose()
              setAuditoryModalVisible(true)
            }}
            disabled={!auditoryOverlay}
          >
            <EnvironmentOutlined />
            <ListItemText
              sx={{ p: '0 0 0 10px' }}
              primary={
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {!auditoryOverlay ? (
                    <>
                      Аудиторія:
                      <LoadingSpinner size={22} disablePadding />
                    </>
                  ) : (
                    `Аудиторія: ${
                      selectedAuditoryName ? selectedAuditoryName : isRemote ? 'Дистанційно' : 'не вибрана'
                    }`
                  )}
                </div>
              }
            />
          </ListItemButton>

          <ListItemButton divider disableRipple sx={{ py: 0 }}>
            <HourglassOutlined />
            <ListItemText sx={{ px: '10px', whiteSpace: 'nowrap' }} primary={`Кількість годин: `} />

            <TextField
              type="number"
              variant="standard"
              value={currentLessonHours}
              InputProps={{ inputProps: { min: 1, max: 2 } }}
              sx={{
                width: '100%',
                textAlign: 'center',
                '& input': { p: '6px 0 6px 6px', width: '20%', ml: 3 },
                '& :after': { height: '0 !important', border: '0 !important' },
                '& :before': { height: '0 !important', border: '0 !important' },
              }}
              onChange={(e) => setCurrentLessonHours(Number(e.target.value))}
            />
          </ListItemButton>

          <ListItemButton divider disableRipple sx={{ py: 0, cursor: 'default', ':hover': { background: '#fff' } }}>
            <UserOutlined />
            <ListItemText
              sx={{ p: '0 0 0 10px' }}
              primary={`Викладач: ${getLastnameAndInitials(selectedLesson.teacher)}`}
            />
          </ListItemButton>

          <ListItemButton divider disableRipple sx={{ py: 0, cursor: 'default', ':hover': { background: '#fff' } }}>
            <TeamOutlined />
            <ListItemText sx={{ p: '0 0 0 10px' }} primary={`Студентів: ${studentsCount ? studentsCount : '-'}`} />
            {/* <ListItemText sx={{ p: '0 0 0 10px' }} primary={`Студентів: ${selectedLesson.students}`} /> */}
          </ListItemButton>
        </List>
      </DialogContent>
    </Dialog>
  )
}

export { LessonActionsModal }
