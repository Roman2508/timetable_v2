import { Dialog, Button, IconButton, DialogTitle, DialogContent } from "@mui/material"
import { CloseOutlined } from "@ant-design/icons"
import React, { Dispatch, SetStateAction } from "react"

import { useSelector } from "react-redux"
import { auditoriesSelector } from "../../store/auditories/auditoriesSlise"
import { AccordionItemsList } from "../AccordionItemsList/AccordionItemsList"

interface ISelectAuditoryProps {
  open: boolean
  selectedAuditoryId: number | null
  setOpen: Dispatch<SetStateAction<boolean>>
  setSelectedAuditoryId: Dispatch<SetStateAction<number | null>>
  setLessonActionsModalVisible: Dispatch<SetStateAction<boolean>>
}

const SelectAuditory: React.FC<ISelectAuditoryProps> = ({
  open,
  setOpen,
  selectedAuditoryId,
  setSelectedAuditoryId,
  setLessonActionsModalVisible,
}) => {
  const { auditoriCategories } = useSelector(auditoriesSelector)

  const handleClose = () => {
    setOpen(false)
    setLessonActionsModalVisible(true)
  }

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
        <AccordionItemsList
          selectedItemId={selectedAuditoryId}
          onSelectItem={setSelectedAuditoryId}
          items={auditoriCategories ? auditoriCategories : []}
        />
      </DialogContent>
    </Dialog>
  )
}

export { SelectAuditory }
