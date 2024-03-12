import React, { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import { EditOutlined } from "@ant-design/icons"

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
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material"
import { PlanSubjectType, PlanType } from "../../store/plans/plansTypes"

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

// ==============================|| ORDER TABLE - HEADER ||============================== //

interface IOrderTableHeadProps {
  order: string
  orderBy: string
}

const cellStyles = { border: "1px solid rgb(235, 235, 235)" }

const OrderTableHead: React.FC<IOrderTableHeadProps> = ({ order, orderBy }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          sx={{ ...cellStyles, backgroundColor: "#fff !important" }}
          align="center"
          rowSpan={3}
          padding="none"
        >
          Дисципліна
        </TableCell>
        <TableCell
          sx={{ ...cellStyles, backgroundColor: "#fff !important" }}
          align="center"
          rowSpan={3}
          padding="none"
        >
          Всього
        </TableCell>

        <TableCell
          sx={{ ...cellStyles, p: 1, backgroundColor: "#fff !important" }}
          align="center"
          padding="none"
          colSpan={6}
        >
          Розподіл за курсами та семестрами
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          sx={{ ...cellStyles, p: 1, backgroundColor: "#fff !important" }}
          align="center"
          padding="none"
          colSpan={2}
        >
          1 курс
        </TableCell>
        <TableCell
          sx={{ ...cellStyles, p: 1, backgroundColor: "#fff !important" }}
          align="center"
          padding="none"
          colSpan={2}
        >
          1 курс
        </TableCell>
        <TableCell
          sx={{ ...cellStyles, p: 1, backgroundColor: "#fff !important" }}
          align="center"
          padding="none"
          colSpan={2}
        >
          3 курс
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          sx={{ ...cellStyles, p: 1, backgroundColor: "#fff !important" }}
          align="center"
          padding="none"
        >
          Семестр 1
        </TableCell>
        <TableCell
          sx={{ ...cellStyles, p: 1, backgroundColor: "#fff !important" }}
          align="center"
          padding="none"
        >
          Семестр 2
        </TableCell>
        <TableCell
          sx={{ ...cellStyles, p: 1, backgroundColor: "#fff !important" }}
          align="center"
          padding="none"
        >
          Семестр 3
        </TableCell>
        <TableCell
          sx={{ ...cellStyles, p: 1, backgroundColor: "#fff !important" }}
          align="center"
          padding="none"
        >
          Семестр 4
        </TableCell>
        <TableCell
          sx={{ ...cellStyles, p: 1, backgroundColor: "#fff !important" }}
          align="center"
          padding="none"
        >
          Семестр 5
        </TableCell>
        <TableCell
          sx={{ ...cellStyles, p: 1, backgroundColor: "#fff !important" }}
          align="center"
          padding="none"
        >
          Семестр 6
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

// ==============================|| FULL PLAN TABLE ||============================== //

interface IFullPlanTableProps {
  plan: PlanType
  setEditingSubjectName: React.Dispatch<React.SetStateAction<string>>
  setSubjectsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setSemesterHoursModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setSubjectsModalType: React.Dispatch<React.SetStateAction<"create" | "update">>
  setSelectedSemester: React.Dispatch<React.SetStateAction<PlanSubjectType | null>>
}

const FullPlanTable: React.FC<IFullPlanTableProps> = ({
  plan,
  setSelectedSemester,
  setSubjectsModalType,
  setEditingSubjectName,
  setSubjectsModalVisible,
  setSemesterHoursModalVisible,
}) => {
  const [order] = useState("asc")
  const [orderBy] = useState("trackingNo")
  const [selected] = useState([])

  const isSelected = (trackingNo: number) => selected.indexOf(trackingNo) !== -1

  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          // maxHeight: '600px',
          position: "relative",
          display: "block",
          maxWidth: "100%",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table
          stickyHeader
          aria-labelledby="tableTitle"
          sx={{
            "& .MuiTableCell-root:first-of-type": { pl: 2 },
            "& .MuiTableCell-root:last-of-type": { pr: 3 },
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {/* stableSort(rows, getComparator(order, orderBy)) */}
            {plan.subjects.map((row, index: number) => {
              // const isItemSelected = isSelected(row.trackingNo)
              const labelId = `enhanced-table-checkbox-${index}`

              return (
                <TableRow
                  hover
                  role="checkbox"
                  // aria-checked={isItemSelected}
                  tabIndex={-1}
                  // key={row.trackingNo}
                  // selected={isItemSelected}
                >
                  <TableCell
                    sx={{
                      ...cellStyles,
                      position: "relative",
                      ":hover *": { display: "block !important" },
                    }}
                    component="th"
                    id={labelId}
                    scope="row"
                    align="left"
                  >
                    <Typography sx={{ flexGrow: 1 }}>{row.name}</Typography>

                    <IconButton
                      sx={{
                        display: "none",
                        position: "absolute",
                        right: 6,
                        top: 6,
                        background: "#fff",
                        ":hover": { background: "#fff" },
                      }}
                      onClick={() => {
                        setEditingSubjectName(row.name)
                        setSubjectsModalType("update")
                        setSubjectsModalVisible(true)
                      }}
                    >
                      <EditOutlined />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={cellStyles} align="center">
                    ???
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      setSelectedSemester(row)
                      setSemesterHoursModalVisible(true)
                    }}
                    sx={{
                      ...cellStyles,
                      cursor: "pointer",
                      ":hover": { background: "rgba(0, 0, 0, 0.05);" },
                    }}
                    align="center"
                  >
                    {row.semesterNumber === 1 ? row.totalHours : ""}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      setSelectedSemester(row)
                      setSemesterHoursModalVisible(true)
                    }}
                    sx={{
                      ...cellStyles,
                      cursor: "pointer",
                      ":hover": { background: "rgba(0, 0, 0, 0.05);" },
                    }}
                    align="center"
                  >
                    {row.semesterNumber === 2 ? row.totalHours : ""}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      setSelectedSemester(row)
                      setSemesterHoursModalVisible(true)
                    }}
                    sx={{
                      ...cellStyles,
                      cursor: "pointer",
                      ":hover": { background: "rgba(0, 0, 0, 0.05);" },
                    }}
                    align="center"
                  >
                    {row.semesterNumber === 3 ? row.totalHours : ""}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      setSelectedSemester(row)
                      setSemesterHoursModalVisible(true)
                    }}
                    sx={{
                      ...cellStyles,
                      cursor: "pointer",
                      ":hover": { background: "rgba(0, 0, 0, 0.05);" },
                    }}
                    align="center"
                  >
                    {row.semesterNumber === 4 ? row.totalHours : ""}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      setSelectedSemester(row)
                      setSemesterHoursModalVisible(true)
                    }}
                    sx={{
                      ...cellStyles,
                      cursor: "pointer",
                      ":hover": { background: "rgba(0, 0, 0, 0.05);" },
                    }}
                    align="center"
                  >
                    {row.semesterNumber === 5 ? row.totalHours : ""}
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      setSelectedSemester(row)
                      setSemesterHoursModalVisible(true)
                    }}
                    sx={{
                      ...cellStyles,
                      cursor: "pointer",
                      ":hover": { background: "rgba(0, 0, 0, 0.05);" },
                    }}
                    align="center"
                  >
                    {row.semesterNumber === 6 ? row.totalHours : ""}
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
