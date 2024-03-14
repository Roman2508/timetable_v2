import {
  Stack,
  Table,
  Dialog,
  Button,
  TableRow,
  TableHead,
  TableCell,
  Typography,
  TableBody,
  IconButton,
  DialogTitle,
  DialogContent,
  OutlinedInput,
  TableContainer,
  Tooltip,
} from '@mui/material'
import { CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons'
import React, { Dispatch, SetStateAction } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import { useAppDispatch } from '../../store/store'
import { createSpecialization } from '../../store/groups/groupsAsyncActions'
import { useParams } from 'react-router-dom'

interface ISpecializationListProps {
  open: boolean
  specializationList: string[]
  setOpen: Dispatch<SetStateAction<boolean>>
}

const cellStyles = {
  borderBottom: '1px solid rgb(220, 220, 220)',
  p: '4px 10px',
  minWidth: '100px',
}

const SpecializationListModal: React.FC<ISpecializationListProps> = ({ open, setOpen, specializationList }) => {
  const params = useParams()
  const dispatch = useAppDispatch()

  const [selectedSpecialization, setSelectedSpecialization] = React.useState('')

  const {
    reset,
    watch,
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
      if (!params.id) return
      dispatch(createSpecialization({ name: data.name, groupId: Number(params.id) }))
      reset({ name: '' })
    } catch (error) {
      console.log(error)
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
                    onClick={() => {
                      setValue('name', row)
                      setSelectedSpecialization(row)
                    }}
                  >
                    <TableCell sx={cellStyles} component="th" id={labelId} scope="row" align="center">
                      <Typography sx={{ flexGrow: 1 }}>{index + 1}</Typography>
                    </TableCell>
                    <TableCell sx={cellStyles} align="center">
                      {row}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', alignItems: 'cener', justifyContent: 'center', gap: 10, marginTop: '20px' }}
        >
          <Tooltip title="Видалити спец. підгрупу">
            <IconButton disabled={isSubmitting || !selectedSpecialization}>
              <DeleteOutlined />
            </IconButton>
          </Tooltip>

          <Tooltip title="Створити спец. підгрупу">
            <IconButton disabled={!watch('name') || isSubmitting}>
              <CheckOutlined />
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
                    placeholder="Назва підгрупи*"
                    error={Boolean(errors.name)}
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
