import React from 'react'
import { Checkbox, Paper, TextField } from '@mui/material'

import './grade-book.css'
import { useAppDispatch } from '../../store/store'
import GradeBookTableHead from './GradeBookTableHead'
import GradeBookTableCell from './GradeBookTableCell'
import HIcon from '../../assets/images/icons/letter-h.svg'
import { gradeBookSummary } from '../../utils/gradeBookSummary'
import { updateGrade } from '../../store/gradeBook/gradeBookAsyncActions'
import { updateGradesLocally } from '../../store/gradeBook/gradeBookSlice'
import {
  GradeBookSummaryTypes,
  GradeBookType,
  GradeType,
  StudentGradesType,
} from '../../store/gradeBook/gradeBookTypes'

interface IGradeBookTablePops {
  gradeBook: GradeBookType
}

const cellInitialState = {
  lessonNumber: 0,
  isAbsence: false,
  rating: 0,
  summaryType: null as null | GradeBookSummaryTypes,
  student: 0,
}

// Треба підвантажувати екзамен дисципліни (якщо він є) в кінець журналу останньою колонкою
// Треба підвантажувати екзамен дисципліни (якщо він є) в кінець журналу останньою колонкою
// Треба підвантажувати екзамен дисципліни (якщо він є) в кінець журналу останньою колонкою
// Треба підвантажувати екзамен дисципліни (якщо він є) в кінець журналу останньою колонкою
// Треба підвантажувати екзамен дисципліни (якщо він є) в кінець журналу останньою колонкою
// Треба підвантажувати екзамен дисципліни (якщо він є) в кінець журналу останньою колонкою
// Треба підвантажувати екзамен дисципліни (якщо він є) в кінець журналу останньою колонкою
// Треба підвантажувати екзамен дисципліни (якщо він є) в кінець журналу останньою колонкою
// Треба підвантажувати екзамен дисципліни (якщо він є) в кінець журналу останньою колонкою
// Треба підвантажувати екзамен дисципліни (якщо він є) в кінець журналу останньою колонкою
// Треба підвантажувати екзамен дисципліни (якщо він є) в кінець журналу останньою колонкою
// Треба підвантажувати екзамен дисципліни (якщо він є) в кінець журналу останньою колонкою
// Треба підвантажувати екзамен дисципліни (якщо він є) в кінець журналу останньою колонкою
// Треба підвантажувати екзамен дисципліни (якщо він є) в кінець журналу останньою колонкою
// Треба підвантажувати екзамен дисципліни (якщо він є) в кінець журналу останньою колонкою
// Треба підвантажувати екзамен дисципліни (якщо він є) в кінець журналу останньою колонкою
// Треба підвантажувати екзамен дисципліни (якщо він є) в кінець журналу останньою колонкою
// Треба підвантажувати екзамен дисципліни (якщо він є) в кінець журналу останньою колонкою
// Треба підвантажувати екзамен дисципліни (якщо він є) в кінець журналу останньою колонкою

// Коли студент відраховується з дисципліни - треба очищати всі оцінки з цієї дисципліни
// Коли студент відраховується з дисципліни - треба очищати всі оцінки з цієї дисципліни
// Коли студент відраховується з дисципліни - треба очищати всі оцінки з цієї дисципліни
// Коли студент відраховується з дисципліни - треба очищати всі оцінки з цієї дисципліни
// Коли студент відраховується з дисципліни - треба очищати всі оцінки з цієї дисципліни
// Коли студент відраховується з дисципліни - треба очищати всі оцінки з цієї дисципліни
// Коли студент відраховується з дисципліни - треба очищати всі оцінки з цієї дисципліни
// Коли студент відраховується з дисципліни - треба очищати всі оцінки з цієї дисципліни
// Коли студент відраховується з дисципліни - треба очищати всі оцінки з цієї дисципліни

// on press Esc need to return cell data to previous value

