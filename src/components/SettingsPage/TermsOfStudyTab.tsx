import React from "react"
import { Button, Typography } from "@mui/material"

import { useAppDispatch } from "../../store/store"
import { CustomDatePicker } from "../CustomDatePicker"
import { updateSemesterTerms } from "../../store/settings/settingsAsyncActions"
import { settingsSelector } from "../../store/settings/settingsSlice"
import { useSelector } from "react-redux"

const semesterTermsInitialState = {
  firstSemesterStart: "09.01.2023",
  firstSemesterEnd: "12.24.2023",
  secondSemesterStart: "02.01.2024",
  secondSemesterEnd: "06.30.2024",
}

const TermsOfStudyTab = () => {
  const dispatch = useAppDispatch()

  const { settings } = useSelector(settingsSelector)

  const [isFetching, setIsFetching] = React.useState(false)
  const [semesterTerms, setSemesterTerms] = React.useState(semesterTermsInitialState)

  const handleChangeSemesterTerms = (key: keyof typeof semesterTermsInitialState, value: string) => {
    setSemesterTerms((prev) => ({ ...prev, [key]: value }))
  }

  const fetchSemesterTerms = async () => {
    try {
      setIsFetching(true)
      await dispatch(updateSemesterTerms(semesterTerms))
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetching(false)
    }
  }

  React.useEffect(() => {
    if (!settings) return

    setSemesterTerms((prev) => ({
      ...prev,
      firstSemesterStart: settings.firstSemesterStart,
      firstSemesterEnd: settings.firstSemesterEnd,
      secondSemesterStart: settings.secondSemesterStart,
      secondSemesterEnd: settings.secondSemesterEnd,
    }))
  }, [settings])

  return (
    <div>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
        Терміни навчання
      </Typography>

      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Перший семестр
      </Typography>
      <div
        style={{
          gap: "16px",
          display: "flex",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <CustomDatePicker
          label="Початок"
          value={semesterTerms.firstSemesterStart}
          setValue={(e) => handleChangeSemesterTerms("firstSemesterStart", e)}
        />
        <CustomDatePicker
          label="Кінець"
          value={semesterTerms.firstSemesterEnd}
          setValue={(e) => handleChangeSemesterTerms("firstSemesterEnd", e)}
        />
      </div>

      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Другий семестр
      </Typography>
      <div
        style={{
          gap: "16px",
          display: "flex",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <CustomDatePicker
          label="Початок"
          value={semesterTerms.secondSemesterStart}
          setValue={(e) => handleChangeSemesterTerms("secondSemesterStart", e)}
        />
        <CustomDatePicker
          label="Кінець"
          value={semesterTerms.secondSemesterEnd}
          setValue={(e) => handleChangeSemesterTerms("secondSemesterEnd", e)}
        />
      </div>

      <div style={{ maxWidth: "320px", margin: "0 auto" }}>
        <Button
          type="submit"
          color="primary"
          variant="outlined"
          disabled={isFetching}
          onClick={fetchSemesterTerms}
          sx={{ textTransform: "capitalize", width: "100%", p: "7.44px 15px", mt: 3 }}
        >
          {isFetching ? "Завантаження..." : "Зберегти"}
        </Button>
      </div>
    </div>
  )
}

export default TermsOfStudyTab
