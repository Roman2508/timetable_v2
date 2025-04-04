import React from 'react'

import '../settings.css'
import { SemesterTermsType } from './semesters-timeline.types'
import { getDayAndMonth, getSemesterTerms, months } from './semesters-timeline.helpers'

interface ISemestersTimelineProps {
  semesterTerms: SemesterTermsType
}

// const SemestersTimeline: React.FC<ISemestersTimelineProps> = ({}) => {
//   const semesterTerms = {
//     firstSemesterStart: '09.01.2024',
//     firstSemesterEnd: '12.31.2024',
//     secondSemesterStart: '02.01.2025',
//     secondSemesterEnd: '06.30.2025',
//   }
const SemestersTimeline: React.FC<ISemestersTimelineProps> = ({ semesterTerms }) => {
  const { firstSemStart, firstSemWidth, secondSemStart, secondSemWidth } = getSemesterTerms(semesterTerms)

  return (
    <div className="timeline-wrapper">
      <div
        className="semester first"
        data-semester-end={getDayAndMonth(semesterTerms.firstSemesterEnd)}
        data-semester-start={getDayAndMonth(semesterTerms.firstSemesterStart)}
        style={{ top: '10px', width: `${firstSemWidth}%`, left: `${firstSemStart}%` }}
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
        style={{ top: '30px', width: `${secondSemWidth}%`, left: `${secondSemStart + 46}%` }}
      ></div>
    </div>
  )
}

export default SemestersTimeline
