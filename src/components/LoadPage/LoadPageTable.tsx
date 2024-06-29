import React, { useState } from "react"
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
  Tooltip,
} from "@mui/material"

import { useAppDispatch } from "../../store/store"

interface IOrderTableHeadProps {
  order: string
  orderBy: string
}

const cellStyles = {
  border: "1px solid rgb(235, 235, 235)",
  p: 0.5,
  width: "100px",
  minWidth: "100px",
}

const tableHeadCellStyles = {
  p: 0.5,
  fontSize: "14px",
  "& p": { m: 0, lineHeight: 1.3 },
  backgroundColor: "#fff !important",
  border: "1px solid rgb(235, 235, 235)",
}

const lessons = [
  {
    id: "664dfc7aa21dd243763ac23a",
    name: "Ділова іноземна мова. Рівень (B2)",
  },
  {
    id: "664dfc7aadc506bdadca3dd4",
    name: "Основи нутриціології та броматології",
  },
  {
    id: "664dfc7ad533114aeb28c100",
    name: "Фармакогнозія з елементами ботаніки. З курсовою роботою Фармакогнозія з елементами",
  },
  {
    id: "664dfc7a03dc3c1b2664865e",
    name: "Stark Collier",
  },
  {
    id: "664dfc7a9f8a6594f3df27ba",
    name: "Althea Vaughan",
  },
  {
    id: "664dfc7a11c1584e358b540d",
    name: "Clara Ashley",
  },
  {
    id: "664dfc7aa2132d12d243763ac23a",
    name: "Rosalyn Strong",
  },
  {
    id: "664dfc7aadc532256bdadca3dd4",
    name: "Delacruz Chen",
  },
  {
    id: "664dfc7ad53123114aeb28c100",
    name: "Harding Lawson",
  },
  {
    id: "664dfc7a03dc3c1b2664865e",
    name: "Stark Collier",
  },
  {
    id: "664dfc7a9f8a6594f3df27ba",
    name: "Althea Vaughan",
  },
  {
    id: "664dfc7a11c1584e358b540d",
    name: "Clara Ashley",
  },
  {
    id: "664dfc7aa2132d12d243763ac23a",
    name: "Rosalyn Strong",
  },
  {
    id: "664dfc7aadc532256bdadca3dd4",
    name: "Delacruz Chen",
  },
  {
    id: "664dfc7ad53123114aeb28c100",
    name: "Harding Lawson",
  },
  {
    id: "664dfc7a03dc3c1b2664865e",
    name: "Stark Collier",
  },
  {
    id: "664dfc7a9f8a6594f3df27ba",
    name: "Althea Vaughan",
  },
  {
    id: "664dfc7a11c1584e358b540d",
    name: "Clara Ashley",
  },
  {
    id: "664dfc7aa2132d12d243763ac23a",
    name: "Rosalyn Strong",
  },
  {
    id: "664dfc7aadc532256bdadca3dd4",
    name: "Delacruz Chen",
  },
  {
    id: "664dfc7ad53123114aeb28c100",
    name: "Harding Lawson",
  },
  {
    id: "664dfc7a03dc312c1b2664865e",
    name: "Stark Collier",
  },
  {
    id: "664dfc7a9f8a126594f3df27ba",
    name: "Althea Vaughan",
  },
  {
    id: "664dfc7a11c151284e358b540d",
    name: "Clara Ashley",
  },
  {
    id: "664dfc7afa6f076a35a75218",
    name: "Pena Medina",
  },
  {
    id: "664dfc7ada95bf55afd8ccf2",
    name: "Potts Rush",
  },
  {
    id: "664dfc7ac3c890f6d53be34d",
    name: "Chan Hunter",
  },
  {
    id: "664dfc7a3a2f6e15ea0b3819",
    name: "Wooten Park",
  },
  {
    id: "664dfc7a3c647a2ed26a35f9",
    name: "Rosie Mckenzie",
  },
  {
    id: "664dfc7a2265ac4e413a6c94",
    name: "Mcknight Tran",
  },
]

const OrderTableHead: React.FC<IOrderTableHeadProps> = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell
          sx={{ ...cellStyles, backgroundColor: "#fff !important", minWidth: "250px" }}
          align="center"
          rowSpan={3}
          padding="none"
        >
          Дисципліна
        </TableCell>
        <TableCell
          sx={{ ...cellStyles, backgroundColor: "#fff !important", width: "70px" }}
          align="center"
          rowSpan={3}
          padding="none"
        >
          Всього
        </TableCell>

        <TableCell sx={tableHeadCellStyles} align="center" padding="none" colSpan={9}>
          Група: PH-23-1. Cеместр 2
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={tableHeadCellStyles} align="center" padding="none">
          Лекції
        </TableCell>
        <TableCell sx={tableHeadCellStyles} align="center" padding="none">
          Практичні
        </TableCell>
        <TableCell sx={tableHeadCellStyles} align="center" padding="none">
          Лабораторні
        </TableCell>
        <TableCell sx={tableHeadCellStyles} align="center" padding="none">
          Семінари
        </TableCell>
        <TableCell sx={tableHeadCellStyles} align="center" padding="none">
          Екзамен
        </TableCell>
        <TableCell sx={tableHeadCellStyles} align="center" padding="none">
          <p>Консультації</p>
          <p>перед екзаменом</p>
        </TableCell>
        <TableCell sx={tableHeadCellStyles} align="center" padding="none">
          <p>Методичне</p>
          <p>керівництво</p>
        </TableCell>
        <TableCell sx={tableHeadCellStyles} align="center" padding="none">
          <p>Самостійна</p>
          <p>робота</p>
        </TableCell>
        <TableCell sx={tableHeadCellStyles} align="center" padding="none">
          <p>Загальна</p>
          <p>кількість годин</p>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

interface LoadPageTableProps {}

const LoadPageTable: React.FC<LoadPageTableProps> = ({}) => {
  const dispatch = useAppDispatch()

  const [order] = useState("asc")
  const [orderBy] = useState("trackingNo")

  return (
    <Box>
      <TableContainer
        sx={{
          width: "100%",
          overflowX: "auto",
          position: "relative",
          display: "block",
          maxWidth: "100%",
          backgroundColor: "#fff",
          "& td, & th": { whiteSpace: "nowrap" },
        }}
      >
        <Table>
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {lessons.map((row, index: number) => {
              const labelId = `enhanced-table-checkbox-${index}`

              return (
                <TableRow hover key={row.id} role="checkbox" tabIndex={-1}>
                  <TableCell
                    sx={{
                      ...cellStyles,
                      position: "relative",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "200px",
                      ":hover *": { display: "flex !important" },
                    }}
                    component="th"
                    id={labelId}
                    scope="row"
                    align="left"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell sx={{ ...cellStyles, width: "50px" }} align="center">
                    1111
                  </TableCell>

                  {Array(9)
                    .fill(null)
                    .map((_, index) => {
                      return (
                        <TableCell
                          key={index}
                          sx={{
                            ...cellStyles,
                            cursor: "pointer",
                            ":hover": { background: "rgba(0, 0, 0, 0.05);" },
                          }}
                          align="center"
                        >
                          11
                        </TableCell>
                      )
                    })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export { LoadPageTable }
