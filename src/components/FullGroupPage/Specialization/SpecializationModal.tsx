import {
  Table,
  Stack,
  Dialog,
  Button,
  Tooltip,
  MenuItem,
  TextField,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
} from '@mui/material'
import { useSelector } from 'react-redux'
import React, { Dispatch, SetStateAction } from 'react'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

import { useAppDispatch } from '../../../store/store'
import SpecializationListModal from './SpecializationListModal'
import { GroupLoadType } from '../../../store/groups/groupsTypes'
import { groupsSelector } from '../../../store/groups/groupsSlice'
import SpecializationModalTableBody from './SpecializationModalTableBody'
import { SpecializationModalTableHead } from './SpecializationModalTableHead'
import { attachSpecialization } from '../../../store/groups/groupsAsyncActions'

interface ISelectPlanModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const SpecializationModal: React.FC<ISelectPlanModalProps> = ({ open, setOpen }) => {
  const dispatch = useAppDispatch()

  const [specializationListModalVisible, setSpecializationListModalVisible] = React.useState(false)
  const [selectedLesson, setSelectedLesson] = React.useState<GroupLoadType | null>(null)
  const [specializationList, setSpecializationList] = React.useState([
    { label: 'Спеціалізація відсутня', value: 'Спеціалізація відсутня' },
    { label: 'Не вивчається', value: 'Не вивчається' },
  ])
  const [selectedSpecialization, setSelectedSpecialization] = React.useState(specializationList[0].value)

  const { group } = useSelector(groupsSelector)

  React.useEffect(() => {
    if (group) {
      setSpecializationList((prev) => {
        return [...prev, ...group.specializationList.map((el) => ({ label: el, value: el }))]
      })
    }
  }, [group.specializationList])

  const handleClose = () => {
    setOpen(false)
  }

  const onAttachSpecialization = () => {
    if (!selectedLesson) return
    const specializationName = selectedSpecialization === 'Спеціалізація відсутня' ? null : selectedSpecialization
    dispatch(
      attachSpecialization({
        name: specializationName,
        groupId: selectedLesson.group.id,
        planSubjectId: selectedLesson.planSubjectId.id,
      })
    )
  }

  return (
    <>
      <SpecializationListModal
        groupId={group.id}
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
                value={selectedSpecialization}
                defaultValue={'Спеціалізація відсутня'}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                sx={{ width: '240px', p: '16px 8px', '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem' } }}
              >
                {specializationList.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <Tooltip title="Підтвердити зміни">
              <IconButton sx={{ mr: '24px' }} type="submit" onClick={onAttachSpecialization} disabled={!selectedLesson}>
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
              <SpecializationModalTableHead />

              <SpecializationModalTableBody
                groupLoad={group.groupLoad}
                selectedLesson={selectedLesson}
                setSelectedLesson={setSelectedLesson}
                setSelectedSpecialization={setSelectedSpecialization}
              />
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions sx={{ paddingBottom: '24px' }}>
          <Button
            type="submit"
            color="primary"
            variant="outlined"
            onClick={() => setSpecializationListModalVisible(true)}
            sx={{
              textTransform: 'capitalize',
              marginRight: 'auto',
              marginLeft: '16px',
              p: '7.44px 15px',
            }}
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
