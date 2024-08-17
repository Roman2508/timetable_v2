import React from "react"
import { MuiColorInput } from "mui-color-input"
import { Button, Typography } from "@mui/material"

import { useAppDispatch } from "../../store/store"
import { updateColors } from "../../store/settings/settingsAsyncActions"
import { useSelector } from "react-redux"
import { settingsSelector } from "../../store/settings/settingsSlice"

const colorsInitialState = {
  ["Лекції"]: "#fffffff" as string,
  ["Практичні"]: "#fffffff" as string,
  ["Лабораторні"]: "#fffffff" as string,
  ["Семінари"]: "#fffffff" as string,
  ["Екзамен"]: "#fffffff" as string,
} as const

const ColorsTab = () => {
  const dispatch = useAppDispatch()

  const { settings } = useSelector(settingsSelector)

  const [colors, setColors] = React.useState(colorsInitialState)
  const [isFetching, setIsFetching] = React.useState(false)

  const handleChangeColor = (type: string, newColor: string) => {
    setColors((prev) => ({ ...prev, [type]: newColor }))
  }

  const fetchColors = async () => {
    try {
      setIsFetching(true)
      const payload = {
        lectures: colors["Лекції"],
        practical: colors["Практичні"],
        laboratory: colors["Лабораторні"],
        seminars: colors["Семінари"],
        exams: colors["Екзамен"],
      }
      await dispatch(updateColors(payload))
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetching(false)
    }
  }

  React.useEffect(() => {
    if (!settings) return
    setColors((prev) => {
      return {
        ...prev,
        ["Лекції"]: settings.colors.lectures,
        ["Практичні"]: settings.colors.practical,
        ["Лабораторні"]: settings.colors.laboratory,
        ["Семінари"]: settings.colors.seminars,
        ["Екзамен"]: settings.colors.exams,
      }
    })
  }, [settings])

  return (
    <div>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
        Налаштування кольорів
      </Typography>

      {(["Лекції", "Практичні", "Лабораторні", "Семінари", "Екзамен"] as const).map((el) => {
        return (
          <div
            key={el}
            style={{
              gap: "16px",
              display: "flex",
              marginBottom: "6px",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "left", mt: 1, width: "90px" }}>
              {el}
            </Typography>
            <MuiColorInput value={colors[el]} onChange={(newColor) => handleChangeColor(el, newColor)} />
          </div>
        )
      })}

      <div style={{ maxWidth: "370px", margin: "0 auto" }}>
        <Button
          type="submit"
          color="primary"
          variant="outlined"
          onClick={fetchColors}
          disabled={isFetching}
          sx={{ textTransform: "capitalize", width: "100%", p: "7.44px 15px", mt: 3 }}
        >
          {isFetching ? "Завантаження..." : "Зберегти"}
        </Button>
      </div>
    </div>
  )
}

export default ColorsTab
