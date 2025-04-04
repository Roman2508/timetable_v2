import { customDayjs } from '../../../utils/customDayJs'
import { SemesterTermsType } from './semesters-timeline.types'

export const months = ['Сер', 'Вер', 'Жов', 'Лис', 'Гру', 'Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип', 'Сер']

export const convertDatesToOrdinal = (dates: SemesterTermsType) => {
  const firstDayNumberInFirstSemester = customDayjs(dates.firstSemesterStart, 'DD.MM.YYYY').dayOfYear()
  const lastDayNumberInFirstSemester = customDayjs(dates.firstSemesterEnd, 'DD.MM.YYYY').dayOfYear()
  const firstDayNumberInSecondSemester = customDayjs(dates.secondSemesterStart, 'DD.MM.YYYY').dayOfYear()
  const lastDayNumberInSecondSemester = customDayjs(dates.secondSemesterEnd, 'DD.MM.YYYY').dayOfYear()

  return {
    firstDayNumberInFirstSemester,
    lastDayNumberInFirstSemester,
    firstDayNumberInSecondSemester,
    lastDayNumberInSecondSemester,
  }
}

export const getDayAndMonth = (dateStr: string) => {
  return customDayjs(dateStr, 'DD.MM.YYYY').format('DD.MM')
}

export const getSemesterTerms = (semesterTerms: SemesterTermsType) => {
  const oneDayPersantation = 100 / 365
  const oneMonthPresentation = 100 / 12 - oneDayPersantation * 30
  const daysOffcet = 214

  const {
    firstDayNumberInFirstSemester,
    lastDayNumberInFirstSemester,
    firstDayNumberInSecondSemester,
    lastDayNumberInSecondSemester,
  } = convertDatesToOrdinal(semesterTerms)

  const firstSemesterLength = lastDayNumberInFirstSemester + 1 - firstDayNumberInFirstSemester

  const firstSemStart = (firstDayNumberInFirstSemester - daysOffcet) * oneDayPersantation + 0.5
  const firstSemWidth =
    firstSemesterLength * oneDayPersantation + (oneMonthPresentation / 30) * (firstSemesterLength - 10)

  const secondSemesterLength = lastDayNumberInSecondSemester + 1 - firstDayNumberInSecondSemester

  const secondSemStart = (firstDayNumberInSecondSemester - 16) * oneDayPersantation
  const secondSemWidth =
    secondSemesterLength * oneDayPersantation + (oneMonthPresentation / 30) * (firstSemesterLength - 10)

  return {
    firstSemStart,
    firstSemWidth,
    secondSemStart,
    secondSemWidth,
  }
}
