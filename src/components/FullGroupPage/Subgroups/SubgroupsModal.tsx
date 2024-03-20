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
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import React, { Dispatch, SetStateAction } from 'react'

import { useAppDispatch } from '../../../store/store'
import { GroupLoadType } from '../../../store/groups/groupsTypes'
import { groupsSelector } from '../../../store/groups/groupsSlice'
import { SubgroupsModalTableHead } from './SubgroupsModalTableHead'
import { attachSpecialization } from '../../../store/groups/groupsAsyncActions'
import { SubgroupsCountModal } from './SubgroupsCountModal'
import { SubgroupsModalTableBody } from './SubgroupsModalTableBody'

interface ISelectPlanModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const SubgroupsModal: React.FC<ISelectPlanModalProps> = ({ open, setOpen }) => {
  const dispatch = useAppDispatch()

  const [subgroupsCountModalVisible, setSubgroupsCountModalVisible] = React.useState(false)
  const [selectedLesson, setSelectedLesson] = React.useState<GroupLoadType[] | null>(null)

  const { group } = useSelector(groupsSelector)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <SubgroupsCountModal
        groupId={group.id}
        selectedLesson={selectedLesson}
        open={subgroupsCountModalVisible}
        setOpen={setSubgroupsCountModalVisible}
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
          <DialogTitle>{'Підгрупи'}</DialogTitle>

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
              <SubgroupsModalTableHead />

              <SubgroupsModalTableBody
                groupLoad={group.groupLoad}
                selectedLesson={selectedLesson}
                setSelectedLesson={setSelectedLesson}
              />
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions sx={{ paddingBottom: '24px' }}>
          <Button
            type="submit"
            color="primary"
            variant="outlined"
            onClick={() => setSubgroupsCountModalVisible(true)}
            sx={{
              textTransform: 'inherit',
              marginRight: 'auto',
              marginLeft: '16px',
              p: '7.44px 15px',
            }}
          >
            Редагувати кількість підгруп
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

export { SubgroupsModal }
