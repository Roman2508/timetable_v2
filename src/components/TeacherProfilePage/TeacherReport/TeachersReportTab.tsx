import React, { useEffect } from 'react'
import { Packer } from 'docx'
import { saveAs } from 'file-saver'
import { useSelector } from 'react-redux'
import { Button, OutlinedInput, Stack, Typography } from '@mui/material'

import { DocumentCreator } from './cv-generator'
import EmptyCard from '../../EmptyCard/EmptyCard'
import TeachersReportItem from './TeacherReportItem'
import { useAppDispatch } from '../../../store/store'
import { customDayjs } from '../../Calendar/Calendar'
import { authSelector } from '../../../store/auth/authSlice'
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner'
import { sortTeacherReports } from '../../../utils/sortTeacherReports'
import { groupLessonsByFields } from '../../../utils/groupLessonsByFields'
import splitWorkloadBySemesters from '../../../utils/splitWorkloadBySemesters'
import splitTeacherReportsByType from '../../../utils/splitTeacherReportsByType'
import { TeacherReportType } from '../../../store/teacherProfile/teacherProfileTypes'
import { getTeacherLoadById, getTeacherReport } from '../../../store/teacherProfile/teacherProfileAsyncActions'
import { clearTeacherReports, teacherProfileSelector } from '../../../store/teacherProfile/teacherProfileSlice'
import { UserRoles } from '../../../store/auth/authTypes'

const TeachersReportTab: React.FC = () => {
  const { user } = useSelector(authSelector)

  const dispatch = useAppDispatch()

  const { report, workload } = useSelector(teacherProfileSelector)

  const [doneHours, setDoneHours] = React.useState(0)
  const [showedYear, setShowedYear] = React.useState(customDayjs().year())

  const generateDocx = (): void => {
    if (!report || !workload) return

    const doneReports = report.filter((el) => el.status)

    const { firstSemesterLessons, secondSemesterLessons } = splitWorkloadBySemesters(workload)
    const { methodicalWork, scientificWork, organizationalWork } = splitTeacherReportsByType(doneReports)

    const first = groupLessonsByFields(firstSemesterLessons, { lessonName: true, groupName: true })
    const second = groupLessonsByFields(secondSemesterLessons, { lessonName: true, groupName: true })

    const documentCreator = new DocumentCreator()
    const doc = documentCreator.create(
      first,
      second,
      methodicalWork,
      scientificWork,
      organizationalWork,
      'Пташник Р.В.',
      showedYear
    )

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'report.docx')
    })
  }

  React.useEffect(() => {
    // 3 === teacher id
    dispatch(getTeacherLoadById(3))
    dispatch(clearTeacherReports())
    // 17 === teacher id
    dispatch(getTeacherReport({ year: showedYear, id: 17 }))
  }, [showedYear])

  React.useEffect(() => {
    if (!report) return
    const doneActivities = report.filter((el) => el.status)
    const doneHours = doneActivities.reduce((acc, cur) => Number(cur.hours) + acc, 0)
    setDoneHours(doneHours)
  }, [report])

  if (user && user.role.includes(UserRoles.TEACHER)) {
    return (
      <Typography align="center" sx={{ mt: 1 }}>
        Сторінка доступна лише викладачам!
      </Typography>
    )
  }

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          {/* <Button variant="outlined" sx={{ mr: 1 }} style={{ textTransform: "initial" }}>
            Експортувати звіт в PDF
          </Button> */}

          <Button
            variant="outlined"
            onClick={generateDocx}
            disabled={!report || !workload}
            style={{ textTransform: 'initial' }}
          >
            Експортувати звіт в WORD
          </Button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 5 }}>
          <Typography variant="button" sx={{ textTransform: 'inherit' }}>
            Звіт за
          </Typography>
          <Stack spacing={1}>
            <OutlinedInput
              fullWidth
              name="hours"
              type="number"
              value={showedYear}
              onChange={(e) => setShowedYear(Number(e.target.value))}
              sx={{ width: '70px', input: { padding: '8.2px 2px 8.2px 16px' } }}
            />
          </Stack>
          <Typography variant="button" sx={{ textTransform: 'inherit', width: '77px' }}>
            - {showedYear + 1} н.р.
          </Typography>
        </div>
      </div>

      {!!report?.length && (
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 4 }}>
          Всього виконано за н.р. {doneHours} годин.
        </Typography>
      )}

      {!report ? (
        <LoadingSpinner />
      ) : !report.length ? (
        <EmptyCard />
      ) : (
        sortTeacherReports(report).map((el: TeacherReportType) => <TeachersReportItem key={el.id} report={el} />)
      )}
    </div>
  )
}

export default TeachersReportTab
