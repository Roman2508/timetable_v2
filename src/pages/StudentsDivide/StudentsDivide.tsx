import React from 'react'
import { useSelector } from 'react-redux'
import { LeftSquareOutlined, RightSquareOutlined } from '@ant-design/icons'
import { Grid, Paper, Select, Tooltip, IconButton, Typography, FormControl } from '@mui/material'

import { useAppDispatch } from '../../store/store'
import StudentsDivideFilter from '../../components/StudentsDividePage/StudentsDivideFilter'
import StudentsDivideLessons from '../../components/StudentsDividePage/StudentsDivideLessons'
import { groupsSelector } from '../../store/groups/groupsSlice'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import { GroupLoadType } from '../../store/groups/groupsTypes'

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
  const dispatch = useAppDispatch()

  const { group } = useSelector(groupsSelector)

  const [a, setA] = React.useState<number[]>([])
  const [personName, setPersonName] = React.useState<string[]>([])
  const [dividingType, setDividingType] = React.useState<'all' | 'one'>('all')
  const [selectedLesson, setSelectedLesson] = React.useState<GroupLoadType | null>(null)

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
        <Grid item xs={11.4}>
          <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid item>
              <Typography variant="h5">Поділ на підгрупи</Typography>
            </Grid>

            <Grid sx={{ display: 'flex', gap: 3 }}>
              <StudentsDivideFilter />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={3.8}>
          <Paper sx={{ p: 2 }}>
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}
            >
              <Typography>ЗДОБУВАЧІ</Typography>

              <Tooltip title="Додати вибраних студентів до підгрупи">
                <IconButton>
                  <RightSquareOutlined />
                </IconButton>
              </Tooltip>
            </div>

            {!group || !group.students.length ? (
              <EmptyCard />
            ) : (
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
                  {group.students.map((student, i) => (
                    <option key={student.id} value={student.id} style={{ padding: '2px 0' }}>
                      {`${i + 1}. ${student.name}`}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
          </Paper>
        </Grid>

        <Grid item xs={3.8}>
          <StudentsDivideLessons
            dividingType={dividingType}
            selectedLesson={selectedLesson}
            setDividingType={setDividingType}
            setSelectedLesson={setSelectedLesson}
          />
        </Grid>

        <Grid item xs={3.8}>
          <Paper sx={{ p: 2 }}>
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}
            >
              <Typography sx={{ textTransform: 'uppercase' }}>
                {selectedLesson
                  ? `${selectedLesson.name} ${
                      selectedLesson.subgroupNumber && `(підгрупа ${selectedLesson.subgroupNumber})`
                    }`
                  : 'Всі дисципліни'}
              </Typography>

              <Tooltip title="Вилучити вибраних студентів зі складу підгрупи">
                <IconButton>
                  <LeftSquareOutlined />
                </IconButton>
              </Tooltip>
            </div>

            {!group || !group.students.length ? (
              <EmptyCard />
            ) : (
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
                  {(dividingType === 'all' ? group.students : selectedLesson ? selectedLesson.students : []).map(
                    (student, i) => (
                      <option key={student.id} value={student.id} style={{ padding: '2px 0' }}>
                        {`${i + 1}. ${student.name}`}
                      </option>
                    )
                  )}
                </Select>
              </FormControl>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default StudentsDivide
