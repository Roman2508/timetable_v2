import {
  Dialog,
  Button,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material"
import { CloseOutlined } from "@ant-design/icons"
import React, { Dispatch, SetStateAction } from "react"

import { useAppDispatch } from "../../store/store"
import { StreamsType } from "../../store/streams/streamsTypes"
import { GroupCategoriesType } from "../../store/groups/groupsTypes"
import { AccordionItemsList } from "../AccordionItemsList/AccordionItemsList"
import { addGroupToStream } from "../../store/streams/streamsAsyncActions"

interface IAddGroupsToStreamModalProps {
  open: boolean
  selectedStream: null | StreamsType
  setOpen: Dispatch<SetStateAction<boolean>>
  groupCategories: GroupCategoriesType[] | null
  setSelectedStream: Dispatch<SetStateAction<StreamsType | null>>
}

const AddGroupsToStreamModal: React.FC<IAddGroupsToStreamModalProps> = ({
  open,
  setOpen,
  selectedStream,
  groupCategories,
  setSelectedStream,
}) => {
  const dispatch = useAppDispatch()

  const handleClose = () => {
    setOpen(false)
  }

  const onAddGroupToStream = async (groupId: number) => {
    if (!selectedStream) return alert("Виберіть потік")
    // if (!selectedGroupId) return alert("Виберіть групу")
    const { payload } = await dispatch(addGroupToStream({ groupId, streamId: selectedStream.id }))
    setSelectedStream(payload as StreamsType)
  }

  React.useEffect(() => {}, [selectedStream])

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
        <DialogTitle id="alert-dialog-title">{"Додати групу до потоку"}</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>

      <DialogContent sx={{ padding: "0 24px 20px" }}>
        <AccordionItemsList
          onSelectItem={onAddGroupToStream}
          items={groupCategories ? groupCategories : []}
        />
      </DialogContent>
    </Dialog>
  )
}

export { AddGroupsToStreamModal }
