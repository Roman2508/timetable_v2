import { useSelector } from "react-redux"
import React, { Dispatch, SetStateAction } from "react"
import { Table, Tooltip, TableRow, TableBody, TableCell, TableHead, Typography } from "@mui/material"

import {
  clearGroupLoad,
  scheduleLessonsSelector,
  lastSelectedDataSelector,
} from "../../store/scheduleLessons/scheduleLessonsSlice"
import EmptyCard from "../EmptyCard/EmptyCard"
import { useAppDispatch } from "../../store/store"
import { LoadingStatusTypes } from "../../store/appTypes"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import { getLessonRemark } from "../../utils/getLessonRemark"
import { GroupLoadType } from "../../store/groups/groupsTypes"
import { ISelectedLesson } from "../../pages/Timetable/TimetablePage"
import { getLastnameAndInitials } from "../../utils/getLastnameAndInitials"
import { sortLessonsByLessonType } from "../../utils/sortLessonsByLessonType"
import { ScheduleLessonType } from "../../store/scheduleLessons/scheduleLessonsTypes"
import { groupAndSortAuditoryLessons } from "../../utils/groupAndSortAuditoryLessons"
import { findLessonsCountForLessonsTable } from "../../utils/findLessonsCountForLessonsTable"
import { findLessonsForSchedule } from "../../store/scheduleLessons/scheduleLessonsAsyncActions"

const tableCellStyles = {
  fontSize: "13px",
  padding: "2px 4px",
  border: "1px solid rgb(235, 235, 235)",
  "& p": { fontSize: "13px" },
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}

interface ILessonsTable {
  selectedSemester: 1 | 2
  selectedLesson: ISelectedLesson | null
  setSelectedTeacherId: Dispatch<SetStateAction<number | null>>
  setIsPossibleToCreateLessons: Dispatch<SetStateAction<boolean>>
  setSelectedLesson: Dispatch<SetStateAction<ISelectedLesson | null>>
}

