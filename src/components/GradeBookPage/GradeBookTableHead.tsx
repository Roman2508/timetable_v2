import React from "react"

import { GradeBookSummaryTypes, GradeBookType } from "../../store/gradeBook/gradeBookTypes"

interface IGradeBookTableHeadProps {
  gradeBook: GradeBookType
}

const GradeBookTableHead: React.FC<IGradeBookTableHeadProps> = ({ gradeBook }) => {
  return (
    <thead>
      <tr>
        <th>ПІБ студента</th>
        {Array(gradeBook ? gradeBook.lesson.hours : 0)
          .fill(null)
          .map((_, index) => {
            return (
              <React.Fragment key={index}>
                {gradeBook.summary.find((el) => el.afterLesson === index && el.type === "MODULE_AVERAGE") && (
                  <th style={{ padding: "4px" }}>
                    <p>Тематична</p>
                  </th>
                )}

                {gradeBook.summary.find((el) => el.afterLesson === index && el.type === "MODULE_SUM") && (
                  <th style={{ padding: "4px" }}>
                    <p>Рейтинг</p>
                    <p style={{ whiteSpace: "nowrap" }}>з модуля</p>
                  </th>
                )}

                {gradeBook.summary.find((el) => el.afterLesson === index && el.type === "MODULE_TEST") && (
                  <th style={{ padding: "4px" }}>
                    <p>Модульний</p>
                    <p style={{ whiteSpace: "nowrap" }}>контроль</p>
                  </th>
                )}

                {gradeBook.summary.find((el) => el.afterLesson === index && el.type === "ADDITIONAL_RATE") && (
                  <th style={{ padding: "4px" }}>
                    <p>Додатковий</p>
                    <p style={{ whiteSpace: "nowrap" }}>рейтинг</p>
                  </th>
                )}

                <th>
                  <p>{index + 1}</p>
                  <p>22.02</p>
                </th>
              </React.Fragment>
            )
          })}

        {gradeBook.summary.find((el) => el.type === GradeBookSummaryTypes.LESSON_AVERAGE) && (
          <th style={{ padding: "0 8px" }}>Семестрова</th>
        )}

        {gradeBook.summary.find((el) => el.type === GradeBookSummaryTypes.LESSON_SUM) && (
          <th style={{ padding: "0 8px" }}>
            <p>Рейтинг</p>
            <p style={{ whiteSpace: "nowrap" }}>з дисципліни</p>
          </th>
        )}
      </tr>
    </thead>
  )
}

export default GradeBookTableHead
