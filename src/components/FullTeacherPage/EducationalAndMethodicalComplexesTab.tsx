import {
  Table,
  Button,
  Select,
  Divider,
  Tooltip,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  InputLabel,
  FormControl,
  IconButton,
} from '@mui/material'
import React from 'react'
import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons'

type Props = {}

function createData(id: number, name: string, hours: number) {
  return { id, name, hours }
}

const rows = [
  createData(1, 'Інформація, інформаційні технології та людина в інформаційному суспільстві', 2),
  createData(2, 'Інформаційна безпека та основи кібергігієни', 2),
  createData(3, 'Цифрове навчання та комп’ютерно-орієнтовані засоби навчальної діяльності', 2),
  createData(4, 'Сучасні інформаційні технології та їх вплив на суспільство', 2),
  createData(5, "Комп’ютерне моделювання та комп'ютерний експеримент", 2),
]

const editedThemeInitialState = { id: -1, name: '' }

export const EducationalAndMethodicalComplexesTab = ({}: Props) => {
  const [editedTheme, setEditedTheme] = React.useState<{ id: number; name: string }>(editedThemeInitialState)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FormControl fullWidth sx={{ my: 3 }}>
          <InputLabel sx={{ overflow: 'visible !important' }}>Група</InputLabel>
          <Select
          // onChange={handleChangeEditedUser}
          // value={editedUser ? String(editedUser.id) : ''}
          >
            {[
              { id: 1, name: 'LD9-22-1' },
              { id: 2, name: 'PH9-22-1' },
              { id: 3, name: 'PH9-23-1' },
              { id: 4, name: 'PH9-24-1' },
            ].map((el) => (
              <MenuItem value={el.id}>{el.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ my: 3, ml: 2 }}>
          <InputLabel sx={{ overflow: 'visible !important' }}>Дисципліна</InputLabel>
          <Select
          // onChange={handleChangeEditedUser}
          // value={editedUser ? String(editedUser.id) : ''}
          >
            {[
              { id: 1, name: 'Інформатика' },
              { id: 2, name: 'Інформаційні технології у фармації' },
              { id: 3, name: 'Технології' },
              { id: 4, name: 'Основи медичної інформатики' },
            ].map((el) => (
              <MenuItem value={el.id}>{el.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" sx={{ height: '41px', minWidth: '120px', ml: 2 }}>
          Переглянути
        </Button>
      </div>

      <Divider sx={{ mb: 3 }} />

      <Table sx={{ minWidth: 450, mb: 10 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell>Тема</TableCell>
            <TableCell align="center">Години</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" sx={{ width: '80px', height: '48px', padding: '0px 12px' }}>
                {row.id}
              </TableCell>

              <TableCell
                align="left"
                sx={{
                  '&:hover span': { display: 'inline-block !important' },
                  display: 'flex',
                  alignItems: 'center',
                  height: '48px',
                  padding: '0px 12px',
                }}
              >
                {editedTheme.id === row.id ? (
                  <div style={{ flexGrow: 1 }}>
                    <TextField
                      fullWidth
                      sx={{
                        '.MuiInputBase-input': { padding: '0 14px 0 4px', height: '31px', width: '100%' },
                        '& .Mui-focused': { boxShadow: 'none !important' },
                        fieldset: { border: '0 !important' },
                      }}
                      value={editedTheme.name}
                    />
                  </div>
                ) : (
                  <p style={{ flexGrow: 1, margin: 0 }}>{row.name}</p>
                )}

                <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#fff' }}>
                  {editedTheme.id === row.id ? (
                    <>
                      <IconButton sx={{ marginRight: '10px' }} onClick={() => setEditedTheme(editedThemeInitialState)}>
                        <CheckOutlined style={{ cursor: 'pointer' }} />
                      </IconButton>

                      <IconButton onClick={() => setEditedTheme(editedThemeInitialState)}>
                        <CloseOutlined style={{ cursor: 'pointer' }} />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton onClick={() => setEditedTheme({ id: row.id, name: row.name })}>
                      <EditOutlined style={{ display: 'none', cursor: 'pointer' }} />
                    </IconButton>
                  )}
                </div>
              </TableCell>

              <TableCell sx={{ width: '100px', height: '48px', padding: '0px 12px' }} align="center">
                {row.hours}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* <table className="full-teacher__teaching-load-table" cellSpacing="0">
        <thead>
          <tr>
            <th style={{ width: "60px" }}>№</th>
            <th>Тема</th>
            <th style={{ width: "140px" }}>Години</th>
          </tr>
        </thead>
        <tbody>
          {Array(12)
            .fill(null)
            .map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}.</td>
                <td
                  style={
                    editedTheme.id === rowIndex
                      ? {
                          textAlign: "left",
                          display: "flex",
                          alignItems: "center",
                          padding: "0 15px 0 0",
                          height: "31px",
                        }
                      : { textAlign: "left", display: "flex", alignItems: "center", paddingRight: "15px" }
                  }
                >
                  {editedTheme.id === rowIndex ? (
                    <div style={{ flexGrow: 1 }}>
                      <TextField
                        fullWidth
                        sx={{
                          ".MuiInputBase-input": { padding: "0 14px 0 4px", height: "31px", width: "100%" },
                          "& .Mui-focused": { boxShadow: "none !important" },
                          fieldset: { border: "0 !important" },
                        }}
                        value={editedTheme.name}
                      />
                    </div>
                  ) : (
                    <p style={{ flexGrow: 1, margin: 0 }}>Інформаційні технології в суспільстві</p>
                  )}

                  <div style={{ width: "28px", display: "flex", justifyContent: "center" }}>
                    {editedTheme.id === rowIndex ? (
                      <>
                        <Tooltip title="Зберегти">
                          <CheckOutlined style={{ cursor: "pointer", marginRight: "10px" }} />
                        </Tooltip>

                        <Tooltip title="Відмінити">
                          <CloseOutlined style={{ cursor: "pointer" }} />
                        </Tooltip>
                      </>
                    ) : (
                      <EditOutlined
                        style={{ display: "none", cursor: "pointer" }}
                        onClick={() => setEditedTheme({ id: rowIndex, name: "Інформаційні технології в суспільстві" })}
                      />
                    )}
                  </div>
                </td>
                <td>2</td>
              </tr>
            ))}

          <tr>
            <th colSpan={2} style={{ textAlign: "left" }}>
              Всього
            </th>
            <th>24</th>
          </tr>
        </tbody>
      </table> */}
    </div>
  )
}
