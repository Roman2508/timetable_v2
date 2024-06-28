import React from 'react'
import { Paper } from '@mui/material'

import './load-page.css'
import HIcon from '../../assets/images/icons/letter-h.svg'

interface ILoadPageTablePops {}

const lessonsCount = 25

const LoadPageTable: React.FC<ILoadPageTablePops> = ({}) => {
  return (
    <Paper>
      <div className="table-container">
        <table className="load-table">
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
            {Array(10)
              .fill(null)
              .map((student, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{rowIndex + 1}. John Doe</td>
                  {Array(lessonsCount)
                    .fill(null)
                    .map((el, colIndex) => {
                      return (
                        <th key={colIndex}>
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

export default LoadPageTable
