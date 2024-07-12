import {
  Box,
  Link,
  Table,
  Tooltip,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  IconButton,
  SortDirection,
  TableContainer,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { DeleteOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

import { useAppDispatch } from '../../store/store'
import { handleGroupVisible } from '../../store/groups/groupsAsyncActions'
import { GroupCategoriesType, GroupsShortType } from '../../store/groups/groupsTypes'
import { sortItemsByKey } from '../../utils/sortItemsByKey'

interface IHeadCells {
  id: string
  align: 'center' | 'left' | 'right' | 'inherit' | 'justify'
  disablePadding: boolean
  label: string
}

const headCells: IHeadCells[] = [
  {
    id: 'trackingNo',
    align: 'center',
    disablePadding: false,
    label: 'Назва',
  },
  {
    id: 'name',
    align: 'center',
    disablePadding: true,
    label: 'Курс',
  },
  {
    id: 'fat',
    align: 'center',
    disablePadding: false,
    label: 'Студентів',
  },
  {
    id: 'carbs',
    align: 'center',
    disablePadding: false,

    label: 'Дії',
  },
]

// ==============================|| TABLE - HEAD ||============================== //

interface IOrderTableHeadProps {
  order: string
  orderBy: string
}

const OrderTableHead: React.FC<IOrderTableHeadProps> = ({ order, orderBy }) => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? (order as SortDirection) : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

// ==============================|| TABLE ||============================== //

interface IGroupsTableProps {
  groups: GroupsShortType[]
  onDeleteEntity: (type: 'category' | 'group', id: number) => void
  setActiveGroupCategory: Dispatch<SetStateAction<GroupCategoriesType | null>>
}

const GroupsTable: React.FC<IGroupsTableProps> = ({ groups, onDeleteEntity, setActiveGroupCategory }) => {
  const dispatch = useAppDispatch()

  const [order] = useState('asc')
  const [orderBy] = useState('trackingNo')
  const [selected] = useState([])

  // @ts-ignore
  const isSelected = (id: number) => selected.indexOf(id) !== -1

  const onChangeGroupVisible = async (id: number) => {
    const { payload }: { payload: unknown } = await dispatch(handleGroupVisible(id))
    const updatedGroup = payload as { id: number }

    setActiveGroupCategory((prev) => {
      if (!prev) return null
      const groups = prev.groups.filter((group) => group.id !== updatedGroup.id)
      return { ...prev, groups }
    })
  }

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' },
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2,
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3,
            },
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {/* {stableSort(rows, getComparator(order, orderBy)).map((row, index) => { */}
            {sortItemsByKey(groups, 'name').map((group: GroupsShortType, index: number) => {
              const isItemSelected = isSelected(group.id)
              const labelId = `enhanced-table-checkbox-${index}`

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={group.id}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" align="left" sx={{ p: '4px 12px' }}>
                    <Link color="secondary" component={RouterLink} to={`/groups/${group.id}`}>
                      {group.name}
                    </Link>
                  </TableCell>
                  <TableCell align="center" sx={{ p: '4px 12px' }}>
                    {group.courseNumber}
                  </TableCell>
                  <TableCell align="center" sx={{ p: '4px 12px' }}>
                    {group.students?.length}
                  </TableCell>
                  <TableCell align="center" sx={{ p: '4px 12px' }}>
                    <Link component={RouterLink} to={`/groups/${group.id}`}>
                      <Tooltip title="Редагувати групу">
                        <IconButton>
                          <EditOutlined />
                        </IconButton>
                      </Tooltip>
                    </Link>

                    <Tooltip title="Видалити групу">
                      <IconButton sx={{ ml: '5px' }} onClick={() => onDeleteEntity('group', group.id)}>
                        <DeleteOutlined />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title={group.isHide ? 'Показати групу' : 'Приховати групу'}>
                      <IconButton sx={{ ml: '5px' }} onClick={() => onChangeGroupVisible(group.id)}>
                        {group.isHide ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export { GroupsTable }
