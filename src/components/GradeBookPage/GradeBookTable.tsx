import React from "react"
import { Checkbox, Paper, TextField } from "@mui/material"

import "./grade-book.css"
import HIcon from "../../assets/images/icons/letter-h.svg"
import { gradeBookSummary } from "../../utils/gradeBookSummary"
import { GradeBookType } from "../../store/gradeBook/gradeBookTypes"

interface IGradeBookTablePops {
  students: any[]
  gradeBook: GradeBookType | null
}

const lessonsCount = 26

const cellInitialState = {
  lessonNumber: 11,
  isAbsence: false,
  rating: 0,
}

// Поточний рейтинг, рейтинг з модуля, додатковий рейтинг, рейтинг дисципліни

const GradeBookTable: React.FC<IGradeBookTablePops> = ({ students, gradeBook }) => {
  const [cellData, setCellData] = React.useState(cellInitialState)
  const [hoveredCell, setHoveredSell] = React.useState({ col: 0, row: 0 })

  return (
    <Paper>
      <div className="table-container">
        <table className="grades-table">
          <thead>
            <tr>
              <th>ПІБ студента</th>
              {Array(lessonsCount)
                .fill(null)
                .map((el, index) => {
                  const findedSummary = gradeBook?.summary.find((el) => el.afterLesson === index)

                  return (
                    <>
                      {findedSummary && (
                        <th key={index + 100} style={{ padding: "4px" }}>
                          {findedSummary.type === "MODULE_AVERAGE" && <p>Тематична</p>}
                          {findedSummary.type === "MODULE_SUM" && (
                            <>
                              <p>Рейтинг</p>
                              <p style={{ whiteSpace: "nowrap" }}>з модуля</p>
                            </>
                          )}
                          {findedSummary.type === "LESSON_AVERAGE" && <p>Семестрова</p>}
                          {findedSummary.type === "LESSON_SUM" && (
                            <>
                              <p>Рейтинг</p>
                              <p style={{ whiteSpace: "nowrap" }}>з дисципліни</p>
                            </>
                          )}
                          {findedSummary.type === "MODULE_TEST" && (
                            <>
                              <p>Модульний</p>
                              <p style={{ whiteSpace: "nowrap" }}>контроль</p>
                            </>
                          )}
                          {findedSummary.type === "ADDITIONAL_RATE" && (
                            <>
                              <p>Додатковий</p>
                              <p style={{ whiteSpace: "nowrap" }}>рейтинг</p>
                            </>
                          )}
                        </th>
                      )}

                      <th key={index}>
                        <p>{index + 1}</p>
                        <p>22.02</p>
                      </th>
                    </>
                  )
                })}

              <th style={{ padding: "0 8px" }}>Семестрова</th>
            </tr>
          </thead>
          <tbody>
            {gradeBook?.grades.map((grade, rowIndex) => (
              <tr key={rowIndex}>
                <td>
                  {rowIndex + 1}. {grade.student.name}
                </td>

                {Array(lessonsCount)
                  .fill(null)
                  .map((_, colIndex) => {
                    const currentCellData = grade.grades.find((el) => el.lessonNumber === colIndex + 1)
                    const findedSummary = gradeBook?.summary.find((el) => el.afterLesson === colIndex)

                    let summaryGrade = ""

                    if (findedSummary && findedSummary.type === "MODULE_AVERAGE") {
                      summaryGrade = gradeBookSummary.getModuleRate(
                        gradeBook.summary,
                        grade.grades,
                        findedSummary.afterLesson,
                        "average"
                      )
                    }

                    if (findedSummary && findedSummary.type === "MODULE_SUM") {
                      summaryGrade = gradeBookSummary.getModuleRate(
                        gradeBook.summary,
                        grade.grades,
                        findedSummary.afterLesson,
                        "sum"
                      )
                    }

                    return (
                      <>
                        {findedSummary && (
                          <th key={colIndex + 100} style={{ backgroundColor: "#f3f3f3" }}>
                            <p style={{ textAlign: "center", margin: 0 }}>{summaryGrade}</p>
                          </th>
                        )}

                        <th key={colIndex}>
                          <div
                            onMouseEnter={() => {
                              setHoveredSell({ col: colIndex, row: rowIndex })
                              if (currentCellData) {
                                setCellData(() => ({
                                  rating: currentCellData.rating,
                                  isAbsence: currentCellData.isAbsence,
                                  lessonNumber: currentCellData.lessonNumber,
                                }))
                              }
                            }}
                          >
                            {hoveredCell.col === colIndex && hoveredCell.row === rowIndex ? (
                              <>
                                <Checkbox
                                  size="medium"
                                  sx={{
                                    ml: 1,
                                    color: "gray",
                                    padding: "6px",
                                    "& svg path": { opacity: 0 },
                                    "& .MuiSvgIcon-root": { fontSize: 20, width: "18px", height: "18px" },
                                    "& span": { padding: "0 !important", margin: "0 !important" },
                                  }}
                                  value={currentCellData ? currentCellData.isAbsence : false}
                                  checked={currentCellData ? currentCellData.isAbsence : false}
                                  checkedIcon={<img src={HIcon} alt="mySvgImage" width={18} height={18} />}
                                  icon={
                                    <img src={HIcon} alt="mySvgImage" width={18} height={18} style={{ opacity: 0.1 }} />
                                  }
                                />

                                <TextField
                                  variant="standard"
                                  sx={{
                                    width: "50%",
                                    textAlign: "center",
                                    "& input": { p: "6px 0 6px 6px", width: "50%", ml: 2 },
                                    "& :after": { height: "0 !important", border: "0 !important" },
                                    "& :before": { height: "0 !important", border: "0 !important" },
                                  }}
                                  value={currentCellData ? currentCellData.rating : ""}
                                  type="number"
                                />
                              </>
                            ) : (
                              <div>
                                <img
                                  src={HIcon}
                                  alt="mySvgImage"
                                  width={18}
                                  height={18}
                                  style={
                                    currentCellData && currentCellData.isAbsence
                                      ? { margin: "0 10px 0 13px", opacity: 1 }
                                      : { margin: "0 10px 0 13px", opacity: 0.1 }
                                  }
                                />

                                <span style={{ fontWeight: "400" }}>
                                  {currentCellData ? currentCellData.rating : ""}
                                </span>
                              </div>
                            )}
                          </div>
                        </th>
                      </>
                    )
                  })}

                <td style={{ textAlign: "center", backgroundColor: "#f3f3f3" }}>
                  {gradeBookSummary.getTotalRate(grade.grades, "sum")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Paper>
  )
}

export default GradeBookTable
