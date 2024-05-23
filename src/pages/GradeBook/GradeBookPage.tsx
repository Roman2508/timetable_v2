import React from 'react'
import {
  Grid,
  Table,
  Stack,
  Button,
  MenuItem,
  TableRow,
  TextField,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  InputLabel,
  ListSubheader,
  TableContainer,
  Checkbox,
} from '@mui/material'
import { useSelector } from 'react-redux'

import HIcon from '../../assets/images/icons/letter-h.svg'
import { useAppDispatch } from '../../store/store'
import { groupsSelector } from '../../store/groups/groupsSlice'
import { getGroupCategories } from '../../store/groups/groupsAsyncActions'

const cellStyles = { border: '1px solid rgb(235, 235, 235)' }

const students = [
  {
    _id: '664dfc7aa21dd243763ac23a',
    name: 'Rosalyn Strong',
  },
  {
    _id: '664dfc7aadc506bdadca3dd4',
    name: 'Delacruz Chen',
  },
  {
    _id: '664dfc7ad533114aeb28c100',
    name: 'Harding Lawson',
  },
  {
    _id: '664dfc7a03dc3c1b2664865e',
    name: 'Stark Collier',
  },
  {
    _id: '664dfc7a9f8a6594f3df27ba',
    name: 'Althea Vaughan',
  },
  {
    _id: '664dfc7a11c1584e358b540d',
    name: 'Clara Ashley',
  },
  {
    _id: '664dfc7aa2132d12d243763ac23a',
    name: 'Rosalyn Strong',
  },
  {
    _id: '664dfc7aadc532256bdadca3dd4',
    name: 'Delacruz Chen',
  },
  {
    _id: '664dfc7ad53123114aeb28c100',
    name: 'Harding Lawson',
  },
  {
    _id: '664dfc7a03dc312c1b2664865e',
    name: 'Stark Collier',
  },
  {
    _id: '664dfc7a9f8a126594f3df27ba',
    name: 'Althea Vaughan',
  },
  {
    _id: '664dfc7a11c151284e358b540d',
    name: 'Clara Ashley',
  },
  {
    _id: '664dfc7afa6f076a35a75218',
    name: 'Pena Medina',
  },
  {
    _id: '664dfc7ada95bf55afd8ccf2',
    name: 'Potts Rush',
  },
  {
    _id: '664dfc7ac3c890f6d53be34d',
    name: 'Chan Hunter',
  },
  {
    _id: '664dfc7a3a2f6e15ea0b3819',
    name: 'Wooten Park',
  },
  {
    _id: '664dfc7a3c647a2ed26a35f9',
    name: 'Rosie Mckenzie',
  },
  {
    _id: '664dfc7a2265ac4e413a6c94',
    name: 'Mcknight Tran',
  },
]

