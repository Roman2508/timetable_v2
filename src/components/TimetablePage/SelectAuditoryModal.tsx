import { useSelector } from "react-redux"
import { CloseOutlined } from "@ant-design/icons"
import React, { Dispatch, SetStateAction } from "react"
import {
  Dialog,
  Button,
  IconButton,
  DialogTitle,
  DialogContent,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  DialogActions,
} from "@mui/material"

import { auditoriesSelector } from "../../store/auditories/auditoriesSlise"
import { AccordionItemsList } from "../AccordionItemsList/AccordionItemsList"
import { AuditoriesTypes } from "../../store/auditories/auditoriesTypes"

interface ISelectAuditoryModalProps {
  open: boolean
  selectedAuditoryId: number | null
  setOpen: Dispatch<SetStateAction<boolean>>
  setSelectedAuditoryId: Dispatch<SetStateAction<number | null>>
  setLessonActionsModalVisible: Dispatch<SetStateAction<boolean>>
}

const SelectAuditoryModal: React.FC<ISelectAuditoryModalProps> = ({
  open,
  setOpen,
  selectedAuditoryId,
  setSelectedAuditoryId,
  setLessonActionsModalVisible,
}) => {
  const { auditoriCategories } = useSelector(auditoriesSelector)

  const [auditoriesList, setAuditoriesList] = React.useState<AuditoriesTypes[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<number | null>(null)
  const [preConfirmationAuditoryId, setPreConfirmationAuditoryId] = React.useState<number | null>(null)

  const handleClose = () => {
    setOpen(false)
    setLessonActionsModalVisible(true)
  }

  const onSelectCategory = (id: number) => {
    if (!auditoriCategories) return
    setSelectedCategoryId(id)
    const category = auditoriCategories.find((el) => el.id === id)
    if (!category) return
    setAuditoriesList(category.auditories)
  }

  const onConfirmSelection = () => {
    if (!preConfirmationAuditoryId) return
    setSelectedAuditoryId(preConfirmationAuditoryId)
    handleClose()
  }

  // on first render set selected category and auditory if they exist
  React.useEffect(() => {
    if (!auditoriCategories || !selectedAuditoryId) return

    auditoriCategories.forEach((category) => {
      const auditory = category.auditories.find((el) => el.id === selectedAuditoryId)

      if (auditory) {
        onSelectCategory(category.id)
        setPreConfirmationAuditoryId(auditory.id)
      }
    })
  }, [auditoriCategories, selectedAuditoryId])

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ "& .MuiPaper-root": { width: "100%" } }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <DialogTitle id="alert-dialog-title">{"Аудиторії"}</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>

      <DialogContent sx={{ padding: "0 24px 20px" }}>
        <div className="auditory-modal-wrapper">
          <div className="auditory-modal__categories">
            <List sx={{ p: 0, "& .MuiListItemButton-root": { py: 1 } }}>
              {auditoriCategories?.map((category) => (
                <ListItemButton
                  divider
                  key={category.id}
                  sx={{ py: 0 }}
                  onClick={() => onSelectCategory(category.id)}
                  selected={category.id === selectedCategoryId}
                >
                  <ListItemText primary={category.name} sx={{ p: "0 0 0 10px" }} />
                </ListItemButton>
              ))}
            </List>
          </div>

          <div>
            <Divider orientation="vertical" sx={{ height: "100% !important" }} />
          </div>

          <div className="auditory-modal__list">
            <List sx={{ p: 0, "& .MuiListItemButton-root": { py: 1 } }}>
              {auditoriesList.map((auditory) => (
                <ListItemButton
                  divider
                  sx={{ py: 0 }}
                  key={auditory.id}
                  selected={auditory.id === preConfirmationAuditoryId}
                  onClick={() => setPreConfirmationAuditoryId(auditory.id)}
                >
                  <ListItemText primary={auditory.name} sx={{ p: "0 0 0 10px" }} />
                </ListItemButton>
              ))}
            </List>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          sx={{ mr: 2, mb: 1 }}
          onClick={onConfirmSelection}
          disabled={!preConfirmationAuditoryId}
        >
          Вибрати
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { SelectAuditoryModal }
