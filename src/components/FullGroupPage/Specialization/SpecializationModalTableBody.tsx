import React, { Dispatch, SetStateAction } from 'react'
import { TableBody, TableCell, TableRow, Typography } from '@mui/material'

import { GroupLoadType } from '../../../store/groups/groupsTypes'
import { groupLessonsByFields } from '../../../utils/groupLessonsByFields'
import { sortItemsByKey } from '../../../utils/sortItemsByKey'

const cellStyles = {
  borderBottom: '1px solid rgb(220, 220, 220)',
  p: '4px 10px',
  minWidth: '100px',
}

interface ISpecializationModalTableBodyProps {
  groupLoad: GroupLoadType[] | null
  selectedLesson: GroupLoadType | null
  sortBy: { key: string; order: 'asc' | 'desc' }
  setSelectedSpecialization: Dispatch<SetStateAction<string>>
  setSelectedLesson: Dispatch<SetStateAction<GroupLoadType | null>>
}

const SpecializationModalTableBody: React.FC<ISpecializationModalTableBodyProps> = ({
  sortBy,
  groupLoad,
  selectedLesson,
  setSelectedLesson,
  setSelectedSpecialization,
}) => {
  const lessons = !groupLoad ? [] : groupLessonsByFields(groupLoad, { lessonName: true, semester: true })

  return (
    <TableBody>
      {sortItemsByKey(lessons, sortBy.key, sortBy.order).map((row: GroupLoadType[], index: number) => {
        const isItemSelected = selectedLesson?.id === row[0].id
        const labelId = `enhanced-table-checkbox-${index}`

        const specializationName = row[0].specialization === null ? 'Спеціалізація відсутня' : row[0].specialization

        const isNotStudied = row[0].specialization === 'Не вивчається'

        return (
          <TableRow
            hover
            tabIndex={-1}
            role="checkbox"
            sx={isNotStudied ? { opacity: 0.5 } : {}}
            selected={isItemSelected}
            aria-checked={isItemSelected}
            key={row[0].name + row[0].semester}
            onClick={() => {
              setSelectedLesson(row[0])
              setSelectedSpecialization(specializationName)
            }}
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

            <TableCell
              key={index}
              sx={{
                ...cellStyles,
                cursor: 'pointer',
                ':hover': { background: 'rgba(0, 0, 0, 0.05);' },
              }}
              align="center"
            >
              {row[0].specialization ? row[0].specialization : '-'}
            </TableCell>

            {['lectures', 'practical', 'laboratory', 'seminars', 'exams'].map((lessonType, index) => {
              const lesson = row.find((el) => el.typeEn === lessonType)

              return (
                <TableCell
                  key={index}
                  onClick={() => {}}
                  sx={{
                    ...cellStyles,
                    cursor: 'pointer',
                  }}
                  align="center"
                >
                  {lesson ? lesson.hours : ''}
                </TableCell>
              )
            })}
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default SpecializationModalTableBody
