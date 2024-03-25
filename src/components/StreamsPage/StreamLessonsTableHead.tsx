import { TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

const cellStyles = {
  borderBottom: '1px solid rgb(220, 220, 220)',
  p: '4px',
  // minWidth: "80px",
  backgroundColor: '#fff !important',
}

// const lessonsTypes = ["Лекції", "Практичні", "Лабораторні", "Семінари", "Екзамени"]
const lessonsTypes = ['ЛК', 'ПЗ', 'ЛАБ', 'СЕМ', 'ЕКЗ']

const StreamLessonsTableHead: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={cellStyles} align="center" rowSpan={3} padding="none">
          Дисципліна
        </TableCell>
        <TableCell sx={cellStyles} align="center" rowSpan={3} padding="none">
          Група
        </TableCell>
        <TableCell sx={cellStyles} align="center" rowSpan={3} padding="none">
          Семестр
        </TableCell>

        {lessonsTypes.map((lessonType) => (
          <TableCell key={lessonType} sx={cellStyles} align="center" padding="none">
            {lessonType}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export { StreamLessonsTableHead }
