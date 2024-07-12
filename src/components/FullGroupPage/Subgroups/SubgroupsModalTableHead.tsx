import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { TableCell, TableHead, TableRow } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

const cellStyles = {
  borderBottom: '1px solid rgb(220, 220, 220)',
  p: '4px 10px',
  minWidth: '100px',
  backgroundColor: '#fff !important',
  userSelect: 'none',
}

interface ISubgroupsModalTableHeadProps {
  sortBy: { key: string; order: 'asc' | 'desc' }
  setSortBy: Dispatch<SetStateAction<{ key: string; order: 'asc' | 'desc' }>>
}

const tableColls = ['Лекції', 'Практичні', 'Лабораторні', 'Семінари', 'Екзамени']

const SubgroupsModalTableHead: React.FC<ISubgroupsModalTableHeadProps> = ({ sortBy, setSortBy }) => {
  const handleChangeSort = (key: 'name' | 'semester') => {
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
          align="center"
          padding="none"
          onClick={() => handleChangeSort('name')}
          sx={{ ...cellStyles, cursor: 'pointer', '&:hover svg': { display: 'inline' } }}
        >
          Дисципліна
          {sortBy.key === 'name' && sortBy.order === 'asc' && <ArrowDownOutlined />}
          {sortBy.key === 'name' && sortBy.order === 'desc' && <ArrowUpOutlined />}
        </TableCell>

        <TableCell
          align="center"
          padding="none"
          onClick={() => handleChangeSort('semester')}
          sx={{ ...cellStyles, cursor: 'pointer', '&:hover svg': { display: 'inline' } }}
        >
          Семестр
          {sortBy.key === 'semester' && sortBy.order === 'asc' && <ArrowDownOutlined />}
          {sortBy.key === 'semester' && sortBy.order === 'desc' && <ArrowUpOutlined />}
        </TableCell>

        {tableColls.map((type) => (
          <TableCell sx={cellStyles} align="center" padding="none">
            {type}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export { SubgroupsModalTableHead }
