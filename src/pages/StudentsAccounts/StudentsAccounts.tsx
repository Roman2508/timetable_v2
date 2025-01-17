import {
  Chip,
  Grid,
  List,
  Paper,
  Divider,
  Collapse,
  ListItem,
  Typography,
  ListItemText,
  ListItemButton,
  Checkbox,
} from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { DownOutlined, UpOutlined, DeleteOutlined } from '@ant-design/icons'

import { useAppDispatch } from '../../store/store'
import { LoadingStatusTypes } from '../../store/appTypes'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import { groupsSelector } from '../../store/groups/groupsSlice'
import { GroupsShortType } from '../../store/groups/groupsTypes'
import { StudentType } from '../../store/students/studentsTypes'
import HelperModal from '../../components/StudentsAccounts/HelperModal'
import { getGroupCategories } from '../../store/groups/groupsAsyncActions'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { StudentsForm } from '../../components/StudentsAccounts/StudentsForm'
import ExportStudents from '../../components/StudentsAccounts/ExportStudents'
import { getStudentsByGroupId } from '../../store/students/studentsAsyncActions'
import { UpdateStudents } from '../../components/StudentsAccounts/UpdateStudents'
import { ImportStudents } from '../../components/StudentsAccounts/ImportStudents'
import { clearStudents, studentsSelector } from '../../store/students/studentsSlice'
import DeleteStudents from '../../components/StudentsAccounts/DeleteStudents'

const bageColors = {
  ['Навчається']: 'primary',
  ['Відраховано']: 'error',
  ['Академічна відпустка']: 'warning',
} as const

const StudentsAccounts = () => {
  const dispatch = useAppDispatch()

  const { students, loadingStatus } = useSelector(studentsSelector)

  const { groupCategories } = useSelector(groupsSelector)

  const [deleteMode, setDeleteMode] = React.useState(false)
  const [helperModalVisible, setHelperModalVisible] = React.useState(false)
  const [editMode, setEditMode] = React.useState<'create' | 'update'>('create')
  const [openCategoryId, setOpenCategoryId] = React.useState<number | null>(null)
  const [studentsIdsToDelete, setStudentsIdsToDelete] = React.useState<number[]>([])
  const [selectedGroup, setSelectedGroup] = React.useState<GroupsShortType | null>(null)
  const [selectedStudent, setSelectedStudent] = React.useState<StudentType | null>(null)

  const handleOpenCategory = (id: number) => {
    if (id === openCategoryId) {
      setOpenCategoryId(null)
    } else {
      setOpenCategoryId(id)
    }
  }

  const handleAddStudentToDelete = (id: number) => {
    setStudentsIdsToDelete((prev) => {
      if (prev.includes(id)) {
        return prev.filter((studentId) => studentId !== id)
      }

      return [...prev, id]
    })
  }

  React.useEffect(() => {
    if (groupCategories) return
    dispatch(getGroupCategories(false))
  }, [])

  React.useEffect(() => {
    if (!selectedGroup) return
    dispatch(getStudentsByGroupId(selectedGroup.id))

    return () => {
      dispatch(clearStudents())
    }
  }, [selectedGroup])

  return (
    <>
      <HelperModal open={helperModalVisible} setOpen={setHelperModalVisible} />

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: 'center', mb: 3 }}>
        <Grid item xs={11.4}>
          <Grid container>
            <Grid item>
              <Typography variant="h5">Облікові записи</Typography>
            </Grid>
            <Grid item />
          </Grid>
        </Grid>
      </Grid>

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={3.8}>
          <Paper sx={{ pt: 2 }}>
            <Grid container columnSpacing={2.75}>
              <Grid item xs={12}>
                <Typography sx={{ mb: 2, textAlign: 'left', pl: 2 }}>ГРУПИ</Typography>

                <List>
                  {groupCategories ? (
                    groupCategories.map((category) => {
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
                  ) : (
                    <LoadingSpinner />
                  )}
                </List>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={3.8}>
          <Paper sx={{ pt: 2 }}>
            <div
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                padding: '0 16px',
                display: 'flex',
                height: '36px',
              }}
            >
              <Typography>{selectedGroup ? `Група: ${selectedGroup.name}` : 'ВИБЕРІТЬ ГРУПУ'}</Typography>

              {students && !!students.length && (
                <DeleteStudents
                  deleteMode={deleteMode}
                  setDeleteMode={setDeleteMode}
                  studentsIdsToDelete={studentsIdsToDelete}
                  setStudentsIdsToDelete={setStudentsIdsToDelete}
                />
              )}
            </div>

            <Divider />

            <List sx={{ maxHeight: 'calc(100vh - 220px)', overflow: 'auto' }}>
              {loadingStatus === LoadingStatusTypes.LOADING ? (
                <LoadingSpinner />
              ) : !students || !students.length ? (
                <EmptyCard />
              ) : students ? (
                students.map((student, index) => (
                  <React.Fragment key={student.id}>
                    {deleteMode && index === 0 && (
                      <>
                        {/* ВИБРАТИ ВСІХ */}
                        <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: '30px' }}>
                          <b style={{ flex: 1 }}>Вибрати всіх:</b>

                          <Checkbox
                            size="small"
                            sx={{ p: 0 }}
                            onChange={() => {
                              if (studentsIdsToDelete.length === students.length) {
                                setStudentsIdsToDelete([])
                              } else {
                                setStudentsIdsToDelete(students.map((student) => student.id))
                              }
                            }}
                          />
                        </div>
                        <Divider sx={{ my: 1 }} />
                        {/* // ВИБРАТИ ВСІХ */}
                      </>
                    )}

                    <div
                      key={student.id}
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <ListItem
                        disablePadding
                        key={student.id}
                        onClick={() => {
                          setEditMode('update')
                          setSelectedStudent(student)
                        }}
                        selected={selectedStudent?.id === student.id}
                      >
                        <ListItemButton sx={{ py: '0px' }}>
                          <ListItemText
                            primary={`${index + 1}. ${student.name}`}
                            sx={{ '& span': { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' } }}
                          />

                          <Chip
                            size="small"
                            variant="filled"
                            label={student.status}
                            sx={{ height: '20px', fontSize: '12px' }}
                            color={bageColors[student.status] || 'primary'}
                          />
                        </ListItemButton>
                      </ListItem>

                      {deleteMode && (
                        <div style={{ paddingRight: '16px' }}>
                          <Checkbox
                            size="small"
                            sx={{ p: 0 }}
                            checked={studentsIdsToDelete.includes(student.id)}
                            onChange={() => handleAddStudentToDelete(student.id)}
                          />
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                ))
              ) : null}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3.8}>
          <Paper sx={{ p: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ textAlign: 'center' }}>
                {editMode === 'create' ? 'ДОДАТИ НОВОГО СТУДЕНТА' : 'ОНОВИТИ СТУДЕНТА'}
              </Typography>

              <div style={{ backgroundColor: '#fff' }}>
                <ImportStudents setHelperModalVisible={setHelperModalVisible} />

                <UpdateStudents />

                <ExportStudents groupId={selectedGroup ? selectedGroup.id : undefined} />
              </div>
            </div>

            <StudentsForm
              editingsStudent={selectedStudent}
              setSelectedStudent={setSelectedStudent}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default StudentsAccounts
