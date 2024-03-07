// material-ui
import {
  Grid,
  List,
  Divider,
  ListItem,
  Accordion,
  IconButton,
  Typography,
  ListItemText,
  ListItemButton,
  AccordionSummary,
  AccordionDetails,
  FormHelperText,
  Stack,
  InputLabel,
  OutlinedInput,
  TextField,
  Tooltip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material"
import {
  DownOutlined,
  LeftSquareOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  FilterOutlined,
  ClearOutlined,
  CloseCircleOutlined,
  BackwardOutlined,
  CaretLeftOutlined,
} from "@ant-design/icons"

// project import
import React from "react"
import MainCard from "../../components/MainCard"

// ==============================|| AUDITORIES ||============================== //

const plans = [
  {
    id: 1,
    name: "1 поверх",
    items: [
      { id: 1, name: "Фармація, промислова фармація (ДФ)" },
      { id: 2, name: "Фармація, промислова фармація (ДФ)" },
      { id: 3, name: "Фармація, промислова фармація (ДФ)" },
      { id: 4, name: "Фармація, промислова фармація (ДФ)" },
      { id: 5, name: "Фармація, промислова фармація (ДФ)" },
    ],
  },
  {
    id: 2,
    name: "2 поверх",
    items: [
      { id: 6, name: "Фармація, промислова фармація (ЗФ)" },
      { id: 7, name: "Фармація, промислова фармація (ДФ)" },
      { id: 8, name: "Фармація, промислова фармація (ЗФ)" },
    ],
  },
  {
    id: 3,
    name: "3 поверх",
    items: [
      { id: 9, name: "Фармація, промислова фармація (ЗФ)" },
      { id: 10, name: "Фармація, промислова фармація (ЗФ)" },
      { id: 11, name: "Лабораторна діагностика (ДФ)" },
    ],
  },
  {
    id: 3,
    name: "4 поверх",
    items: [
      { id: 9, name: "Фармація, промислова фармація (ЗФ)" },
      { id: 10, name: "Фармація, промислова фармація (ЗФ)" },
      { id: 11, name: "Лабораторна діагностика (ДФ)" },
    ],
  },
]

const StreamsPage = () => {
  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: "center" }}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <Typography variant="h5">Потоки</Typography>
            </Grid>
            <Grid item />
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid item xs={4}>
            <MainCard sx={{ "& .MuiCardContent-root": { px: 1 } }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <Typography
                  variant="button"
                  sx={{ textAlign: "center", display: "block", textTransform: "uppercase", px: 2 }}
                >
                  Навантаження групи PH-24-1
                </Typography>
                <IconButton>
                  <FilterOutlined />
                </IconButton>
              </div>

              <Divider />

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="none" align="left">
                      Назва дисципліни
                    </TableCell>
                    <TableCell padding="none" align="right">
                      Семестр
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {Array(10)
                    .fill(null)
                    .map((_, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:hover": { backgroundColor: "secondary.lighter", cursor: "pointer" },
                        }}
                      >
                        <TableCell padding="none" align="left">
                          Інформаційні технології в фармації
                        </TableCell>
                        <TableCell padding="none" align="right">
                          1
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </MainCard>
          </Grid>

          <Grid item xs={4} sx={{ mx: 2 }}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <MainCard>
                <Typography
                  variant="button"
                  sx={{
                    textAlign: "center",
                    display: "block",
                    textTransform: "uppercase",
                    mb: 2.6,
                  }}
                >
                  Виберіть дисципліну
                </Typography>

                <Divider />

                <form autoComplete="off">
                  {[
                    "Лекції",
                    "Практичні",
                    "Лабораторні",
                    "Семінари",
                    "Екзамени",
                    "Консультації перед екзаменом",
                    "Методичне керівництво",
                  ].map((el) => (
                    <Stack
                      spacing={1}
                      sx={{ mt: 1, display: "flex", flexDirection: "row", alignItems: "center" }}
                    >
                      <Tooltip title={el}>
                        <InputLabel htmlFor="name" sx={{ flexGrow: 1, mt: "8px !important" }}>
                          {el}
                        </InputLabel>
                      </Tooltip>
                      <TextField
                        name={el}
                        size="small"
                        placeholder=""
                        InputProps={{ readOnly: true, disableUnderline: true }}
                        sx={{
                          maxWidth: "45px",
                          mr: "8px !important",
                          "& .MuiInputBase-root": { p: 0 },
                          "& input": { textAlign: "center" },
                        }}
                      />
                      <TextField
                        id="name"
                        size="small"
                        // {...field}
                        // value={values.firstname}
                        name="name"
                        // onBlur={handleBlur}
                        // onChange={handleChange}
                        placeholder=""
                        fullWidth
                        // error={Boolean(errors.name)}
                        sx={{
                          maxWidth: "160px",
                          mr: "8px !important",
                          "& .MuiInputBase-root": { p: 0 },
                        }}
                        // InputProps={{
                        //   endAdornment: (
                        //     <IconButton>
                        //       <LeftSquareOutlined />
                        //     </IconButton>
                        //   ),
                        // }}
                      />
                      <IconButton>
                        <LeftSquareOutlined />
                      </IconButton>
                    </Stack>
                  ))}
                </form>
              </MainCard>

              <MainCard sx={{ mt: 2 }}>
                <Typography
                  variant="button"
                  sx={{ textAlign: "center", display: "block", textTransform: "uppercase" }}
                >
                  Кількість студентів
                </Typography>

                <form autoComplete="off">
                  {[
                    "Лекції",
                    "Практичні",
                    "Лабораторні",
                    "Семінари",
                    "Екзамени",
                    "Консультації перед екзаменом",
                    "Методичне керівництво",
                  ].map((el) => (
                    <Stack
                      spacing={1}
                      sx={{ mt: 1, display: "flex", flexDirection: "row", alignItems: "center" }}
                    >
                      <Tooltip title={el}>
                        <InputLabel htmlFor="name" sx={{ flexGrow: 1, mt: "8px !important" }}>
                          {el}
                        </InputLabel>
                      </Tooltip>
                      <TextField
                        name={el}
                        size="small"
                        placeholder=""
                        InputProps={{ readOnly: true, disableUnderline: true }}
                        sx={{
                          maxWidth: "45px",
                          mr: "8px !important",
                          "& .MuiInputBase-root": { p: 0 },
                          "& input": { textAlign: "center" },
                        }}
                      />
                      <TextField
                        id="name"
                        size="small"
                        // {...field}
                        // value={values.firstname}
                        name="name"
                        // onBlur={handleBlur}
                        // onChange={handleChange}
                        placeholder=""
                        fullWidth
                        // error={Boolean(errors.name)}
                        sx={{
                          maxWidth: "160px",
                          mr: "8px !important",
                          "& .MuiInputBase-root": { p: 0 },
                        }}
                      />
                      <IconButton>
                        <CheckOutlined />
                      </IconButton>
                    </Stack>
                  ))}
                </form>
              </MainCard>
            </Grid>
          </Grid>

          <Grid
            item
            xs={4}
            sx={{ borderRadius: "8px", border: "1px solid #e6ebf1", overflow: "hidden" }}
          >
            <MainCard>
              <Typography
                variant="button"
                sx={{ textAlign: "center", display: "block", textTransform: "uppercase" }}
              >
                Викладачі
              </Typography>
            </MainCard>

            {plans.map((planCategory) => (
              <Accordion key={planCategory.id} sx={{ boxShadow: 0, border: "" }}>
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  expandIcon={<DownOutlined />}
                >
                  <Typography
                    sx={{
                      flexGrow: 1,
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                    }}
                    variant="h6"
                  >
                    {planCategory.name}
                  </Typography>

                  <Typography
                    sx={{
                      color: "text.secondary",
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                      mr: 4,
                    }}
                  >
                    Аудиторій: {planCategory.items.length}
                  </Typography>

                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    sx={{ mr: "5px" }}
                  >
                    <EditOutlined />
                  </IconButton>

                  <IconButton onClick={(e) => e.stopPropagation()} sx={{ mr: "15px" }}>
                    <DeleteOutlined />
                  </IconButton>
                </AccordionSummary>

                <AccordionDetails sx={{ p: 0 }}>
                  <List>
                    {planCategory.items.map((plan) => (
                      <div>
                        <Divider />
                        <ListItem
                          disablePadding
                          key={plan.id}
                          sx={{ "&:hover .MuiButtonBase-root": { display: "block" } }}
                        >
                          <ListItemButton>
                            <ListItemText primary={plan.name} />
                          </ListItemButton>

                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation()
                            }}
                            sx={{ mr: "5px", display: "none" }}
                          >
                            <EditOutlined />
                          </IconButton>

                          <IconButton
                            onClick={(e) => e.stopPropagation()}
                            sx={{ mr: "5px", display: "none" }}
                          >
                            <DeleteOutlined />
                          </IconButton>
                        </ListItem>
                      </div>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export { StreamsPage }
