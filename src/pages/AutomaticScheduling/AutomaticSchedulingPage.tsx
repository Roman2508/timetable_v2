import {
  Box,
  Chip,
  Grid,
  Paper,
  Stack,
  Table,
  Select,
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
  OutlinedInput,
  TableContainer,
  SelectChangeEvent,
} from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import { useSearchParams } from 'react-router-dom'
import { ColumnWidthOutlined, FilterOutlined, PrinterOutlined, SnippetsOutlined } from '@ant-design/icons'

import { useAppDispatch } from '../../store/store'
import { CustomDatePicker } from '../../components/CustomDatePicker'
import { gradeBookSelector } from '../../store/gradeBook/gradeBookSlice'

const cellStyles = { padding: '6px', border: '1px solid #efefef', textAlign: 'center !important' }

const rows = [
  ...Array(10)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      name: 'asdasdas',
      email: 'sdasdds@pharm.zt.ua',
      picture: 'https://saaadsdas.com',
      role: ['ADMIN', 'TEACHER'],
    })),
]

const AutomaticSchedulingPage = () => {
  const dispatch = useAppDispatch()

  const theme = useTheme()

  const [searchParams, setSearchParams] = useSearchParams()

  const { gradeBook, loadingStatus } = useSelector(gradeBookSelector)

  const [isOpenFilterModal, setIsOpenFilterModal] = React.useState(false)
  const [isOpenSummaryModal, setIsOpenSummaryModal] = React.useState(false)
  const [gradeBookLessonDates, setGradeBookLessonDates] = React.useState<{ date: string }[]>([])

  const [lessonNumbers, setLessonNumbers] = React.useState<string[]>([])

  const handleChangeLessonNumbers = (event: SelectChangeEvent<typeof lessonNumbers>) => {
    const {
      target: { value },
    } = event
    setLessonNumbers(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

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
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
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

            <Stack spacing={1} sx={{ mt: 2 }}>
              <TextField
                select
                fullWidth
                label="Група*"
                sx={{
                  minWidth: '300px',
                  textAlign: 'left',
                  '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' },
                  '& .MuiFormLabel-root': {
                    lineHeight: 1,
                    transform: 'translate(14px, 14px) scale(1)',
                    height: '16px',
                  },
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
              <TextField
                select
                fullWidth
                id="category"
                label="Семестр*"
                sx={{
                  minWidth: '300px',
                  textAlign: 'left',
                  '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' },
                  '& .MuiFormLabel-root': {
                    lineHeight: 1,
                    transform: 'translate(14px, 14px) scale(1)',
                    height: '16px',
                  },
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

          <Box></Box>

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
                  <TableCell align="center">Дата</TableCell>
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
                        size="small"
                        type="number"
                        placeholder=""
                        InputProps={{ inputProps: { min: 0, max: 300 } }}
                        sx={{
                          maxWidth: '100px',
                          mr: '8px !important',
                          '& .MuiInputBase-root': { p: 0 },
                        }}
                      />
                    </TableCell>

                    <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                      <TextField
                        fullWidth
                        size="small"
                        type="date"
                        placeholder=""
                        InputProps={{ inputProps: { min: 0, max: 300 } }}
                        sx={{
                          maxWidth: '130px',
                          '& .MuiInputBase-root': { p: 0 },
                        }}
                      />
                      -
                      <TextField
                        fullWidth
                        size="small"
                        type="date"
                        placeholder=""
                        InputProps={{ inputProps: { min: 0, max: 300 } }}
                        sx={{
                          maxWidth: '130px',
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
                  <TableCell sx={cellStyles}>Група/Дисц/Викл/Ауд</TableCell>

                  <TableCell sx={cellStyles}>Дисц</TableCell>

                  <TableCell sx={cellStyles}>Має/Не може</TableCell>

                  <TableCell sx={cellStyles}>День тижня</TableCell>

                  <TableCell sx={cellStyles}>Номери уроків</TableCell>

                  <TableCell sx={cellStyles}>(Якщо вибрана дисц або викл) Має стояти в ауд</TableCell>

                  <TableCell sx={cellStyles}>Вікна</TableCell>
                  <TableCell sx={cellStyles}>Дії</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ backgroundColor: 'rgb(250, 250, 250)', borderBottom: '1px solid rgb(240, 240, 240)' }}>
                  <TableCell sx={cellStyles}>
                    <TextField
                      select
                      fullWidth
                      id="category"
                      defaultValue={1}
                      sx={{
                        minWidth: '140px',
                        maxWidth: '140px',
                        textAlign: 'left',
                        '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' },
                      }}
                    >
                      {[
                        { id: 1, name: 'Дисципліна' },
                        { id: 2, name: 'Група' },
                        { id: 3, name: 'Викладач' },
                        { id: 4, name: 'Аудиторія' },
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
                      id="category"
                      defaultValue={0}
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
                      select
                      fullWidth
                      id="category"
                      defaultValue={1}
                      sx={{
                        minWidth: '140px',
                        maxWidth: '140px',
                        textAlign: 'left',
                        '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' },
                      }}
                    >
                      {[
                        { id: 1, name: 'Має' },
                        { id: 2, name: 'Не може' },
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
                      id="category"
                      defaultValue={0}
                      sx={{
                        minWidth: '140px',
                        maxWidth: '140px',
                        textAlign: 'left',
                        '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' },
                      }}
                    >
                      {[
                        { id: 0, name: 'Не вибрано' },
                        { id: 1, name: 'Понеділок' },
                        { id: 2, name: 'Вівторок' },
                        { id: 3, name: 'Середа' },
                        { id: 4, name: 'Четвер' },
                        { id: 5, name: "П'ятниця" },
                        { id: 6, name: 'Субота' },
                        { id: 7, name: 'Неділя' },
                        { id: 8, name: 'Всі дні' },
                      ].map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>

                  <TableCell sx={cellStyles}>
                    <Select
                      multiple
                      value={lessonNumbers}
                      onChange={handleChangeLessonNumbers}
                      input={<OutlinedInput label="Chip" />}
                      sx={{
                        minWidth: '170px',
                        maxWidth: '170px',
                        textAlign: 'left',
                        '& .MuiInputBase-input': { py: '10.4px', px: '5px', fontSize: '0.875rem' },
                      }}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} sx={{ padding: '1px', height: '20px' }} />
                          ))}
                        </Box>
                      )}
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>

                  <TableCell sx={cellStyles}>
                    <TextField
                      select
                      fullWidth
                      id="category"
                      defaultValue={0}
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
                      select
                      fullWidth
                      id="category"
                      defaultValue={1}
                      sx={{
                        minWidth: '140px',
                        maxWidth: '140px',
                        textAlign: 'left',
                        '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' },
                      }}
                    >
                      {[
                        { id: 1, name: 'Дозволено' },
                        { id: 2, name: 'Заборонено' },
                      ].map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>

                  <TableCell sx={cellStyles}>
                    <Button>Add</Button>
                  </TableCell>
                </TableRow>

                {rows.map((_, index) => (
                  <TableRow key={index}>
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
