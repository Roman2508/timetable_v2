// material-ui
import { Grid, Divider, Tooltip, Typography, IconButton } from '@mui/material'
// ant-design
import { FilterOutlined } from '@ant-design/icons'

// project import
import React from 'react'
import { useSelector } from 'react-redux'

import MainCard from '../../components/MainCard'
import { useAppDispatch } from '../../store/store'
import { LoadingStatusTypes } from '../../store/appTypes'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import { GroupLoadType } from '../../store/groups/groupsTypes'
import { groupsSelector } from '../../store/groups/groupsSlice'
import { teachersSelector } from '../../store/teachers/teachersSlice'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { getTeachersCategories } from '../../store/teachers/teachersAsyncActions'
import { getGroup, getGroupCategories } from '../../store/groups/groupsAsyncActions'
import { SelectGroupModal } from '../../components/DistributionPage/SelectGroupModal'
import { AccordionItemsList } from '../../components/AccordionItemsList/AccordionItemsList'
import { DistributionLessonsTable } from '../../components/DistributionPage/DistributionLessonsTable'
import DistributionTeachersToLessons from '../../components/DistributionPage/DistributionTeachersToLessons'

// ==============================|| AUDITORIES ||============================== //

const DistributionPage = () => {
  const dispatch = useAppDispatch()

  const { teachersCategories, loadingStatus } = useSelector(teachersSelector)
  const { groupCategories, group, loadingStatus: groupsLoadingStatus } = useSelector(groupsSelector)

  const [selectedGroupId, setSelectedGroupId] = React.useState<number | null>(null)
  const [selectGroupModalVisible, setSelectGroupModalVisible] = React.useState(false)
  const [selectedTeacherId, setSelectedTeacherId] = React.useState<number | null>(null)
  const [selectedLesson, setSelectedLesson] = React.useState<null | GroupLoadType[]>(null)

  React.useEffect(() => {
    if (!teachersCategories) {
      dispatch(getTeachersCategories())
    }

    if (!groupCategories) {
      dispatch(getGroupCategories())
    }
  }, [])

  React.useEffect(() => {
    if (selectedGroupId) {
      dispatch(getGroup(String(selectedGroupId)))
    }
  }, [selectedGroupId])

  return (
    <>
      <SelectGroupModal
        open={selectGroupModalVisible}
        groupCategories={groupCategories}
        setOpen={setSelectGroupModalVisible}
        setSelectedGroupId={setSelectedGroupId}
      />

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: 'center' }}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <Typography variant="h5">Розподіл навантаження</Typography>
            </Grid>
            <Grid item />
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Grid item xs={4}>
            <MainCard sx={{ '& .MuiCardContent-root': { px: 1 } }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}
              >
                <Typography
                  variant="button"
                  sx={{ textAlign: 'center', display: 'block', textTransform: 'uppercase', px: 2 }}
                >
                  {group.id ? `Навантаження групи: ${group.name}` : 'Виберіть групу'}
                </Typography>

                <Tooltip title="Вибрати групу">
                  <IconButton onClick={() => setSelectGroupModalVisible(true)}>
                    <FilterOutlined />
                  </IconButton>
                </Tooltip>
              </div>

              <Divider />

              {/* DISTRIBUTION TABLE */}
              {!group.id && groupsLoadingStatus !== LoadingStatusTypes.LOADING ? <EmptyCard /> : ''}
              {!group.id && groupsLoadingStatus === LoadingStatusTypes.LOADING ? <LoadingSpinner /> : ''}
              {group.id ? (
                <DistributionLessonsTable
                  groupLoad={group.groupLoad}
                  selectedLesson={selectedLesson}
                  setSelectedLesson={setSelectedLesson}
                />
              ) : (
                ''
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

          <Grid item xs={4} sx={{ borderRadius: '8px', border: '1px solid #e6ebf1', overflow: 'hidden' }}>
            <MainCard>
              <Typography variant="button" sx={{ textAlign: 'center', display: 'block', textTransform: 'uppercase' }}>
                Викладачі
              </Typography>
            </MainCard>

            {/* TEACHERS LIST */}
            {!teachersCategories && loadingStatus === LoadingStatusTypes.LOADING && <LoadingSpinner />}
            {!teachersCategories?.length && loadingStatus !== LoadingStatusTypes.LOADING && <EmptyCard />}
            {teachersCategories?.length && (
              <AccordionItemsList
                items={teachersCategories}
                selectedItemId={selectedTeacherId}
                onSelectItem={setSelectedTeacherId}
              />
            )}
            {/* // TEACHERS LIST */}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export { DistributionPage }
