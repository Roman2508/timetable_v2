// material-ui
import { Table, Tooltip, TableRow, TableBody, TableCell, TableHead, Typography } from '@mui/material'
// project import
import { useSelector } from 'react-redux'
import React, { Dispatch, SetStateAction } from 'react'

import { useAppDispatch } from '../../store/store'
import { GroupLoadType } from '../../store/groups/groupsTypes'
import { ISelectedLesson } from '../../pages/Timetable/TimetablePage'
import { getLastnameAndInitials } from '../../utils/getLastnameAndInitials'
import { scheduleLessonsSelector } from '../../store/scheduleLessons/scheduleLessonsSlice'
import { findLessonsForSchedule } from '../../store/scheduleLessons/scheduleLessonsAsyncActions'
import { getLessonRemark } from '../../utils/getLessonRemark'

const tableCellStyles = {
  fontSize: '13px',
  padding: '2px 4px',
  border: '1px solid rgb(235, 235, 235)',
  '& p': { fontSize: '13px' },
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

interface ILessonsTable {
  selectedItemId: number | null
  selectedLesson: ISelectedLesson | null
  scheduleType: 'group' | 'teacher' | 'auditory'
  setSelectedLesson: Dispatch<SetStateAction<ISelectedLesson | null>>
}

const LessonsTable: React.FC<ILessonsTable> = ({ scheduleType, selectedItemId, selectedLesson, setSelectedLesson }) => {
  const dispatch = useAppDispatch()

  const { groupLoad } = useSelector(scheduleLessonsSelector)

  React.useEffect(() => {
    if (!selectedItemId) return

    if (scheduleType === 'group') {
      dispatch(findLessonsForSchedule({ semester: 2, groupId: selectedItemId }))
    }
  }, [selectedItemId, scheduleType])

  const handleSelectLesson = (lesson: GroupLoadType) => {
    if (!lesson.teacher) return

    setSelectedLesson({
      id: lesson.id,
      name: lesson.name,
      typeRu: lesson.typeRu,
      stream: lesson.stream,
      teacher: lesson.teacher,
      students: lesson.students,
      subgroupNumber: lesson.subgroupNumber,
      group: { id: lesson.group.id, name: lesson.group.name },
    })
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell sx={tableCellStyles} padding="none" align="center">
            Дисципліна
          </TableCell>
          <TableCell sx={tableCellStyles} padding="none" align="center">
            Викладач
          </TableCell>
          <TableCell sx={tableCellStyles} padding="none" align="center">
            Примітка
          </TableCell>
          <TableCell sx={tableCellStyles} padding="none" align="center">
            План
          </TableCell>
          <TableCell sx={tableCellStyles} padding="none" align="center">
            Факт
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {(groupLoad ? groupLoad : []).map((lesson) => {
          const teacherName = lesson.teacher && getLastnameAndInitials(lesson.teacher)
          // const streamName = lesson.stream ? ` ⋅ ${lesson.stream.name}` : ""
          // const subgroup = lesson.subgroupNumber ? ` ⋅ п.${lesson.subgroupNumber}` : ""
          const remark = getLessonRemark({
            stream: lesson.stream,
            typeRu: lesson.typeRu,
            subgroupNumber: lesson.subgroupNumber,
          })

          return (
            <TableRow
              key={lesson.id}
              selected={lesson.id === selectedLesson?.id}
              onClick={() => handleSelectLesson(lesson)}
              sx={{ '&:hover': { backgroundColor: 'secondary.lighter', cursor: 'pointer' } }}
            >
              <TableCell sx={{ ...tableCellStyles, maxWidth: '200px' }} padding="none" align="left">
                <Tooltip enterDelay={1000} title={lesson.name}>
                  <Typography sx={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {lesson.name}
                  </Typography>
                </Tooltip>
              </TableCell>

              <TableCell padding="none" align="center" sx={{ ...tableCellStyles, maxWidth: '100px' }}>
                <Tooltip enterDelay={1000} title="Пташник Р.В.">
                  <Typography sx={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {teacherName}
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell sx={{ ...tableCellStyles, maxWidth: '60px' }} padding="none" align="center">
                <Tooltip enterDelay={1000} title={remark}>
                  <Typography sx={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>{remark}</Typography>
                </Tooltip>
              </TableCell>
              <TableCell sx={tableCellStyles} padding="none" align="center">
                {lesson.hours}
              </TableCell>
              <TableCell sx={tableCellStyles} padding="none" align="center">
                1
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default LessonsTable
