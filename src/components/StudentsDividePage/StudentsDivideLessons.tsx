import {
  List,
  Paper,
  Divider,
  Tooltip,
  Collapse,
  Typography,
  ToggleButton,
  ListItemText,
  ListItemButton,
  ToggleButtonGroup,
} from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

import EmptyCard from '../EmptyCard/EmptyCard'
import { useAppDispatch } from '../../store/store'
import { GroupLoadType } from '../../store/groups/groupsTypes'
import { groupLessonsByFields } from '../../utils/groupLessonsByFields'
import { getLessonStudents } from '../../store/scheduleLessons/scheduleLessonsAsyncActions'
import { clearLessonStudents, lessonsForGradeBookSelector } from '../../store/scheduleLessons/scheduleLessonsSlice'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

interface IStudentsDivideLessonsProps {
  isLoading: boolean
  openedLessonsIds: string[]
  dividingType: 'all' | 'one'
  selectedLesson: GroupLoadType | null
  setOpenedLessonsIds: React.Dispatch<React.SetStateAction<string[]>>
  setDividingType: React.Dispatch<React.SetStateAction<'all' | 'one'>>
  setSelectedLesson: React.Dispatch<React.SetStateAction<GroupLoadType | null>>
}

const StudentsDivideLessons: React.FC<IStudentsDivideLessonsProps> = ({
  isLoading,
  dividingType,
  setDividingType,
  selectedLesson,
  openedLessonsIds,
  setSelectedLesson,
  setOpenedLessonsIds
}) => {
  const dispatch = useAppDispatch()

  const { lessons } = useSelector(lessonsForGradeBookSelector)

  // const [openedLessonsIds, setOpenedLessonsIds] = React.useState<string[]>([])

  const groupLoadLessons = groupLessonsByFields(lessons, { lessonName: true })

  const handleOpenLesson = (id: string) => {
    setOpenedLessonsIds((prev) => {
      const isExist = prev.find((el) => el === id)

      if (!isExist) {
        return [...prev, id]
      } else {
        return prev.filter((el) => el !== id)
      }
    })
  }

  const handleSelectLesson = async (id: number) => {
    try {
      await dispatch(getLessonStudents(id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (_: React.MouseEvent<HTMLElement>, newdividingType: 'all' | 'one') => {
    setDividingType(newdividingType)
  }

  return (
    <Paper sx={{ pt: 2 }}>
      <Typography sx={{ mb: 2, textAlign: 'center' }}>ДИСЦИПЛІНИ</Typography>

      {isLoading ? (
        <LoadingSpinner />
      ) : !groupLoadLessons.length ? (
        <EmptyCard />
      ) : (
        <List>
          <ToggleButtonGroup
            exclusive
            color="primary"
            value={dividingType}
            onChange={handleChange}
            orientation="vertical"
            sx={{ width: '100%', flexDirection: 'row' }}
          >
            <ToggleButton
              value="all"
              sx={{ width: '50%' }}
              onClick={() => {
                setOpenedLessonsIds([])
                setSelectedLesson(null)
                dispatch(clearLessonStudents())
              }}
            >
              Всі дисципліни
            </ToggleButton>

            <ToggleButton value="one" sx={{ width: '50%' }}>
              Одна дисципліна
            </ToggleButton>
          </ToggleButtonGroup>

          {groupLoadLessons.map((lesson) => (
            <React.Fragment key={lesson[0].id}>
              <Divider />
              <ListItemButton
                disabled={dividingType === 'all'}
                sx={{ backgroundColor: '#fafafa' }}
                onClick={() => handleOpenLesson(lesson[0].name)}
              >
                <ListItemText primary={lesson[0].name} sx={{ mr: 1 }} />
                {openedLessonsIds.includes(lesson[0].name) ? <UpOutlined /> : <DownOutlined />}
              </ListItemButton>
              <Divider />
              <Collapse in={openedLessonsIds.includes(lesson[0].name)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {lesson.map((type) => {
                    const unitInfo = type.subgroupNumber ? `${type.subgroupNumber} підгрупа` : 'Вся група'

                    return (
                      <React.Fragment key={type.id}>
                        <ListItemButton
                          sx={{ py: '4px', pl: 5 }}
                          selected={type.id === selectedLesson?.id}
                          onClick={() => {
                            if (selectedLesson?.id !== type.id) {
                              handleSelectLesson(type.id)
                              setSelectedLesson(type)
                            }
                          }}
                        >
                          <Tooltip title={`${type.typeRu}. ${type.name} (${unitInfo})`} enterDelay={1500}>
                            <ListItemText
                              sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '100%',
                                '& .MuiTypography-root': {
                                  textOverflow: 'ellipsis',
                                  overflow: 'hidden',
                                },
                              }}
                              primary={`${type.typeRu}. ${type.name} (${unitInfo})`}
                            />
                          </Tooltip>
                        </ListItemButton>
                        <Divider />
                      </React.Fragment>
                    )
                  })}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      )}
    </Paper>
  )
}

export default StudentsDivideLessons
