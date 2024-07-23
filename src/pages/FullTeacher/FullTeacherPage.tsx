import React from "react"
import { useSelector } from "react-redux"
import { Avatar, Button, Grid, Tab, Tabs, Typography } from "@mui/material"

import MainCard from "../../components/MainCard"
import { useAppDispatch } from "../../store/store"
import GeneralInfoTab from "../../components/FullTeacherPage/GeneralInfoTab"
import { MyTeachingLoadTab } from "../../components/FullTeacherPage/MyTeachingLoadTab"
import { ListsOfStudentsTab } from "../../components/FullTeacherPage/ListsOfStudentsTab"
import { EducationalAndMethodicalComplexesTab } from "../../components/FullTeacherPage/EducationalAndMethodicalComplexesTab"
import IndividualTeacherWorkPlan from "../../components/FullTeacherPage/IndividualTeacherWorkPlan"
import TeachersReportTab from "../../components/FullTeacherPage/TeachersReportTab"

const tabs = [
  "Загальна інформація",
  "Моє педагогічне навантаження",
  "Навчально-методичні комплекси",
  "Індивідуальний план",
  "Звіт викладача",
  "Списки студентів",
  "Друковані праці",
]

const FullTeachersPage = () => {
  const dispatch = useAppDispatch()

  const [activeTab, setActiveTab] = React.useState(0)

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

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
              <div style={{ display: "flex", minHeight: "calc(100vh - 180px)" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "0 16px",
                    borderRight: "1px solid #f0f0f0",
                  }}
                >
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

                  <Button fullWidth variant="outlined">
                    Відкрити календар
                  </Button>
                </div>

                <div className="" style={{ width: "100%", padding: "0 16px" }}>
                  <Typography variant="h5" sx={{ whiteSpace: "nowrap", pb: 3 }}>
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
                  {activeTab === 1 && <MyTeachingLoadTab />}
                  {activeTab === 2 && <EducationalAndMethodicalComplexesTab />}
                  {activeTab === 3 && <IndividualTeacherWorkPlan />}
                  {activeTab === 4 && <TeachersReportTab />}
                  {activeTab === 5 && <ListsOfStudentsTab />}
                  {activeTab === 6 && <div>55555</div>}
                </div>

                <Tabs
                  value={activeTab}
                  onChange={handleChangeTab}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{ borderLeft: 1, borderColor: "divider", minWidth: "280px", ".MuiTabs-indicator": { left: 0 } }}
                  orientation="vertical"
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

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}></div>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default FullTeachersPage
