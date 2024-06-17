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
} from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"
import { DownOutlined, UpOutlined } from "@ant-design/icons"

import { useAppDispatch } from "../../store/store"
import { LoadingStatusTypes } from "../../store/appTypes"
import EmptyCard from "../../components/EmptyCard/EmptyCard"
import { groupsSelector } from "../../store/groups/groupsSlice"
import { GroupsShortType } from "../../store/groups/groupsTypes"
import { StudentType } from "../../store/students/studentsTypes"
import { studentsSelector } from "../../store/students/studentsSlice"
import { getGroupCategories } from "../../store/groups/groupsAsyncActions"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { StudentsForm } from "../../components/StudentsAccounts/StudentsForm"
import { getStudentsByGroupId } from "../../store/students/studentsAsyncActions"
import { ImportStudents } from "../../components/StudentsAccounts/ImportStudents"

const bageColors = {
  ["Навчається"]: "primary",
  ["Відраховано"]: "error",
  ["Академічна відпустка"]: "warning",
} as const

const StudentsAccounts = () => {
  const dispatch = useAppDispatch()

  const { students, loadingStatus } = useSelector(studentsSelector)

  const { groupCategories } = useSelector(groupsSelector)

  const [editMode, setEditMode] = React.useState<"create" | "update">("create")
  const [openCategoryId, setOpenCategoryId] = React.useState<number | null>(null)
  const [selectedGroup, setSelectedGroup] = React.useState<GroupsShortType | null>(null)
  const [selectedStudent, setSelectedStudent] = React.useState<StudentType | null>(null)

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

  React.useEffect(() => {
    if (!selectedGroup) return
    dispatch(getStudentsByGroupId(selectedGroup.id))
  }, [selectedGroup])

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: "center", mb: 3 }}>
        <Grid item xs={11.4}>
          <Grid container>
            <Grid item>
              <Typography variant="h5">Облікові записи</Typography>
            </Grid>
            <Grid item />
          </Grid>
        </Grid>
      </Grid>

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={3.8}>
          <Paper sx={{ pt: 2 }}>
            <Grid container columnSpacing={2.75}>
              <Grid item xs={12}>
                <Typography sx={{ mb: 2, textAlign: "center" }}>ГРУПИ</Typography>

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
                                    sx={{ py: "4px", pl: 5 }}
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
            <Typography sx={{ mb: 2, textAlign: "center" }}>
              {selectedGroup ? `Група: ${selectedGroup.name}` : "ВИБЕРІТЬ ГРУПУ"}
            </Typography>

            <List sx={{ maxHeight: "575px", overflow: "auto" }}>
              {loadingStatus === LoadingStatusTypes.LOADING ? (
                <LoadingSpinner />
              ) : !students || !students.length ? (
                <EmptyCard />
              ) : students ? (
                students.map((student, index) => (
                  <ListItem
                    disablePadding
                    key={student.id}
                    onClick={() => {
                      setEditMode("update")
                      setSelectedStudent(student)
                    }}
                    selected={selectedStudent?.id === student.id}
                  >
                    <ListItemButton sx={{ py: "0px" }}>
                      <ListItemText primary={`${index + 1}. ${student.name}`} />

                      <Chip
                        size="small"
                        variant="filled"
                        label={student.status}
                        sx={{ height: "20px", fontSize: "12px" }}
                        color={bageColors[student.status] || "primary"}
                      />
                    </ListItemButton>
                  </ListItem>
                ))
              ) : null}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3.8}>
          <Paper sx={{ p: 2 }}>
            <div style={{ position: "relative" }}>
              <Typography sx={{ textAlign: "center" }}>
                {editMode === "create" ? "ДОДАТИ НОВОГО СТУДЕНТА" : "ОНОВИТИ СТУДЕНТА"}
              </Typography>

              <ImportStudents />
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

export { StudentsAccounts }
