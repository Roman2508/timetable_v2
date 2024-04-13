import {
  List,
  Dialog,
  Button,
  Divider,
  Checkbox,
  IconButton,
  DialogTitle,
  ListItemText,
  DialogActions,
  DialogContent,
  ListItemButton,
  FormControlLabel,
} from "@mui/material"
import { useSelector } from "react-redux"
import { CloseOutlined } from "@ant-design/icons"
import React, { Dispatch, SetStateAction } from "react"

import { AuditoriesTypes } from "../../store/auditories/auditoriesTypes"
import { auditoriesSelector } from "../../store/auditories/auditoriesSlise"
import { scheduleLessonsSelector } from "../../store/scheduleLessons/scheduleLessonsSlice"

interface ISelectAuditoryModalProps {
  open: boolean
  isRemote: boolean
  selectedAuditoryId: number | null
  setOpen: Dispatch<SetStateAction<boolean>>
  setIsRemote: Dispatch<SetStateAction<boolean>>
  setSelectedAuditoryId: Dispatch<SetStateAction<number | null>>
  setLessonActionsModalVisible: Dispatch<SetStateAction<boolean>>
}

const SelectAuditoryModal: React.FC<ISelectAuditoryModalProps> = ({
  open,
  isRemote,
  setOpen,
  setIsRemote,
  selectedAuditoryId,
  setSelectedAuditoryId,
  setLessonActionsModalVisible,
}) => {
  const { auditoriCategories } = useSelector(auditoriesSelector)
  const { auditoryOverlay } = useSelector(scheduleLessonsSelector)

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
    setSelectedAuditoryId(preConfirmationAuditoryId)
    handleClose()
  }

  const checkAuditoryOverlay = () => {
    if (!auditoryOverlay) return

    const freeAuditories: AuditoriesTypes[] = []

    auditoriesList.forEach((el) => {
      const auditory = auditoryOverlay.find((a) => {
        if (!a) return
        return a.id === el.id
      })

      if (!auditory) {
        freeAuditories.push(el)
      }
    })

    setAuditoriesList(freeAuditories)
  }

  const onClickRemote = (isChecked: boolean) => {
    setIsRemote(isChecked)

    if (isChecked) {
      setPreConfirmationAuditoryId(null)
    } else {
      const firstAuditoryId = auditoriesList[0].id
      setPreConfirmationAuditoryId(firstAuditoryId)
    }
  }

  // on first render set selected category and auditory if they exist
  React.useEffect(() => {
    setPreConfirmationAuditoryId(null)
    if (!auditoriCategories) return

    if (!selectedAuditoryId) {
      onSelectCategory(auditoriCategories[0].id)
      return
    }

    auditoriCategories.forEach((category) => {
      const auditory = category.auditories.find((el) => el.id === selectedAuditoryId)

      if (auditory) {
        onSelectCategory(category.id)

        if (!isRemote) {
          setPreConfirmationAuditoryId(auditory.id)
        }
      }
    })
  }, [auditoriCategories, selectedAuditoryId])

  // check all free auditories
  React.useEffect(() => {
    checkAuditoryOverlay()
  }, [auditoryOverlay, selectedCategoryId])

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
                  onClick={() => {
                    setIsRemote(false)
                    setPreConfirmationAuditoryId(auditory.id)
                  }}
                >
                  <ListItemText primary={auditory.name} sx={{ p: "0 0 0 10px" }} />
                </ListItemButton>
              ))}
            </List>
          </div>
        </div>
      </DialogContent>

      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <FormControlLabel
          sx={{ ml: 2, mb: 1 }}
          checked={isRemote}
          onChange={(e) => {
            // console.log(e.target.value)
            // @ts-ignore
            onClickRemote(!isRemote)
          }}
          control={<Checkbox defaultChecked={isRemote} checked={isRemote} />}
          label={"Дистанційно"}
        />

        <Button
          variant="contained"
          sx={{ mr: 2, mb: 1 }}
          onClick={onConfirmSelection}
          disabled={!preConfirmationAuditoryId && !isRemote}
        >
          Вибрати
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export { SelectAuditoryModal }
