import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import React from 'react'

type Props = {}

export const ListsOfStudentsTab = ({}: Props) => {
  const [fileType, setFileType] = React.useState<string | null>('excel')

  const handleChangeFileType = (_: React.MouseEvent<HTMLElement>, newType: string) => {
    setFileType(newType)
  }

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
        <Button variant="contained" sx={{ height: '41px', ml: 2 }}>
          Переглянути
        </Button>
      </div>

      <Divider />

      <FormGroup sx={{ mt: 2 }}>
        <FormControlLabel control={<Checkbox />} label="Показати логіни" sx={{ userSelect: 'none' }} />
        <FormControlLabel control={<Checkbox />} label="Показати паролі" sx={{ userSelect: 'none' }} />
        <FormControlLabel control={<Checkbox />} label="Показати електронну пошту" sx={{ userSelect: 'none' }} />
      </FormGroup>

      <Typography sx={{ mt: 2, mb: 1 }}>Експортувати файл в:</Typography>
      <ToggleButtonGroup value={fileType} exclusive onChange={handleChangeFileType} color="primary">
        <ToggleButton value="excel" sx={{ width: '100px' }}>
          EXCEL
        </ToggleButton>
        <ToggleButton value="pdf" sx={{ width: '100px' }}>
          PDF
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
