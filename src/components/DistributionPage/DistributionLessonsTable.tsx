import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { groupLessonsByFields } from '../../utils/groupLessonsByFields'
import { GroupLoadType } from '../../store/groups/groupsTypes'

interface IDistributionLessonsTableProps {
  groupLoad: GroupLoadType[] | null
  selectedLesson: GroupLoadType[] | null
  setSelectedLesson: Dispatch<SetStateAction<GroupLoadType[] | null>>
}

const DistributionLessonsTable: React.FC<IDistributionLessonsTableProps> = ({
  groupLoad,
  selectedLesson,
  setSelectedLesson,
}) => {
  const lessons = groupLessonsByFields(groupLoad ? groupLoad : [], { lessonName: true, semester: true })

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="none" align="left" sx={{ py: '8px' }}>
            Назва дисципліни
          </TableCell>
          <TableCell padding="none" align="right" sx={{ py: '8px' }}>
            Семестр
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {lessons.map((lesson, index) => (
          <TableRow
            key={index}
            selected={lesson[0].id === (selectedLesson && selectedLesson[0].id)}
            onClick={() => setSelectedLesson(lesson)}
            sx={{ '&:hover': { backgroundColor: 'secondary.lighter', cursor: 'pointer' } }}
          >
            <TableCell padding="none" align="left" sx={{ py: '6px' }}>
              {lesson[0].name}
            </TableCell>
            <TableCell padding="none" align="right" sx={{ py: '6px' }}>
              {lesson[0].semester}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export { DistributionLessonsTable }