const LessonsTable: React.FC<ILessonsTable> = ({
  selectedLesson,
  selectedSemester,
  setSelectedLesson,
  setSelectedTeacherId,
  setIsPossibleToCreateLessons,
}) => {
  const dispatch = useAppDispatch()

  const { groupLoad, loadingStatus, scheduleLessons } = useSelector(scheduleLessonsSelector)
  const { lastSelectedItemId, lastSelectedScheduleType } = useSelector(lastSelectedDataSelector)

  React.useEffect(() => {
    if (!lastSelectedItemId) return

    if (lastSelectedScheduleType === "group" || lastSelectedScheduleType === "teacher") {
      dispatch(clearGroupLoad())
      const semester = selectedSemester
      const itemId = lastSelectedItemId
      const scheduleType = lastSelectedScheduleType
      dispatch(findLessonsForSchedule({ semester, itemId, scheduleType }))
    }
  }, [lastSelectedItemId, /* lastSelectedScheduleType, */ selectedSemester])

  React.useEffect(() => {
    if (!selectedLesson) return
    // К-ть виставлених годин
    const exhibitedLessonsCount = findLessonsCountForLessonsTable(
      selectedLesson.name,
      selectedLesson.group.id,
      selectedLesson.subgroupNumber,
      selectedLesson.stream?.id,
      selectedLesson.typeRu,
      scheduleLessons
    )

    if (exhibitedLessonsCount === selectedLesson.totalHours) {
      // Якщо виставлено ел.розкладу стільки скільки заплановано
      // false === заборонено створювати нові ел.розкладу
      setIsPossibleToCreateLessons(false)
    } else {
      setIsPossibleToCreateLessons(true)
    }
  }, [selectedLesson, scheduleLessons])

  // Баг: після кожного створення ел.розкладу завжди вибирається перший елемент !!!!!!!

  // При першому рендері вибираю з таблиці LessonsTable перший елемент
  // React.useEffect(() => {
  //   if (lastSelectedScheduleType !== "auditory") {
  //     if (!groupLoad) return
  //     const sortedGroupLoad = sortLessonsByLessonType(groupLoad)
  //     const firstLesson = sortedGroupLoad[0]
  //     if (!firstLesson) return

  //     handleSelectLesson(firstLesson)
  //     // set selected teacher on first render
  //     if (!firstLesson.teacher) return
  //     setSelectedTeacherId(firstLesson.teacher.id)
  //   } else {
  //     if (!scheduleLessons) return
  //     const sortedScheduleLessons = groupAndSortAuditoryLessons(scheduleLessons)
  //     const firstLesson = sortedScheduleLessons[0]
  //     if (!firstLesson) return
  //     handleSelectLesson(firstLesson)
  //     // set selected teacher on first render
  //     if (!firstLesson.teacher) return
  //     setSelectedTeacherId(firstLesson.teacher.id)
  //   }
  // }, [groupLoad, scheduleLessons])

  const handleSelectLesson = (lesson: GroupLoadType | ScheduleLessonType) => {
    if (!lesson || !lesson.teacher) return

    const studentsCount = typeof lesson.students === "number" ? lesson.students : lesson.students?.length

    setSelectedLesson({
      id: lesson.id,
      name: lesson.name,
      replacement: null,
      typeRu: lesson.typeRu,
      stream: lesson.stream,
      currentLessonHours: 2,
      teacher: lesson.teacher,
      students: studentsCount,
      totalHours: lesson.hours,
      subgroupNumber: lesson.subgroupNumber,
      specialization: lesson.specialization,
      group: { id: lesson.group.id, name: lesson.group.name },
    })
    setSelectedTeacherId(lesson.teacher.id)
  }

  const isEmptyTable =
    lastSelectedScheduleType !== "auditory"
      ? !groupLoad || !groupLoad.length
      : !scheduleLessons || !scheduleLessons.length

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
        {!groupLoad && loadingStatus === LoadingStatusTypes.LOADING ? (
          <TableRow style={{ textAlign: "center" }}>
            <TableCell colSpan={5}>
              <LoadingSpinner />
            </TableCell>
          </TableRow>
        ) : isEmptyTable ? (
          <TableRow style={{ textAlign: "center" }}>
            <TableCell colSpan={5}>
              <EmptyCard />
            </TableCell>
          </TableRow>
        ) : null}

        {(lastSelectedScheduleType !== "auditory"
          ? groupLoad
            ? sortLessonsByLessonType(groupLoad)
            : []
          : scheduleLessons
          ? groupAndSortAuditoryLessons(scheduleLessons)
          : []
        ).map((lesson) => {
          const teacherName = lesson.teacher && getLastnameAndInitials(lesson.teacher)
          const streamGroups = lesson.stream?.groups.map((group) => group.name).join(", ")

          const remark = getLessonRemark({
            stream: lesson.stream,
            typeRu: lesson.typeRu,
            subgroupNumber: lesson.subgroupNumber,
            specialization: lesson.specialization,
          })

          const exhibitedLessonsCount = findLessonsCountForLessonsTable(
            lesson.name,
            lesson.group.id,
            lesson.subgroupNumber,
            lesson.stream?.id,
            lesson.typeRu,
            scheduleLessons
          )

          const isEqualPlannedAndActuallyHours = exhibitedLessonsCount === lesson.hours

          const isSelected =
            lesson.name === selectedLesson?.name &&
            lesson.group.id === selectedLesson?.group.id &&
            lesson.stream?.id === selectedLesson?.stream?.id &&
            lesson.subgroupNumber === selectedLesson?.subgroupNumber &&
            lesson.typeRu === selectedLesson?.typeRu &&
            lesson.specialization === selectedLesson?.specialization

          return (
            <TableRow
              key={lesson.id}
              selected={isSelected}
              onClick={() => handleSelectLesson(lesson)}
              sx={
                isEqualPlannedAndActuallyHours
                  ? { opacity: "0.4", "&:hover": { backgroundColor: "secondary.lighter", cursor: "pointer" } }
                  : { "&:hover": { backgroundColor: "secondary.lighter", cursor: "pointer" } }
              }
            >
              <TableCell sx={{ ...tableCellStyles, maxWidth: "200px" }} padding="none" align="left">
                <Tooltip enterDelay={1000} title={lesson.name}>
                  <Typography sx={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {lesson.name}
                  </Typography>
                </Tooltip>
              </TableCell>

              <TableCell padding="none" align="center" sx={{ ...tableCellStyles, maxWidth: "100px" }}>
                <Tooltip enterDelay={1000} title={teacherName}>
                  <Typography sx={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {teacherName}
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell sx={{ ...tableCellStyles, maxWidth: "60px" }} padding="none" align="center">
                <Tooltip
                  enterDelay={1000}
                  title={`
                    ${remark} 
                    ${lastSelectedScheduleType !== "group" ? ` ⋅ Група: ${lesson.group.name}` : ""} 
                    ${lesson.stream ? ` ⋅ Групи потоку: ${streamGroups}` : ""}`}
                >
                  <Typography sx={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis" }}>{remark}</Typography>
                </Tooltip>
              </TableCell>
              <TableCell sx={tableCellStyles} padding="none" align="center">
                {lesson.hours}
              </TableCell>
              <TableCell sx={tableCellStyles} padding="none" align="center">
                {exhibitedLessonsCount}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default LessonsTable
