import React from 'react'
import { useSelector } from 'react-redux'
import { MuiColorInput } from 'mui-color-input'
import { Box, Tab, Grid, Tabs, Select, Button, Divider, InputLabel, Typography, FormControl } from '@mui/material'

import MainCard from '../../components/MainCard'
import { CustomDatePicker } from '../../components/CustomDatePicker'
import { settingsSelector } from '../../store/settings/settingsSlice'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { useAppDispatch } from '../../store/store'
import { updateCallSchedule, updateColors, updateSemesterTerms } from '../../store/settings/settingsAsyncActions'

const lessons = ['1', '2', '3', '4', '5', '6', '7'] as const

const colorsInitialState = {
  ['Лекції']: '#fffffff' as string,
  ['Практичні']: '#fffffff' as string,
  ['Лабораторні']: '#fffffff' as string,
  ['Семінари']: '#fffffff' as string,
  ['Екзамен']: '#fffffff' as string,
} as const

const semesterTermsInitialState = {
  firstSemesterStart: '09.01.2023',
  firstSemesterEnd: '12.24.2023',
  secondSemesterStart: '02.01.2024',
  secondSemesterEnd: '06.30.2024',
}

const callScheduleInitialState = {
  ['1']: { start: '08:30', end: '09:50' },
  ['2']: { start: '10:00', end: '11:20' },
  ['3']: { start: '12:00', end: '13:20' },
  ['4']: { start: '13:30', end: '14:50' },
  ['5']: { start: '15:00', end: '16:20' },
  ['6']: { start: '16:30', end: '17:50' },
  ['7']: { start: '18:00', end: '19:20' },
}

