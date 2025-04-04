import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Divider, Typography } from '@mui/material'

import { useAppDispatch } from '../../store/store'
import { customDayjs } from '../../utils/customDayJs'
import { CustomDatePicker } from '../CustomDatePicker'
import { settingsSelector } from '../../store/settings/settingsSlice'
import SemestersTimeline from './semesters-timeline/SemestersTimeline'
import { updateSemesterTerms } from '../../store/settings/settingsAsyncActions'

const semesterTermsInitialState = {
  firstSemesterStart: '09.01.2023',
  firstSemesterEnd: '12.24.2023',
  secondSemesterStart: '02.01.2024',
  secondSemesterEnd: '06.30.2024',
}

const TermsOfStudyTab = () => {
  const dispatch = useAppDispatch()

  const { settings } = useSelector(settingsSelector)

  const [isFetching, setIsFetching] = React.useState(false)
  const [semesterTerms, setSemesterTerms] = React.useState(semesterTermsInitialState)

  const handleChangeSemesterTerms = (key: keyof typeof semesterTermsInitialState, value: string) => {
    setSemesterTerms((prev) => ({ ...prev, [key]: value }))
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

    setSemesterTerms((prev) => {
      const firstSemesterStart = customDayjs(settings.firstSemesterStart, 'MM.DD.YYYY').format('DD.MM.YYYY')
      const firstSemesterEnd = customDayjs(settings.firstSemesterEnd, 'MM.DD.YYYY').format('DD.MM.YYYY')
      const secondSemesterStart = customDayjs(settings.secondSemesterStart, 'MM.DD.YYYY').format('DD.MM.YYYY')
      const secondSemesterEnd = customDayjs(settings.secondSemesterEnd, 'MM.DD.YYYY').format('DD.MM.YYYY')
      return { ...prev, firstSemesterStart, firstSemesterEnd, secondSemesterStart, secondSemesterEnd }
    })
  }, [settings])

  return (
    <div>
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
        Терміни навчання
      </Typography>

      <Divider sx={{ mb: 3 }} />
      <SemestersTimeline semesterTerms={semesterTerms} />
      <Divider sx={{ pb: 2 }} />

      <div>
        <div>
          <Typography variant="h6" sx={{ textAlign: 'center', mt: 5, mb: 1, fontWeight: 700 }}>
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
              width="300px"
              label="Початок"
              value={semesterTerms.firstSemesterStart}
              setValue={(e) => handleChangeSemesterTerms('firstSemesterStart', e)}
            />
            <CustomDatePicker
              width="300px"
              label="Кінець"
              value={semesterTerms.firstSemesterEnd}
              setValue={(e) => handleChangeSemesterTerms('firstSemesterEnd', e)}
            />
          </div>
        </div>

        <div>
          <Typography variant="h6" sx={{ textAlign: 'center', mb: 1, mt: 4, fontWeight: 700 }}>
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
              width="300px"
              label="Початок"
              value={semesterTerms.secondSemesterStart}
              setValue={(e) => handleChangeSemesterTerms('secondSemesterStart', e)}
            />
            <CustomDatePicker
              width="300px"
              label="Кінець"
              value={semesterTerms.secondSemesterEnd}
              setValue={(e) => handleChangeSemesterTerms('secondSemesterEnd', e)}
            />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '320px', margin: '0 auto' }}>
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
      </div>
    </div>
  )
}

export default TermsOfStudyTab
