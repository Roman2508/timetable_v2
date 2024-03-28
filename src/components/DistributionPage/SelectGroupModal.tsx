import { CloseOutlined } from '@ant-design/icons'
import React, { Dispatch, SetStateAction } from 'react'
import { Dialog, Button, IconButton, DialogTitle, DialogContent, DialogActions } from '@mui/material'

import { GroupCategoriesType } from '../../store/groups/groupsTypes'
import { AccordionItemsList } from '../AccordionItemsList/AccordionItemsList'

interface ISelectGroupModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  groupCategories: GroupCategoriesType[] | null
  setSelectedGroupId: Dispatch<SetStateAction<number | null>>
}

const SelectGroupModal: React.FC<ISelectGroupModalProps> = ({ open, setOpen, groupCategories, setSelectedGroupId }) => {
  const [groupId, setGroupId] = React.useState<number | null>(null)

  const handleClose = () => {
    setOpen(false)
  }

  const onSelectGroup = () => {
    if (groupId) {
      setSelectedGroupId(groupId)
      handleClose()
    } else {
      alert('Групу не вибрано')
    }
  }

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ '& .MuiPaper-root': { width: '100%' } }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle id="alert-dialog-title">{'Відкрити навантаження групи:'}</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>

      <DialogContent sx={{ padding: '0 24px 20px' }}>
        <AccordionItemsList
          selectedItemId={groupId}
          items={groupCategories ? groupCategories : []}
          onSelectItem={(groupId) => setGroupId(groupId)}
        />
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={onSelectGroup}>
          Вибрати
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { SelectGroupModal }
