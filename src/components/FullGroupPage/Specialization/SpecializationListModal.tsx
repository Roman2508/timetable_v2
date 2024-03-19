import {
  Stack,
  Table,
  Dialog,
  Tooltip,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
  OutlinedInput,
  TableContainer,
} from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { EditOutlined, CheckOutlined, CloseOutlined, DeleteOutlined, CloseSquareOutlined } from '@ant-design/icons'

import { useAppDispatch } from '../../../store/store'
import {
  createSpecialization,
  deleteSpecialization,
  updateSpecialization,
} from '../../../store/groups/groupsAsyncActions'

interface ISpecializationListProps {
  open: boolean
  groupId: number
  specializationList: string[]
  setOpen: Dispatch<SetStateAction<boolean>>
}

const cellStyles = {
  borderBottom: '1px solid rgb(220, 220, 220)',
  p: '4px 10px',
  minWidth: '100px',
}

const SpecializationListModal: React.FC<ISpecializationListProps> = ({
  open,
  groupId,
  setOpen,
  specializationList,
}) => {
  const dispatch = useAppDispatch()

  const [selectedSpecialization, setSelectedSpecialization] = React.useState('')
  const [oldName, setOldName] = React.useState('')

  const {
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<{ name: string }>({ mode: 'onBlur' })

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
    try {
      if (selectedSpecialization) {
        dispatch(updateSpecialization({ newName: data.name, oldName, groupId }))
        reset({ name: '' })
        setSelectedSpecialization('')
      } else {
        dispatch(createSpecialization({ name: data.name, groupId }))
        reset({ name: '' })
        setSelectedSpecialization('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onDeleteSpecGroup = (name: string) => {
    if (window.confirm('Ви дійсно хочете видалити спец. підгрупу')) {
      dispatch(deleteSpecialization({ groupId, name }))
    }
  }

  return (
    <Dialog
      open={open}
      maxWidth={'sm'}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <DialogTitle>{'Спеціалізовані підгрупи'}</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>
      <DialogContent sx={{ padding: '0 24px 20px' }}>
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
            stickyHeader
            aria-labelledby="tableTitle"
            sx={{
              '& .MuiTableCell-root:first-of-type': { pl: 2 },
              '& .MuiTableCell-root:last-of-type': { pr: 3 },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ ...cellStyles, backgroundColor: '#fff !important' }} align="center" padding="none">
                  №
                </TableCell>

                <TableCell sx={{ ...cellStyles, backgroundColor: '#fff !important' }} align="center" padding="none">
                  Назва спеціалізованої підгрупи
                </TableCell>

                <TableCell sx={{ ...cellStyles, backgroundColor: '#fff !important' }} align="center" padding="none">
                  Дії
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {specializationList.map((row, index: number) => {
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    key={row}
                    tabIndex={-1}
                    role="checkbox"
                    selected={row === selectedSpecialization}
                    sx={{ ':hover .spec-table-actions': { visibility: 'visible !important' } }}
                  >
                    <TableCell sx={cellStyles} align="center" component="th" id={labelId} scope="row">
                      <Typography sx={{ flexGrow: 1 }}>{index + 1}</Typography>
                    </TableCell>

                    <TableCell sx={cellStyles} align="center">
                      {row}
                    </TableCell>

                    <TableCell sx={cellStyles}>
                      <div className="spec-table-actions" style={{ visibility: 'hidden' }}>
                        <Tooltip title="Редагувати спец. підгрупу">
                          <IconButton
                            disabled={isSubmitting}
                            onClick={() => {
                              setOldName(row)
                              setValue('name', row)
                              setSelectedSpecialization(row)
                            }}
                          >
                            <EditOutlined />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Видалити спец. підгрупу">
                          <IconButton disabled={isSubmitting} onClick={() => onDeleteSpecGroup(row)}>
                            <DeleteOutlined />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: 'flex',
            alignItems: 'cener',
            justifyContent: 'center',
            gap: 10,
            marginTop: '20px',
          }}
        >
          <Tooltip title={selectedSpecialization ? 'Оновити спец. підгрупу' : 'Створити спец. підгрупу'}>
            <IconButton disabled={isSubmitting} type="submit">
              <CheckOutlined />
            </IconButton>
          </Tooltip>

          <Tooltip title="Відмінити зміни">
            <IconButton
              disabled={isSubmitting}
              onClick={() => {
                setValue('name', '')
                setSelectedSpecialization('')
              }}
            >
              <CloseSquareOutlined />
            </IconButton>
          </Tooltip>

          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <Stack spacing={1}>
                  <OutlinedInput
                    id="name"
                    {...field}
                    name="name"
                    error={Boolean(errors.name)}
                    placeholder="Назва підгрупи*"
                  />
                </Stack>
              )
            }}
          />
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default SpecializationListModal
