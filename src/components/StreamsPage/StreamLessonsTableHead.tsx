import { TableCell, TableHead, TableRow } from "@mui/material"

const cellStyles = {
  borderBottom: "1px solid rgb(220, 220, 220)",
  p: "4px 10px",
  minWidth: "100px",
  backgroundColor: "#fff !important",
}

const StreamLessonsTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={cellStyles} align="center" rowSpan={3} padding="none">
          Дисципліна
        </TableCell>
        <TableCell sx={cellStyles} align="center" rowSpan={3} padding="none">
          Група
        </TableCell>
        <TableCell sx={cellStyles} align="center" rowSpan={3} padding="none">
          Семестр
        </TableCell>

        <TableCell sx={cellStyles} align="center" padding="none">
          Лекції
        </TableCell>
        <TableCell sx={cellStyles} align="center" padding="none">
          Практичні
        </TableCell>
        <TableCell sx={cellStyles} align="center" padding="none">
          Лабораторні
        </TableCell>
        <TableCell sx={cellStyles} align="center" padding="none">
          Семінари
        </TableCell>
        <TableCell sx={cellStyles} align="center" padding="none">
          Екзамени
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

export { StreamLessonsTableHead }
