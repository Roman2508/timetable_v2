import React from "react"
import { useSelector } from "react-redux"

import { customDayjs } from "../Calendar/Calendar"
import { gradeBookSelector } from "../../store/gradeBook/gradeBookSlice"
import { GradeBookSummaryTypes, GradeBookType } from "../../store/gradeBook/gradeBookTypes"
import { Tooltip } from "@mui/material"

interface IGradeBookTableHeadProps {
  gradeBook: GradeBookType
  gradeBookLessonDates: { date: string }[]
}

const GradeBookTableHead: React.FC<IGradeBookTableHeadProps> = ({ gradeBook, gradeBookLessonDates }) => {
  const { lessonThemes } = useSelector(gradeBookSelector)

  return (
    <thead>
      <tr>
        <th>ПІБ студента</th>
        {Array(gradeBook ? gradeBook.lesson.hours : 0)
          .fill(null)
          .map((_, index) => {
            const dateObj = gradeBookLessonDates[index]

            const lessonTheme = lessonThemes?.find((el) => el.lessonNumber === index + 1)

            return (
              <React.Fragment key={index}>
                <th>
                  <Tooltip title={lessonTheme ? lessonTheme.name : "Тема не внесена"}>
                    <span style={{ userSelect: "none" }}>
                      <p>{index + 1}</p>
                      <p>{dateObj ? customDayjs(dateObj.date).format("DD.MM.YY") : "-"}</p>
                    </span>
                  </Tooltip>
                </th>

                {gradeBook.summary.find((el) => el.afterLesson === index + 1 && el.type === "CURRENT_RATE") && (
                  <th style={{ padding: "4px 8px" }}>
                    <p>Поточний</p>
                    <p style={{ whiteSpace: "nowrap" }}>рейтинг</p>
                  </th>
                )}

                {gradeBook.summary.find((el) => el.afterLesson === index + 1 && el.type === "ADDITIONAL_RATE") && (
                  <th style={{ padding: "4px 8px" }}>
                    <p>Додатковий</p>
                    <p style={{ whiteSpace: "nowrap" }}>рейтинг</p>
                  </th>
                )}

                {gradeBook.summary.find((el) => el.afterLesson === index + 1 && el.type === "MODULE_TEST") && (
                  <th style={{ padding: "4px 8px" }}>
                    <p>Модульний</p>
                    <p style={{ whiteSpace: "nowrap" }}>контроль</p>
                  </th>
                )}

                {gradeBook.summary.find((el) => el.afterLesson === index + 1 && el.type === "MODULE_AVERAGE") && (
                  <th style={{ padding: "4px 8px" }}>
                    <p>Тематична</p>
                  </th>
                )}

                {gradeBook.summary.find((el) => el.afterLesson === index + 1 && el.type === "MODULE_SUM") && (
                  <th style={{ padding: "4px 8px" }}>
                    <p>Рейтинг</p>
                    <p style={{ whiteSpace: "nowrap" }}>з модуля</p>
                  </th>
                )}
              </React.Fragment>
            )
          })}

        {gradeBook.summary.find((el) => el.type === GradeBookSummaryTypes.EXAM) && (
          <th style={{ padding: "4px 8px" }}>
            <p>Екзамен</p>
          </th>
        )}

        {gradeBook.summary.find((el) => el.type === GradeBookSummaryTypes.LESSON_AVERAGE) && (
          <th style={{ padding: "0 8px" }}>Семестрова</th>
        )}

        {gradeBook.summary.find((el) => el.type === GradeBookSummaryTypes.LESSON_SUM) && (
          <>
            <th style={{ padding: "0 8px" }}>
              <p>Рейтинг</p>
              <p style={{ whiteSpace: "nowrap" }}>з дисципліни</p>
            </th>

            <th style={{ padding: "0 8px" }}>
              <p>ECTS</p>
            </th>
          </>
        )}
      </tr>
    </thead>
  )
}

export default GradeBookTableHead
