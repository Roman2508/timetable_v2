import {
  Box,
  Grid,
  Paper,
  Stack,
  Table,
  Button,
  Tooltip,
  Divider,
  TableRow,
  MenuItem,
  TableHead,
  TableBody,
  TableCell,
  TextField,
  Typography,
  IconButton,
  InputLabel,
  TableContainer,
} from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { ColumnWidthOutlined, FilterOutlined, PrinterOutlined, SnippetsOutlined } from '@ant-design/icons'

import { useAppDispatch } from '../../store/store'
import { CustomDatePicker } from '../../components/CustomDatePicker'
import { gradeBookSelector } from '../../store/gradeBook/gradeBookSlice'

const cellStyles = { padding: '6px', border: '1px solid #efefef', textAlign: 'center !important' }

const rows = [
  ...Array(10)
    .fill(null)
    .map(() => ({
      id: 1,
      name: 'asdasdas',
      email: 'sdasdds@pharm.zt.ua',
      picture: 'https://saaadsdas.com',
      role: ['ADMIN', 'TEACHER'],
    })),
]

const AutomaticSchedulingPage = () => {
  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams] = useSearchParams()

  const { gradeBook, loadingStatus } = useSelector(gradeBookSelector)

  const [isOpenFilterModal, setIsOpenFilterModal] = React.useState(false)
  const [isOpenSummaryModal, setIsOpenSummaryModal] = React.useState(false)
  const [gradeBookLessonDates, setGradeBookLessonDates] = React.useState<{ date: string }[]>([])

  return (
    <>
      <Grid container sx={{ mb: 2, pt: 0 }}>
        <Grid item xs={12}>
          <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid item style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ mr: 1 }}>
                Автоматичне розставлення розкладу
              </Typography>

              <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />

              <Tooltip title="213312213">
                <IconButton onClick={() => setIsOpenFilterModal(true)}>
                  <FilterOutlined />
                </IconButton>
              </Tooltip>

              <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />

              <Tooltip title="2311313">
                <IconButton onClick={() => setIsOpenSummaryModal(true)} disabled={!gradeBook}>
                  <ColumnWidthOutlined />
                </IconButton>
              </Tooltip>

              <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />

              <Tooltip title="213321213">
                <IconButton onClick={() => {}} disabled={!gradeBook}>
                  <SnippetsOutlined />
                </IconButton>
              </Tooltip>

              <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 1 }} />

              <Tooltip title="1231223">
                <IconButton onClick={() => {}} disabled={!gradeBook}>
                  <PrinterOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <CustomDatePicker
              label="Початкова дата"
              setValue={(e) => {}}
              width="300"
              // value={semesterTerms.firstSemesterStart}
              //   setValue={(e) => handleChangeSemesterTerms("firstSemesterStart", e)}
            />
            <CustomDatePicker
              label="Кінцева дата"
              setValue={(e) => {}}
              width="300"
              // value={semesterTerms.firstSemesterEnd}
              // setValue={(e) => handleChangeSemesterTerms('firstSemesterEnd', e)}
            />
          </Box>

          <Box>
            <Stack spacing={1} sx={{ mt: 2 }}>
              <InputLabel htmlFor="category" sx={{ textAlign: 'left' }}>
                Група*
              </InputLabel>
              <TextField
                select
                fullWidth
                // {...field}
                id="category"
                sx={{
                  minWidth: '300px',
                  textAlign: 'left',
                  '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' },
                }}
              >
                {[
                  { id: 1, name: '11111' },
                  { id: 2, name: '22222' },
                ].map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack spacing={1} sx={{ mt: 2 }}>
              <InputLabel htmlFor="category" sx={{ textAlign: 'left' }}>
                Семестр*
              </InputLabel>
              <TextField
                select
                fullWidth
                // {...field}
                id="category"
                sx={{
                  minWidth: '300px',
                  textAlign: 'left',
                  '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' },
                }}
              >
                {[
                  { id: 1, name: '11111' },
                  { id: 2, name: '22222' },
                ].map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Box>

          <Typography variant="h5" sx={{ textAlign: 'center', mb: 2, mt: 5 }}>
            Має бути виставлено
          </Typography>
          <TableContainer sx={{ maxWidth: '1000px', margin: '0 auto' }}>
            <Table>
              <TableHead
                sx={{
                  backgroundColor: 'rgb(250, 250, 250)',
                  borderTop: '1px solid rgb(240, 240, 240)',
                  borderBottom: '1px solid rgb(240, 240, 240)',
                }}
              >
                <TableRow>
                  <TableCell width="80px">№</TableCell>
                  <TableCell>Назва</TableCell>
                  <TableCell>Кількість годин</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>Інформаційні технології у фармації</TableCell>

                    <TableCell>
                      <TextField
                        fullWidth
                        InputProps={{ inputProps: { min: 0, max: 300 } }}
                        size="small"
                        type="number"
                        placeholder=""
                        sx={{
                          maxWidth: '100px',
                          mr: '8px !important',
                          '& .MuiInputBase-root': { p: 0 },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h5" sx={{ textAlign: 'center', mb: 2, mt: 5 }}>
            Обмеження
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
                  <TableCell sx={cellStyles}>Група</TableCell>

                  <TableCell sx={cellStyles}>Дисц/Викл/Ауд</TableCell>

                  <TableCell sx={cellStyles}>Дисц/Викл/Ауд</TableCell>

                  <TableCell sx={cellStyles}>Має/Не може</TableCell>

                  <TableCell sx={cellStyles}>День тижня</TableCell>

                  <TableCell sx={cellStyles}>Номери уроків</TableCell>

                  <TableCell sx={cellStyles}>(Якщо вибрана дисц або викл) Має стояти в ауд</TableCell>

                  <TableCell sx={cellStyles}>Вікна (Дозволено/Заборонено)</TableCell>
                  <TableCell sx={cellStyles}>Дії</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ backgroundColor: 'rgb(250, 250, 250)', borderBottom: '1px solid rgb(240, 240, 240)' }}>
                  <TableCell sx={cellStyles}>
                    <TextField
                      select
                      fullWidth
                      defaultValue={0}
                      id="category"
                      sx={{
                        minWidth: '140px',
                        maxWidth: '140px',
                        textAlign: 'left',
                        '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' },
                      }}
                    >
                      {[
                        { id: 0, name: 'Не вибрано' },
                        { id: 1, name: 'PH9-24-1' },
                        { id: 2, name: 'PH9-24-2' },
                        { id: 3, name: 'PH9-24-3' },
                      ].map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>

                  <TableCell sx={cellStyles}>
                    <TextField
                      select
                      fullWidth
                      defaultValue={1}
                      id="category"
                      sx={{
                        minWidth: '140px',
                        maxWidth: '140px',
                        textAlign: 'left',
                        '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' },
                      }}
                    >
                      {[
                        { id: 1, name: 'Дисципліна' },
                        { id: 2, name: 'Викладач' },
                        { id: 3, name: 'Аудиторія' },
                      ].map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>

                  <TableCell sx={cellStyles}>
                    <TextField
                      select
                      fullWidth
                      defaultValue={0}
                      id="category"
                      sx={{
                        minWidth: '250px',
                        maxWidth: '250px',
                        textAlign: 'left',
                        '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' },
                      }}
                    >
                      {[
                        { id: 0, name: 'Не вибрано' },
                        { id: 1, name: 'Інформатика' },
                        { id: 2, name: 'Технології' },
                        { id: 3, name: 'Інформаційні технології у фармації' },
                      ].map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>

                  <TableCell sx={cellStyles}>
                    <TextField
                      fullWidth
                      InputProps={{ inputProps: { min: 0, max: 300 } }}
                      size="small"
                      type="number"
                      placeholder=""
                      sx={{
                        maxWidth: '100px',
                        mr: '8px !important',
                        '& .MuiInputBase-root': { p: 0 },
                      }}
                    />
                  </TableCell>

                  <TableCell sx={cellStyles}>
                    <TextField
                      fullWidth
                      InputProps={{ inputProps: { min: 0, max: 300 } }}
                      size="small"
                      type="number"
                      placeholder=""
                      sx={{
                        maxWidth: '100px',
                        mr: '8px !important',
                        '& .MuiInputBase-root': { p: 0 },
                      }}
                    />
                  </TableCell>

                  <TableCell sx={cellStyles}>
                    <TextField
                      fullWidth
                      InputProps={{ inputProps: { min: 0, max: 300 } }}
                      size="small"
                      type="number"
                      placeholder=""
                      sx={{
                        maxWidth: '100px',
                        mr: '8px !important',
                        '& .MuiInputBase-root': { p: 0 },
                      }}
                    />
                  </TableCell>

                  <TableCell sx={cellStyles}>
                    <TextField
                      select
                      fullWidth
                      defaultValue={0}
                      id="category"
                      sx={{
                        minWidth: '140px',
                        maxWidth: '140px',
                        textAlign: 'left',
                        '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' },
                      }}
                    >
                      {[
                        { id: 0, name: 'Не вибрано' },
                        { id: 1, name: '206' },
                        { id: 2, name: '207' },
                        { id: 3, name: '217' },
                      ].map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>

                  <TableCell sx={cellStyles}>
                    <TextField
                      fullWidth
                      InputProps={{ inputProps: { min: 0, max: 300 } }}
                      size="small"
                      type="number"
                      placeholder=""
                      sx={{
                        maxWidth: '100px',
                        mr: '8px !important',
                        '& .MuiInputBase-root': { p: 0 },
                      }}
                    />
                  </TableCell>

                  <TableCell sx={cellStyles}>
                    <Button>Add</Button>
                  </TableCell>
                </TableRow>

                {rows.map((_, index) => (
                  <TableRow key={index}>
                    <TableCell sx={cellStyles}>PH9-24-1</TableCell>

                    <TableCell sx={cellStyles}>Дисципліна</TableCell>

                    <TableCell sx={cellStyles}>Інформаційні технології у фармації</TableCell>

                    <TableCell sx={cellStyles}>Має</TableCell>

                    <TableCell sx={cellStyles}>-</TableCell>

                    <TableCell sx={cellStyles}>2, 3, 4, 5</TableCell>

                    <TableCell sx={cellStyles}>ауд. 217</TableCell>

                    <TableCell sx={cellStyles}>Дозволено</TableCell>
                    <TableCell sx={cellStyles}>
                      <Button>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </>
  )
}

export default AutomaticSchedulingPage
