import React, { Dispatch, SetStateAction } from 'react'
import { TableBody, TableCell, TableRow, Typography } from '@mui/material'

import { GroupLoadType } from '../../../store/groups/groupsTypes'
import { groupLessonByNameSubgroupsAndSemester } from '../../../utils/groupLessonByNameSubgroupsAndSemester'
import { sortItemsByKey } from '../../../utils/sortItemsByKey'

const cellStyles = {
  borderBottom: '1px solid rgb(220, 220, 220)',
  p: '4px 10px',
  minWidth: '100px',
}

interface ISubgroupsModalTableBodyProps {
  groupLoad: GroupLoadType[] | null
  selectedLesson: GroupLoadType[] | null
  sortBy: { key: string; order: 'asc' | 'desc' }
  setSelectedLesson: Dispatch<SetStateAction<GroupLoadType[] | null>>
}

const SubgroupsModalTableBody: React.FC<ISubgroupsModalTableBodyProps> = ({
  sortBy,
  groupLoad,
  selectedLesson,
  setSelectedLesson,
}) => {
  const lessons = !groupLoad ? [] : groupLessonByNameSubgroupsAndSemester(groupLoad)

  return (
    <TableBody>
      {sortItemsByKey(lessons, sortBy.key, sortBy.order).map((row: GroupLoadType[], index: number) => {
        const isItemSelected = (selectedLesson ? selectedLesson[0].id : 0) === row[0].id
        const labelId = `enhanced-table-checkbox-${index}`

        return (
          <TableRow
            hover
            tabIndex={-1}
            role="checkbox"
            selected={isItemSelected}
            aria-checked={isItemSelected}
            key={row[0].name + row[0].semester}
            onClick={() => setSelectedLesson(row)}
          >
            <TableCell
              sx={{
                ...cellStyles,
                minWidth: '250px !important',
                position: 'relative',
                ':hover *': { display: 'flex !important' },
              }}
              component="th"
              id={labelId}
              scope="row"
              align="left"
            >
              <Typography sx={{ flexGrow: 1 }}>{row[0].name}</Typography>
            </TableCell>
            <TableCell sx={cellStyles} align="center">
              {row[0].semester}
            </TableCell>

            {['lectures', 'practical', 'laboratory', 'seminars', 'exams'].map((lessonType) => {
              const lesson = row.find((el) => el.typeEn === lessonType)

              return (
                <TableCell key={lessonType} sx={{ ...cellStyles, cursor: 'pointer' }} align="center">
                  {lesson?.subgroupNumber ? lesson.subgroupNumber : '-'}
                </TableCell>
              )
            })}
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export { SubgroupsModalTableBody }
