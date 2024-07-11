import React from 'react'
import { Paper } from '@mui/material'

import {
  GradeType,
  GradeBookType,
  StudentGradesType,
  GradeBookSummaryTypes,
} from '../../store/gradeBook/gradeBookTypes'
import './grade-book.css'
import { useAppDispatch } from '../../store/store'
import GradeBookTableHead from './GradeBookTableHead'
import GradeBookTableCell from './GradeBookTableCell'
import { gradeBookSummary } from '../../utils/gradeBookSummary'
import { updateGrade } from '../../store/gradeBook/gradeBookAsyncActions'
import { updateGradesLocally } from '../../store/gradeBook/gradeBookSlice'

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

// Коли студент відраховується з дисципліни - треба очищати всі оцінки з цієї дисципліни

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
                      const moduleAvarage = gradeBook?.summary.find(
                        (el) => el.afterLesson === colIndex + 1 && el.type === 'MODULE_AVERAGE'
                      )

                      const moduleSum = gradeBook?.summary.find(
                        (el) => el.afterLesson === colIndex + 1 && el.type === 'MODULE_SUM'
                      )

                      const moduleTest = gradeBook?.summary.find(
                        (el) => el.afterLesson === colIndex + 1 && el.type === 'MODULE_TEST'
                      )

                      const additionalRate = gradeBook?.summary.find(
                        (el) => el.afterLesson === colIndex + 1 && el.type === 'ADDITIONAL_RATE'
                      )

                      const currentRate = gradeBook?.summary.find(
                        (el) => el.afterLesson === colIndex + 1 && el.type === 'CURRENT_RATE'
                      )

                      const examRate = gradeBook?.summary.find(
                        (el) => el.afterLesson === colIndex + 1 && el.type === 'EXAM'
                      )

                      return (
                        <React.Fragment key={colIndex}>
                          <GradeBookTableCell
                            gradeId={grade.id}
                            colIndex={colIndex}
                            rowIndex={rowIndex}
                            cellData={cellData}
                            grades={grade.grades}
                            setCellData={setCellData}
                            hoveredCell={hoveredCell}
                            updageGrade={updageGrade}
                            backupGrade={backupGrade}
                            setHoveredSell={setHoveredSell}
                            setBackupGrade={setBackupGrade}
                          />

                          {currentRate && (
                            <th style={{ backgroundColor: '#f3f3f3' }}>
                              <p style={{ textAlign: 'center', margin: 0 }}>
                                {gradeBookSummary.getModuleRate(
                                  gradeBook ? gradeBook.summary : [],
                                  grade.grades,
                                  currentRate.afterLesson,
                                  'current_sum'
                                )}
                              </p>
                            </th>
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
                              backupGrade={backupGrade}
                              updageGrade={updageGrade}
                              showAbsenceCheckbox={false}
                              setHoveredSell={setHoveredSell}
                              setBackupGrade={setBackupGrade}
                              summaryType={additionalRate.type}
                            />
                          )}

                          {moduleTest && (
                            <GradeBookTableCell
                              gradeId={grade.id}
                              colIndex={colIndex}
                              rowIndex={rowIndex}
                              cellData={cellData}
                              grades={grade.grades}
                              backgroundColor="#f3f3f3"
                              setCellData={setCellData}
                              hoveredCell={hoveredCell}
                              updageGrade={updageGrade}
                              backupGrade={backupGrade}
                              showAbsenceCheckbox={false}
                              summaryType={moduleTest.type}
                              setHoveredSell={setHoveredSell}
                              setBackupGrade={setBackupGrade}
                            />
                          )}

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

                          {examRate && (
                            <GradeBookTableCell
                              gradeId={grade.id}
                              colIndex={colIndex}
                              rowIndex={rowIndex}
                              cellData={cellData}
                              grades={grade.grades}
                              backgroundColor="#f3f3f3"
                              setCellData={setCellData}
                              hoveredCell={hoveredCell}
                              updageGrade={updageGrade}
                              backupGrade={backupGrade}
                              showAbsenceCheckbox={false}
                              summaryType={examRate.type}
                              setHoveredSell={setHoveredSell}
                              setBackupGrade={setBackupGrade}
                            />
                          )}
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
