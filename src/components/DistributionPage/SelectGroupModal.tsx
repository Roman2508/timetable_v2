import { CloseOutlined } from '@ant-design/icons'
import React, { Dispatch, SetStateAction } from 'react'
import { Dialog, Button, IconButton, DialogTitle, DialogContent, DialogActions } from '@mui/material'

import { GroupCategoriesType, GroupLoadType } from '../../store/groups/groupsTypes'
import { AccordionItemsList } from '../AccordionItemsList/AccordionItemsList'

interface ISelectGroupModalProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  groupCategories: GroupCategoriesType[] | null
  setSelectedLesson: Dispatch<SetStateAction<GroupLoadType[] | null>>
  setSelectedGroup: Dispatch<SetStateAction<{ id: number; name: string } | null>>
}

const SelectGroupModal: React.FC<ISelectGroupModalProps> = (props) => {
  const { open, setOpen, groupCategories, setSelectedGroup, setSelectedLesson } = props

  const [groupId, setGroupId] = React.useState<number | null>(null)
  const [groupName, setGroupName] = React.useState<string | null>(null)

  const handleClose = () => {
    setOpen(false)
  }

  const onSelectGroup = () => {
    if (groupId && groupName) {
      setSelectedGroup({ id: groupId, name: groupName })
      setSelectedLesson(null)
      handleClose()
    } else {
      alert('Групу не вибрано')
    }
  }

  return (
    <Dialog open={open} maxWidth="sm" onClose={handleClose} sx={{ '& .MuiPaper-root': { width: '100%' } }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle>{`Відкрити навантаження групи: ${groupName ? groupName : ''}`}</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>

      <DialogContent sx={{ padding: '0 24px 20px' }}>
        <AccordionItemsList
          selectedItemId={groupId}
          items={groupCategories ? groupCategories : []}
          onSelectItem={(groupId) => {
            setGroupName(null)
            setGroupId(groupId)
          }}
          getSelectedItemName={(name) => setGroupName(name)}
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