const GradeBookPage = () => {
  const dispatch = useAppDispatch()

  const { groupCategories } = useSelector(groupsSelector)

  React.useEffect(() => {
    dispatch(getGroupCategories(false))
  }, [])

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: 'center', mb: 3 }}>
        <Grid item xs={12}>
          <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid item>
              <Typography variant="h5">Електронний журнал</Typography>
            </Grid>

            <Grid sx={{ display: 'flex', gap: 3, alignItems: 'flex-end' }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="group">Рік*</InputLabel>
                <TextField
                  select
                  fullWidth
                  id="group"
                  defaultValue={2024}
                  sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem', width: '80px' } }}
                >
                  {[2019, 2020, 2021, 2022, 2023, 2024].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <Stack spacing={1}>
                <InputLabel htmlFor="group">Семестр*</InputLabel>
                <TextField
                  select
                  fullWidth
                  id="group"
                  defaultValue={1}
                  sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem', width: '80px' } }}
                >
                  {[1, 2].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <Stack spacing={1}>
                <InputLabel htmlFor="group">Група*</InputLabel>
                <TextField
                  select
                  fullWidth
                  id="group"
                  sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem', width: '80px' } }}
                >
                  {(!groupCategories ? [] : groupCategories).map((category) => (
                    <>
                      <ListSubheader
                        key={category.id}
                        value={category.id}
                        sx={{ fontWeight: 700, color: 'rgba(38, 38, 38, .9)', lineHeight: '40px' }}
                      >
                        {category.name}
                      </ListSubheader>

                      {category.groups.map((group) => (
                        <MenuItem key={group.id} value={group.id}>
                          {group.name}
                        </MenuItem>
                      ))}
                    </>
                  ))}
                </TextField>
              </Stack>

              <Stack spacing={1}>
                <InputLabel htmlFor="group">Дисципліна*</InputLabel>
                <TextField
                  select
                  fullWidth
                  id="group"
                  defaultValue={1}
                  sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem', width: '200px' } }}
                >
                  {[1, 2, 3, 4, 5, 6].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>

              <Button type="submit" color="primary" variant="outlined" sx={{ height: '40.91px' }}>
                Показати
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          // maxHeight: '600px',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' },
        }}
      >
        <Table
          stickyHeader
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': { pl: 2 },
            '& .MuiTableCell-root:last-of-type': { pr: 3 },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ ...cellStyles, position: 'sticky', left: 0, zIndex: 99, background: '#fff' }}
                align="center"
                rowSpan={3}
                padding="none"
              >
                Дисципліна
              </TableCell>
            </TableRow>

            <TableRow>
              {Array(25)
                .fill(null)
                .map((lessonNumber, index) => (
                  <TableCell
                    sx={{ ...cellStyles, p: 1, position: 'sticky', top: 0, zIndex: 69, background: '#fff' }}
                    align="center"
                    padding="none"
                  >
                    {index + 1}
                    <hr />
                    22.05
                    <hr />
                    217 ауд.
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {/* stableSort(rows, getComparator(order, orderBy)) */}
            {students.map((student, index: number) => {
              // const isItemSelected = isSelected(row.trackingNo)
              const labelId = `enhanced-table-checkbox-${index}`

              return (
                <TableRow
                  hover
                  key={labelId}
                  role="checkbox"
                  // aria-checked={isItemSelected}
                  tabIndex={-1}
                  // selected={isItemSelected}
                >
                  <TableCell
                    sx={{
                      ...cellStyles,
                      p: 0,
                      position: 'sticky',
                      left: 0,
                      zIndex: 99,
                      background: '#fff',
                    }}
                    component="th"
                    id={labelId}
                    scope="row"
                    align="left"
                  >
                    <Typography sx={{ flexGrow: 1 }}>{student.name}</Typography>
                  </TableCell>

                  {Array(25)
                    .fill(null)
                    .map((_, index) => {
                      return (
                        <TableCell
                          key={index}
                          onClick={() => {}}
                          sx={{
                            ...cellStyles,
                            cursor: 'pointer',
                            p: '0 !important',
                            // display: 'flex',
                            verticalAlign: 'middle',
                            // alignItems: 'center',
                            borderRight: '1px solid black',
                            ':hover': { background: 'rgba(0, 0, 0, 0.05);' },
                          }}
                          align="center"
                        >
                          <Checkbox
                            // defaultChecked
                            size="medium"
                            sx={{
                              marginTop: '5px',
                              '& .MuiSvgIcon-root': { fontSize: 20, width: '18px', height: '18px' },
                            }}
                            checkedIcon={
                              <svg
                                width="18px"
                                height="18px"
                                viewBox="0 0 128 128"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                role="img"
                                className="iconify iconify--noto"
                                preserveAspectRatio="xMidYMid meet"
                              >
                                <path
                                  d="M109.48 16.34H84.84c-1.28 0-2.33 1.04-2.33 2.33v36.27H45.5V18.68c0-1.29-1.04-2.33-2.34-2.33H18.53a2.34 2.34 0 0 0-2.34 2.33v99.96c0 1.29 1.05 2.33 2.34 2.33h24.63a2.34 2.34 0 0 0 2.34-2.33V76.15h37.02v42.48c0 1.29 1.05 2.33 2.33 2.33h24.64c1.29 0 2.33-1.05 2.33-2.33V18.68a2.35 2.35 0 0 0-2.34-2.34z"
                                  fill="#1677ff"
                                ></path>
                              </svg>
                            }
                          />

                          <TextField
                            sx={{
                              p: 0,
                              border: 0,
                              width: '50%',
                              '& *': { p: 0 },
                              textAlign: 'center',
                              '& input': { p: '12px 0 12px 6px', border: 0 },
                            }}
                            type="number"
                          />
                          {/* <HIcon /> */}
                        </TableCell>
                      )
                    })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default GradeBookPage
