import React, { Dispatch, SetStateAction } from 'react'
import { TableBody, TableCell, TableRow, Typography } from '@mui/material'

import { GroupLoadType } from '../../store/groups/groupsTypes'
import { groupLessonsByFields } from '../../utils/groupLessonsByFields'

const cellStyles = {
  borderBottom: '1px solid rgb(220, 220, 220)',
  p: '4px',
  minWidth: '0px',
}

interface IStreamLessonsTableBodyProps {
  streamLessons: GroupLoadType[] | null
  selectedLessons: GroupLoadType[][] | null
  setSelectedLessons: Dispatch<SetStateAction<GroupLoadType[][]>>
}

const StreamLessonsTableBody: React.FC<IStreamLessonsTableBodyProps> = ({
  streamLessons,
  selectedLessons,
  setSelectedLessons,
}) => {
  const handleSelectLesson = (lesson: GroupLoadType[]) => {
    setSelectedLessons((prev) => {
      const existedLesson = prev.find((el) => el[0].id === lesson[0].id)
      if (existedLesson) {
        return prev.filter((el) => el[0].id !== existedLesson[0].id)
      } else {
        return [...prev, lesson]
      }
    })
  }

  return (
    <TableBody>
      {(streamLessons
        ? groupLessonsByFields(streamLessons, { groupName: true, lessonName: true, semester: true, subgroups: true })
        : []
      ).map((row, index: number) => {
        const isItemSelected = selectedLessons?.find(
          (el) =>
            el[0].name === row[0].name &&
            el[0].semester === row[0].semester &&
            el[0].group.name === row[0].group.name &&
            el[0].subgroupNumber === row[0].subgroupNumber
        )
        const labelId = `enhanced-table-checkbox-${index}`
        const lessonKey = row[0].name + row[0].semester + row[0].group.name + row[0].subgroupNumber

        return (
          <TableRow
            hover
            tabIndex={-1}
            role="checkbox"
            key={lessonKey}
            selected={!!isItemSelected}
            aria-checked={!!isItemSelected}
            onClick={() => handleSelectLesson(row)}
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
              {row[0].group.name} {row[0].subgroupNumber ? `підгр.${row[0].subgroupNumber}` : ''}
            </TableCell>
            <TableCell sx={cellStyles} align="center">
              {row[0].semester}
            </TableCell>

            {['lectures', 'practical', 'laboratory', 'seminars', 'exams'].map((lessonType) => {
              const lesson = row.find((el) => el.typeEn === lessonType)

              const streamName = lesson && lesson.stream ? lesson.stream.name : ''

              return (
                <TableCell key={lessonType} sx={{ ...cellStyles, cursor: 'pointer' }} align="center">
                  {lesson ? `${lesson.hours} ${streamName && `(${streamName})`}` : '-'}
                </TableCell>
              )
            })}
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export { StreamLessonsTableBody }
