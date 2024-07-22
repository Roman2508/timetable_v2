import React from "react"
import { Checkbox, Chip, Divider, FormControlLabel, TextareaAutosize, Typography } from "@mui/material"

import { CustomDatePicker } from "../CustomDatePicker"
import { menuSelector } from "../../store/menu/menuSlice"
import { useSelector } from "react-redux"

const data = [
  {
    id: 1,
    name: "Методична робота",
    items: [
      { id: 1, name: "Створення силабуса навчальної дисципліни", hours: 50, description: "" },
      { id: 2, name: "Складання завдання для поточного тестового контролю (розділ)", hours: 50, description: "" },
      { id: 3, name: "Складання зібрника тестових завдань з дисципліни", hours: 50, description: "" },
      {
        id: 4,
        name: "Складання завдань для вхідного контролю знань студентів заочної форми навчання (вперше за новою робочою програмою)",
        hours: 50,
        description: "",
      },
      { id: 5, name: "Підготовка відеоматеріалу для використання на навчальному занятті", hours: 50, description: "" },
      { id: 6, name: "Створення щоденника-звіту з практики", hours: 50, description: "" },
    ],
  },
  {
    id: 1,
    name: "Наукова робота",
    items: [
      { id: 1, name: "Участь в організації викладацької конференції", hours: 50, description: "" },
      { id: 2, name: "Керівництво пошуково-дослідною роботою студента", hours: 50, description: "" },
      {
        id: 3,
        name: "Написання конкурсної роботи для представлення на обласному, регіональному рівні",
        hours: 50,
        description: "",
      },
      { id: 4, name: "Участь у коледжній науково-методичній виставці", hours: 50, description: "" },
      { id: 5, name: "Участь у роботі обласного методичного об'єднання без доповіді", hours: 50, description: "" },
      { id: 6, name: "Підготовка доповіді на засідання ЦК", hours: 50, description: "" },
    ],
  },
  {
    id: 1,
    name: "Організаційна робота",
    items: [
      { id: 1, name: "Оформлення паспорту кабінета", hours: 50, description: "" },
      { id: 2, name: "Організація проведення заходів, свят, концертів коледжного рівня", hours: 50, description: "" },
      { id: 3, name: "Складання плану роботи кабінету", hours: 50, description: "" },
      { id: 4, name: "Участь у виховній роботі студентського колективу", hours: 50, description: "" },
      { id: 5, name: "Участь у профорієнтаційній роботі", hours: 50, description: "" },
      {
        id: 6,
        name: "Діяльність як члена атестаційної комісії викладачів ( І рівня та/або ІІ рівня)",
        hours: 50,
        description: "",
      },
    ],
  },
]

const IndividualTeacherWorkPlan = () => {
  const { drawerOpen } = useSelector(menuSelector)

  const [checked, setChecked] = React.useState<string[]>([])

  const handleCheckedChange = (name: string) => {
    setChecked((prev) => {
      const isExist = prev.find((el) => el === name)

      if (isExist) {
        return prev.filter((el) => el !== name)
      }

      return [...prev, name]
    })
  }

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "fixed",
          zIndex: "99",
          right: 0,
          bottom: 0,
          left: drawerOpen ? 260 : 0,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          style={{
            background: "#fff",
            display: "inline-block",
            padding: "16px",
            width: "100%",
            maxWidth: drawerOpen ? "1620px" : "1770px",
          }}
        >
          Заплановано на навчальний рік 0 годин.
        </Typography>
      </div>

      {data.map((category) => (
        <div key={category.id}>
          <Divider>
            <Chip label={category.name} size="medium" />
          </Divider>

          {category.items.map((el) => {
            const isChecked = checked.find((item) => item === el.name)

            return (
              <div key={el.id} style={{ padding: "16px", border: "1px solid #f0f0f0", margin: "10px 0" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => handleCheckedChange(el.name)}
                        value={Boolean(isChecked)}
                        checked={Boolean(isChecked)}
                      />
                    }
                    label={el.name}
                    sx={{ userSelect: "none" }}
                  />

                  <Chip label={el.hours} sx={{ userSelect: "none" }} size="small" variant="outlined" />
                </div>

                {isChecked && (
                  <div style={{ display: "flex" }}>
                    <CustomDatePicker
                      //   value={}
                      sx={{ paddingTop: "0 !important", "& .MuiInputBase-root": { height: "42px !important" } }}
                      setValue={(e) => console.log("firstSemesterEnd", e)}
                    />
                    <TextareaAutosize
                      color="neutral"
                      placeholder="Зміст роботи"
                      minRows={2}
                      style={{
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                        marginLeft: "16px",
                        fontSize: "16px",
                        outline: "none",
                        resize: "none",
                        width: "100%",
                      }}
                    />
                  </div>
                )}

                {/* {data[categoryIndex].items.length !== index + 1 && <Divider />} */}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default IndividualTeacherWorkPlan
