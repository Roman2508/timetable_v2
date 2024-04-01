import React from "react"
import { useSelector } from "react-redux"
import { Grid, Typography } from "@mui/material"

import MainCard from "../../components/MainCard"
import { CustomDatePicker } from "../../components/CustomDatePicker"
import { settingsSelector } from "../../store/settings/settingsSlice"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"

// ==============================|| TIMETABLE ||============================== //

const SettingsPage = () => {
  const [value, setValue] = React.useState("")

  const { settings } = useSelector(settingsSelector)

  if (!settings) return <LoadingSpinner />

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: "center", p: 0 }}>
        <Grid item xs={12}>
          <Typography variant="h5">Налаштування</Typography>
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", pt: "24px !important" }}>
          <Grid item xs={6} sx={{ mr: 2 }}>
            <MainCard sx={{ "& .MuiCardContent-root": { px: 1 } }}>
              <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
                Терміни навчання
              </Typography>

              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Перший семестр
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <CustomDatePicker
                  label="Початок"
                  setValue={setValue}
                  value={settings.firstSemesterStart}
                />
                <CustomDatePicker label="Кінець" value={settings.firstSemesterEnd} />
              </div>

              <Typography variant="h6" sx={{ textAlign: "center" }}>
                Другий семестр
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <CustomDatePicker label="Початок" value={settings.secondSemesterStart} />
                <CustomDatePicker label="Кінець" value={settings.secondSemesterEnd} />
              </div>
            </MainCard>

            <MainCard sx={{ mt: 2, "& .MuiCardContent-root": { px: 1 } }}>
              <br />
              Налаштування кольорів
            </MainCard>
          </Grid>

          <Grid item xs={6}>
            <MainCard sx={{ "& .MuiCardContent-root": { px: 1 } }}>
              <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
                Розклад дзвінків
              </Typography>

              {["1", "2", "3", "4", "5", "6", "7"].map((el) => {
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
                      /* @ts-ignore */
                      value={settings.callSchedule[el].start}
                    />
                    <CustomDatePicker
                      type="time"
                      label="Кінець"
                      /* @ts-ignore */
                      value={settings.callSchedule[el].end}
                    />
                  </div>
                )
              })}
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export { SettingsPage }
