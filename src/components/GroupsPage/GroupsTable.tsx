import React, { useState } from "react"
import { Link as RouterLink, useNavigate } from "react-router-dom"

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
  IconButton,
} from "@mui/material"
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { GroupCategoriesType, GroupsShortType } from "../../store/groups/groupsTypes"

const createData = (
  trackingNo: number,
  name: string,
  fat: number,
  carbs: number,
  protein: number
) => {
  return { trackingNo, name, fat, carbs, protein }
}

const rows = [
  createData(84564564, "Camera Lens", 40, 2, 40570),
  createData(98764564, "Laptop", 300, 0, 180139),
  createData(98756325, "Mobile", 355, 1, 90989),
  createData(98652366, "Handset", 50, 1, 10239),
  createData(13286564, "Computer Accessories", 100, 1, 83348),
  createData(86739658, "TV", 99, 0, 410780),
  createData(13256498, "Keyboard", 125, 2, 70999),
  createData(98753263, "Mouse", 89, 2, 10570),
  createData(98753275, "Desktop", 185, 1, 98063),
  createData(98753291, "Chair", 100, 0, 14001),
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
  return order === "desc"
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

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

interface IHeadCells {
  id: string
  align: "center" | "left" | "right" | "inherit" | "justify"
  disablePadding: boolean
  label: string
}

const headCells: IHeadCells[] = [
  {
    id: "trackingNo",
    align: "center",
    disablePadding: false,
    label: "Назва",
  },
  {
    id: "name",
    align: "center",
    disablePadding: true,
    label: "Курс",
  },
  {
    id: "fat",
    align: "center",
    disablePadding: false,
    label: "Студентів",
  },
  {
    id: "carbs",
    align: "center",
    disablePadding: false,

    label: "Дії",
  },
]

// ==============================|| ORDER TABLE - HEADER ||============================== //

interface IOrderTableHeadProps {
  order: string
  orderBy: string
}

const OrderTableHead: React.FC<IOrderTableHeadProps> = ({ order, orderBy }) => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? (order as SortDirection) : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

// ==============================|| ORDER TABLE ||============================== //

interface IGroupsTableProps {
  groups: GroupsShortType[]
  onDeleteEntity: (type: "category" | "group", id: number) => void
}

const GroupsTable: React.FC<IGroupsTableProps> = ({ groups, onDeleteEntity }) => {
  const [order] = useState("asc")
  const [orderBy] = useState("trackingNo")
  const [selected] = useState([])

  const isSelected = (id: number) => selected.indexOf(id) !== -1

  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            "& .MuiTableCell-root:first-of-type": {
              pl: 2,
            },
            "& .MuiTableCell-root:last-of-type": {
              pr: 3,
            },
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {/* {stableSort(rows, getComparator(order, orderBy)).map((row, index) => { */}
            {groups.map((group, index) => {
              const isItemSelected = isSelected(group.id)
              const labelId = `enhanced-table-checkbox-${index}`

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={group.id}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to={`/groups/${group.id}`}>
                      {group.name}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{group.courseNumber}</TableCell>
                  <TableCell align="center">{group.students}</TableCell>
                  <TableCell align="center">
                    <Link component={RouterLink} to={`/groups/${group.id}`}>
                      <IconButton>
                        <EditOutlined />
                      </IconButton>
                    </Link>

                    <IconButton
                      sx={{ ml: "5px" }}
                      onClick={() => onDeleteEntity("group", group.id)}
                    >
                      <DeleteOutlined />
                    </IconButton>
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

export { GroupsTable }
