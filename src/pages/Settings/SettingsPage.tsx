import {
  Box,
  Tab,
  Grid,
  Tabs,
  Select,
  Button,
  Divider,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
  CircularProgress,
} from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { MuiColorInput } from 'mui-color-input'

import MainCard from '../../components/MainCard'
import { CustomDatePicker } from '../../components/CustomDatePicker'
import { settingsSelector } from '../../store/settings/settingsSlice'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'

const SettingsPage = () => {
  const [value, setValue] = React.useState('')
  const [activeUsersTab, setActiveUsersTab] = React.useState(0)

  const { settings } = useSelector(settingsSelector)

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setActiveUsersTab(newValue)
    if (newValue !== 1) {
      // setEditedUser(null)
    }
  }

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
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '16px',
                  marginBottom: '16px',
                }}
              >
                <CustomDatePicker label="Початок" setValue={setValue} value={settings.firstSemesterStart} />
                <CustomDatePicker label="Кінець" value={settings.firstSemesterEnd} />
              </div>

              <Typography variant="h6" sx={{ textAlign: 'center' }}>
                Другий семестр
              </Typography>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '16px',
                  marginBottom: '16px',
                }}
              >
                <CustomDatePicker label="Початок" value={settings.secondSemesterStart} />
                <CustomDatePicker label="Кінець" value={settings.secondSemesterEnd} />
              </div>

              <Button
                type="submit"
                color="primary"
                variant="outlined"
                // onClick={fetchColors}
                // disabled={isFetching}
                sx={{ textTransform: 'capitalize', width: '100%', p: '7.44px 15px', mt: 2 }}
              >
                {/* {isFetching ? "Завантаження..." : "Зберегти"} */}
                Зберегти
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
                    <MuiColorInput
                      sx={{ flex: '1' }}
                      value={''} /* value={colors[el]} */ /* onChange={(newColor) => handleChangeColor(el, newColor)} */
                    />
                  </div>
                )
              })}

              <Button
                type="submit"
                color="primary"
                variant="outlined"
                // onClick={fetchColors}
                // disabled={isFetching}
                sx={{ textTransform: 'capitalize', width: '100%', p: '7.44px 15px', mt: 3 }}
              >
                {/* {isFetching ? "Завантаження..." : "Зберегти"} */}
                Зберегти
              </Button>
            </MainCard>
          </Grid>

          <Grid item xs={6}>
            <MainCard sx={{ '& .MuiCardContent-root': { px: 3 } }}>
              <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
                Розклад дзвінків
              </Typography>

              {['1', '2', '3', '4', '5', '6', '7'].map((el) => {
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
                      /* @ts-ignore */
                      value={settings.callSchedule[el].start}
                    />
                    <CustomDatePicker
                      type="time"
                      label="Кінець"
                      /* @ts-ignore */
                      value={settings.callSchedule[el].end}
                    />
                  </div>
                )
              })}

              <Button
                type="submit"
                color="primary"
                variant="outlined"
                // onClick={fetchColors}
                // disabled={isFetching}
                sx={{ textTransform: 'capitalize', width: '100%', p: '7.44px 15px', mt: 3 }}
              >
                {/* {isFetching ? "Завантаження..." : "Зберегти"} */}
                Зберегти
              </Button>
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
