import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  Typography,
  TableContainer,
} from '@mui/material'
import React, { useState } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { useAppDispatch } from '../../store/store'
import { groupLessonsByName } from '../../utils/groupLessonsByName'
import { searchItemsByField } from '../../utils/searchItemsByField'
import { PlanSubjectType, PlanType } from '../../store/plans/plansTypes'
import { deletePlanSubjects } from '../../store/plans/plansAsyncActions'

interface IOrderTableHeadProps {
  order: string
  orderBy: string
}

const cellStyles = { border: '1px solid rgb(235, 235, 235)' }

const OrderTableHead: React.FC<IOrderTableHeadProps> = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ ...cellStyles, backgroundColor: '#fff !important' }} align="center" rowSpan={3} padding="none">
          Дисципліна
        </TableCell>
        <TableCell sx={{ ...cellStyles, backgroundColor: '#fff !important' }} align="center" rowSpan={3} padding="none">
          Всього
        </TableCell>

        <TableCell
          sx={{ ...cellStyles, p: 1, backgroundColor: '#fff !important' }}
          align="center"
          padding="none"
          colSpan={6}
        >
          Розподіл за курсами та семестрами
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          sx={{ ...cellStyles, p: 1, backgroundColor: '#fff !important' }}
          align="center"
          padding="none"
          colSpan={2}
        >
          1 курс
        </TableCell>
        <TableCell
          sx={{ ...cellStyles, p: 1, backgroundColor: '#fff !important' }}
          align="center"
          padding="none"
          colSpan={2}
        >
          2 курс
        </TableCell>
        <TableCell
          sx={{ ...cellStyles, p: 1, backgroundColor: '#fff !important' }}
          align="center"
          padding="none"
          colSpan={2}
        >
          3 курс
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={{ ...cellStyles, p: 1, backgroundColor: '#fff !important' }} align="center" padding="none">
          Семестр 1
        </TableCell>
        <TableCell sx={{ ...cellStyles, p: 1, backgroundColor: '#fff !important' }} align="center" padding="none">
          Семестр 2
        </TableCell>
        <TableCell sx={{ ...cellStyles, p: 1, backgroundColor: '#fff !important' }} align="center" padding="none">
          Семестр 3
        </TableCell>
        <TableCell sx={{ ...cellStyles, p: 1, backgroundColor: '#fff !important' }} align="center" padding="none">
          Семестр 4
        </TableCell>
        <TableCell sx={{ ...cellStyles, p: 1, backgroundColor: '#fff !important' }} align="center" padding="none">
          Семестр 5
        </TableCell>
        <TableCell sx={{ ...cellStyles, p: 1, backgroundColor: '#fff !important' }} align="center" padding="none">
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

  const [order] = useState('asc')
  const [orderBy] = useState('trackingNo')

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
    setEditingSubjectData({ name: row.name, cmk: row.cmk.id })
    setSemesterHoursModalVisible(true)
  }

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          // maxHeight: '600px',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' },
        }}
      >
        <Table
          stickyHeader
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': { pl: 2 },
            '& .MuiTableCell-root:last-of-type': { pr: 3 },
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {/* stableSort(rows, getComparator(order, orderBy)) */}
            {searchItemsByField(groupLessonsByName(planSubjects), 'name', searchValue).map(
              (row: PlanSubjectType[], index: number) => {
                // const isItemSelected = isSelected(row.trackingNo)
                const labelId = `enhanced-table-checkbox-${index}`

                const totalSubjectHours = row.reduce((acc, cur) => Number(cur.totalHours) + acc, 0)

                return (
                  <TableRow
                    hover
                    key={row[0].id}
                    role="checkbox"
                    // aria-checked={isItemSelected}
                    tabIndex={-1}
                    // key={row.trackingNo}
                    // selected={isItemSelected}
                  >
                    <TableCell
                      sx={{
                        ...cellStyles,
                        position: 'relative',
                        ':hover *': { display: 'flex !important' },
                      }}
                      component="th"
                      id={labelId}
                      scope="row"
                      align="left"
                    >
                      <Typography sx={{ flexGrow: 1 }}>{row[0].name}</Typography>

                      <div
                        style={{
                          display: 'none',
                          position: 'absolute',
                          right: 5,
                          top: 6,
                          backgroundColor: '#f5f5f5',
                        }}
                      >
                        <IconButton
                          sx={{ mr: 1, background: '#fff', ':hover': { background: '#fff' } }}
                          onClick={() => {
                            setEditingSubjectData({ name: row[0].name, cmk: row[0].cmk.id })
                            setSubjectsModalType('update')
                            setSubjectsModalVisible(true)
                          }}
                        >
                          <EditOutlined />
                        </IconButton>
                        <IconButton
                          sx={{ background: '#fff', ':hover': { background: '#fff' } }}
                          onClick={() => onDeleteSubject(row)}
                        >
                          <DeleteOutlined />
                        </IconButton>
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
                            /* onClick={() => {
                            const data = semesterHours
                              ? { ...semesterHours, semesterNumber: semester }
                              : {
                                  ...row[0],
                                  planId: row[0].plan.id,
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
                            console.log(row[0])
                            setEditingSubjectData({ name: row[0].name, cmk: row[0].cmk.id })
                            setSemesterHoursModalVisible(true)
                          }} */
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
    </Box>
  )
}

export { FullPlanTable }
