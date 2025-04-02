import React from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  Box,
  TablePagination,
} from '@mui/material'

import './full-plan-table.css'
import { useAppDispatch } from '../../store/store'
import { sortItemsByKey } from '../../utils/sortItemsByKey'
import { PlanSubjectType } from '../../store/plans/plansTypes'
import { groupLessonsByName } from '../../utils/groupLessonsByName'
import { searchItemsByField } from '../../utils/searchItemsByField'
import { deletePlanSubjects } from '../../store/plans/plansAsyncActions'

const cellStyles = { borderLeft: '1px solid rgb(235, 235, 235)', padding: '8px 24px' /* backgroundColor: "#fff" */ }

const FullPlanTableHead: React.FC = () => {
  return (
    <TableHead
      sx={{
        backgroundColor: 'rgb(250, 250, 250) !important',
        borderTop: '1px solid rgb(240, 240, 240)',
        borderBottom: '1px solid rgb(240, 240, 240)',
      }}
    >
      <TableRow>
        <TableCell rowSpan={3} align="center" padding="none" sx={{ ...cellStyles, borderLeft: 0 }}>
          Дисципліна
        </TableCell>
        <TableCell sx={{ ...cellStyles }} align="center" rowSpan={3} padding="none">
          Всього
        </TableCell>

        <TableCell sx={{ ...cellStyles, p: 1 }} align="center" padding="none" colSpan={6}>
          Розподіл за курсами та семестрами
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={{ ...cellStyles, p: 1 }} align="center" padding="none" colSpan={2}>
          1 курс
        </TableCell>
        <TableCell sx={{ ...cellStyles, p: 1 }} align="center" padding="none" colSpan={2}>
          2 курс
        </TableCell>
        <TableCell sx={{ ...cellStyles, p: 1 }} align="center" padding="none" colSpan={2}>
          3 курс
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={{ ...cellStyles, p: 1 }} align="center" padding="none">
          Семестр 1
        </TableCell>
        <TableCell sx={{ ...cellStyles, p: 1 }} align="center" padding="none">
          Семестр 2
        </TableCell>
        <TableCell sx={{ ...cellStyles, p: 1 }} align="center" padding="none">
          Семестр 3
        </TableCell>
        <TableCell sx={{ ...cellStyles, p: 1 }} align="center" padding="none">
          Семестр 4
        </TableCell>
        <TableCell sx={{ ...cellStyles, p: 1 }} align="center" padding="none">
          Семестр 5
        </TableCell>
        <TableCell sx={{ ...cellStyles, p: 1 }} align="center" padding="none">
          Семестр 6
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

// ==============================|| FULL PLAN TABLE ||============================== //

interface IFullPlanTableProps {
  searchValue: string
  planSubjects: PlanSubjectType[]
  setSubjectsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setSemesterHoursModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setSubjectsModalType: React.Dispatch<React.SetStateAction<'create' | 'update'>>
  setSelectedSemester: React.Dispatch<React.SetStateAction<PlanSubjectType | null>>
  setEditingSubjectData: React.Dispatch<React.SetStateAction<{ name: string; cmk: number }>>
}

const FullPlanTable: React.FC<IFullPlanTableProps> = ({
  searchValue,
  planSubjects,
  setSelectedSemester,
  setSubjectsModalType,
  setEditingSubjectData,
  setSubjectsModalVisible,
  setSemesterHoursModalVisible,
}) => {
  const dispatch = useAppDispatch()

  const [page, setPage] = React.useState(1)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const onDeleteSubject = (subjects: PlanSubjectType[]) => {
    if (subjects.length > 1) return alert('Видаліть спочатку всі семестри')
    if (window.confirm('Ви дійсно хочете видалити дисципліну?')) {
      dispatch(deletePlanSubjects(subjects[0].id))
    }
  }

  const onSemesterClick = (row: PlanSubjectType, semester: number, semesterHours?: PlanSubjectType) => {
    const data = semesterHours
      ? { ...semesterHours, semesterNumber: semester }
      : {
          ...row,
          planId: row.plan.id,
          semesterNumber: semester,
          totalHours: 0,
          lectures: 0,
          practical: 0,
          laboratory: 0,
          seminars: 0,
          exams: 0,
          examsConsulation: 0,
          metodologicalGuidance: 0,
          independentWork: 0,
        }

    setSelectedSemester(data)
    setEditingSubjectData({ name: row.name, cmk: row.cmk?.id })
    setSemesterHoursModalVisible(true)
  }

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' },
          borderTop: '1px solid rgb(235, 235, 235)',
        }}
      >
        <Table
          stickyHeader
          aria-labelledby="tableTitle"
          sx={{
            zIndex: 0,
            position: 'relative',
            '& .MuiTableCell-root:first-of-type': { pl: 2 },
            '& .MuiTableCell-root:last-of-type': { pr: 3 },
          }}
        >
          <FullPlanTableHead />

          <TableBody>
            {searchItemsByField(sortItemsByKey(groupLessonsByName(planSubjects), 'name'), 'name', searchValue).map(
              (row: PlanSubjectType[], index: number) => {
                const labelId = `enhanced-table-checkbox-${index}`

                const totalSubjectHours = row.reduce((acc, cur) => Number(cur.totalHours) + acc, 0)

                return (
                  <TableRow hover key={row[0].id} role="checkbox" tabIndex={-1}>
                    <TableCell
                      sx={{
                        ...cellStyles,
                        position: 'relative',
                        ':hover *': { display: 'flex !important' },
                        borderLeft: 0,
                      }}
                      component="th"
                      id={labelId}
                      scope="row"
                      align="left"
                    >
                      <Typography sx={{ flexGrow: 1 }}>{row[0].name}</Typography>

                      <div className="full-plan-table__icon-wrapper">
                        <EditOutlined
                          className="full-plan-table__icon"
                          onClick={() => {
                            setEditingSubjectData({ name: row[0].name, cmk: row[0].cmk.id })
                            setSubjectsModalType('update')
                            setSubjectsModalVisible(true)
                          }}
                        />

                        <DeleteOutlined className="full-plan-table__icon" onClick={() => onDeleteSubject(row)} />
                      </div>
                    </TableCell>
                    <TableCell sx={cellStyles} align="center">
                      {totalSubjectHours}
                    </TableCell>

                    {Array(6)
                      .fill(null)
                      .map((_, index) => {
                        const semester = index + 1
                        const semesterHours = row.find((el) => el.semesterNumber === semester)

                        return (
                          <TableCell
                            key={index}
                            onClick={() => onSemesterClick(row[0], semester, semesterHours)}
                            sx={{
                              ...cellStyles,
                              cursor: 'pointer',
                              ':hover': { background: 'rgba(0, 0, 0, 0.05);' },
                            }}
                            align="center"
                          >
                            {semesterHours ? semesterHours.totalHours : ''}
                          </TableCell>
                        )
                      })}
                  </TableRow>
                )
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TablePagination
          page={page}
          component="div"
          count={groupLessonsByName(planSubjects).length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10, 25, 50, 100]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  )
}

export { FullPlanTable }
