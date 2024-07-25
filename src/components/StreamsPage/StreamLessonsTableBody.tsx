import React, { Dispatch, SetStateAction } from 'react'
import { TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material'

import { GroupLoadType } from '../../store/groups/groupsTypes'
import { groupLessonsByFields } from '../../utils/groupLessonsByFields'
import { sortItemsByKey } from '../../utils/sortItemsByKey'
import { StreamsTableSortType } from '../../pages/Streams/StreamsPage'

const cellStyles = {
  p: '4px',
  minWidth: '0px',
  borderBottom: '1px solid rgb(220, 220, 220)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

interface IStreamLessonsTableBodyProps {
  sortBy: StreamsTableSortType
  streamLessons: GroupLoadType[] | null
  selectedLessons: GroupLoadType[][] | null
  setSelectedLessons: Dispatch<SetStateAction<GroupLoadType[][]>>
}

const StreamLessonsTableBody: React.FC<IStreamLessonsTableBodyProps> = (props) => {
  const { streamLessons, selectedLessons, setSelectedLessons, sortBy } = props

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
        ? sortItemsByKey(
            groupLessonsByFields(streamLessons, { groupName: true, lessonName: true, semester: true, subgroups: true }),
            sortBy.key,
            sortBy.order
          )
        : []
      ).map((row: GroupLoadType[], index: number) => {
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
            sx={{ cursor: 'pointer' }}
          >
            <TableCell
              sx={{
                ...cellStyles,
                position: 'relative',
                minWidth: '250px !important',
                ':hover *': { display: 'flex !important' },
              }}
              component="th"
              id={labelId}
              scope="row"
              align="left"
            >
              <Typography
                sx={{
                  flexGrow: 1,
                  overflow: 'hidden',
                  maxWidth: '450px',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {row[0].name}
              </Typography>
            </TableCell>
            <TableCell sx={{ ...cellStyles, whiteSpace: 'nowrap' }} align="center">
              <Tooltip title={`${row[0].group.name} ${row[0].subgroupNumber ? `підгр.${row[0].subgroupNumber}` : ''}`}>
                <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {row[0].group.name} {row[0].subgroupNumber ? `підгр.${row[0].subgroupNumber}` : ''}
                </Typography>
              </Tooltip>
            </TableCell>
            <TableCell sx={cellStyles} align="center">
              {row[0].semester}
            </TableCell>

            {['lectures', 'practical', 'laboratory', 'seminars', 'exams'].map((lessonType) => {
              const lesson = row.find((el) => el.typeEn === lessonType)

              const streamName = lesson && lesson.stream ? lesson.stream.name : ''

              return (
                <TableCell key={lessonType} sx={{ ...cellStyles, whiteSpace: 'nowrap' }} align="center">
                  <Tooltip title={streamName ? streamName : ''}>
                    <>{lesson ? `${lesson.hours} ${streamName && `(${streamName})`}` : '-'}</>
                  </Tooltip>
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
