import { Button, Typography } from "@mui/material"
import React from "react"
import { CustomDatePicker } from "../CustomDatePicker"
import { useAppDispatch } from "../../store/store"
import { updateCallSchedule } from "../../store/settings/settingsAsyncActions"
import { useSelector } from "react-redux"
import { settingsSelector } from "../../store/settings/settingsSlice"

const lessons = ["1", "2", "3", "4", "5", "6", "7"] as const

const callScheduleInitialState = {
  ["1"]: { start: "08:30", end: "09:50" },
  ["2"]: { start: "10:00", end: "11:20" },
  ["3"]: { start: "12:00", end: "13:20" },
  ["4"]: { start: "13:30", end: "14:50" },
  ["5"]: { start: "15:00", end: "16:20" },
  ["6"]: { start: "16:30", end: "17:50" },
  ["7"]: { start: "18:00", end: "19:20" },
}

const CallSchedulTab = () => {
  const dispatch = useAppDispatch()

  const { settings } = useSelector(settingsSelector)

  const [isFetching, setIsFetching] = React.useState(false)
  const [callSchedule, setCallSchedule] = React.useState(callScheduleInitialState)

  const handleChangeCallSchedule = (key: (typeof lessons)[number], value: "start" | "end", newTime: string) => {
    setCallSchedule((prev) => ({ ...prev, [key]: { ...prev[key], [value]: newTime } }))
  }

  const fetchCallSchedule = async () => {
    try {
      setIsFetching(true)
      await dispatch(updateCallSchedule(callSchedule))
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetching(false)
    }
  }

  React.useEffect(() => {
    if (!settings) return
    setCallSchedule((prev) => ({ ...prev, ...settings.callSchedule }))
  }, [settings])

  return (
    <div>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
        Розклад дзвінків
      </Typography>

      {lessons.map((el) => {
        return (
          <div
            key={el}
            style={{
              gap: "16px",
              display: "flex",
              marginBottom: "6px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" sx={{ textAlign: "center", mt: 1 }}>
              {el}.
            </Typography>

            <CustomDatePicker
              type="time"
              label="Початок"
              value={callSchedule[el].start}
              setValue={(newTime) => handleChangeCallSchedule(el, "start", newTime)}
            />
            <CustomDatePicker
              type="time"
              label="Кінець"
              value={callSchedule[el].end}
              setValue={(newTime) => handleChangeCallSchedule(el, "end", newTime)}
            />
          </div>
        )
      })}
      <div style={{ maxWidth: "350px", margin: "0 auto" }}>
        <Button
          type="submit"
          color="primary"
          variant="outlined"
          disabled={isFetching}
          onClick={fetchCallSchedule}
          sx={{ textTransform: "capitalize", width: "100%", p: "7.44px 15px", mt: 3 }}
        >
          {isFetching ? "Завантаження..." : "Зберегти"}
        </Button>
      </div>
    </div>
  )
}

export default CallSchedulTab
