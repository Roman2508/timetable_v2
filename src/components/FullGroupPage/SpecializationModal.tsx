import {
  Chip,
  Radio,
  Dialog,
  Divider,
  RadioGroup,
  IconButton,
  DialogTitle,
  FormControl,
  DialogContent,
  FormControlLabel,
  DialogContentText,
  DialogActions,
  Grid,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Stack,
  InputLabel,
  TextField,
  MenuItem,
  Tooltip,
} from "@mui/material"

import React, { Dispatch, SetStateAction } from "react"

import { CheckOutlined, CloseOutlined } from "@ant-design/icons"

interface ISelectPlanModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const cellStyles = {
  borderBottom: "1px solid rgb(220, 220, 220)",
  p: "4px 10px",
  minWidth: "100px",
}

const SpecializationModal: React.FC<ISelectPlanModalProps> = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      // fullScreen
      maxWidth={"xl"}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <DialogTitle>{"Спеціалізовані підгрупи"}</DialogTitle>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Stack>
            <TextField
              select
              fullWidth
              id="category"
              //   value={value}
              //   onChange={(e) => setValue(e.target.value)}
              sx={{
                width: "240px",
                p: "16px 8px",
                "& .MuiInputBase-input": { py: "10.4px", fontSize: "0.875rem" },
              }}
            >
              {[
                { label: "Спеціалізація відсутня", value: "1" },
                { label: "Не вивчається", value: "2" },
              ].map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  {category.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Tooltip title="Зберегти спец. підгрупу">
            <IconButton sx={{ mr: "24px" }}>
              <CheckOutlined />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <DialogContent sx={{ padding: "0 24px 20px" }}>
        {/*  */}
        <DialogContentText id="alert-dialog-description"></DialogContentText>

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
                  Семестр
                </TableCell>

                <TableCell
                  sx={{ ...cellStyles, p: 1, backgroundColor: "#fff !important" }}
                  align="center"
                  padding="none"
                >
                  Лекції
                </TableCell>
                <TableCell
                  sx={{ ...cellStyles, p: 1, backgroundColor: "#fff !important" }}
                  align="center"
                  padding="none"
                >
                  Практичні
                </TableCell>
                <TableCell
                  sx={{ ...cellStyles, p: 1, backgroundColor: "#fff !important" }}
                  align="center"
                  padding="none"
                >
                  Лабораторні
                </TableCell>
                <TableCell
                  sx={{ ...cellStyles, p: 1, backgroundColor: "#fff !important" }}
                  align="center"
                  padding="none"
                >
                  Семінари
                </TableCell>
                <TableCell
                  sx={{ ...cellStyles, p: 1, backgroundColor: "#fff !important" }}
                  align="center"
                  padding="none"
                >
                  Екзамени
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {/* {groupLessonsByName(plan.subjects).map((row, index: number) => { */}
              {Array(15)
                .fill(null)
                .map((row, index: number) => {
                  // const isItemSelected = isSelected(row.trackingNo)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      key={index}
                      role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      // key={row.trackingNo}
                      // selected={isItemSelected}
                    >
                      <TableCell
                        sx={{
                          ...cellStyles,
                          minWidth: "250px !important",
                          position: "relative",
                          ":hover *": { display: "flex !important" },
                        }}
                        component="th"
                        id={labelId}
                        scope="row"
                        align="left"
                      >
                        <Typography sx={{ flexGrow: 1 }}>{"row[0].name"}</Typography>
                      </TableCell>
                      <TableCell sx={cellStyles} align="center">
                        {"1"}
                      </TableCell>

                      {Array(5)
                        .fill(null)
                        .map((_, index) => {
                          const semester = index + 1
                          // const semesterHours = row.find((el) => el.semesterNumber === semester)

                          return (
                            <TableCell
                              key={index}
                              onClick={() => {}}
                              sx={{
                                ...cellStyles,
                                cursor: "pointer",
                                ":hover": { background: "rgba(0, 0, 0, 0.05);" },
                              }}
                              align="center"
                            >
                              {"1"}
                            </TableCell>
                          )
                        })}
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions>
        {/* 
        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton> */}

        <Button
          type="submit"
          color="primary"
          variant="outlined"
          sx={{
            textTransform: "capitalize",
            marginRight: "auto",
            p: "7.44px 15px",
          }}
        >
          Редагувати спеціалізовані підгрупи
        </Button>

        <Button
          type="submit"
          color="secondary"
          variant="outlined"
          onClick={handleClose}
          sx={{
            textTransform: "capitalize",
            maxWidth: "140px",
            marginLeft: "auto",
            p: "7.44px 15px",
            width: "100%",
          }}
        >
          Закрити
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SpecializationModal
