import React, { Dispatch, SetStateAction } from "react"
import { TableBody, TableCell, TableRow, Typography } from "@mui/material"

import { GroupLoadType } from "../../store/groups/groupsTypes"
import { groupLessonsByLessonGroupAndSemester } from "../../utils/groupLessonsByLessonGroupAndSemester"

// import { groupLessonByNameSubgroupsAndSemester } from "../../../utils/groupLessonByNameSubgroupsAndSemester"

const cellStyles = {
  borderBottom: "1px solid rgb(220, 220, 220)",
  p: "4px",
  minWidth: "70px",
}

interface IStreamLessonsTableBodyProps {
  streamLessons: GroupLoadType[] | null
  selectedLessons: GroupLoadType[] | null
  setSelectedLessons: Dispatch<SetStateAction<GroupLoadType[]>>
}

const StreamLessonsTableBody: React.FC<IStreamLessonsTableBodyProps> = ({
  streamLessons,
  selectedLessons,
  setSelectedLessons,
}) => {
  const handleSelectLesson = (lesson: GroupLoadType) => {
    setSelectedLessons((prev) => {
      const existedLesson = prev.find((el) => el.id === lesson.id)
      if (existedLesson) {
        return prev.filter((el) => el.id !== existedLesson.id)
      } else {
        return [...prev, lesson]
      }
    })
  }

  return (
    <TableBody>
      {(streamLessons ? groupLessonsByLessonGroupAndSemester(streamLessons) : []).map(
        (row, index: number) => {
          const isItemSelected = selectedLessons?.find(
            (el) =>
              el.name === row[0].name &&
              el.semester === row[0].semester &&
              el.group.name === row[0].group.name
          )
          const labelId = `enhanced-table-checkbox-${index}`

          return (
            <TableRow
              hover
              tabIndex={-1}
              role="checkbox"
              selected={!!isItemSelected}
              aria-checked={!!isItemSelected}
              key={row[0].name + row[0].semester}
              onClick={() => handleSelectLesson(row[0])}
            >
              <TableCell
                sx={{
                  ...cellStyles,
                  minWidth: "250px !important",
                  position: "relative",
                  ":hover *": { display: "flex !important" },
                }}
                component="th"
                id={labelId}
                scope="row"
                align="left"
              >
                <Typography sx={{ flexGrow: 1 }}>{row[0].name}</Typography>
              </TableCell>
              <TableCell sx={cellStyles} align="center">
                {row[0].group.name}
              </TableCell>
              <TableCell sx={cellStyles} align="center">
                {row[0].semester}
              </TableCell>

              {["lectures", "practical", "laboratory", "seminars", "exams"].map((lessonType) => {
                const lesson = row.find((el) => el.typeEn === lessonType)

                return (
                  <TableCell
                    key={lessonType}
                    sx={{ ...cellStyles, cursor: "pointer" }}
                    align="center"
                  >
                    {lesson ? lesson.hours : "-"}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        }
      )}
    </TableBody>
  )
}

export { StreamLessonsTableBody }
