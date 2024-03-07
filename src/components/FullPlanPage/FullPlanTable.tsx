import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

// material-ui
import {
  Box,
  Link,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  SortDirection,
  TableContainer,
} from '@mui/material'

const createData = (trackingNo: number, name: string, fat: number, carbs: number, protein: number) => {
  return { trackingNo, name, fat, carbs, protein }
}

const rows = [
  createData(84564564, 'Camera Lens', 40, 2, 40570),
  createData(98764564, 'Laptop', 300, 0, 180139),
  createData(98756325, 'Mobile', 355, 1, 90989),
  createData(98652366, 'Handset', 50, 1, 10239),
  createData(13286564, 'Computer Accessories', 100, 1, 83348),
  createData(86739658, 'TV', 99, 0, 410780),
  createData(13256498, 'Keyboard', 125, 2, 70999),
  createData(98753263, 'Mouse', 89, 2, 10570),
  createData(98753275, 'Desktop', 185, 1, 98063),
  createData(98753291, 'Chair', 100, 0, 14001),
  createData(84564564, 'Camera Lens', 40, 2, 40570),
  createData(98764564, 'Laptop', 300, 0, 180139),
  createData(98756325, 'Mobile', 355, 1, 90989),
  createData(98652366, 'Handset', 50, 1, 10239),
  createData(13286564, 'Computer Accessories', 100, 1, 83348),
  createData(86739658, 'TV', 99, 0, 410780),
  createData(13256498, 'Keyboard', 125, 2, 70999),
  createData(98753263, 'Mouse', 89, 2, 10570),
  createData(98753275, 'Desktop', 185, 1, 98063),
  createData(98753291, 'Chair', 100, 0, 14001),
]

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

// ==============================|| ORDER TABLE - HEADER ||============================== //

interface IOrderTableHeadProps {
  order: string
  orderBy: string
}

const cellStyles = { border: '1px solid rgb(235, 235, 235)', backgroundColor: '#fff' }

const OrderTableHead: React.FC<IOrderTableHeadProps> = ({ order, orderBy }) => {
  console.log(order, orderBy)
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={cellStyles} align="center" rowSpan={3} padding="none">
          Дисципліна
        </TableCell>
        <TableCell sx={cellStyles} align="center" rowSpan={3} padding="none">
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
          1 курс
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

// ==============================|| ORDER TABLE ||============================== //

const FullPlanTable = () => {
  const [order] = useState('asc')
  const [orderBy] = useState('trackingNo')
  const [selected] = useState([])

  const isSelected = (trackingNo: number) => selected.indexOf(trackingNo) !== -1

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
            '& .MuiTableCell-root:first-of-type': {
              pl: 2,
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3,
            },
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index: number) => {
              const isItemSelected = isSelected(row.trackingNo)
              const labelId = `enhanced-table-checkbox-${index}`

              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.trackingNo}
                  selected={isItemSelected}
                >
                  <TableCell sx={cellStyles} component="th" id={labelId} scope="row" align="left">
                    {row.name}
                  </TableCell>
                  <TableCell sx={cellStyles} align="center">
                    {row.fat}
                  </TableCell>
                  <TableCell sx={cellStyles} align="center">
                    {1}
                  </TableCell>
                  <TableCell sx={cellStyles} align="center">
                    {1}
                  </TableCell>
                  <TableCell sx={cellStyles} align="center">
                    {1}
                  </TableCell>
                  <TableCell sx={cellStyles} align="center">
                    {1}
                  </TableCell>
                  <TableCell sx={cellStyles} align="center">
                    {1}
                  </TableCell>
                  <TableCell sx={cellStyles} align="center">
                    {1}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export { FullPlanTable }
