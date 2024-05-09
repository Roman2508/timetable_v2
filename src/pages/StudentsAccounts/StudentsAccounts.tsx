import {
  Grid,
  List,
  Paper,
  Select,
  Divider,
  Collapse,
  Typography,
  FormControl,
  ListItemText,
  ListItemButton,
  ListItem,
} from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

import { useAppDispatch } from '../../store/store'
import { groupsSelector } from '../../store/groups/groupsSlice'
import { GroupsShortType } from '../../store/groups/groupsTypes'
import { getGroupCategories } from '../../store/groups/groupsAsyncActions'
import { StudentsForm } from '../../components/StudentsAccounts/StudentsForm'

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

const StudentsAccounts = () => {
  const dispatch = useAppDispatch()

  const { groupCategories } = useSelector(groupsSelector)

  const [openCategoryId, setOpenCategoryId] = React.useState<number | null>(null)
  const [selectedGroup, setSelectedGroup] = React.useState<GroupsShortType | null>(null)
  const [selectedStudent, setSelectedStudent] = React.useState<string[]>([])

  const handleOpenCategory = (id: number) => {
    if (id === openCategoryId) {
      setOpenCategoryId(null)
    } else {
      setOpenCategoryId(id)
    }
  }

  React.useEffect(() => {
    if (groupCategories) return
    dispatch(getGroupCategories(false))
  }, [])

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: 'center', mb: 3 }}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <Typography variant="h5">Облікові записи</Typography>
            </Grid>
            <Grid item />
          </Grid>
        </Grid>
      </Grid>

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={4}>
          <Paper sx={{ pt: 2 }}>
            <Grid container columnSpacing={2.75}>
              <Grid item xs={12}>
                <Typography sx={{ mb: 2, textAlign: 'center' }}>ГРУПИ</Typography>

                <List>
                  {groupCategories
                    ? groupCategories.map((category) => {
                        return (
                          <React.Fragment key={category.id}>
                            <Divider />
                            <ListItemButton onClick={() => handleOpenCategory(category.id)}>
                              <ListItemText primary={category.name} sx={{ mr: 1 }} />
                              {category.id === openCategoryId ? <UpOutlined /> : <DownOutlined />}
                            </ListItemButton>
                            <Divider />
                            <Collapse in={category.id === openCategoryId} timeout="auto" unmountOnExit>
                              <List component="div" disablePadding>
                                {category.groups.map((group) => (
                                  <React.Fragment key={group.id}>
                                    <ListItemButton
                                      sx={{ py: '4px', pl: 5 }}
                                      selected={group.id === selectedGroup?.id}
                                      onClick={() => setSelectedGroup(group)}
                                    >
                                      <ListItemText primary={group.name} />
                                    </ListItemButton>
                                    <Divider />
                                  </React.Fragment>
                                ))}
                              </List>
                            </Collapse>
                          </React.Fragment>
                        )
                      })
                    : 'Loading...'}
                </List>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper sx={{ pt: 2 }}>
            <Typography sx={{ mb: 2, textAlign: 'center' }}>
              {selectedGroup ? `Група: ${selectedGroup.name}` : 'ВИБЕРІТЬ ГРУПУ'}
            </Typography>

            <List sx={{ maxHeight: '575px', overflow: 'auto' }}>
              {names.map((name, index) => (
                <ListItem disablePadding>
                  <ListItemButton sx={{ py: '0px' }}>
                    <ListItemText primary={`${index + 1}. ${name}`} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>ДОДАТИ НОВОГО СТУДЕНТА</Typography>

            <StudentsForm editingTeacher={null} />
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export { StudentsAccounts }
