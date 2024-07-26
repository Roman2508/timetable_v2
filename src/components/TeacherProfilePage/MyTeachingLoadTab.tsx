import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

import './FullTeacherPage.css'

interface Props {}

const lessonsCount = 6

// Група	Дисципліна	Група/Підгрупа	Вид заняття	Години
function createData(
  id: number,
  group: string,
  lessonName: string,
  category: string,
  lessonType: string,
  hours: number
) {
  return { id, group, lessonName, category, lessonType, hours }
}

const rows = [
  createData(1, 'PH9-23-1', 'Інформаційні технології у фармації', 'Вся група', 'ЛК', 24),
  createData(2, 'PH9-23-1', 'Інформаційні технології у фармації', 'Вся група', 'ЛК', 24),
  createData(3, 'PH9-23-1', 'Інформаційні технології у фармації', 'Вся група', 'ЛК', 24),
  createData(4, 'PH9-23-1', 'Інформаційні технології у фармації', 'Вся група', 'ЛК', 24),
  createData(5, 'PH9-23-1', 'Інформаційні технології у фармації', 'Вся група', 'ЛК', 24),
  createData(6, 'PH9-23-1', 'Інформаційні технології у фармації', 'Вся група', 'ЛК', 24),
]

const sellStyles = {
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  padding: '6px',
  height: '40px',
}

export const MyTeachingLoadTab: React.FC<Props> = ({}) => {
  return (
    <>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">№</TableCell>
            <TableCell align="center">Група</TableCell>
            <TableCell align="center">Дисципліна</TableCell>
            <TableCell align="center">Група/Підгрупа</TableCell>
            <TableCell align="center">Вид заняття</TableCell>
            <TableCell align="center">Години</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/*  */}
          <TableRow>
            <TableCell colSpan={6} align="center" component="th" sx={{ fontWeight: 600 }}>
              Семестр 1
            </TableCell>
          </TableRow>

          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center" sx={{ ...sellStyles }}>
                {row.id}
              </TableCell>

              <TableCell align="center" sx={{ ...sellStyles }}>
                {row.group}
              </TableCell>

              <TableCell align="center" sx={{ ...sellStyles }}>
                {row.lessonName}
              </TableCell>

              <TableCell align="center" sx={{ ...sellStyles }}>
                {row.category}
              </TableCell>

              <TableCell align="center" sx={{ ...sellStyles }}>
                {row.lessonType}
              </TableCell>

              <TableCell sx={{ width: '100px', ...sellStyles }} align="center">
                {row.hours}
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell colSpan={5} component="th" align="left" sx={{ fontWeight: 600 }}>
              Всього за 1 семестр
            </TableCell>
            <TableCell align="center" component="th" sx={{ fontWeight: 600 }}>
              360
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={6} component="th" align="center" sx={{ fontWeight: 600 }}>
              Семестр 2
            </TableCell>
          </TableRow>

          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center" sx={{ ...sellStyles }}>
                {row.id}
              </TableCell>

              <TableCell align="center" sx={{ ...sellStyles }}>
                {row.group}
              </TableCell>

              <TableCell align="center" sx={{ ...sellStyles }}>
                {row.lessonName}
              </TableCell>

              <TableCell align="center" sx={{ ...sellStyles }}>
                {row.category}
              </TableCell>

              <TableCell align="center" sx={{ ...sellStyles }}>
                {row.lessonType}
              </TableCell>

              <TableCell sx={{ width: '100px', ...sellStyles }} align="center">
                {row.hours}
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell colSpan={5} component="th" align="left" sx={{ fontWeight: 600 }}>
              Всього за 2 семестр
            </TableCell>
            <TableCell align="center" component="th" sx={{ fontWeight: 600 }}>
              360
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      {/* <table className="full-teacher__teaching-load-table" cellSpacing="0">
        <thead>
          <tr>
            <th style={{ width: "100px" }}>Група</th>
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
                <td style={{ textAlign: "left" }}>Органічна хімія</td>
                <td>Вся група</td>
                <td>Лекції</td>
                <td>24</td>
              </tr>
            ))}

          <tr>
            <th colSpan={4} style={{ textAlign: "left" }}>
              Всього за 1 семестр
            </th>
            <th>240</th>
          </tr>

          <tr>
            <th colSpan={5} style={{ padding: ".1px" }}></th>
          </tr>

          <tr>
            <th colSpan={lessonsCount + 1}>Семестр 2</th>
          </tr>

          {Array(6)
            .fill(null)
            .map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td>PH9-22-1</td>
                <td style={{ textAlign: "left" }}>Органічна хімія</td>
                <td>Вся група</td>
                <td>Лекції</td>
                <td>24</td>
              </tr>
            ))}

          <tr>
            <th colSpan={4} style={{ textAlign: "left" }}>
              Всього за 2 семестр
            </th>
            <th>320</th>
          </tr>

          <tr>
            <th colSpan={4} style={{ textAlign: "left" }}>
              Всього за рік
            </th>
            <th>560</th>
          </tr>
        </tbody>
      </table> */}
    </>
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
