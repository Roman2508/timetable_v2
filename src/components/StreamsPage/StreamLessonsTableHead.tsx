import { TableCell, TableHead, TableRow } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { StreamsTableSortType } from '../../pages/Streams/StreamsPage'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'

const cellStyles = {
  p: '4px',
  backgroundColor: '#fff !important',
  borderBottom: '1px solid rgb(220, 220, 220)',
}

const lessonsTypes = ['ЛК', 'ПЗ', 'ЛАБ', 'СЕМ', 'ЕКЗ']

interface IStreamLessonsTableHeadProps {
  sortBy: StreamsTableSortType
  setSortBy: Dispatch<SetStateAction<StreamsTableSortType>>
}

const StreamLessonsTableHead: React.FC<IStreamLessonsTableHeadProps> = ({ sortBy, setSortBy }) => {
  const handleChangeSort = (key: 'name' | 'semester' | 'group') => {
    setSortBy((prev) => {
      if (prev.key === key) {
        const newOrder = prev.order === 'asc' ? 'desc' : 'asc'
        return { ...prev, order: newOrder }
      }
      return { ...prev, key }
    })
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell
          rowSpan={3}
          padding="none"
          align="center"
          onClick={() => handleChangeSort('name')}
          sx={{ ...cellStyles, cursor: 'pointer', userSelect: 'none', width: 'calc(100% / 3)' }}
        >
          Дисципліна
          {sortBy.key === 'name' && sortBy.order === 'asc' && <ArrowDownOutlined />}
          {sortBy.key === 'name' && sortBy.order === 'desc' && <ArrowUpOutlined />}
        </TableCell>

        <TableCell
          align="center"
          rowSpan={3}
          padding="none"
          onClick={() => handleChangeSort('group')}
          sx={{ ...cellStyles, cursor: 'pointer', userSelect: 'none' }}
        >
          Група
          {sortBy.key === 'group' && sortBy.order === 'asc' && <ArrowDownOutlined />}
          {sortBy.key === 'group' && sortBy.order === 'desc' && <ArrowUpOutlined />}
        </TableCell>

        <TableCell
          rowSpan={3}
          align="center"
          padding="none"
          onClick={() => handleChangeSort('semester')}
          sx={{ ...cellStyles, cursor: 'pointer', userSelect: 'none' }}
        >
          Семестр
          {sortBy.key === 'semester' && sortBy.order === 'asc' && <ArrowDownOutlined />}
          {sortBy.key === 'semester' && sortBy.order === 'desc' && <ArrowUpOutlined />}
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