const GradeBookTable: React.FC<IGradeBookTablePops> = ({ gradeBook }) => {
  const dispatch = useAppDispatch()

  const [hoveredCell, setHoveredSell] = React.useState({
    col: 0,
    row: 0,
    summaryType: null as null | GradeBookSummaryTypes,
  })
  const [cellData, setCellData] = React.useState<GradeType & { student: number }>(cellInitialState)
  const [backupGrade, setBackupGrade] = React.useState<(GradeType & { student: number }) | null>(null)

  const updageGrade = () => {
    try {
      const isLessonNumberEqual = backupGrade?.lessonNumber === cellData.lessonNumber
      const isAbsenceEqual = backupGrade?.isAbsence === cellData.isAbsence
      const isRatingEqual = backupGrade?.rating === cellData.rating
      const isStudentsEqual = backupGrade?.student === cellData.student

      if (isLessonNumberEqual && isStudentsEqual && (!isAbsenceEqual || !isRatingEqual)) {
        const data = {
          id: cellData.student,
          rating: cellData.rating,
          isAbsence: cellData.isAbsence,
          summaryType: cellData.summaryType,
          lessonNumber: cellData.lessonNumber,
        }
        dispatch(updateGradesLocally(data))
        dispatch(updateGrade(data))
        setBackupGrade(null)
      }
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  // const updageSummaryGrade = () => {
  //   try {
  //     const isLessonNumberEqual = backupGrade?.lessonNumber === cellData.lessonNumber
  //     const isAbsenceEqual = backupGrade?.isAbsence === cellData.isAbsence
  //     const isRatingEqual = backupGrade?.rating === cellData.rating
  //     const isStudentsEqual = backupGrade?.student === cellData.student

  //     if (isLessonNumberEqual && isStudentsEqual && (!isAbsenceEqual || !isRatingEqual)) {
  //       const data = {
  //         summaryType: null,
  //         id: cellData.student,
  //         rating: cellData.rating,
  //         isAbsence: cellData.isAbsence,
  //         lessonNumber: cellData.lessonNumber,
  //       }
  //       dispatch(updateGradesLocally(data))
  //       dispatch(updateGrade(data))
  //       setBackupGrade(null)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //   }
  // }

  return (
    <Paper>
      <div className="table-container">
        <table className="grades-table">
          <GradeBookTableHead gradeBook={gradeBook} />

          <tbody>
            {JSON.parse(JSON.stringify(gradeBook?.grades))
              .sort((a: StudentGradesType, b: StudentGradesType) => {
                if (a.student.name < b.student.name) return -1
                if (a.student.name > b.student.name) return 1
                return 0
              })
              .map((grade: StudentGradesType, rowIndex: number) => (
                <tr key={grade.id}>
                  <td>
                    {rowIndex + 1}. {grade.student.name}
                  </td>

                  {Array(gradeBook ? gradeBook.lesson.hours : 0)
                    .fill(null)
                    .map((_, colIndex) => {
                      // const currentCellData = grade.grades.find((el) => el.lessonNumber === colIndex + 1)

                      const moduleAvarage = gradeBook?.summary.find(
                        (el) => el.afterLesson === colIndex && el.type === 'MODULE_AVERAGE'
                      )

                      const moduleSum = gradeBook?.summary.find(
                        (el) => el.afterLesson === colIndex && el.type === 'MODULE_SUM'
                      )

                      const moduleTest = gradeBook?.summary.find(
                        (el) => el.afterLesson === colIndex && el.type === 'MODULE_TEST'
                      )

                      const additionalRate = gradeBook?.summary.find(
                        (el) => el.afterLesson === colIndex && el.type === 'ADDITIONAL_RATE'
                      )
                      /* 
                      const currentColSummary = moduleAvarage || moduleSum || moduleTest || additionalRate || null

                      const currentCellData = grade.grades.find(
                        (el) =>
                          el.lessonNumber === colIndex + 1 &&
                          (currentColSummary ? currentColSummary.type === el.summaryType : true)
                      ) */

                      return (
                        <React.Fragment key={colIndex}>
                          {moduleAvarage && (
                            <th style={{ backgroundColor: '#f3f3f3' }}>
                              <p style={{ textAlign: 'center', margin: 0 }}>
                                {gradeBookSummary.getModuleRate(
                                  gradeBook ? gradeBook.summary : [],
                                  grade.grades,
                                  moduleAvarage.afterLesson,
                                  'average'
                                )}
                              </p>
                            </th>
                          )}

                          {moduleSum && (
                            <th style={{ backgroundColor: '#f3f3f3' }}>
                              <p style={{ textAlign: 'center', margin: 0 }}>
                                {gradeBookSummary.getModuleRate(
                                  gradeBook ? gradeBook.summary : [],
                                  grade.grades,
                                  moduleSum.afterLesson,
                                  'sum'
                                )}
                              </p>
                            </th>
                          )}

                          {moduleTest && (
                            <GradeBookTableCell
                              gradeId={grade.id}
                              colIndex={colIndex}
                              rowIndex={rowIndex}
                              cellData={cellData}
                              grades={grade.grades}
                              summaryType={moduleTest.type}
                              backgroundColor="#f3f3f3"
                              setCellData={setCellData}
                              hoveredCell={hoveredCell}
                              showAbsenceCheckbox={false}
                              updageGrade={updageGrade}
                              setHoveredSell={setHoveredSell}
                              setBackupGrade={setBackupGrade}
                              // currentCellData={currentCellData}
                            />
                          )}

                          {additionalRate && (
                            <GradeBookTableCell
                              gradeId={grade.id}
                              colIndex={colIndex}
                              rowIndex={rowIndex}
                              cellData={cellData}
                              grades={grade.grades}
                              backgroundColor="#f3f3f3"
                              setCellData={setCellData}
                              hoveredCell={hoveredCell}
                              showAbsenceCheckbox={false}
                              setHoveredSell={setHoveredSell}
                              setBackupGrade={setBackupGrade}
                              updageGrade={updageGrade}
                              summaryType={additionalRate.type}
                              // currentCellData={currentCellData}
                            />
                          )}

                          <GradeBookTableCell
                            gradeId={grade.id}
                            colIndex={colIndex}
                            rowIndex={rowIndex}
                            cellData={cellData}
                            grades={grade.grades}
                            setCellData={setCellData}
                            hoveredCell={hoveredCell}
                            updageGrade={updageGrade}
                            setHoveredSell={setHoveredSell}
                            setBackupGrade={setBackupGrade}
                            // currentCellData={currentCellData}
                          />

                          {/* <th style={{ overflow: "hidden" }}>
                            <div
                              onMouseEnter={() => {
                                setHoveredSell({ col: colIndex, row: rowIndex })
                                // is grade exist
                                if (currentCellData) {
                                  const data = {
                                    rating: currentCellData.rating,
                                    isAbsence: currentCellData.isAbsence,
                                    lessonNumber: currentCellData.lessonNumber,
                                    student: grade.id,
                                  }
                                  setCellData(data)
                                  setBackupGrade(data)
                                } else {
                                  const data = {
                                    rating: 0,
                                    isAbsence: false,
                                    lessonNumber: colIndex + 1,
                                    student: grade.id,
                                  }
                                  setCellData(data)
                                  setBackupGrade(data)
                                }
                              }}
                              onMouseLeave={updageGrade}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") updageGrade()
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
                                    value={cellData.isAbsence}
                                    checked={cellData.isAbsence}
                                    checkedIcon={<img src={HIcon} alt="mySvgImage" width={18} height={18} />}
                                    onChange={() => {
                                      setCellData((prev) => ({ ...prev, isAbsence: !prev.isAbsence }))
                                    }}
                                    icon={
                                      <img
                                        src={HIcon}
                                        alt="mySvgImage"
                                        width={18}
                                        height={18}
                                        style={{ opacity: 0.1 }}
                                      />
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
                                    value={cellData.rating !== 0 ? cellData.rating : ""}
                                    onChange={(e) =>
                                      setCellData((prev) => ({ ...prev, rating: Number(e.target.value) }))
                                    }
                                    type="number"
                                  />
                                </>
                              ) : (
                                <>
                                  <img
                                    width={18}
                                    height={18}
                                    src={HIcon}
                                    alt="absence image"
                                    style={
                                      currentCellData?.isAbsence
                                        ? { margin: "0 10px 0 13px", opacity: 1 }
                                        : { margin: "0 10px 0 13px", opacity: 0.1 }
                                    }
                                  />

                                  <span style={{ fontWeight: "400" }}>
                                    {currentCellData?.rating ? currentCellData?.rating : ""}
                                  </span>
                                </>
                              )}
                            </div>
                          </th> */}
                        </React.Fragment>
                      )
                    })}

                  {gradeBook?.summary.find((el) => el.type === GradeBookSummaryTypes.LESSON_AVERAGE) && (
                    <td style={{ textAlign: 'center', backgroundColor: '#f3f3f3' }}>
                      {gradeBookSummary.getTotalRate(grade.grades, 'average')}
                    </td>
                  )}

                  {gradeBook?.summary.find((el) => el.type === GradeBookSummaryTypes.LESSON_SUM) && (
                    <td style={{ textAlign: 'center', backgroundColor: '#f3f3f3' }}>
                      {gradeBookSummary.getTotalRate(grade.grades, 'sum')}
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Paper>
  )
}

export default GradeBookTable
