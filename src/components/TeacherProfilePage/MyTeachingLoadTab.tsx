import React from 'react'
import { useSelector } from 'react-redux'
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'

import './FullTeacherPage.css'
import { useAppDispatch } from '../../store/store'
import { UserRoles } from '../../store/auth/authTypes'
import { LoadingStatusTypes } from '../../store/appTypes'
import { authSelector } from '../../store/auth/authSlice'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { GroupLoadType } from '../../store/groups/groupsTypes'
import splitWorkloadBySemesters from '../../utils/splitWorkloadBySemesters'
import { teacherProfileSelector } from '../../store/teacherProfile/teacherProfileSlice'
import { getTeacherLoadById } from '../../store/teacherProfile/teacherProfileAsyncActions'

interface Props {}

const sellStyles = {
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  padding: '6px',
  height: '40px',
}

export const MyTeachingLoadTab: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch()

  const { user } = useSelector(authSelector)
  const { workload, loadingStatus } = useSelector(teacherProfileSelector)

  const [firstSemesterLessons, setFirstSemesterLessons] = React.useState<GroupLoadType[]>([])
  const [secondSemesterLessons, setSecondSemesterLessons] = React.useState<GroupLoadType[]>([])

  const handleSemesterLessons = (load: GroupLoadType[]) => {
    const { firstSemesterLessons, secondSemesterLessons } = splitWorkloadBySemesters(load)

    setFirstSemesterLessons(firstSemesterLessons)
    setSecondSemesterLessons(secondSemesterLessons)
  }

  React.useEffect(() => {
    if (workload) {
      handleSemesterLessons(workload)
      return
    }

    const fetchData = async () => {
      if (!user || !user.teacher || !user.role.includes(UserRoles.TEACHER)) {
        return
      }
      const { payload } = await dispatch(getTeacherLoadById(user.teacher.id))
      const workload = payload as GroupLoadType[]
      handleSemesterLessons(workload)
    }

    fetchData()
  }, [])

  if (user && user.role.includes(UserRoles.TEACHER)) {
    return (
      <Typography align="center" sx={{ mt: 1 }}>
        Сторінка доступна лише викладачам!
      </Typography>
    )
  }

  return (
    <>
      {loadingStatus === LoadingStatusTypes.LOADING ? (
        <LoadingSpinner />
      ) : user && !user.role.includes(UserRoles.TEACHER) ? (
        <Typography align="center" sx={{ mt: 2 }}>
          Ця сторінка доступна лише для викладачів
        </Typography>
      ) : (
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">№</TableCell>
              <TableCell align="left">Група</TableCell>
              <TableCell align="left">Дисципліна</TableCell>
              <TableCell align="center">Група/Підгрупа</TableCell>
              <TableCell align="center">Вид заняття</TableCell>
              <TableCell align="center">Години</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*  */}
            <TableRow>
              <TableCell colSpan={6} align="center" component="th" sx={{ fontWeight: 600 }}>
                Семестр 1
              </TableCell>
            </TableRow>

            {firstSemesterLessons.map((lesson: GroupLoadType, index) => {
              const subgroup = lesson.subgroupNumber ? `Підгр.${lesson.subgroupNumber}` : 'Вся група'

              return (
                <TableRow key={lesson.id}>
                  <TableCell align="center" sx={{ ...sellStyles }}>
                    {index + 1}
                  </TableCell>

                  <TableCell align="left" sx={{ ...sellStyles }}>
                    {lesson.group.name}
                  </TableCell>

                  <TableCell align="left" sx={{ ...sellStyles }}>
                    {lesson.name}
                  </TableCell>

                  <TableCell align="center" sx={{ ...sellStyles }}>
                    {subgroup}
                  </TableCell>

                  <TableCell align="center" sx={{ ...sellStyles }}>
                    {lesson.typeRu}
                  </TableCell>

                  <TableCell sx={{ width: '100px', ...sellStyles }} align="center">
                    {lesson.hours}
                  </TableCell>
                </TableRow>
              )
            })}

            <TableRow>
              <TableCell colSpan={5} component="th" align="left" sx={{ fontWeight: 600 }}>
                Всього за 1 семестр
              </TableCell>
              <TableCell align="center" component="th" sx={{ fontWeight: 600 }}>
                {firstSemesterLessons.reduce((total, current) => total + current.hours, 0)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={6} component="th" align="center" sx={{ fontWeight: 600 }}>
                Семестр 2
              </TableCell>
            </TableRow>

            {secondSemesterLessons.map((lesson: GroupLoadType, index) => {
              const subgroup = lesson.subgroupNumber ? `Підгр.${lesson.subgroupNumber}` : 'Вся група'

              return (
                <TableRow key={lesson.id}>
                  <TableCell align="center" sx={{ ...sellStyles }}>
                    {index + 1}
                  </TableCell>

                  <TableCell align="left" sx={{ ...sellStyles }}>
                    {lesson.group.name}
                  </TableCell>

                  <TableCell align="left" sx={{ ...sellStyles }}>
                    {lesson.name}
                  </TableCell>

                  <TableCell align="center" sx={{ ...sellStyles }}>
                    {subgroup}
                  </TableCell>

                  <TableCell align="center" sx={{ ...sellStyles }}>
                    {lesson.typeRu}
                  </TableCell>

                  <TableCell sx={{ width: '100px', ...sellStyles }} align="center">
                    {lesson.hours}
                  </TableCell>
                </TableRow>
              )
            })}

            <TableRow>
              <TableCell colSpan={5} component="th" align="left" sx={{ fontWeight: 600 }}>
                Всього за 2 семестр
              </TableCell>
              <TableCell align="center" component="th" sx={{ fontWeight: 600 }}>
                {secondSemesterLessons.reduce((total, current) => total + current.hours, 0)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} component="th" align="left" sx={{ fontWeight: 600 }}>
                Всього за рік
              </TableCell>
              <TableCell align="center" component="th" sx={{ fontWeight: 600 }}>
                {secondSemesterLessons.reduce((total, current) => total + current.hours, 0) +
                  firstSemesterLessons.reduce((total, current) => total + current.hours, 0)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </>
  )
}