const SettingsPage = () => {
  const dispatch = useAppDispatch()

  const [value, setValue] = React.useState('')
  const [activeTab, setActiveTab] = React.useState(0)
  const [isFetching, setIsFetching] = React.useState(false)
  const [activeUsersTab, setActiveUsersTab] = React.useState(0)
  const [colors, setColors] = React.useState(colorsInitialState)
  // const [editedUser, setEditedUser] = React.useState<null | AuthType>(null)
  const [callSchedule, setCallSchedule] = React.useState(callScheduleInitialState)
  const [semesterTerms, setSemesterTerms] = React.useState(semesterTermsInitialState)

  const { settings } = useSelector(settingsSelector)

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setActiveUsersTab(newValue)
    if (newValue !== 1) {
      // setEditedUser(null)
    }
  }

  const handleChangeColor = (type: string, newColor: string) => {
    setColors((prev) => ({ ...prev, [type]: newColor }))
  }

  const handleChangeSemesterTerms = (key: keyof typeof semesterTermsInitialState, value: string) => {
    setSemesterTerms((prev) => ({ ...prev, [key]: value }))
  }

  const handleChangeCallSchedule = (key: (typeof lessons)[number], value: 'start' | 'end', newTime: string) => {
    setCallSchedule((prev) => ({ ...prev, [key]: { ...prev[key], [value]: newTime } }))
  }

  const fetchColors = async () => {
    try {
      setIsFetching(true)
      const payload = {
        lectures: colors['Лекції'],
        practical: colors['Практичні'],
        laboratory: colors['Лабораторні'],
        seminars: colors['Семінари'],
        exams: colors['Екзамен'],
      }
      await dispatch(updateColors(payload))
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetching(false)
    }
  }

  const fetchCallSchedule = async () => {
    try {
      setIsFetching(true)
      await dispatch(updateCallSchedule(callSchedule))
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetching(false)
    }
  }

  const fetchSemesterTerms = async () => {
    try {
      setIsFetching(true)
      await dispatch(updateSemesterTerms(semesterTerms))
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetching(false)
    }
  }

  React.useEffect(() => {
    if (!settings) return
    setColors((prev) => {
      return {
        ...prev,
        ['Лекції']: settings.colors.lectures,
        ['Практичні']: settings.colors.practical,
        ['Лабораторні']: settings.colors.laboratory,
        ['Семінари']: settings.colors.seminars,
        ['Екзамен']: settings.colors.exams,
      }
    })
    setSemesterTerms((prev) => ({
      ...prev,
      firstSemesterStart: settings.firstSemesterStart,
      firstSemesterEnd: settings.firstSemesterEnd,
      secondSemesterStart: settings.secondSemesterStart,
      secondSemesterEnd: settings.secondSemesterEnd,
    }))
    setCallSchedule((prev) => ({ ...prev, ...settings.callSchedule }))
  }, [settings])

  if (!settings) return <LoadingSpinner />

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: 'center', p: 0 }}>
        <Grid item xs={12}>
          <Typography variant="h5">Налаштування</Typography>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', pt: '24px !important' }}>
          <Grid item xs={6} sx={{ mr: 2 }}>
            <MainCard sx={{ '& .MuiCardContent-root': { px: 3 } }}>
              <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
                Терміни навчання
              </Typography>

              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Перший семестр
              </Typography>
              <div
                style={{
                  gap: '16px',
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <CustomDatePicker
                  label="Початок"
                  value={semesterTerms.firstSemesterStart}
                  setValue={(e) => handleChangeSemesterTerms('firstSemesterStart', e)}
                />
                <CustomDatePicker
                  label="Кінець"
                  value={semesterTerms.firstSemesterEnd}
                  setValue={(e) => handleChangeSemesterTerms('firstSemesterEnd', e)}
                />
              </div>

              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Другий семестр
              </Typography>
              <div
                style={{
                  gap: '16px',
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <CustomDatePicker
                  label="Початок"
                  value={semesterTerms.secondSemesterStart}
                  setValue={(e) => handleChangeSemesterTerms('secondSemesterStart', e)}
                />
                <CustomDatePicker
                  label="Кінець"
                  value={semesterTerms.secondSemesterEnd}
                  setValue={(e) => handleChangeSemesterTerms('secondSemesterEnd', e)}
                />
              </div>

              <Button
                type="submit"
                color="primary"
                variant="outlined"
                disabled={isFetching}
                onClick={fetchSemesterTerms}
                sx={{ textTransform: 'capitalize', width: '100%', p: '7.44px 15px', mt: 3 }}
              >
                {isFetching ? 'Завантаження...' : 'Зберегти'}
              </Button>
            </MainCard>

            <MainCard sx={{ mt: 2, '& .MuiCardContent-root': { px: 3 } }}>
              <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
                Налаштування кольорів
              </Typography>

              {(['Лекції', 'Практичні', 'Лабораторні', 'Семінари', 'Екзамен'] as const).map((el) => {
                return (
                  <div
                    key={el}
                    style={{
                      gap: '16px',
                      display: 'flex',
                      marginBottom: '6px',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h6" sx={{ textAlign: 'left', mt: 1, width: '90px' }}>
                      {el}
                    </Typography>
                    <MuiColorInput value={colors[el]} onChange={(newColor) => handleChangeColor(el, newColor)} />
                  </div>
                )
              })}

              <Button
                type="submit"
                color="primary"
                variant="outlined"
                onClick={fetchColors}
                disabled={isFetching}
                sx={{ textTransform: 'capitalize', width: '100%', p: '7.44px 15px', mt: 3 }}
              >
                {isFetching ? 'Завантаження...' : 'Зберегти'}
              </Button>
            </MainCard>
          </Grid>

          <Grid item xs={6}>
            <MainCard sx={{ '& .MuiCardContent-root': { px: 3 } }}>
              <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
                Розклад дзвінків
              </Typography>

              {lessons.map((el) => {
                return (
                  <div
                    key={el}
                    style={{
                      gap: '16px',
                      display: 'flex',
                      marginBottom: '6px',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h4" sx={{ textAlign: 'center', mt: 1 }}>
                      {el}.
                    </Typography>

                    <CustomDatePicker
                      type="time"
                      label="Початок"
                      value={callSchedule[el].start}
                      setValue={(newTime) => handleChangeCallSchedule(el, 'start', newTime)}
                    />
                    <CustomDatePicker
                      type="time"
                      label="Кінець"
                      value={callSchedule[el].end}
                      setValue={(newTime) => handleChangeCallSchedule(el, 'end', newTime)}
                    />
                  </div>
                )
              })}

              <div style={{ textAlign: 'center' }}>
                <Button
                  type="submit"
                  color="primary"
                  variant="outlined"
                  disabled={isFetching}
                  onClick={fetchCallSchedule}
                  sx={{ textTransform: 'capitalize', width: '100%', p: '7.44px 15px', mt: 3 }}
                >
                  {isFetching ? 'Завантаження...' : 'Зберегти'}
                </Button>
              </div>
            </MainCard>

            <MainCard sx={{ mt: 2, '& .MuiCardContent-root': { px: 3 } }}>
              <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
                Користувачі
              </Typography>

              <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                <Tabs value={activeUsersTab} onChange={handleChangeTab}>
                  <Tab label="Створити" />
                  <Tab label="Оновити" />
                  <Tab label="Видалити" />
                </Tabs>
              </Box>
              {`{activeTab === 0 && <AuthRegister editedUser={null} />}`}

              {activeUsersTab === 1 && (
                <div>
                  <FormControl fullWidth sx={{ my: 3 }}>
                    <InputLabel>Користувачі</InputLabel>
                    <Select
                      label="Користувачі"
                      // onChange={handleChangeEditedUser}
                      // value={editedUser ? String(editedUser.id) : ''}
                    >
                      {/* {users.map((el) => (
                        <MenuItem value={el.id}>{el.fullName}</MenuItem>
                      ))} */}
                    </Select>
                  </FormControl>

                  <Divider />

                  {`<AuthRegister editedUser={editedUser} />`}
                </div>
              )}

              {activeUsersTab === 2 && (
                <div>
                  <FormControl fullWidth sx={{ my: 3 }}>
                    <InputLabel id="demo-simple-select-label">Користувачі</InputLabel>
                    <Select
                      label="Користувачі"
                      // onChange={handleChangeEditedUser}
                      // value={editedUser ? String(editedUser.id) : ''}
                    >
                      {/*  {users.map((el) => (
                        <MenuItem value={el.id}>{el.fullName}</MenuItem>
                      ))} */}
                    </Select>
                  </FormControl>

                  <Divider />

                  <Button
                    type="submit"
                    color="error"
                    variant="outlined"
                    // disabled={isFetching || !editedUser}
                    // onClick={onDeleteUser}
                    sx={{ textTransform: 'capitalize', width: '100%', p: '7.44px 15px', mt: 2 }}
                  >
                    {/* {!isFetching ? 'Видалити' : <CircularProgress size={20} color="secondary" />} */}
                    11111
                  </Button>
                </div>
              )}
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default SettingsPage
