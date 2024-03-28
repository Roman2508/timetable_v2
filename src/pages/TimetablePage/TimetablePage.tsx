// material-ui
import {
  Grid,
  Stack,
  Table,
  Button,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  TextField,
  TableHead,
  InputLabel,
  Tooltip,
  Typography,
} from "@mui/material"

// project import
import React from "react"
import MainCard from "../../components/MainCard"
import { customDayjs } from "../../components/Calendar/Calendar"
// import Calendar, { customDayjs } from "../../components/Calendar/Calendar"
import Calendar from "../../components/TimetablePage/Calendar"

const tableCellStypes = {
  padding: "4px",
  border: "1px solid rgb(235, 235, 235)",
  "& p": {
    fontSize: "13px",
  },
}

// ==============================|| TIMETABLE ||============================== //

const TimetablePage = () => {
  const [slot, setSlot] = React.useState("group")

  const today = new Date()

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: "center" }}>
        <Grid item xs={12}>
          <Grid container sx={{ display: "flex", alignItems: "flex-end" }}>
            <Grid item sx={{ flexGrow: 1, display: "flex", alignItems: "flex-end", gap: 3 }}>
              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="category">Структурний підрозділ</InputLabel>
                <TextField
                  select
                  size="small"
                  id="category"
                  //   value={value}
                  //   onChange={(e) => setValue(e.target.value)}
                  sx={{ width: "300px" }}
                >
                  {[
                    { value: "1", label: "Фармація, промислова фармація (ДФ)" },
                    { value: "2", label: "Фармація, промислова фармація (ДФ)" },
                    { value: "3", label: "Лабораторна діагностика (ДФ)" },
                  ].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="category">Група</InputLabel>
                <TextField
                  select
                  size="small"
                  id="category"
                  //   value={value}
                  //   onChange={(e) => setValue(e.target.value)}
                  sx={{ width: "160px" }}
                >
                  {[
                    { value: "1", label: "Фармація, промислова фармація (ДФ)" },
                    { value: "2", label: "Фармація, промислова фармація (ДФ)" },
                    { value: "3", label: "Лабораторна діагностика (ДФ)" },
                  ].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <Stack spacing={1} sx={{ mt: 2 }}>
                <InputLabel htmlFor="category">Тиждень</InputLabel>
                <TextField
                  select
                  size="small"
                  id="category"
                  //   value={value}
                  //   onChange={(e) => setValue(e.target.value)}
                  sx={{ width: "100px" }}
                >
                  {[
                    { value: "1", label: "Фармація, промислова фармація (ДФ)" },
                    { value: "2", label: "Фармація, промислова фармація (ДФ)" },
                    { value: "3", label: "Лабораторна діагностика (ДФ)" },
                  ].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </Grid>

            <Grid item>
              <Stack direction="row" alignItems="center" spacing={0}>
                <Button
                  size="small"
                  onClick={() => setSlot("group")}
                  sx={{ width: "100px", py: 0.674 }}
                  color={slot === "group" ? "primary" : "secondary"}
                  variant={slot === "group" ? "outlined" : "text"}
                >
                  Група
                </Button>
                <Button
                  size="small"
                  onClick={() => setSlot("teacher")}
                  sx={{ width: "100px", py: 0.674 }}
                  color={slot === "teacher" ? "primary" : "secondary"}
                  variant={slot === "teacher" ? "outlined" : "text"}
                >
                  Викладач
                </Button>
                <Button
                  size="small"
                  onClick={() => setSlot("auditory")}
                  sx={{ width: "100px", py: 0.674 }}
                  color={slot === "auditory" ? "primary" : "secondary"}
                  variant={slot === "auditory" ? "outlined" : "text"}
                >
                  Аудиторія
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ display: "flex" }}>
          <Grid item xs={4} sx={{ mr: 2 }}>
            <MainCard sx={{ "& .MuiCardContent-root": { p: 0, overflow: "hidden" } }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={tableCellStypes} padding="none" align="center">
                      Дисципліна
                    </TableCell>
                    <TableCell sx={tableCellStypes} padding="none" align="center">
                      Викладач
                    </TableCell>
                    <TableCell sx={tableCellStypes} padding="none" align="center">
                      Примітка
                    </TableCell>
                    <TableCell sx={tableCellStypes} padding="none" align="center">
                      План
                    </TableCell>
                    <TableCell sx={tableCellStypes} padding="none" align="center">
                      Факт
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {Array(9)
                    .fill(null)
                    .map((_, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:hover": { backgroundColor: "secondary.lighter", cursor: "pointer" },
                        }}
                      >
                        <TableCell
                          sx={{
                            ...tableCellStypes,
                            // maxWidth: '130px',
                            // width: '100%',
                            // whiteSpace: 'nowrap',
                            // overflow: 'hidden',
                            // textOverflow: 'ellipsis',
                          }}
                          padding="none"
                          align="left"
                        >
                          <Tooltip
                            enterDelay={1000}
                            title="Інформаційні технології в фармації технології в фармації"
                          >
                            <Typography
                              sx={{
                                // maxWidth: '140px',
                                maxWidth: "12vw",
                                width: "100%",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              Інформаційні технології в фармації технології в фармації
                            </Typography>
                          </Tooltip>
                        </TableCell>
                        <TableCell sx={tableCellStypes} padding="none" align="center">
                          <Tooltip enterDelay={1000} title="Пташник Р.В.">
                            <Typography
                              sx={{
                                maxWidth: "5vw",
                                width: "100%",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              Пташник Р.В.
                            </Typography>
                          </Tooltip>
                        </TableCell>
                        <TableCell sx={tableCellStypes} padding="none" align="center">
                          1
                        </TableCell>
                        <TableCell sx={tableCellStypes} padding="none" align="center">
                          1
                        </TableCell>
                        <TableCell sx={tableCellStypes} padding="none" align="center">
                          1
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </MainCard>
          </Grid>

          <Grid item xs={8}>
            <MainCard sx={{ "& .MuiCardContent-root": { px: 1 } }}>
              {/* <Calendar
                onClick={(e) => console.log(e)}
                events={[
                  {
                    title: "title title title title title title title title title title ",
                    start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9),
                    end: customDayjs(
                      new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9)
                    )
                      .add(1.34, "hour")
                      .toDate(),
                  },
                ]}
              /> */}

              <Calendar />
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export { TimetablePage }
