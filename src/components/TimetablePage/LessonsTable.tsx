import { Table, Tooltip, TableRow, TableBody, TableCell, TableHead, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import React, { Dispatch, SetStateAction } from 'react'

import EmptyCard from '../EmptyCard/EmptyCard'
import { useAppDispatch } from '../../store/store'
import { LoadingStatusTypes } from '../../store/appTypes'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { getLessonRemark } from '../../utils/getLessonRemark'
import { GroupLoadType } from '../../store/groups/groupsTypes'
import { ISelectedLesson } from '../../pages/Timetable/TimetablePage'
import { getLastnameAndInitials } from '../../utils/getLastnameAndInitials'
import { clearGroupLoad, scheduleLessonsSelector } from '../../store/scheduleLessons/scheduleLessonsSlice'
import { findLessonsForSchedule } from '../../store/scheduleLessons/scheduleLessonsAsyncActions'
import { sortLessonsByLessonType } from '../../utils/sortLessonsByLessonType'
import { ScheduleLessonType } from '../../store/scheduleLessons/scheduleLessonsTypes'
import { groupAndSortAuditoryLessons } from '../../utils/groupAndSortAuditoryLessons'
import { findLessonsCountForLessonsTable } from '../../utils/findLessonsCountForLessonsTable'

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
  selectedSemester: 1 | 2
  selectedItemId: number | null
  selectedLesson: ISelectedLesson | null
  scheduleType: 'group' | 'teacher' | 'auditory'
  setSelectedTeacherId: Dispatch<SetStateAction<number | null>>
  setIsPossibleToCreateLessons: Dispatch<SetStateAction<boolean>>
  setSelectedLesson: Dispatch<SetStateAction<ISelectedLesson | null>>
}

const LessonsTable: React.FC<ILessonsTable> = ({
  scheduleType,
  selectedItemId,
  selectedLesson,
  selectedSemester,
  setSelectedLesson,
  setSelectedTeacherId,
  setIsPossibleToCreateLessons,
}) => {
  const dispatch = useAppDispatch()

  const { groupLoad, loadingStatus, scheduleLessons } = useSelector(scheduleLessonsSelector)

  React.useEffect(() => {
    if (!selectedItemId) return

    if (scheduleType === 'group' || scheduleType === 'teacher') {
      dispatch(clearGroupLoad())
      dispatch(findLessonsForSchedule({ semester: selectedSemester, itemId: selectedItemId, scheduleType }))
    }
  }, [selectedItemId, scheduleType, selectedSemester])

  // При першому рендері вибираю з таблиці LessonsTable перший елемент
  React.useEffect(() => {
    if (scheduleType !== 'auditory') {
      if (!groupLoad) return
      const sortedGroupLoad = sortLessonsByLessonType(groupLoad)
      const firstLesson = sortedGroupLoad[0]
      if (!firstLesson) return

      handleSelectLesson(firstLesson)
      // set selected teacher on first render
      if (!firstLesson.teacher) return
      setSelectedTeacherId(firstLesson.teacher.id)
    } else {
      if (!scheduleLessons) return
      const sortedScheduleLessons = groupAndSortAuditoryLessons(scheduleLessons)
      const firstLesson = sortedScheduleLessons[0]
      if (!firstLesson) return
      handleSelectLesson(firstLesson)
      // set selected teacher on first render
      if (!firstLesson.teacher) return
      setSelectedTeacherId(firstLesson.teacher.id)
    }
  }, [groupLoad, scheduleLessons])

  const handleSelectLesson = (lesson: GroupLoadType | ScheduleLessonType) => {
    if (!lesson) return
    if (!lesson.teacher) return

    // К-ть виставлених годин
    const exhibitedLessonsCount = findLessonsCountForLessonsTable(
      lesson.name,
      lesson.group.id,
      lesson.subgroupNumber,
      lesson.stream?.id,
      lesson.typeRu,
      scheduleLessons
    )

    if (exhibitedLessonsCount === lesson.hours) {
      // Якщо виставлено ел.розкладу стільки скільки заплановано
      // false === заборонено створювати нові ел.розкладу
      setIsPossibleToCreateLessons(false)
    } else {
      setIsPossibleToCreateLessons(true)
    }

    setSelectedLesson({
      id: lesson.id,
      name: lesson.name,
      replacement: null,
      typeRu: lesson.typeRu,
      stream: lesson.stream,
      teacher: lesson.teacher,
      totalHours: lesson.hours,
      students: lesson.students,
      subgroupNumber: lesson.subgroupNumber,
      specialization: lesson.specialization,
      group: { id: lesson.group.id, name: lesson.group.name },
    })
    setSelectedTeacherId(lesson.teacher.id)
  }

  const isEmptyTable =
    scheduleType !== 'auditory' ? !groupLoad || !groupLoad.length : !scheduleLessons || !scheduleLessons.length

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
          <TableRow style={{ textAlign: 'center' }}>
            <TableCell colSpan={5}>
              <LoadingSpinner />
            </TableCell>
          </TableRow>
        ) : isEmptyTable ? (
          <TableRow style={{ textAlign: 'center' }}>
            <TableCell colSpan={5}>
              <EmptyCard />
            </TableCell>
          </TableRow>
        ) : null}

        {(scheduleType !== 'auditory'
          ? groupLoad
            ? sortLessonsByLessonType(groupLoad)
            : []
          : scheduleLessons
          ? groupAndSortAuditoryLessons(scheduleLessons)
          : []
        ).map((lesson) => {
          const teacherName = lesson.teacher && getLastnameAndInitials(lesson.teacher)

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
              // sx={{ '&:hover': { backgroundColor: 'secondary.lighter', cursor: 'pointer' } }}
              sx={
                isEqualPlannedAndActuallyHours
                  ? { opacity: '0.4', '&:hover': { backgroundColor: 'secondary.lighter', cursor: 'pointer' } }
                  : { '&:hover': { backgroundColor: 'secondary.lighter', cursor: 'pointer' } }
              }
            >
              <TableCell sx={{ ...tableCellStyles, maxWidth: '200px' }} padding="none" align="left">
                <Tooltip enterDelay={1000} title={lesson.name}>
                  <Typography sx={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {lesson.name}
                  </Typography>
                </Tooltip>
              </TableCell>

              <TableCell padding="none" align="center" sx={{ ...tableCellStyles, maxWidth: '100px' }}>
                <Tooltip enterDelay={1000} title={teacherName}>
                  <Typography sx={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {teacherName}
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell sx={{ ...tableCellStyles, maxWidth: '60px' }} padding="none" align="center">
                <Tooltip
                  enterDelay={1000}
                  title={`${remark} ${scheduleType !== 'group' ? ` ⋅ Група: ${lesson.group.name}` : ''}`}
                >
                  <Typography sx={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>{remark}</Typography>
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
