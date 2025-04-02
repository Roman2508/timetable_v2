import {
  Box,
  Chip,
  Table,
  Avatar,
  Button,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { DeleteOutlined, EditOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons'

import cutUserName from '../../utils/cutUserName'
import { useAppDispatch } from '../../store/store'
import UsersActionsDrawer from './UsersActionsDrawer'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { UserRoles, UserType } from '../../store/auth/authTypes'
import { formatRelativeTime } from '../../utils/formatRelativeTime'
import { authSelector, clearUsers } from '../../store/auth/authSlice'
import { deleteUser, getUsers } from '../../store/auth/authAsyncActions'
import { deleteTeacher } from '../../store/teachers/teachersAsyncActions'
import { deleteStudent } from '../../store/students/studentsAsyncActions'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const UsersTab = () => {
  const dispatch = useAppDispatch()

  const [isDeleting, setIsDeleting] = React.useState(false)
  const [isOpenActionDrawer, setIsOpenActionDrawer] = React.useState(false)
  const [editedUser, setEditedUser] = React.useState<UserType | null>(null)
  const [actionMode, setActionMode] = React.useState<'create' | 'update'>('create')

  const [page, setPage] = React.useState(0)
  const [total, setTotal] = React.useState(0)
  const [orderBy, setOrderBy] = React.useState('email')
  const [order, setOrder] = React.useState<Order>('asc')
  const [rowsPerPage, setItemsPerPage] = React.useState(10)

  const { users } = useSelector(authSelector)

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const onDeleteUser = async (user: UserType) => {
    try {
      setIsDeleting(true)
      if (user.role.includes('TEACHER') && user.teacher) {
        await dispatch(deleteUser(user.id))
        await dispatch(deleteTeacher(user.teacher.id))
        return
      }

      if (user.role.includes('STUDENT') && user.student) {
        await dispatch(deleteUser(user.id))
        await dispatch(deleteStudent(user.student.id))
        return
      }

      await dispatch(deleteUser(user.id))
    } catch (error) {
      console.log(error)
    } finally {
      setIsDeleting(false)
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      dispatch(clearUsers())
      const { payload } = await dispatch(getUsers({ offset: page * rowsPerPage, limit: rowsPerPage }))
      const userPayload = payload as [UserType[], number]
      if (userPayload) {
        setTotal(userPayload[1])
      }
    }

    fetchData()
  }, [page, rowsPerPage])

  // const rows = [
  //   ...Array(50)
  //     .fill(null)
  //     .map(() => ({
  //       id: 1,
  //       name: 'asdasdas',
  //       email: 'sdasdds@pharm.zt.ua',
  //       picture: 'https://saaadsdas.com',
  //       role: ['ADMIN', 'TEACHER'],
  //     })),
  // ]

  // const visibleRows = React.useMemo(
  //   // @ts-ignore
  //   () => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
  //   [order, orderBy, page, rowsPerPage]
  // )

  return (
    <>
      <UsersActionsDrawer
        editedUser={editedUser}
        actionMode={actionMode}
        setEditedUser={setEditedUser}
        isOpenActionDrawer={isOpenActionDrawer}
        setIsOpenActionDrawer={setIsOpenActionDrawer}
      />

      <div>
        <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
          Користувачі
        </Typography>

        <TableContainer>
          <Table>
            <TableHead
              sx={{
                backgroundColor: 'rgb(250, 250, 250)',
                borderTop: '1px solid rgb(240, 240, 240)',
                borderBottom: '1px solid rgb(240, 240, 240)',
              }}
            >
              <TableRow>
                <TableCell width="80px" align="center">
                  №
                </TableCell>
                <TableCell>ПІБ</TableCell>
                <TableCell align="center">Пошта</TableCell>
                <TableCell align="center">Ролі</TableCell>
                <TableCell align="center">Останній вхід</TableCell>
                <TableCell align="center">Дії</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/*  */}
              {!users && (
                <TableRow>
                  <TableCell colSpan={6} sx={{ py: 24 }}>
                    <LoadingSpinner />
                  </TableCell>
                </TableRow>
              )}

              {(users ? users : []).map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell align="center">{index + 1}</TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar src={user.picture || ''} />
                      <Box>
                        <Typography>{cutUserName(user)}</Typography>
                        <Typography sx={{ color: 'rgb(140, 140, 140)', fontSize: '12px' }}>
                          {user.role.includes(UserRoles.STUDENT)
                            ? 'Студент'
                            : user.role.includes(UserRoles.TEACHER)
                            ? 'Викладач'
                            : 'Адміністрація'}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell align="left">{user.email}</TableCell>

                  <TableCell align="center" sx={{ maxWidth: '200px', width: '200px' }}>
                    {user.role.includes(UserRoles.STUDENT) && (
                      <Chip label="student" size="small" variant="outlined" color="primary" sx={{ mx: 0.2 }} />
                    )}
                    {user.role.includes(UserRoles.TEACHER) && (
                      <Chip label="teacher" size="small" variant="outlined" color="info" sx={{ mx: 0.2 }} />
                    )}
                    {user.role.includes(UserRoles.ADMIN) && (
                      <Chip label="admin" size="small" variant="outlined" color="error" sx={{ mx: 0.2 }} />
                    )}
                    {user.role.includes(UserRoles.HEAD_OF_DEPARTMENT) && (
                      <Chip
                        size="small"
                        color="warning"
                        sx={{ mx: 0.2 }}
                        variant="outlined"
                        label="head of department"
                      />
                    )}
                    {user.role.includes(UserRoles.METHODIST) && (
                      <Chip label="methodist" size="small" variant="outlined" color="success" sx={{ mx: 0.2 }} />
                    )}
                    {user.role.includes(UserRoles.GUEST) && (
                      <Chip label="guest" size="small" variant="outlined" color="secondary" sx={{ mx: 0.2 }} />
                    )}
                  </TableCell>

                  <TableCell align="center">{formatRelativeTime(user.lastLogin)}</TableCell>

                  <TableCell align="center">
                    <IconButton
                      disabled={isDeleting}
                      onClick={() => {
                        setEditedUser(user)
                        setActionMode('update')
                        setIsOpenActionDrawer(true)
                      }}
                    >
                      <EditOutlined />
                    </IconButton>

                    <IconButton onClick={() => onDeleteUser(user)} disabled={isDeleting}>
                      <DeleteOutlined />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {users && users.length && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, alignItems: 'center' }}>
            <TablePagination
              page={page}
              count={total}
              component="div"
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              labelRowsPerPage="На одній сторінці:"
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[10, 25, 50, 100, 200, 500]}
            />

            <div>
              <Button
                variant="outlined"
                sx={{ mr: 2 }}
                onClick={() => {
                  setActionMode('create')
                  setIsOpenActionDrawer(true)
                }}
              >
                <PlusOutlined style={{ marginRight: '8px' }} />
                <span>Створити користувача</span>
              </Button>

              <Button variant="outlined" disabled>
                <FilterOutlined style={{ marginRight: '8px' }} />
                <span>Фільтр</span>
              </Button>
            </div>
          </Box>
        )}
      </div>
    </>
  )
}

export default UsersTab
