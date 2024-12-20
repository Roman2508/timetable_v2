import React from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { Grid, Typography, Tooltip, IconButton, Divider, Paper } from '@mui/material'
import { ColumnWidthOutlined, FilterOutlined, PrinterOutlined, SnippetsOutlined } from '@ant-design/icons'

import { useAppDispatch } from '../../store/store'
import { scheduleLessonsAPI } from '../../api/api'
import { LoadingStatusTypes } from '../../store/appTypes'
import { sortItemsByKey } from '../../utils/sortItemsByKey'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import { groupsListSelector } from '../../store/groups/groupsSlice'
import { GradeBookType } from '../../store/gradeBook/gradeBookTypes'
import { gradeBookSelector } from '../../store/gradeBook/gradeBookSlice'
import GradeBookTable from '../../components/GradeBookPage/GradeBookTable'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { getLastnameAndInitials } from '../../utils/getLastnameAndInitials'
import AddSummaryModal from '../../components/GradeBookPage/AddSummaryModal'
import GradeBookFilter from '../../components/GradeBookPage/GradeBookFilterModal'
import { getGradeBook, getLessonThemes } from '../../store/gradeBook/gradeBookAsyncActions'

const GradeBookPage = () => {
  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams] = useSearchParams()

  const { groups } = useSelector(groupsListSelector)
  const { gradeBook, loadingStatus } = useSelector(gradeBookSelector)

  const [isOpenFilterModal, setIsOpenFilterModal] = React.useState(false)
  const [isOpenSummaryModal, setIsOpenSummaryModal] = React.useState(false)
  const [gradeBookLessonDates, setGradeBookLessonDates] = React.useState<{ date: string }[]>([])

  const fetchGradeBook = async (groupId: number, lessonId: number, semester: number, lessonType: string) => {
    const { payload } = await dispatch(
      getGradeBook({
        group: groupId,
        lesson: lessonId,
        semester: semester,
        // @ts-ignore
        type: lessonType,
      })
    )

    const selectedGroup = groups.find((el) => el.id === groupId)

    if (selectedGroup) {
      // Треба знайти рік вступу групи і до нього додавати курс навчання
      alert('Треба знайти рік вступу групи і до нього додавати курс навчання')
      dispatch(getLessonThemes({ id: lessonId, year: selectedGroup.yearOfAdmission + selectedGroup.courseNumber }))
    }

    const gradeBook = payload as GradeBookType

    const findLessonsPayload: any = {
      semester,
      groupId: gradeBook.group.id,
      type: gradeBook.lesson.typeRu,
      lessonName: gradeBook.lesson.name,
    }

    const stream = gradeBook.lesson.stream ? gradeBook.lesson.stream.id : null
    const specialization = gradeBook.lesson.specialization ? gradeBook.lesson.specialization : null
    const subgroupNumber = gradeBook.lesson.subgroupNumber ? gradeBook.lesson.subgroupNumber : null

    if (stream) findLessonsPayload.stream = stream
    if (specialization) findLessonsPayload.specialization = specialization
    if (subgroupNumber) findLessonsPayload.subgroupNumber = subgroupNumber

    const dates = await scheduleLessonsAPI.findAllLessonDatesForTheSemester(findLessonsPayload)

    const sortedDates = sortItemsByKey(dates.data, 'date')
    setGradeBookLessonDates(sortedDates)
  }

  React.useEffect(() => {
    const groupId = searchParams.get('groupId')
    const lessonId = searchParams.get('lessonId')
    const semester = searchParams.get('semester')
    const lessonType = searchParams.get('lessonType')

    if (!groupId || !lessonId || !semester || !lessonType) return
    fetchGradeBook(Number(groupId), Number(lessonId), Number(semester), lessonType)
  }, [searchParams])

  return (
    <>
      <GradeBookFilter
        open={isOpenFilterModal}
        searchParams={searchParams}
        setOpen={setIsOpenFilterModal}
        fetchGradeBook={fetchGradeBook}
        setSearchParams={setSearchParams}
      />
      <AddSummaryModal open={isOpenSummaryModal} setOpen={setIsOpenSummaryModal} gradeBook={gradeBook} />

      <Grid container sx={{ mb: 2, pt: 0 }}>
        <Grid item xs={12}>
          <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid item style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ mr: 1 }}>
                Електронний журнал
              </Typography>

              <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />

              <Tooltip title="Знайти групу">
                <IconButton onClick={() => setIsOpenFilterModal(true)}>
                  <FilterOutlined />
                </IconButton>
              </Tooltip>

              <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />

              <Tooltip title="Підсумок">
                <IconButton onClick={() => setIsOpenSummaryModal(true)} disabled={!gradeBook}>
                  <ColumnWidthOutlined />
                </IconButton>
              </Tooltip>

              <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />

              <Tooltip title="Теми уроків">
                <IconButton onClick={() => {}} disabled={!gradeBook}>
                  <SnippetsOutlined />
                </IconButton>
              </Tooltip>

              <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />

              <Tooltip title="Друкувати журнал">
                <IconButton onClick={() => {}} disabled={!gradeBook}>
                  <PrinterOutlined />
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item>
              {gradeBook && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ borderRight: '1px solid #ddd', paddingRight: '20px' }}>
                    <Typography variant="body2">Дисципліна</Typography>
                    <Typography
                      variant="h5"
                      sx={{ lineHeight: '1.3' }}
                    >{`${gradeBook.lesson.name}, ${gradeBook.lesson.semester} семестр`}</Typography>
                  </div>

                  <div style={{ borderRight: '1px solid #ddd', paddingRight: '20px' }}>
                    <Typography variant="body2">Група</Typography>
                    <Typography variant="h5" sx={{ lineHeight: '1.3' }}>
                      {gradeBook.group.name}
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="body2">Викладач</Typography>
                    <Typography variant="h5" sx={{ lineHeight: '1.3' }}>
                      {getLastnameAndInitials(gradeBook.lesson.teacher)}
                    </Typography>
                  </div>
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {!gradeBook && loadingStatus !== LoadingStatusTypes.LOADING ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <EmptyCard text="" padding={4} />
          <Typography>Виберіть групу та дисципліну для перегляду журналу</Typography>
        </Paper>
      ) : !gradeBook && loadingStatus === LoadingStatusTypes.LOADING ? (
        <LoadingSpinner />
      ) : gradeBook ? (
        <GradeBookTable gradeBook={gradeBook} gradeBookLessonDates={gradeBookLessonDates} />
      ) : (
        ''
      )}
    </>
  )
}

export default GradeBookPage
