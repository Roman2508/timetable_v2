import React from 'react'
import './grade-book.css'
import { useSelector } from 'react-redux'

import { menuSelector } from '../../store/menu/menuSlice'
import HIcon from '../../assets/images/icons/letter-h.svg'
import { Checkbox, Paper, TextField } from '@mui/material'

interface IGradeBookTablePops {
  students: any[]
}

const lessonsCount = 16

const studentGradeBook = {
  id: 1,
  group: { id: 1 },
  teacher: { id: 1 },
  students: [
    { id: 1, name: 'test 1' },
    { id: 2, name: 'test 2' },
  ],
  summary: [{ afterLesson: 4, type: 'mudule-rating', value: 8.7 }],
  studentsRating: [
    { id: 1, student: { id: 7 }, lessonNumber: 11, isAbsence: false, rating: 6 },
    { id: 2, student: { id: 7 }, lessonNumber: 12, isAbsence: false, rating: 11 },
  ],
}

const studentRating = {
  id: 1,
  name: 'Інформатика',
  student: { id: 7 },
  typeRu: 'ЛК',
  subgroupNumber: 1,
  specialization: null,
  lessonNumber: 11,
  isAbsence: false,
  rating: null,
  lessonDate: '06-11-2024',
  year: 2024,
  semester: 2,
}

const cellInitialState = {
  student: 7,
  lessonNumber: 11,
  isAbsence: false,
  rating: 0,
}

const GradeBookTable: React.FC<IGradeBookTablePops> = ({ students }) => {
  const { drawerOpen } = useSelector(menuSelector)

  const [cellData, setCellData] = React.useState(cellInitialState)
  const [hoveredCell, setHoveredSell] = React.useState({ col: 0, row: 0 })

  return (
    <Paper>
      <div className="table-container" style={drawerOpen ? { width: 'calc(100% - 260px)' } : { width: '100%' }}>
        <table className="grades-table">
          <thead>
            <tr>
              <th>Student Name</th>
              {Array(lessonsCount)
                .fill(null)
                .map((el, index) => (
                  <th key={index}>
                    <p>{index + 1}</p>
                    <p>22.02</p>
                  </th>
                ))}

              <th style={{ padding: '0 8px' }}>Average</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}. John Doe</td>
                {Array(lessonsCount)
                  .fill(null)
                  .map((el, colIndex) => {
                    const rating = 12
                    const isAbsence = true

                    return (
                      <th key={colIndex}>
                        <div
                          onMouseEnter={() => {
                            setHoveredSell({ col: colIndex, row: rowIndex })
                            setCellData((prev) => ({ ...prev, rating, isAbsence }))
                          }}
                        >
                          {hoveredCell.col === colIndex && hoveredCell.row === rowIndex ? (
                            <>
                              <Checkbox
                                size="medium"
                                sx={{
                                  ml: 1,
                                  color: 'gray',
                                  padding: '6px',
                                  '& svg path': { opacity: 0 },
                                  '& .MuiSvgIcon-root': { fontSize: 20, width: '18px', height: '18px' },
                                  '& span': { padding: '0 !important', margin: '0 !important' },
                                }}
                                value={cellData.isAbsence}
                                checked={cellData.isAbsence}
                                checkedIcon={<img src={HIcon} alt="mySvgImage" width={18} height={18} />}
                              />

                              <TextField
                                variant="standard"
                                sx={{
                                  width: '50%',
                                  textAlign: 'center',
                                  '& input': { p: '6px 0 6px 6px', width: '50%', ml: 2 },
                                  '& :after': { height: '0 !important', border: '0 !important' },
                                  '& :before': { height: '0 !important', border: '0 !important' },
                                }}
                                value={cellData.rating}
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
                                style={{ margin: '0 10px 0 13px' }}
                              />

                              <span style={{ fontWeight: '400' }}>12</span>
                            </div>
                          )}
                        </div>
                      </th>
                    )
                  })}

                <td style={{ textAlign: 'center' }}>8.7</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Paper>
  )
}

export default GradeBookTable
