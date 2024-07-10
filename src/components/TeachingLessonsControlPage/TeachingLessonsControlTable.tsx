import React from 'react'

import './teaching-lessons-control.css'

interface ITeachingLessonsControlTablePops {}

const lessonsCount = 2

const TeachingLessonsControlTable: React.FC<ITeachingLessonsControlTablePops> = ({}) => {
  return (
    <table className="lessons-control-table" cellSpacing="0">
      <thead>
        <tr>
          <th>№</th>
          <th>Виставлено</th>
          <th>Вичитано</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th colSpan={3}>Лютий</th>
        </tr>
        {Array(6)
          .fill(null)
          .map((student, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 1}.</td>
              {Array(lessonsCount)
                .fill(null)
                .map((el, colIndex) => {
                  return <td key={colIndex}>30 / 02 / 2024</td>
                })}
            </tr>
          ))}

        <tr>
          <th colSpan={3}>Березень</th>
        </tr>

        {Array(4)
          .fill(null)
          .map((student, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 7}.</td>
              {Array(lessonsCount)
                .fill(null)
                .map((el, colIndex) => {
                  return <td key={colIndex}>30 / 03 / 2024</td>
                })}
            </tr>
          ))}

        <tr>
          <th colSpan={3}>Квітень</th>
        </tr>

        {Array(4)
          .fill(null)
          .map((student, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 11}.</td>
              {Array(lessonsCount)
                .fill(null)
                .map((el, colIndex) => {
                  return <td key={colIndex}>30 / 04 / 2024</td>
                })}
            </tr>
          ))}

        <tr>
          <th colSpan={3}>Травень</th>
        </tr>

        {Array(4)
          .fill(null)
          .map((student, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 15}.</td>
              {Array(lessonsCount)
                .fill(null)
                .map((el, colIndex) => {
                  return <td key={colIndex}>30 / 05 / 2024</td>
                })}
            </tr>
          ))}

        <tr>
          <th colSpan={3}>Червень</th>
        </tr>

        {Array(4)
          .fill(null)
          .map((student, rowIndex) => (
            <tr key={rowIndex}>
              <td>{rowIndex + 19}.</td>
              {Array(lessonsCount)
                .fill(null)
                .map((el, colIndex) => {
                  return <td key={colIndex}>30 / 06 / 2024</td>
                })}
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default TeachingLessonsControlTable
