import {
  List,
  Dialog,
  Button,
  Divider,
  IconButton,
  DialogTitle,
  ListItemText,
  DialogActions,
  DialogContent,
  ListItemButton,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { CloseOutlined } from '@ant-design/icons'
import React, { Dispatch, SetStateAction } from 'react'

import { TeachersType } from '../../store/teachers/teachersTypes'
import { teachersSelector } from '../../store/teachers/teachersSlice'
import { getLastnameAndInitials } from '../../utils/getLastnameAndInitials'
import { scheduleLessonsSelector } from '../../store/scheduleLessons/scheduleLessonsSlice'

interface ISelectTeacherModalProps {
  open: boolean
  selectedAuditoryId: number | null
  setOpen: Dispatch<SetStateAction<boolean>>
  setSelectedAuditoryId: Dispatch<SetStateAction<number | null>>
  setLessonActionsModalVisible: Dispatch<SetStateAction<boolean>>
}

// Заміна викладача
const SelectTeacherModal: React.FC<ISelectTeacherModalProps> = ({
  open,
  setOpen,
  selectedAuditoryId,
  setSelectedAuditoryId,
  setLessonActionsModalVisible,
}) => {
  const { teachersCategories } = useSelector(teachersSelector)
  const { auditoryOverlay } = useSelector(scheduleLessonsSelector)

  const [teachersList, setTeachersList] = React.useState<TeachersType[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<number | null>(null)
  const [preConfirmationTeacherId, setPreConfirmationTeacgerId] = React.useState<number | null>(null)

  const handleClose = () => {
    setOpen(false)
    setLessonActionsModalVisible(true)
  }

  const onSelectCategory = (id: number) => {
    if (!teachersCategories) return
    setSelectedCategoryId(id)
    const category = teachersCategories.find((el) => el.id === id)
    if (!category) return
    setTeachersList(category.teachers)
  }

  const onConfirmSelection = () => {
    setSelectedAuditoryId(preConfirmationTeacherId)
    handleClose()
  }

  const checkAuditoryOverlay = () => {
    if (!auditoryOverlay) return

    const freeAuditories: TeachersType[] = []

    teachersList.forEach((el) => {
      const auditory = auditoryOverlay.find((a) => {
        if (!a) return
        return a.id === el.id
      })

      if (!auditory) {
        freeAuditories.push(el)
      }
    })

    setTeachersList(freeAuditories)
  }

  // on first render set selected category and auditory if they exist
  React.useEffect(() => {
    setPreConfirmationTeacgerId(null)
    if (!teachersCategories) return

    if (!selectedAuditoryId) {
      onSelectCategory(teachersCategories[0].id)
      return
    }

    teachersCategories.forEach((category) => {
      const auditory = category.teachers.find((el) => el.id === selectedAuditoryId)

      if (auditory) {
        onSelectCategory(category.id)
        setPreConfirmationTeacgerId(auditory.id)
      }
    })
  }, [teachersCategories, selectedAuditoryId])

  // check all free auditories
  React.useEffect(() => {
    checkAuditoryOverlay()
  }, [auditoryOverlay, selectedCategoryId])

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ '& .MuiPaper-root': { width: '100%' } }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle id="alert-dialog-title">Викладачі</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>

      <DialogContent sx={{ padding: '0 24px 20px' }}>
        <div className="auditory-modal-wrapper">
          <div className="auditory-modal__categories">
            <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 1 } }}>
              {teachersCategories?.map((category) => (
                <ListItemButton
                  divider
                  key={category.id}
                  sx={{ py: 0 }}
                  onClick={() => onSelectCategory(category.id)}
                  selected={category.id === selectedCategoryId}
                >
                  <ListItemText primary={category.name} sx={{ p: '0 0 0 10px' }} />
                </ListItemButton>
              ))}
            </List>
          </div>

          <div>
            <Divider orientation="vertical" sx={{ height: '100% !important' }} />
          </div>

          <div className="auditory-modal__list">
            <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 1 } }}>
              {teachersList.map((teacher) => (
                <ListItemButton
                  divider
                  sx={{ py: 0 }}
                  key={teacher.id}
                  selected={teacher.id === preConfirmationTeacherId}
                  onClick={() => setPreConfirmationTeacgerId(teacher.id)}
                >
                  <ListItemText primary={getLastnameAndInitials(teacher)} sx={{ p: '0 0 0 10px' }} />
                </ListItemButton>
              ))}
            </List>
          </div>
        </div>
      </DialogContent>

      <DialogActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          sx={{ mr: 2, mb: 1 }}
          onClick={onConfirmSelection}
          disabled={!preConfirmationTeacherId}
        >
          Вибрати
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { SelectTeacherModal }
