import React from 'react'

import './FullTeacherPage.css'

interface Props {}

const lessonsCount = 6

const lessonTypes = ['ЛК', 'ПЗ', 'ЛАБ', 'СЕМ', 'ЕКЗ', 'КОНС', 'МЕТОД']

export const MyTeachingLoadTab: React.FC<Props> = ({}) => {
  return (
    <table className="full-teacher__teaching-load-table" cellSpacing="0">
      <thead>
        <tr>
          <th style={{ width: '100px' }}>Група</th>
          <th>Дисципліна</th>
          <th>Група/Підгрупа</th>
          <th>Вид заняття</th>
          <th>Години</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th colSpan={lessonsCount + 1}>Семестр 1</th>
        </tr>
        {Array(6)
          .fill(null)
          .map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td>PH9-22-1</td>
              <td style={{ textAlign: 'left' }}>Органічна хімія</td>
              <td>Вся група</td>
              <td>Лекції</td>
              <td>24</td>
            </tr>
          ))}

        <tr>
          <th colSpan={4} style={{ textAlign: 'left' }}>
            Всього за 1 семестр
          </th>
          <th>240</th>
        </tr>

        <tr>
          <th colSpan={5} style={{ padding: '.1px' }}></th>
        </tr>

        <tr>
          <th colSpan={lessonsCount + 1}>Семестр 2</th>
        </tr>

        {Array(6)
          .fill(null)
          .map((_, rowIndex) => (
            <tr key={rowIndex}>
              <td>PH9-22-1</td>
              <td style={{ textAlign: 'left' }}>Органічна хімія</td>
              <td>Вся група</td>
              <td>Лекції</td>
              <td>24</td>
            </tr>
          ))}

        <tr>
          <th colSpan={4} style={{ textAlign: 'left' }}>
            Всього за 2 семестр
          </th>
          <th>320</th>
        </tr>

        <tr>
          <th colSpan={4} style={{ textAlign: 'left' }}>
            Всього за рік
          </th>
          <th>560</th>
        </tr>
      </tbody>
    </table>
  )
}

/* 
 <table className="full-teacher__teaching-load-table" cellSpacing="0">
      <thead>
        <tr>
          <th style={{ width: '100px' }}>Група</th>
          <th>Дисципліна</th>

          {lessonTypes.map((el) => (
            <th style={{ width: '80px' }}>{el}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th colSpan={lessonsCount + 1}>Семестр 1</th>
        </tr>
        {Array(6)
          .fill(null)
          .map((student, rowIndex) => (
            <tr key={rowIndex}>
              <td>PH9-22-1</td>
              <td style={{ textAlign: 'left' }}>Органічна хімія</td>
              {lessonTypes.map((_) => (
                <td>-</td>
              ))}
            </tr>
          ))}

        <tr>
          <th colSpan={lessonsCount + 1}>Семестр 2</th>
        </tr>

        {Array(6)
          .fill(null)
          .map((student, rowIndex) => (
            <tr key={rowIndex}>
              <td>PH9-22-1</td>
              <td style={{ textAlign: 'left' }}>Органічна хімія</td>
              {lessonTypes.map((_) => (
                <td>-</td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
*/
