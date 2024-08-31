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
  Checkbox,
  ListItemIcon,
} from "@mui/material"
import { useSelector } from "react-redux"
import { CloseOutlined } from "@ant-design/icons"
import React, { Dispatch, SetStateAction } from "react"

import { useAppDispatch } from "../../store/store"
import { TeachersType } from "../../store/teachers/teachersTypes"
import { teachersSelector } from "../../store/teachers/teachersSlice"
import { getLastnameAndInitials } from "../../utils/getLastnameAndInitials"
import { scheduleLessonsSelector } from "../../store/scheduleLessons/scheduleLessonsSlice"
import { createReplacement, deleteReplacement } from "../../store/scheduleLessons/scheduleLessonsAsyncActions"
import { ISelectedLesson } from "../../pages/Timetable/TimetablePage"

interface ISelectTeacherModalProps {
  open: boolean
  selectedLessonId: number | null
  replacementTeacherId: number | null
  setOpen: Dispatch<SetStateAction<boolean>>
  setLessonActionsModalVisible: Dispatch<SetStateAction<boolean>>
  setReplacementTeacherId: Dispatch<SetStateAction<number | null>>
  setSelectedLesson: Dispatch<SetStateAction<ISelectedLesson | null>>
}

// Заміна викладача
const SelectTeacherModal: React.FC<ISelectTeacherModalProps> = ({
  open,
  setOpen,
  selectedLessonId,
  setSelectedLesson,
  replacementTeacherId,
  setReplacementTeacherId,
  setLessonActionsModalVisible,
}) => {
  const dispatch = useAppDispatch()

  const { teachersCategories } = useSelector(teachersSelector)
  const { teacherOverlay } = useSelector(scheduleLessonsSelector)

  const [teachersList, setTeachersList] = React.useState<TeachersType[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<number | null>(null)

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

  const checkTeachersOverlay = () => {
    if (!teacherOverlay) return

    const freeTeachers: TeachersType[] = []

    teachersList.forEach((el) => {
      const auditory = teacherOverlay.find((a) => {
        if (!a) return
        return a.id === el.id
      })

      if (!auditory) {
        freeTeachers.push(el)
      }
    })

    setTeachersList(freeTeachers)
  }

  // pre confirmation не треба бо зразу при кліку на кнопку "Вибрати" створюється заміна
  const onCreateReplacement = async () => {
    if (!replacementTeacherId || !selectedLessonId) return
    const { payload } = await dispatch(
      createReplacement({ lessonId: selectedLessonId, teacherId: replacementTeacherId })
    )
    const data = payload as TeachersType
    setSelectedLesson((prev) => {
      if (!prev) return null
      return { ...prev, replacement: data }
    })

    handleClose()
  }

  const onDeleteReplacement = async () => {
    if (!selectedLessonId) return
    if (!window.confirm("Ви дійсно хочете видалити заміну?")) return

    await dispatch(deleteReplacement(selectedLessonId))
    setSelectedLesson((prev) => {
      if (!prev) return null
      return { ...prev, replacement: null }
    })
    handleClose()
  }

  // on first render set selected category and teacher if they exist
  React.useEffect(() => {
    setReplacementTeacherId(null)
    if (!teachersCategories) return

    if (!replacementTeacherId) {
      onSelectCategory(teachersCategories[0].id)
      return
    }

    teachersCategories.forEach((category) => {
      const teacher = category.teachers.find((el) => el.id === replacementTeacherId)

      if (teacher) {
        onSelectCategory(category.id)
        setReplacementTeacherId(teacher.id)
      }
    })
  }, [teachersCategories, replacementTeacherId])

  // check all free auditories
  React.useEffect(() => {
    checkTeachersOverlay()
  }, [teacherOverlay, selectedCategoryId])

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ "& .MuiPaper-root": { width: "100%" } }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <DialogTitle id="alert-dialog-title">Викладачі</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>

      <DialogContent sx={{ padding: "0 24px 20px" }}>
        <div className="auditory-modal-wrapper">
          <div className="auditory-modal__categories">
            <List sx={{ p: 0 }}>
              {teachersCategories?.map((category) => (
                <ListItemButton
                  divider
                  key={category.id}
                  sx={{ py: 0 }}
                  onClick={() => onSelectCategory(category.id)}
                  selected={category.id === selectedCategoryId}
                >
                  <ListItemIcon>
                    <Checkbox edge="start" checked={category.id === selectedCategoryId} tabIndex={-1} disableRipple />
                  </ListItemIcon>
                  <ListItemText primary={category.name} sx={{ p: "0 0 0 10px" }} />
                </ListItemButton>
              ))}
            </List>
          </div>

          <div>
            <Divider orientation="vertical" sx={{ height: "100% !important" }} />
          </div>

          <div className="auditory-modal__list">
            <List sx={{ p: 0 }}>
              {teachersList.map((teacher) => (
                <ListItemButton
                  divider
                  sx={{ py: 0 }}
                  key={teacher.id}
                  selected={teacher.id === replacementTeacherId}
                  onClick={() => setReplacementTeacherId(teacher.id)}
                >
                  <ListItemIcon>
                    <Checkbox edge="start" checked={teacher.id === replacementTeacherId} tabIndex={-1} disableRipple />
                  </ListItemIcon>
                  <ListItemText primary={getLastnameAndInitials(teacher)} sx={{ p: "0 0 0 10px" }} />
                </ListItemButton>
              ))}
            </List>
          </div>
        </div>
      </DialogContent>

      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ ml: 2, mb: 1 }}
          onClick={onDeleteReplacement}
          disabled={!replacementTeacherId}
        >
          Видалити заміну
        </Button>

        <Button
          variant="contained"
          sx={{ mr: 2, mb: 1 }}
          onClick={onCreateReplacement}
          disabled={!replacementTeacherId}
        >
          Вибрати
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { SelectTeacherModal }
