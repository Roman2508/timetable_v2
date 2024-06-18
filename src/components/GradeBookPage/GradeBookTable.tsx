import React from "react"
import "./grade-book.css"

import HIcon from "../../assets/images/icons/letter-h.svg"
import { Checkbox, Paper, TextField } from "@mui/material"

interface IGradeBookTablePops {
  students: any[]
}

const GradeBookTable: React.FC<IGradeBookTablePops> = ({ students }) => {
  return (
    <Paper>
      <div className="grade-book__table-container">
        <div className="grade-book__table-head">
          <div className="grade-book__table-cell first-col corner-cell"></div>
          {Array(24)
            .fill(null)
            .map((_: null, index: number) => (
              <div className="grade-book__table-cell">
                <p>{index + 1}</p>
                <p>22.05</p>
              </div>
            ))}
        </div>
        <div className="grade-book__table-body">
          {students.map((student) => (
            <div className="grade-book__table_row" key={student._id}>
              <div className="grade-book__table-cell first-col">
                <p>{student.name}</p>
              </div>
              {Array(24)
                .fill(null)
                .map((_: null, index: number) => (
                  <div className="grade-book__table-cell" key={index}>
                    {/* <p>{index + 1}</p> */}
                    <Checkbox
                      // defaultChecked
                      size="medium"
                      sx={{
                        color: "gray",
                        padding: "6px",
                        "& svg path": { opacity: 0 },
                        "& .MuiSvgIcon-root": { fontSize: 20, width: "18px", height: "18px" },
                        "& span": { padding: "0 !important", margin: "0 !important" },
                      }}
                      checkedIcon={<img src={HIcon} alt="mySvgImage" width={18} height={18} />}
                    />

                    <TextField
                      variant="standard"
                      sx={{
                        width: "50%",
                        textAlign: "center",
                        "& input": { p: "6px 0 6px 6px" },
                        "& :after": { height: "0 !important", border: "0 !important" },
                        "& :before": { height: "0 !important", border: "0 !important" },
                      }}
                      type="number"
                    />
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </Paper>
  )
}

export default GradeBookTable
