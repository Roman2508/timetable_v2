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
          <div className="grade-book__table-cell first-col">Дисципліна</div>
          {Array(24)
            .fill(null)
            .map((_: null, index: number) => (
              <div className="grade-book__table-cell">
                <p>{index + 1}</p>
                <p>22.05</p>
                <p>217 ауд.</p>
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
                        marginTop: "5px",
                        "& .MuiSvgIcon-root": { fontSize: 20, width: "18px", height: "18px" },
                        "& span": {
                          padding: "0 !important",
                          margin: "0 !important",
                        },
                      }}
                      checkedIcon={<img src={HIcon} alt="mySvgImage" width={18} height={18} />}
                    />

                    <TextField
                      sx={{
                        p: 0,
                        border: 0,
                        width: "50%",
                        "& *": { p: 0 },
                        textAlign: "center",
                        "& input": { p: "6px 0 6px 6px", border: 0 },
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
