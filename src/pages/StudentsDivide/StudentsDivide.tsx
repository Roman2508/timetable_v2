import React from 'react'
import { useSelector } from 'react-redux'
import { LeftSquareOutlined, RightSquareOutlined } from '@ant-design/icons'
import { Grid, Paper, Select, Tooltip, IconButton, Typography, FormControl } from '@mui/material'

import {
  addStudentToLesson,
  deleteStudentFromLesson,
  addStudentsToAllGroupLessons,
  deleteStudentsFromAllGroupLessons,
} from '../../store/scheduleLessons/scheduleLessonsAsyncActions'
import { useAppDispatch } from '../../store/store'
import { LoadingStatusTypes } from '../../store/appTypes'
import { sortItemsByKey } from '../../utils/sortItemsByKey'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import { GroupLoadType } from '../../store/groups/groupsTypes'
import { groupsSelector } from '../../store/groups/groupsSlice'
import { StudentType } from '../../store/students/studentsTypes'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { scheduleLessonsSelector } from '../../store/scheduleLessons/scheduleLessonsSlice'
import StudentsDivideFilter from '../../components/StudentsDividePage/StudentsDivideFilter'
import StudentsDivideLessons from '../../components/StudentsDividePage/StudentsDivideLessons'

const StudentsDivide = () => {
  const dispatch = useAppDispatch()

  const { group } = useSelector(groupsSelector)
  const { lessonStudents, loadingStatus } = useSelector(scheduleLessonsSelector)

  const [isLoading, setIsLoading] = React.useState(false)
  const [studentsToAdd, setStudentsToAdd] = React.useState<string[]>([])
  const [filter, setFilter] = React.useState({ groupId: 0, semester: 0 })
  const [openedLessonsIds, setOpenedLessonsIds] = React.useState<string[]>([])
  const [studentsToDelete, setStudentsToDelete] = React.useState<string[]>([])
  const [dividingType, setDividingType] = React.useState<'all' | 'one'>('all')
  const [selectedLesson, setSelectedLesson] = React.useState<GroupLoadType | null>(null)
  const [isActionButtonsDisabled, setIsActionButtonsDisabled] = React.useState({ add: false, delete: false })

  const selectedLessonText = selectedLesson
    ? `${selectedLesson.typeRu}. ${selectedLesson.name} ${
        selectedLesson.subgroupNumber ? `(підгрупа ${selectedLesson.subgroupNumber})` : '(вся група)'
      }`
    : ''

  const handleChangeMultiple = (event: React.ChangeEvent<HTMLSelectElement>, type: 'add' | 'delete') => {
    const { options } = event.target
    const value: string[] = []
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value)
      }
    }
    if (type === 'add') setStudentsToAdd(value)
    if (type === 'delete') setStudentsToDelete(value)
  }

  const onAddStudentsToLesson = async () => {
    try {
      if (!selectedLesson) return alert('Виберіть дисципліну')
      setIsActionButtonsDisabled((prev) => ({ ...prev, add: true }))
      const studentIds = studentsToAdd.map((el) => Number(el))
      await dispatch(addStudentToLesson({ lessonId: selectedLesson.id, studentIds }))
    } catch (error) {
      console.log(error)
    } finally {
      setIsActionButtonsDisabled((prev) => ({ ...prev, add: false }))
    }
  }

  const onDeleteStudentsFromLesson = async () => {
    try {
      if (!selectedLesson) return alert('Виберіть дисципліну')
      setIsActionButtonsDisabled((prev) => ({ ...prev, delete: true }))
      const studentIds = studentsToDelete.map((el) => Number(el))
      await dispatch(deleteStudentFromLesson({ lessonId: selectedLesson.id, studentIds }))
    } catch (error) {
      console.log(error)
    } finally {
      setIsActionButtonsDisabled((prev) => ({ ...prev, delete: false }))
    }
  }

  const onAddStudentsToAllGroupLessons = async () => {
    try {
      if (!filter.groupId || !filter.semester) return alert('Виберіть групу та семестр')
      setIsActionButtonsDisabled((prev) => ({ ...prev, add: true }))
      const studentIds = studentsToAdd.map((el) => Number(el))
      await dispatch(addStudentsToAllGroupLessons({ groupId: filter.groupId, semester: filter.semester, studentIds }))
    } catch (error) {
      console.log(error)
    } finally {
      setIsActionButtonsDisabled((prev) => ({ ...prev, add: false }))
    }
  }

  const onDeleteStudentsFromAllGroupLessons = async () => {
    try {
      if (!filter.groupId || !filter.semester) return alert('Виберіть групу та семестр')
      setIsActionButtonsDisabled((prev) => ({ ...prev, delete: true }))
      const studentIds = studentsToDelete.map((el) => Number(el))
      await dispatch(
        deleteStudentsFromAllGroupLessons({ groupId: filter.groupId, semester: filter.semester, studentIds })
      )
    } catch (error) {
      console.log(error)
    } finally {
      setIsActionButtonsDisabled((prev) => ({ ...prev, delete: false }))
    }
  }

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: 'center', mb: 3 }}>
        <Grid item xs={11.4}>
          <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid item>
              <Typography variant="h5">Поділ на підгрупи</Typography>
            </Grid>

            <Grid sx={{ display: 'flex', gap: 3 }}>
              <StudentsDivideFilter
                setFilter={setFilter}
                setIsLoading={setIsLoading}
                setDividingType={setDividingType}
                setStudentsToAdd={setStudentsToAdd}
                setSelectedLesson={setSelectedLesson}
                setOpenedLessonsIds={setOpenedLessonsIds}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={3.8}>
          <Paper sx={{ p: 2 }}>
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}
            >
              <Typography>{group.name ? `ЗДОБУВАЧІ ГРУПИ ${group.name}` : 'ЗДОБУВАЧІ'}</Typography>

              <Tooltip title="Зарахувати вибраних студентів на дисципліну">
                <IconButton
                  disabled={isActionButtonsDisabled.add}
                  onClick={() => {
                    if (dividingType === 'one') onAddStudentsToLesson()
                    if (dividingType === 'all') onAddStudentsToAllGroupLessons()
                  }}
                >
                  <RightSquareOutlined />
                </IconButton>
              </Tooltip>
            </div>

            {isLoading ? (
              <LoadingSpinner />
            ) : !group || !group.students.length ? (
              <EmptyCard />
            ) : (
              <FormControl
                sx={{
                  width: '100%',
                  '& select': { height: '100%', minHeight: '540px', p: '10px 14px 8px 12px' },
                }}
              >
                <Select<string[]>
                  native
                  multiple
                  value={studentsToAdd}
                  // @ts-ignore Typings are not considering `native`
                  onChange={(e) => handleChangeMultiple(e, 'add')}
                >
                  {sortItemsByKey(group.students, 'name').map((student: StudentType, index: number) => (
                    <option key={student.id} value={student.id} style={{ padding: '2px 0' }}>
                      {`${index + 1}. ${student.name}`}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
          </Paper>
        </Grid>

        <Grid item xs={3.8}>
          <StudentsDivideLessons
            isLoading={isLoading}
            dividingType={dividingType}
            selectedLesson={selectedLesson}
            setDividingType={setDividingType}
            setSelectedLesson={setSelectedLesson}
            openedLessonsIds={openedLessonsIds}
            setOpenedLessonsIds={setOpenedLessonsIds}
          />
        </Grid>

        <Grid item xs={3.8}>
          <Paper sx={{ p: 2 }}>
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}
            >
              <Tooltip title={selectedLessonText} enterDelay={1500}>
                <Typography
                  sx={{
                    textTransform: 'uppercase',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                  }}
                >
                  {selectedLesson
                    ? `${selectedLesson.typeRu}. ${selectedLesson.name} 
                  ${selectedLesson.subgroupNumber ? `(${selectedLesson.subgroupNumber} підгрупа)` : '(вся група)'}`
                    : 'Всі дисципліни'}
                </Typography>
              </Tooltip>

              <Tooltip title="Вилучити вибраних студентів зі складу дисципліни">
                <IconButton
                  disabled={isActionButtonsDisabled.delete}
                  onClick={() => {
                    if (dividingType === 'one') onDeleteStudentsFromLesson()
                    if (dividingType === 'all') onDeleteStudentsFromAllGroupLessons()
                  }}
                >
                  <LeftSquareOutlined />
                </IconButton>
              </Tooltip>
            </div>

            {isLoading ? (
              <LoadingSpinner />
            ) : !group || !group.students.length ? (
              <EmptyCard />
            ) : (
              <FormControl
                sx={{
                  width: '100%',
                  '& select': { height: '100%', minHeight: '540px', p: '10px 14px 8px 12px' },
                }}
              >
                {dividingType === 'one' && !lessonStudents?.length && loadingStatus !== LoadingStatusTypes.LOADING ? (
                  <div style={{ height: '558px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography sx={{ marginTop: '-60px' }}>
                      {!selectedLesson ? 'Виберіть дисципліну' : 'Студенти не зараховані на дисципліну'}
                    </Typography>
                  </div>
                ) : loadingStatus === LoadingStatusTypes.LOADING ? (
                  <div style={{ height: '558px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ marginTop: '-60px' }}>
                      <LoadingSpinner />
                    </div>
                  </div>
                ) : (
                  <Select<string[]>
                    native
                    multiple
                    value={studentsToDelete}
                    // @ts-ignore Typings are not considering `native`
                    onChange={(e) => handleChangeMultiple(e, 'delete')}
                  >
                    {sortItemsByKey(
                      dividingType === 'all' ? group.students : lessonStudents ? lessonStudents : [],
                      'name'
                    ).map((student: StudentType, index: number) => (
                      <option key={student.id} value={student.id} style={{ padding: '2px 0' }}>
                        {`${index + 1}. ${student.name}`}
                      </option>
                    ))}
                  </Select>
                )}
              </FormControl>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default StudentsDivide
