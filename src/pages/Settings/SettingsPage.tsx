import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Tab, Grid, Tabs, Button, Typography, Stack } from '@mui/material'

import MainCard from '../../components/MainCard'
import '../../components/SettingsPage/SettingsPage.css'
import UsersTab from '../../components/SettingsPage/UsersTab'
import ColorsTab from '../../components/SettingsPage/ColorsTab'
import { settingsSelector } from '../../store/settings/settingsSlice'
import UserRolesTab from '../../components/SettingsPage/UserRolesTab'
import CallSchedulTab from '../../components/SettingsPage/CallSchedulTab'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import TermsOfStudyTab from '../../components/SettingsPage/TermsOfStudyTab'
import { useSearchParams } from 'react-router-dom'

const tabs = ['Розклад дзвінків', 'Терміни навчання', 'Користувачі', 'Ролі', 'Кольори']

const SettingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [activeTab, setActiveTab] = React.useState(Number(searchParams.get('tab')) || 0)

  const { settings } = useSelector(settingsSelector)

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
    setSearchParams({ tab: String(newValue) })
  }

  React.useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab) setActiveTab(Number(tab))
  }, [searchParams])

  if (!settings) return <LoadingSpinner />

  return (
    <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: 'center', p: 0 }}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid item>
            <Typography variant="h5">Налаштування</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <MainCard
            sx={{
              '& .MuiCardContent-root': {
                px: '0',
                display: 'flex',
                flexDirection: 'row',
                minHeight: 'calc(100vh - 200px)',
              },
            }}
          >
            <Box sx={{ flex: 1 }}>
              {activeTab === 0 && <TermsOfStudyTab />}
              {activeTab === 1 && <CallSchedulTab />}
              {activeTab === 2 && <UsersTab />}
              {activeTab === 3 && <UserRolesTab />}
              {activeTab === 4 && <ColorsTab />}
            </Box>

            <Box>
              <Tabs
                value={activeTab}
                variant="scrollable"
                scrollButtons="auto"
                orientation="vertical"
                onChange={handleChangeTab}
                className="full-teacher__navigation-inner"
                sx={{
                  borderLeft: 1,
                  height: '100%',
                  minWidth: '280px',
                  borderColor: 'divider',
                  '.MuiTabs-indicator': { left: 0 },
                }}
              >
                {tabs.map((el, index) => (
                  <Tab
                    key={el}
                    label={el}
                    onClick={() => setActiveTab(index)}
                    sx={{ textAlign: 'left', alignItems: 'flex-start', textTransform: 'initial' }}
                  />
                ))}
              </Tabs>
            </Box>
          </MainCard>
        </Grid>
      </Grid>
    </div>
  )
}

export default SettingsPage
