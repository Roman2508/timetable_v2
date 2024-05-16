import React from 'react'
import { useSelector } from 'react-redux'
import {
  List,
  Grid,
  Paper,
  Stack,
  Select,
  Divider,
  Collapse,
  MenuItem,
  TextField,
  IconButton,
  Typography,
  InputLabel,
  FormControl,
  ListItemText,
  ListSubheader,
  ListItemButton,
  Tooltip,
} from '@mui/material'

import { useAppDispatch } from '../../store/store'
import { groupsSelector } from '../../store/groups/groupsSlice'
import { getGroupCategories } from '../../store/groups/groupsAsyncActions'
import { DownOutlined, LeftSquareOutlined, RightSquareOutlined, UpOutlined } from '@ant-design/icons'

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
  const [openedLessonsIds, setOpenedLessonsIds] = React.useState<number[]>([])

  const { groupCategories } = useSelector(groupsSelector)

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

  const handleOpenLesson = (id: number) => {
    setOpenedLessonsIds((prev) => {
      const isExist = prev.find((el) => el === id)

      if (!isExist) {
        return [...prev, id]
      } else {
        return prev.filter((el) => el !== id)
      }
    })
  }

  React.useEffect(() => {
    dispatch(getGroupCategories(false))
  }, [])

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: 'center', mb: 3 }}>
        <Grid item xs={11.4}>
          <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Grid item>
              <Typography variant="h5">Поділ на підгрупи</Typography>
            </Grid>

            <Grid sx={{ display: 'flex', gap: 3 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="group">Група*</InputLabel>
                <TextField
                  select
                  fullWidth
                  id="group"
                  sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem', width: '140px' } }}
                >
                  {(!groupCategories ? [] : groupCategories).map((category) => (
                    <>
                      <ListSubheader
                        key={category.id}
                        value={category.id}
                        sx={{ fontWeight: 700, color: 'rgba(38, 38, 38, .9)', lineHeight: '40px' }}
                      >
                        {category.name}
                      </ListSubheader>

                      {category.groups.map((group) => (
                        <MenuItem key={group.id} value={group.id}>
                          {group.name}
                        </MenuItem>
                      ))}
                    </>
                  ))}
                </TextField>
              </Stack>

              <Stack spacing={1}>
                <InputLabel htmlFor="group">Семестр*</InputLabel>
                <TextField
                  select
                  fullWidth
                  id="group"
                  defaultValue={1}
                  sx={{ '& .MuiInputBase-input': { py: '10.4px', fontSize: '0.875rem', width: '70px' } }}
                >
                  {[1, 2, 3, 4, 5, 6].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
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

        <Grid item xs={3.8}>
          <Paper sx={{ pt: 2 }}>
            <Typography sx={{ mb: 2, textAlign: 'center' }}>ДИСЦИПЛІНИ</Typography>

            <List>
              <ListItemButton sx={{ backgroundColor: '#fafafa' }}>
                <ListItemText primary="Загальний" sx={{ mr: 1 }} />
              </ListItemButton>
              {[
                { id: 1, name: 'Інформатика', types: ['Лекції', 'Практичні'] },
                { id: 2, name: 'Біологія', types: ['Лекції', 'Практичні', 'Екзамен'] },
                { id: 3, name: 'Ділова іноземна мова', types: ['Лекції', 'Практичні', 'Семінар'] },
                { id: 4, name: 'Інформаційні технології в фармації', types: ['Лекції', 'Практичні'] },
              ].map((lesson) => (
                <React.Fragment key={lesson.id}>
                  <Divider />
                  <ListItemButton onClick={() => handleOpenLesson(lesson.id)} sx={{ backgroundColor: '#fafafa' }}>
                    <ListItemText primary={lesson.name} sx={{ mr: 1 }} />
                    {openedLessonsIds.includes(lesson.id) ? <UpOutlined /> : <DownOutlined />}
                  </ListItemButton>
                  <Divider />
                  <Collapse in={openedLessonsIds.includes(lesson.id)} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {lesson.types.map((type) => (
                        <React.Fragment key={type}>
                          <ListItemButton
                            sx={{ py: '4px', pl: 5 }}
                            // selected={group.id === selectedGroup?.id}
                            // onClick={() => setSelectedGroup(group)}
                          >
                            <ListItemText primary={type} />
                          </ListItemButton>
                          <Divider />
                        </React.Fragment>
                      ))}
                    </List>
                  </Collapse>
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3.8}>
          <Paper sx={{ p: 2 }}>
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}
            >
              <Typography>ІНФОРМАТИКА (ПІДГРУПА 1)</Typography>

              <Tooltip title="Вилучити вибраних студентів зі складу підгрупи">
                <IconButton>
                  <LeftSquareOutlined />
                </IconButton>
              </Tooltip>
            </div>

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
      </Grid>
    </>
  )
}

export { StudentsDivide }
