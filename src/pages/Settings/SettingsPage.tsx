import React from "react"
import { useSelector } from "react-redux"
import { MuiColorInput } from "mui-color-input"
import {
  Box,
  Tab,
  Grid,
  Tabs,
  Select,
  Button,
  Divider,
  InputLabel,
  Typography,
  FormControl,
  Stack,
} from "@mui/material"

import MainCard from "../../components/MainCard"
import { settingsSelector } from "../../store/settings/settingsSlice"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import UsersTab from "../../components/SettingsPage/UsersTab"
import TermsOfStudyTab from "../../components/SettingsPage/TermsOfStudyTab"
import CallSchedulTab from "../../components/SettingsPage/CallSchedulTab"
import ColorsTab from "../../components/SettingsPage/ColorsTab"
import UserRolesTab from "../../components/SettingsPage/UserRolesTab"

const pageTabs = ["Розклад дзвінків", "Терміни навчання", "Користувачі", "Ролі", "Кольори"]

const SettingsPage = () => {
  const [activeTab, setActiveTab] = React.useState(0)

  const { settings } = useSelector(settingsSelector)

  if (!settings) return <LoadingSpinner />

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
    <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: "center", p: 0 }}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid item>
            <Typography variant="h5">Налаштування</Typography>
          </Grid>

          <Grid item>
            <Stack direction="row" spacing={0}>
              {pageTabs.map((el, index) => (
                <Button
                  key={el}
                  size="small"
                  sx={{ py: 0.674, px: 1 }}
                  color={activeTab === index ? "primary" : "secondary"}
                  variant={activeTab === index ? "outlined" : "text"}
                  onClick={() => setActiveTab(index)}
                >
                  {el}
                </Button>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <MainCard sx={{ "& .MuiCardContent-root": { px: "0" } }}>
            {/* <Tabs
              value={activeTab}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{ ".MuiTabs-flexContainer": { justifyContent: "center" } }}
            >
              <Tab label="Терміни навчання" />
              <Tab label="Розклад дзвінків" />
              <Tab label="Користувачі" />
              <Tab label="Ролі" />
              <Tab label="Кольори" />
              <Tab label="Item Six" />
              <Tab label="Item Seven" />
            </Tabs> */}

            {/* <Divider sx={{ mb: 4 }} /> */}

            {activeTab === 0 && <TermsOfStudyTab />}
            {activeTab === 1 && <CallSchedulTab />}
            {activeTab === 2 && <UsersTab />}
            {activeTab === 3 && <UserRolesTab />}
            {activeTab === 4 && <ColorsTab />}
          </MainCard>
        </Grid>
      </Grid>
    </div>
  )
}

export default SettingsPage
