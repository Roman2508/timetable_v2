import {
  Table,
  Stack,
  Dialog,
  Button,
  Tooltip,
  MenuItem,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Typography,
  TextField,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  DialogContentText,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import React, { Dispatch, SetStateAction } from 'react'

import SpecializationListModal from './SpecializationListModal'
import { groupsSelector } from '../../store/groups/groupsSlice'
import { groupLessonsByNameAndSemester } from '../../utils/groupLessonsByNameAndSemester'
import { GroupLoadType } from '../../store/groups/groupsTypes'

interface ISelectPlanModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const cellStyles = {
  borderBottom: '1px solid rgb(220, 220, 220)',
  p: '4px 10px',
  minWidth: '100px',
}

const SpecializationModal: React.FC<ISelectPlanModalProps> = ({ open, setOpen }) => {
  // const dispatch = useAppDispatch()

  const [specializationListModalVisible, setSpecializationListModalVisible] = React.useState(false)
  const [selectedLesson, setSelectedLesson] = React.useState<GroupLoadType | null>(null)

  const { group } = useSelector(groupsSelector)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <SpecializationListModal
        open={specializationListModalVisible}
        setOpen={setSpecializationListModalVisible}
        specializationList={group.specializationList}
      />

      <Dialog
        open={open}
        // fullScreen
        maxWidth={'xl'}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle>{'Спеціалізовані підгрупи'}</DialogTitle>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Stack>
              <TextField
                select
                fullWidth
                id="category"
                defaultValue={'empty'}
                //   value={value}
                //   onChange={(e) => setValue(e.target.value)}
                sx={{ width: '240px', p: '16px 8px', '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' } }}
              >
                {[
                  { label: 'Спеціалізація відсутня', value: 'empty' },
                  { label: 'Не вивчається', value: 'is-not-studied' },
                  ...group.specializationList.map((el) => ({ label: el, value: el })),
                ].map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <Tooltip title="Підтвердити зміни">
              <IconButton sx={{ mr: '24px' }}>
                <CheckOutlined />
              </IconButton>
            </Tooltip>
          </div>

          <IconButton sx={{ mr: '24px' }} onClick={handleClose}>
            <CloseOutlined />
          </IconButton>
        </div>
        <DialogContent sx={{ padding: '0 24px 20px' }}>
          <TableContainer
            sx={{
              width: '100%',
              display: 'block',
              maxWidth: '100%',
              overflowX: 'auto',
              position: 'relative',
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
                    sx={{ ...cellStyles, backgroundColor: '#fff !important' }}
                    align="center"
                    rowSpan={3}
                    padding="none"
                  >
                    Дисципліна
                  </TableCell>
                  <TableCell
                    sx={{ ...cellStyles, backgroundColor: '#fff !important' }}
                    align="center"
                    rowSpan={3}
                    padding="none"
                  >
                    Семестр
                  </TableCell>
                  <TableCell
                    sx={{ ...cellStyles, backgroundColor: '#fff !important' }}
                    align="center"
                    rowSpan={3}
                    padding="none"
                  >
                    Спец. підгрупа
                  </TableCell>

                  <TableCell
                    sx={{ ...cellStyles, p: 1, backgroundColor: '#fff !important' }}
                    align="center"
                    padding="none"
                  >
                    Лекції
                  </TableCell>
                  <TableCell
                    sx={{ ...cellStyles, p: 1, backgroundColor: '#fff !important' }}
                    align="center"
                    padding="none"
                  >
                    Практичні
                  </TableCell>
                  <TableCell
                    sx={{ ...cellStyles, p: 1, backgroundColor: '#fff !important' }}
                    align="center"
                    padding="none"
                  >
                    Лабораторні
                  </TableCell>
                  <TableCell
                    sx={{ ...cellStyles, p: 1, backgroundColor: '#fff !important' }}
                    align="center"
                    padding="none"
                  >
                    Семінари
                  </TableCell>
                  <TableCell
                    sx={{ ...cellStyles, p: 1, backgroundColor: '#fff !important' }}
                    align="center"
                    padding="none"
                  >
                    Екзамени
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {/* {groupLessonsByName(plan.subjects).map((row, index: number) => { */}
                {(!group.groupLoad ? [] : groupLessonsByNameAndSemester(group.groupLoad)).map((row, index: number) => {
                  const isItemSelected = selectedLesson?.id === row[0].id
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                      key={row[0].name + row[0].semester}
                      onClick={() => setSelectedLesson(row[0])}
                    >
                      <TableCell
                        sx={{
                          ...cellStyles,
                          minWidth: '250px !important',
                          position: 'relative',
                          ':hover *': { display: 'flex !important' },
                        }}
                        component="th"
                        id={labelId}
                        scope="row"
                        align="left"
                      >
                        <Typography sx={{ flexGrow: 1 }}>{row[0].name}</Typography>
                      </TableCell>
                      <TableCell sx={cellStyles} align="center">
                        {row[0].semester}
                      </TableCell>

                      <TableCell
                        key={index}
                        sx={{
                          ...cellStyles,
                          cursor: 'pointer',
                          ':hover': { background: 'rgba(0, 0, 0, 0.05);' },
                        }}
                        align="center"
                      >
                        {row[0].specialization ? row[0].specialization : '-'}
                      </TableCell>

                      {['lectures', 'practical', 'laboratory', 'seminars', 'exams'].map((lessonType, index) => {
                        const lesson = row.find((el) => el.typeEn === lessonType)

                        return (
                          <TableCell
                            key={index}
                            onClick={() => {}}
                            sx={{
                              ...cellStyles,
                              cursor: 'pointer',
                            }}
                            align="center"
                          >
                            {lesson ? lesson.hours : ''}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions sx={{ paddingBottom: '24px' }}>
          <Button
            type="submit"
            color="primary"
            variant="outlined"
            onClick={() => setSpecializationListModalVisible(true)}
            sx={{ textTransform: 'capitalize', marginRight: 'auto', marginLeft: '16px', p: '7.44px 15px' }}
          >
            Редагувати спеціалізовані підгрупи
          </Button>

          <Button
            type="submit"
            color="secondary"
            variant="outlined"
            onClick={handleClose}
            sx={{
              textTransform: 'capitalize',
              maxWidth: '140px',
              marginLeft: 'auto',
              p: '7.44px 15px',
              width: '100%',
            }}
          >
            Закрити
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SpecializationModal
