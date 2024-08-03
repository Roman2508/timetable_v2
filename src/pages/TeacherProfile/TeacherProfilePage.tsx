import React from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Avatar, Button, Grid, Tab, Tabs, Typography } from "@mui/material"

import MainCard from "../../components/MainCard"
import { useAppDispatch } from "../../store/store"
import GeneralInfoTab from "../../components/TeacherProfilePage/GeneralInfoTab"
import PrintedWorksTab from "../../components/TeacherProfilePage/PrintedWorksTab"
import TeachersReportTab from "../../components/TeacherProfilePage/TeacherReport/TeachersReportTab"
import { MyTeachingLoadTab } from "../../components/TeacherProfilePage/MyTeachingLoadTab"
import { ListsOfStudentsTab } from "../../components/TeacherProfilePage/ListsOfStudentsTab"
import { InstructionalMaterialsTab } from "../../components/TeacherProfilePage/InstructionalMaterialsTab"
import IndividualTeacherWorkTab from "../../components/TeacherProfilePage/IndividualTeacherWorkPlan/IndividualTeacherWorkTab"

const tabs = [
  "Загальна інформація",
  "Видавнича діяльність",
  "Моє педагогічне навантаження",
  "Навчально-методичні комплекси",
  "Індивідуальний план",
  "Звіт викладача",
  "Списки студентів",
]

const FullTeachersPage = () => {
  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams] = useSearchParams()

  const [activeTab, setActiveTab] = React.useState(Number(searchParams.get("tab")) || 0)

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
    setSearchParams({ tab: String(newValue) })
  }

  React.useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab) setActiveTab(Number(tab))
  }, [searchParams])

  return (
    <>
      <Grid container rowSpacing={2.5} columnSpacing={2.75} sx={{ justifyContent: "center" }}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5">Особистий профіль</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid item xs={12} sx={{ minHeight: "calc(100vh - 160px)" }}>
            <MainCard sx={{ ".MuiCardContent-root": { px: 0, minHeight: "calc(100vh - 140px)" } }}>
              <div className="full-teacher__container">
                <div className="full-teacher__general-info">
                  <Avatar
                    sx={{ bgcolor: "#e9e9e9", width: "150px", height: "150px", fontSize: "46px", fontWeight: 600 }}
                    variant="square"
                  >
                    ПР
                  </Avatar>
                  <Typography variant="h5" sx={{ whiteSpace: "nowrap", pt: 2, pb: 1 }}>
                    Пташник Р.В.
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: "nowrap", textTransform: "initial" }}>
                    Викладач-спеціаліст
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: "nowrap", textTransform: "initial", pb: 2 }}>
                    Пед. навантаження 922 год.
                  </Typography>

                  <Link to="https://calendar.google.com/calendar/u/0/r?tab=rc" target="_blank">
                    <Button fullWidth variant="outlined">
                      Відкрити календар
                    </Button>
                  </Link>
                </div>

                <div className="full-teacher__tabs">
                  <Typography variant="h5" sx={{ whiteSpace: "nowrap", pb: 3, textAlign: "center" }}>
                    {tabs[activeTab]}
                  </Typography>

                  {/* npm i react-swipeable-views */}
                  {/* <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                  >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                      Item One
                    </TabPanel>
                  <SwipeableViews/>  */}

                  {activeTab === 0 && <GeneralInfoTab />}
                  {activeTab === 1 && <PrintedWorksTab />}
                  {activeTab === 2 && <MyTeachingLoadTab />}
                  {activeTab === 3 && <InstructionalMaterialsTab />}
                  {activeTab === 4 && <IndividualTeacherWorkTab />}
                  {activeTab === 5 && <TeachersReportTab />}
                  {activeTab === 6 && <ListsOfStudentsTab />}
                </div>

                <div className="full-teacher__navigation">
                  <Tabs
                    value={activeTab}
                    variant="scrollable"
                    scrollButtons="auto"
                    onChange={handleChangeTab}
                    orientation="vertical"
                    className="full-teacher__navigation-inner"
                    sx={{
                      borderLeft: 1,
                      borderColor: "divider",
                      minWidth: "280px",
                      height: "100%",
                      ".MuiTabs-indicator": { left: 0 },
                    }}
                  >
                    {tabs.map((el) => (
                      <Tab
                        key={el}
                        label={el}
                        sx={{ textAlign: "left", alignItems: "flex-start", textTransform: "initial" }}
                      />
                    ))}
                  </Tabs>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}></div>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default FullTeachersPage

// НМК - instructional-materials
