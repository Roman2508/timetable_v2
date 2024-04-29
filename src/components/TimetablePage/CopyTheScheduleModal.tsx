import {
  List,
  Dialog,
  Tooltip,
  IconButton,
  Typography,
  ListItemText,
  DialogContent,
  Tabs,
  Box,
  Tab,
  ListItemButton,
  Divider,
  DialogActions,
  Button,
} from "@mui/material"
import { CloseOutlined } from "@ant-design/icons"
import React, { Dispatch, SetStateAction } from "react"
import { useAppDispatch } from "../../store/store"
import { CustomDatePicker } from "../CustomDatePicker"

interface ICopyTheScheduleModalProps {
  open: boolean
  currentWeekNumber: number
  setOpen: Dispatch<SetStateAction<boolean>>
}

const CopyTheScheduleModal: React.FC<ICopyTheScheduleModalProps> = ({ open, setOpen, currentWeekNumber }) => {
  const dispatch = useAppDispatch()

  const [activeTabIndex, setActiveTabIndex] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTabIndex(newValue)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      onClose={() => {
        handleClose()
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ "& .MuiPaper-root": { width: "400px" } }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "8px",
        }}
      >
        <Typography sx={{ ml: 2 }}>Копіювати розклад</Typography>

        <div>
          <Tooltip title="Закрити">
            <IconButton sx={{ mr: 1 }} onClick={() => handleClose()}>
              <CloseOutlined />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <Divider />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={activeTabIndex} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{ width: "50%" }} label="Копіювати тиждень" id="0" />
          <Tab sx={{ width: "50%" }} label="Копіювати день" id="1" />
        </Tabs>
      </Box>

      {/* copy week */}
      {activeTabIndex === 0 && (
        <DialogContent sx={{ padding: "0", mt: 1 }}>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <List sx={{ p: 0, "& .MuiListItemButton-root": { py: 1 } }}>
                {Array(20)
                  .fill(null)
                  .map((el, i) => (
                    <ListItemButton key={i} divider sx={{ py: 0 }} onClick={() => {}}>
                      <ListItemText primary={`${i + 1}. (29.04 - 05.05)`} sx={{ p: "0 0 0 10px" }} />
                    </ListItemButton>
                  ))}
              </List>
            </div>

            <div>
              <Divider orientation="vertical" />
            </div>

            <div style={{ width: "50%" }}>
              <List sx={{ p: 0, "& .MuiListItemButton-root": { py: 1 } }}>
                {Array(20)
                  .fill(null)
                  .map((el, i) => (
                    <ListItemButton key={i} divider sx={{ py: 0 }} onClick={() => {}}>
                      <ListItemText primary={`${i + 1}. (29.04 - 05.05)`} sx={{ p: "0 0 0 10px" }} />
                    </ListItemButton>
                  ))}
              </List>
            </div>
          </div>
        </DialogContent>
      )}

      {/* copy day */}
      {activeTabIndex === 1 && (
        <DialogContent sx={{ mt: 1 }}>
          <CustomDatePicker
            width="100%"
            label="Копіювати з:"
            /* setValue={setValue}  */
            /* value={settings.firstSemesterStart}  */
          />

          <br />

          <CustomDatePicker width="100%" label="Копіювати на:" />
        </DialogContent>
      )}

      <Divider />

      <DialogActions sx={{ p: 2 }}>
        <Button variant="contained">Копіювати</Button>
      </DialogActions>
    </Dialog>
  )
}

export { CopyTheScheduleModal }
