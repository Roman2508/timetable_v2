import React from 'react'
import { FormControl, Grid, Paper, Select, Typography } from '@mui/material'

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
  'Oliver Hansen1',
  'Oliver Hansen2',
  'Van Henry1',
  'Van Henry2',
  'April Tucker1',
  'April Tucker2',
  'Ralph Hubbard1',
  'Ralph Hubbard2',
  'Omar Alexander1',
  'Omar Alexander2',
  'Carlos Abbott1',
  'Carlos Abbott2',
  'Miriam Wagner1',
  'Miriam Wagner2',
  'Bradley Wilkerson1',
  'Bradley Wilkerson2',
  'Virginia Andrews1',
  'Virginia Andrews2',
  'Kelly Snyder1',
  'Kelly Snyder2',
]

const StudentsDivide = () => {
  const [personName, setPersonName] = React.useState<string[]>([])

  const handleChangeMultiple = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { options } = event.target
    const value: string[] = []
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value)
      }
    }
    setPersonName(value)
  }

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: 'center', mb: 3 }}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <Typography variant="h5">Поділ на підгрупи</Typography>
            </Grid>
            <Grid item />
          </Grid>
        </Grid>
      </Grid>

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>1111</Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <FormControl
              sx={{
                width: '100%',
                '& select': { height: '100%', minHeight: '540px', p: '10px 14px 8px 12px' },
              }}
            >
              <Select<string[]>
                native
                multiple
                value={personName}
                // @ts-ignore Typings are not considering `native`
                onChange={handleChangeMultiple}
                inputProps={{ id: 'select-multiple-native' }}
              >
                {names.map((name, i) => (
                  <option key={name} value={name} style={{ padding: '2px 0' }}>
                    {`${i + 1}. ${name}`}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>1111</Paper>
        </Grid>
      </Grid>
    </>
  )
}

export { StudentsDivide }
