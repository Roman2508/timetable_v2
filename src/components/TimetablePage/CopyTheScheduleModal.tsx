import {
  Tab,
  Box,
  Tabs,
  List,
  Button,
  Dialog,
  Divider,
  Tooltip,
  IconButton,
  Typography,
  ListItemText,
  DialogContent,
  DialogActions,
  ListItemButton,
} from '@mui/material'
import { CloseOutlined } from '@ant-design/icons'
import React, { Dispatch, SetStateAction } from 'react'

import { useAppDispatch } from '../../store/store'
import { customDayjs } from '../Calendar/Calendar'
import { CustomDatePicker } from '../CustomDatePicker'
import { SettingsType } from '../../store/settings/settingsTypes'
import { copyDaySchedule, copyWeekSchedule } from '../../store/scheduleLessons/scheduleLessonsAsyncActions'

interface ICopyTheScheduleModalProps {
  open: boolean
  groupId: number | null
  selectedSemester: 1 | 2
  settings: SettingsType | null
  setOpen: Dispatch<SetStateAction<boolean>>
}

const CopyTheScheduleModal: React.FC<ICopyTheScheduleModalProps> = ({
  open,
  groupId,
  setOpen,
  settings,
  selectedSemester,
}) => {
  const dispatch = useAppDispatch()

  const [activeTabIndex, setActiveTabIndex] = React.useState(0)
  const [copyDates, setCopyDates] = React.useState({ copyFrom: '', copyTo: '' })
  const [weeks, setWeeks] = React.useState<{ weekNumber: number; dateRange: string; date: string }[]>([])

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCopyDates({ copyFrom: '', copyTo: '' })
    setActiveTabIndex(newValue)
  }

  React.useEffect(() => {
    if (!settings) return
    if (selectedSemester !== 1 && selectedSemester !== 2) return

    let semesterStart
    let semesterEnd

    if (selectedSemester === 1) {
      semesterStart = settings.firstSemesterStart
      semesterEnd = settings.firstSemesterEnd
    }

    if (selectedSemester === 2) {
      semesterStart = settings.secondSemesterStart
      semesterEnd = settings.secondSemesterEnd
    }

    // Перетворюємо рядки дат у об'єкти dayjs
    const startDate = customDayjs(semesterStart, 'MM.DD.YYYY')
    const endDate = customDayjs(semesterEnd, 'MM.DD.YYYY')

    // Визначаємо кількість тижнів між початковою та кінцевою датами
    const weeksCount = endDate.diff(startDate, 'week') + 1

    // Створюємо масив об'єктів для зберігання даних
    const weeklyData = []

    // Проходимо по кожному тижню
    for (let i = 0; i < weeksCount; i++) {
      // Визначаємо початок та кінець поточного тижня
      const weekStart = startDate.add(i, 'week').startOf('week')
      const weekEnd = startDate.add(i, 'week').endOf('week')

      // Додаємо об'єкт з даними про поточний тиждень в масив
      weeklyData.push({
        weekNumber: i + 1,
        dateRange: `${weekStart.format('DD.MM')} - ${weekEnd.format('DD.MM')}`,
        date: weekStart.format('MM.DD.YYYY'),
      })
    }

    // Виводимо результат
    setWeeks(weeklyData)
  }, [selectedSemester, settings])

  const onCopySchedule = () => {
    if (!groupId) return
    if (!copyDates.copyFrom || !copyDates.copyTo) return

    const start = customDayjs(copyDates.copyFrom, 'DD.MM.YYYY').format('MM.DD.YYYY')
    const end = customDayjs(copyDates.copyTo, 'DD.MM.YYYY').format('MM.DD.YYYY')

    try {
      // copy week
      if (activeTabIndex === 0) {
        const payload = { groupId, copyFromStartDay: start, copyToStartDay: end }
        dispatch(copyWeekSchedule(payload))
      }

      // copy day
      if (activeTabIndex === 1) {
        const payload = { groupId, copyFromDay: start, copyToDay: end }
        dispatch(copyDaySchedule(payload))
      }
    } catch (err) {
      console.log(err)
    } finally {
      setOpen(false)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      onClose={() => {
        handleClose()
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ '& .MuiPaper-root': { width: '400px' } }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '8px',
        }}
      >
        <Typography sx={{ ml: 2 }}>Копіювати розклад</Typography>

        <div>
          <Tooltip title="Закрити">
            <IconButton sx={{ mr: 1 }} onClick={() => handleClose()}>
              <CloseOutlined />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <Divider />

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTabIndex} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{ width: '49%' }} label="Копіювати тиждень" id="0" />
          <Tab sx={{ width: '51%' }} label="Копіювати день" id="1" />
        </Tabs>
      </Box>

      {/* copy week */}
      {activeTabIndex === 0 && (
        <DialogContent sx={{ padding: '0' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
              <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 1 } }}>
                {weeks.map((el) => (
                  <ListItemButton
                    divider
                    sx={{ py: 0 }}
                    key={el.weekNumber}
                    selected={el.date === copyDates.copyFrom}
                    onClick={() => setCopyDates((prev) => ({ ...prev, copyFrom: el.date }))}
                  >
                    <ListItemText primary={`${el.weekNumber}. (${el.dateRange})`} sx={{ p: '0 0 0 10px' }} />
                  </ListItemButton>
                ))}
              </List>
            </div>

            <div>
              <Divider orientation="vertical" />
            </div>

            <div style={{ width: '50%' }}>
              <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 1 } }}>
                {weeks.map((el) => (
                  <ListItemButton
                    divider
                    sx={{ py: 0 }}
                    key={el.weekNumber}
                    selected={el.date === copyDates.copyTo}
                    onClick={() => setCopyDates((prev) => ({ ...prev, copyTo: el.date }))}
                  >
                    <ListItemText primary={`${el.weekNumber}. (${el.dateRange})`} sx={{ p: '0 0 0 10px' }} />
                  </ListItemButton>
                ))}
              </List>
            </div>
          </div>
        </DialogContent>
      )}

      {/* copy day */}
      {activeTabIndex === 1 && (
        <DialogContent sx={{ py: 6 }}>
          <CustomDatePicker
            width="100%"
            label="Копіювати з:"
            setValue={(date) => {
              setCopyDates((prev) => {
                const copyFrom = customDayjs(date, 'DD.MM.YYYY').format('DD.MM.YYYY')
                return { ...prev, copyFrom }
              })
            }}
            value={copyDates.copyFrom}
          />

          <br />

          <CustomDatePicker
            width="100%"
            label="Копіювати на:"
            setValue={(date) =>
              setCopyDates((prev) => {
                const copyTo = customDayjs(date, 'DD.MM.YYYY').format('DD.MM.YYYY')
                return { ...prev, copyTo }
              })
            }
            value={copyDates.copyFrom}
          />
        </DialogContent>
      )}

      <Divider />

      <DialogActions sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography>
          {copyDates.copyFrom && copyDates.copyTo
            ? `Копіювати з ${copyDates.copyFrom.split('.')[0]}.${copyDates.copyFrom.split('.')[1]} 
            на ${copyDates.copyTo.split('.')[0]}.${copyDates.copyTo.split('.')[1]}`
            : ''}
        </Typography>

        <Button variant="contained" onClick={onCopySchedule} disabled={!copyDates.copyFrom || !copyDates.copyTo}>
          Копіювати
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { CopyTheScheduleModal }
