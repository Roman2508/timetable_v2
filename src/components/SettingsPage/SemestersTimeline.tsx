import React from 'react'

import './settings.css'
import { customDayjs } from '../../utils/customDayJs'

const months = ['Сер', 'Вер', 'Жов', 'Лис', 'Гру', 'Січ', 'Лют', 'Бер', 'Кві', 'Тра', 'Чер', 'Лип']

interface ISemesterTerms {
  firstSemesterStart: string
  firstSemesterEnd: string
  secondSemesterStart: string
  secondSemesterEnd: string
}

function convertDatesToOrdinal(dates: ISemesterTerms) {
  const firstSemesterStart = customDayjs(dates.firstSemesterStart, 'MM.DD.YYYY').dayOfYear()
  const firstSemesterEnd = customDayjs(dates.firstSemesterEnd, 'MM.DD.YYYY').dayOfYear()
  const secondSemesterStart = customDayjs(dates.secondSemesterStart, 'MM.DD.YYYY').dayOfYear()
  const secondSemesterEnd = customDayjs(dates.secondSemesterEnd, 'MM.DD.YYYY').dayOfYear()

  return { firstSemesterStart, firstSemesterEnd, secondSemesterStart, secondSemesterEnd }
}

const getDayAndMonth = (dateStr: string) => {
  return customDayjs(dateStr, 'MM.DD.YYYY').format('DD.MM')
}

function getDateDiff(date1: string, date2: string): number {
  const startDate = customDayjs(date1, 'MM.DD.YYYY')
  const endDate = customDayjs(date2, 'MM.DD.YYYY')
  const diffInMonths = endDate.diff(startDate, 'month')
  const isPartialMonth = endDate.date() > startDate.date()
  return isPartialMonth ? diffInMonths + 1 : diffInMonths
}

interface ISemestersTimelineProps {
  semesterTerms: {
    firstSemesterStart: string
    firstSemesterEnd: string
    secondSemesterStart: string
    secondSemesterEnd: string
  }
}

// const SemestersTimeline: React.FC<ISemestersTimelineProps> = ({ semesterTerms }) => {
const SemestersTimeline: React.FC<ISemestersTimelineProps> = ({}) => {
  const semesterTerms = {
    firstSemesterStart: '08.01.2024',
    firstSemesterEnd: '08.30.2024',
    secondSemesterStart: '01.01.2024',
    secondSemesterEnd: '01.30.2024',
  }

  const firstStart = Math.floor((convertDatesToOrdinal(semesterTerms).firstSemesterStart / 365) * 100)
  const firstEnd = Math.floor((convertDatesToOrdinal(semesterTerms).firstSemesterEnd / 365) * 100)
  const secondStart = Math.floor((convertDatesToOrdinal(semesterTerms).secondSemesterStart / 365) * 100)
  const secondEnd = Math.floor((convertDatesToOrdinal(semesterTerms).secondSemesterEnd / 365) * 100)

  const firstLen = firstEnd - firstStart
  const secondLen = secondEnd - secondStart

  const oneMonthPresentation = 100 / 12
  const oneDayPersantation = 100 / 365

  console.log({
    firstStart,
    firstEnd,
    secondStart,
    secondEnd,
    firstLen,
    secondLen,
    oneMonthPresentation,
    oneDayPersantation,
  })

  const a = customDayjs(semesterTerms.firstSemesterStart, 'MM.DD.YYYY').dayOfYear()
  const b = customDayjs(semesterTerms.firstSemesterEnd, 'MM.DD.YYYY').dayOfYear()

  const fs = (a / 365) * 100 - oneDayPersantation * 212 - 0.5
  const fe = (b / 365) * 100 - oneDayPersantation * 212 + 3.5

  // const fs = (a / 365) * 100 - 7 * oneMonthPresentation
  // const fe = (b / 365) * 100 - 7 * oneMonthPresentation

  // const fs = customDayjs(semesterTerms.firstSemesterStart, 'MM.DD.YYYY').dayOfYear()
  // const fe = customDayjs(semesterTerms.firstSemesterEnd, 'MM.DD.YYYY').dayOfYear()
  const diff = getDateDiff(semesterTerms.firstSemesterStart, semesterTerms.firstSemesterEnd)

  const startFS = fs * oneDayPersantation - oneMonthPresentation * 7

  const fl = fe - fs
  // const fl = (fe - fs) * oneDayPersantation /*  + 1.65 * diff */

  console.log('fs', fs, ' ;fe', fe, ' ;fl', fl, 'diff', diff)
  return (
    <div className="timeline-wrapper">
      <div
        className="semester first"
        data-semester-end={getDayAndMonth(semesterTerms.firstSemesterEnd)}
        data-semester-start={getDayAndMonth(semesterTerms.firstSemesterStart)}
        style={{ top: '10px', width: `${fl}%`, left: `${fs}%` }}
        // style={{ top: '10px', width: `${firstLen}%`, left: `${firstStart - 57.8}%` }}
      ></div>

      <div className="timeline">
        {months.map((month) => {
          const isYearStart = month === 'Січ'
          return (
            <div
              key={month}
              style={{ height: isYearStart ? '40px' : '10px' }}
              className={`month ${isYearStart ? 'start-of-year' : ''}`}
            >
              <span style={{ bottom: isYearStart ? '-35px' : '-50px', fontWeight: isYearStart ? 'bold' : 'normal' }}>
                {month}
              </span>
            </div>
          )
        })}
      </div>

      <div
        className="semester second"
        data-semester-end={getDayAndMonth(semesterTerms.secondSemesterEnd)}
        data-semester-start={getDayAndMonth(semesterTerms.secondSemesterStart)}
        style={{ top: '30px', width: `${secondLen}%`, left: `${secondStart + 45.6}%` }}
      ></div>
    </div>
  )
}

export default SemestersTimeline
