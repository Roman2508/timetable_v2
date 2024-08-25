import React from "react"
import { useSelector } from "react-redux"
import { FilterOutlined, UserSwitchOutlined } from "@ant-design/icons"
import { Grid, Divider, Tooltip, Typography, IconButton, ListItem, ListItemButton, ListItemText } from "@mui/material"

import MainCard from "../../components/MainCard"
import { useAppDispatch } from "../../store/store"
import { LoadingStatusTypes } from "../../store/appTypes"
import EmptyCard from "../../components/EmptyCard/EmptyCard"
import { GroupLoadType } from "../../store/groups/groupsTypes"
import { groupsSelector } from "../../store/groups/groupsSlice"
import { teachersSelector } from "../../store/teachers/teachersSlice"
import { getGroupCategories } from "../../store/groups/groupsAsyncActions"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import { getTeachersCategories } from "../../store/teachers/teachersAsyncActions"
import { SelectGroupModal } from "../../components/DistributionPage/SelectGroupModal"
import { AccordionItemsList } from "../../components/AccordionItemsList/AccordionItemsList"
import { getGroupLoadByCurrentCourse } from "../../store/scheduleLessons/scheduleLessonsAsyncActions"
import { DistributionLessonsTable } from "../../components/DistributionPage/DistributionLessonsTable"
import { clearGroupLoad, scheduleLessonsSelector } from "../../store/scheduleLessons/scheduleLessonsSlice"
import DistributionTeachersToLessons from "../../components/DistributionPage/DistributionTeachersToLessons"

const DistributionPage = () => {
  const dispatch = useAppDispatch()

  const { groupLoad } = useSelector(scheduleLessonsSelector)
  const { teachersCategories, loadingStatus } = useSelector(teachersSelector)
  const { groupCategories, loadingStatus: groupsLoadingStatus } = useSelector(groupsSelector)

  const [isLessonsLoading, setIsLessonsLoading] = React.useState(false)
  const [isVacancySelected, setIsVacancySelected] = React.useState(false)
  const [selectGroupModalVisible, setSelectGroupModalVisible] = React.useState(false)
  const [selectedTeacherId, setSelectedTeacherId] = React.useState<number | null>(null)
  const [selectedLesson, setSelectedLesson] = React.useState<null | GroupLoadType[]>(null)
  const [selectedGroup, setSelectedGroup] = React.useState<{ id: number; name: string } | null>(null)

  React.useEffect(() => {
    dispatch(getTeachersCategories(false))

    if (!groupCategories) {
      dispatch(getGroupCategories(false))
    }
  }, [])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedGroup?.id) {
          setIsLessonsLoading(true)
          await dispatch(getGroupLoadByCurrentCourse(selectedGroup.id))
        }
      } finally {
        setIsLessonsLoading(false)
      }
    }

    fetchData()

    return () => {
      dispatch(clearGroupLoad())
    }
  }, [selectedGroup])

  return (
    <>
      <SelectGroupModal
        open={selectGroupModalVisible}
        groupCategories={groupCategories}
        setSelectedGroup={setSelectedGroup}
        setOpen={setSelectGroupModalVisible}
        setSelectedLesson={setSelectedLesson}
      />

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: "center" }}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <Typography variant="h5">Розподіл навантаження</Typography>
            </Grid>
            <Grid item />
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid item xs={4}>
            <MainCard sx={{ "& .MuiCardContent-root": { px: 1 } }}>
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}
              >
                <Typography
                  variant="button"
                  sx={{ textAlign: "center", display: "block", textTransform: "uppercase", px: 2 }}
                >
                  {selectedGroup?.name ? `Навантаження групи: ${selectedGroup.name}` : "Виберіть групу"}
                </Typography>

                <Tooltip title="Вибрати групу">
                  <IconButton onClick={() => setSelectGroupModalVisible(true)}>
                    <FilterOutlined />
                  </IconButton>
                </Tooltip>
              </div>

              <Divider />

              {/* DISTRIBUTION TABLE */}

              {!groupLoad?.length && groupsLoadingStatus !== LoadingStatusTypes.LOADING && !isLessonsLoading ? (
                <EmptyCard />
              ) : (
                ""
              )}

              {groupLoad?.length && !isLessonsLoading ? (
                <DistributionLessonsTable
                  groupLoad={groupLoad}
                  selectedLesson={selectedLesson}
                  setSelectedLesson={setSelectedLesson}
                />
              ) : isLessonsLoading ? (
                <LoadingSpinner />
              ) : (
                ""
              )}
              {/* // DISTRIBUTION TABLE */}
            </MainCard>
          </Grid>

          <Grid item xs={4} sx={{ mx: 2 }}>
            {/* DISTRIBUTION LESSONS */}
            <DistributionTeachersToLessons
              selectedLesson={selectedLesson}
              setSelectedLesson={setSelectedLesson}
              selectedTeacherId={selectedTeacherId}
            />
            {/* // DISTRIBUTION LESSONS */}
          </Grid>

          <Grid item xs={4} sx={{ borderRadius: "8px", overflow: "hidden" }}>
            <MainCard sx={{ "& .MuiCardContent-root": { px: 0, pb: 0 } }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  padding: "0 8px",
                }}
              >
                <Typography
                  variant="button"
                  sx={{ textAlign: "center", display: "block", textTransform: "uppercase", px: 2 }}
                >
                  Викладачі
                </Typography>
                <Tooltip title="Вакансія">
                  <IconButton
                    onClick={() => setIsVacancySelected((prev) => !prev)}
                    sx={{
                      backgroundColor: isVacancySelected ? "rgba(22, 119, 255, 0.08)" : "#fff",
                      "&:hover": { background: isVacancySelected ? "rgba(22, 119, 255, 0.08)" : "rgb(250, 250, 250)" },
                    }}
                  >
                    <UserSwitchOutlined style={{ color: isVacancySelected ? "rgb(22, 119, 255)" : "#262626" }} />
                  </IconButton>
                </Tooltip>
              </div>

              {/* TEACHERS LIST */}
              {!teachersCategories && loadingStatus === LoadingStatusTypes.LOADING && <LoadingSpinner />}
              {!teachersCategories?.length && loadingStatus !== LoadingStatusTypes.LOADING && <EmptyCard />}
              {teachersCategories?.length && (
                <AccordionItemsList
                  items={teachersCategories}
                  disabled={isVacancySelected}
                  selectedItemId={selectedTeacherId}
                  onSelectItem={setSelectedTeacherId}
                />
              )}
              {/* // TEACHERS LIST */}
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default DistributionPage
