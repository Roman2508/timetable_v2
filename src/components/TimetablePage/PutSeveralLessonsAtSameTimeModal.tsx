import { Dayjs } from 'dayjs'
import { CloseOutlined } from '@ant-design/icons'
import React, { Dispatch, SetStateAction } from 'react'
import { Dialog, Tooltip, IconButton, Typography, DialogContent, Button } from '@mui/material'

import { ISelectedTimeSlot } from './Calendar'
import { ISelectedLesson } from '../../pages/Timetable/TimetablePage'
import { getLastnameAndInitials } from '../../utils/getLastnameAndInitials'
import { ScheduleLessonType } from '../../store/scheduleLessons/scheduleLessonsTypes'
import { convertColorKeys } from './CalendarDay'
import { SettingsType } from '../../store/settings/settingsTypes'

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

export const colors = {
  ['ЛК']: 'rgb(232, 255, 82)',
  ['ПЗ']: 'rgb(24, 176, 71)',
  ['ЛАБ']: 'rgb(43, 163, 185)',
  ['СЕМ']: 'rgb(82, 27, 172)',
  ['ЕКЗ']: 'rgb(176, 24, 24)',
}

interface IPutSeveralLessonsAtSameTimeModalProps {
  open: boolean
  settings: SettingsType | null
  selectedLesson: ISelectedLesson | null
  severalLessonsList: ScheduleLessonType[]
  selectedTimeSlot: ISelectedTimeSlot | null
  setOpen: Dispatch<SetStateAction<boolean>>
  setIsAddNewLesson: Dispatch<SetStateAction<boolean>>
  setActionsModalVisible: Dispatch<SetStateAction<boolean>>
  setSelectedAuditoryId: Dispatch<SetStateAction<number | null>>
  setSelectedLesson: Dispatch<SetStateAction<ISelectedLesson | null>>
  onGetAuditoryOverlay: (_date: Dayjs, lessonNumber: number, auditoryId: number) => void
}

const PutSeveralLessonsAtSameTimeModal: React.FC<IPutSeveralLessonsAtSameTimeModalProps> = ({
  open,
  setOpen,
  settings,
  selectedLesson,
  selectedTimeSlot,
  setSelectedLesson,
  severalLessonsList,
  setIsAddNewLesson,
  onGetAuditoryOverlay,
  setSelectedAuditoryId,
  setActionsModalVisible,
}) => {
  const [dayName, setDayName] = React.useState('')

  React.useEffect(() => {
    if (!selectedTimeSlot) return
    const dayName = selectedTimeSlot.data.day() !== 0 ? dayNames[selectedTimeSlot.data.day() - 1] : dayNames[6]
    setDayName(dayName)
  }, [selectedTimeSlot])

  const handleClose = () => {
    setOpen(false)
  }

  const onSelectLesson = (lesson: ScheduleLessonType) => {
    if (!selectedTimeSlot) return
    const auditory = lesson.auditory ? lesson.auditory.id : null

    onGetAuditoryOverlay(selectedTimeSlot.data, selectedTimeSlot.lessonNumber, auditory ? auditory : 0)
    setSelectedAuditoryId(auditory)
    setSelectedLesson({
      id: lesson.id,
      name: lesson.name,
      typeRu: lesson.typeRu,
      stream: lesson.stream,
      teacher: lesson.teacher,
      totalHours: lesson.hours,
      students: lesson.students,
      subgroupNumber: lesson.subgroupNumber,
      specialization: lesson.specialization,
      group: { id: lesson.group.id, name: lesson.group.name },
      replacement: lesson.replacement,
    })
    setActionsModalVisible(true)
  }
  
  const onAddSeveralLesson = () => {
    if (!selectedLesson || !selectedTimeSlot) return
    setIsAddNewLesson(true)
    onGetAuditoryOverlay(selectedTimeSlot.data, selectedTimeSlot.lessonNumber, 0)
    setSelectedLesson({
      id: selectedLesson.id,
      name: selectedLesson.name,
      typeRu: selectedLesson.typeRu,
      stream: selectedLesson.stream,
      teacher: selectedLesson.teacher,
      totalHours: selectedLesson.totalHours,
      students: selectedLesson.students,
      subgroupNumber: selectedLesson.subgroupNumber,
      specialization: selectedLesson.specialization,
      group: { id: selectedLesson.group.id, name: selectedLesson.group.name },
      replacement: selectedLesson.replacement,
    })
    setActionsModalVisible(true)
  }

  const isDisabledAddButton = severalLessonsList.some((l) => {
    const isSame =
      selectedLesson?.group?.id !== undefined &&
      l !== undefined &&
      selectedLesson.group?.id === l.group?.id &&
      selectedLesson.typeRu === l.typeRu &&
      selectedLesson.subgroupNumber === l.subgroupNumber &&
      selectedLesson.stream?.id === l.stream?.id &&
      selectedLesson.name === l.name
    return isSame
  })


  if (!settings) return 

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
        {severalLessonsList.map((l) => {
          const teacherName = l.teacher ? getLastnameAndInitials(l.teacher) : ''

          return (
            <div
              key={l.id}
              className={'lesson-slot'}
              onClick={() => onSelectLesson(l)}
              style={{ backgroundColor: settings.colors[convertColorKeys[l.typeRu]], marginBottom: '10px' }}
              // style={{ backgroundColor: colors[l.typeRu], marginBottom: '10px' }}
            >
              <p className="time-slot-lesson-name">{l.name}</p>

              <p>
                {`(${l.typeRu}) 
                ${l.subgroupNumber ? ` підгр.${l.subgroupNumber}` : ''} 
                ${l.stream ? ` Потік ${l.stream.name} ` : ''}`}
                {l.specialization ? `${l.specialization} спец.` : ''}
              </p>

              <p>{teacherName}</p>
              <p>{l.auditory ? `${l.auditory.name} ауд.` : 'Дистанційно'}</p>
            </div>
          )
        })}

        <Button
          onClick={onAddSeveralLesson}
          disabled={isDisabledAddButton}
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
