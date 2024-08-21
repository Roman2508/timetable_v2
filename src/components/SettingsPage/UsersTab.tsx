import {
  Box,
  Chip,
  Avatar,
  Table,
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
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

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
  const [page, setPage] = React.useState(1)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState('email')

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const rows = [
    ...Array(50)
      .fill(null)
      .map(() => ({
        id: 1,
        name: 'asdasdas',
        email: 'sdasdds@pharm.zt.ua',
        picture: 'https://saaadsdas.com',
        role: ['ADMIN', 'TEACHER'],
      })),
  ]

  const visibleRows = React.useMemo(
    // @ts-ignore
    () => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage]
  )

  return (
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
              <TableCell align="center">Дії</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((_, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>

                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar />
                    <Box>
                      <Typography>William Jem</Typography>
                      <Typography sx={{ color: 'rgb(140, 140, 140)', fontSize: '12px' }}>Студент</Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell align="center">test.mail@pharm.zt.ua</TableCell>

                <TableCell align="center">
                  <Chip label="student" size="small" variant="outlined" color="primary" sx={{ mx: 0.2 }} />
                  <Chip label="student" size="small" variant="outlined" color="primary" sx={{ mx: 0.2 }} />
                </TableCell>

                <TableCell align="center">
                  <IconButton>
                    <EditOutlined />
                  </IconButton>

                  <IconButton>
                    <DeleteOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <TablePagination
          page={page}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[10, 25, 50, 100]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </div>
  )
}

export default UsersTab
