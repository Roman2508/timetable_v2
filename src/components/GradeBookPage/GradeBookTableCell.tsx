import { Checkbox, TextField } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'

import HIcon from '../../assets/images/icons/letter-h.svg'
import { GradeBookSummaryTypes, GradeType } from '../../store/gradeBook/gradeBookTypes'

interface IGradeBookTableCellProps {
  gradeId: number
  colIndex: number
  rowIndex: number
  grades: GradeType[]
  updageGrade: () => void
  backgroundColor?: string
  showAbsenceCheckbox?: boolean
  cellData: GradeType & { student: number }
  summaryType?: null | GradeBookSummaryTypes
  backupGrade: (GradeType & { student: number }) | null
  setCellData: Dispatch<SetStateAction<GradeType & { student: number }>>
  setBackupGrade: Dispatch<SetStateAction<(GradeType & { student: number }) | null>>
  hoveredCell: { col: number; row: number; summaryType: null | GradeBookSummaryTypes }
  setHoveredSell: Dispatch<SetStateAction<{ col: number; row: number; summaryType: null | GradeBookSummaryTypes }>>
}

const GradeBookTableCell: React.FC<IGradeBookTableCellProps> = ({
  grades,
  gradeId,
  colIndex,
  rowIndex,
  cellData,
  setCellData,
  hoveredCell,
  updageGrade,
  backupGrade,
  setHoveredSell,
  setBackupGrade,
  summaryType = null,
  showAbsenceCheckbox = true,
  backgroundColor = '#ffffff',
}) => {
  const currentCellData = grades.find((el) => {
    if (summaryType) {
      return el.lessonNumber === colIndex && el.summaryType === summaryType
    }
    return el.lessonNumber === colIndex + 1 && el.summaryType === summaryType
  })

  return (
    <th style={{ overflow: 'hidden', backgroundColor }}>
      <div
        onMouseEnter={() => {
          setHoveredSell({ col: colIndex, row: rowIndex, summaryType })
          // is grade exist
          if (currentCellData) {
            const data = {
              rating: currentCellData.rating,
              isAbsence: currentCellData.isAbsence,
              lessonNumber: currentCellData.lessonNumber,
              student: gradeId,
              summaryType,
            }
            setCellData(data)
            setBackupGrade(data)
          } else {
            const data = {
              rating: 0,
              isAbsence: false,
              // lessonNumber: colIndex + 1,
              lessonNumber: summaryType ? colIndex : colIndex + 1,
              student: gradeId,
              summaryType,
            }
            setCellData(data)
            setBackupGrade(data)
          }
        }}
        onMouseLeave={updageGrade}
        onKeyDown={(e) => {
          if (e.key === 'Enter') updageGrade()
          if (e.key === 'Escape') backupGrade && setCellData(backupGrade)
        }}
        style={
          !showAbsenceCheckbox
            ? {
                fontWeight: '400',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }
            : {}
        }
      >
        {hoveredCell.col === colIndex && hoveredCell.row === rowIndex && hoveredCell.summaryType === summaryType ? (
          <>
            {showAbsenceCheckbox && (
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
                onChange={() => {
                  setCellData((prev) => ({ ...prev, isAbsence: !prev.isAbsence }))
                }}
                icon={<img src={HIcon} alt="mySvgImage" width={18} height={18} style={{ opacity: 0.1 }} />}
              />
            )}

            <TextField
              variant="standard"
              sx={
                showAbsenceCheckbox
                  ? {
                      width: '50%',
                      textAlign: 'center',
                      '& input': { p: '6px 0 6px 6px', width: '50%', ml: 2 },
                      '& :after': { height: '0 !important', border: '0 !important' },
                      '& :before': { height: '0 !important', border: '0 !important' },
                    }
                  : {
                      width: '50%',
                      textAlign: 'center',
                      '& input': { p: '6px 0 6px 6px', width: '100%', ml: 1.1, textAlign: 'center' },
                      '& :after': { height: '0 !important', border: '0 !important' },
                      '& :before': { height: '0 !important', border: '0 !important' },
                    }
              }
              value={cellData.rating !== 0 ? cellData.rating : ''}
              onChange={(e) => setCellData((prev) => ({ ...prev, rating: Number(e.target.value) }))}
              type="number"
            />
          </>
        ) : (
          <>
            {showAbsenceCheckbox && (
              <img
                width={18}
                height={18}
                src={HIcon}
                alt="absence image"
                style={
                  currentCellData?.isAbsence
                    ? { margin: '0 10px 0 13px', opacity: 1 }
                    : { margin: '0 10px 0 13px', opacity: 0.1 }
                }
              />
            )}

            <span
              style={
                showAbsenceCheckbox
                  ? { fontWeight: '400' }
                  : { fontWeight: '400', display: 'flex', justifyContent: 'center', alignItems: 'center' }
              }
            >
              {currentCellData?.rating ? currentCellData?.rating : ''}
            </span>
          </>
        )}
      </div>
    </th>
  )
}

export default GradeBookTableCell
