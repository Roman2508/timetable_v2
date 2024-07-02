import {
  List,
  Paper,
  Divider,
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
import { GroupLoadType } from '../../store/groups/groupsTypes'
import { groupLessonsByFields } from '../../utils/groupLessonsByFields'
import { lessonsForGradeBookSelector } from '../../store/scheduleLessons/scheduleLessonsSlice'

interface IStudentsDivideLessonsProps {
  dividingType: 'all' | 'one'
  selectedLesson: GroupLoadType | null
  setDividingType: React.Dispatch<React.SetStateAction<'all' | 'one'>>
  setSelectedLesson: React.Dispatch<React.SetStateAction<GroupLoadType | null>>
}

const StudentsDivideLessons: React.FC<IStudentsDivideLessonsProps> = ({
  dividingType,
  setDividingType,
  selectedLesson,
  setSelectedLesson,
}) => {
  const { lessons } = useSelector(lessonsForGradeBookSelector)

  const [openedLessonsIds, setOpenedLessonsIds] = React.useState<string[]>([])

  const groupLoadLessons = groupLessonsByFields(lessons, { lessonName: true })
  console.log(groupLoadLessons)
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

  const handleChange = (_: React.MouseEvent<HTMLElement>, newdividingType: 'all' | 'one') => {
    setDividingType(newdividingType)
  }

  return (
    <Paper sx={{ pt: 2 }}>
      <Typography sx={{ mb: 2, textAlign: 'center' }}>ДИСЦИПЛІНИ</Typography>

      {!groupLoadLessons.length ? (
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
                          onClick={() => setSelectedLesson(type)}
                        >
                          <ListItemText primary={`${type.typeRu}. ${type.name} (${unitInfo})`} />
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
