import { Checkbox, TextField } from "@mui/material"
import React, { Dispatch, SetStateAction } from "react"

import HIcon from "../../assets/images/icons/letter-h.svg"
import { GradeType } from "../../store/gradeBook/gradeBookTypes"

interface IGradeBookTableCellProps {
  gradeId: number
  colIndex: number
  rowIndex: number
  updageGrade: () => void
  backgroundColor?: string
  currentCellData: GradeType | undefined
  hoveredCell: { col: number; row: number }
  setHoveredSell: Dispatch<SetStateAction<{ col: number; row: number }>>
  cellData: { lessonNumber: number; isAbsence: boolean; rating: number; student: number }
  setCellData: Dispatch<SetStateAction<{ lessonNumber: number; isAbsence: boolean; rating: number; student: number }>>
  setBackupGrade: Dispatch<
    SetStateAction<{ lessonNumber: number; isAbsence: boolean; rating: number; student: number } | null>
  >
}

const GradeBookTableCell: React.FC<IGradeBookTableCellProps> = ({
  gradeId,
  colIndex,
  rowIndex,
  cellData,
  setCellData,
  hoveredCell,
  updageGrade,
  setHoveredSell,
  setBackupGrade,
  currentCellData,
  backgroundColor = "#ffffff",
}) => {
  return (
    <th style={{ overflow: "hidden", backgroundColor }}>
      <div
        onMouseEnter={() => {
          setHoveredSell({ col: colIndex, row: rowIndex })
          // is grade exist
          if (currentCellData) {
            const data = {
              rating: currentCellData.rating,
              isAbsence: currentCellData.isAbsence,
              lessonNumber: currentCellData.lessonNumber,
              student: gradeId,
            }
            setCellData(data)
            setBackupGrade(data)
          } else {
            const data = {
              rating: 0,
              isAbsence: false,
              lessonNumber: colIndex + 1,
              student: gradeId,
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
              icon={<img src={HIcon} alt="mySvgImage" width={18} height={18} style={{ opacity: 0.1 }} />}
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
              onChange={(e) => setCellData((prev) => ({ ...prev, rating: Number(e.target.value) }))}
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

            <span style={{ fontWeight: "400" }}>{currentCellData?.rating ? currentCellData?.rating : ""}</span>
          </>
        )}
      </div>
    </th>
  )
}

export default GradeBookTableCell
