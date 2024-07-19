import React from 'react'
import { useSelector } from 'react-redux'
import { FilterOutlined, FormOutlined } from '@ant-design/icons'
import { Grid, Table, Divider, IconButton, Typography, Tooltip } from '@mui/material'

import MainCard from '../../components/MainCard'
import { useAppDispatch } from '../../store/store'
import { LoadingStatusTypes } from '../../store/appTypes'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import { GroupLoadType } from '../../store/groups/groupsTypes'
import { StreamsType } from '../../store/streams/streamsTypes'
import { groupsSelector } from '../../store/groups/groupsSlice'
import { getGroupCategories } from '../../store/groups/groupsAsyncActions'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import StreamSelections from '../../components/StreamsPage/StreamSelections'
import { areAllFieldsInStreamEqual } from '../../utils/compateStreamFilelds'
import { StreamActionsModal } from '../../components/StreamsPage/StreamActionsModal'
import { getStreamLessons, getStreams } from '../../store/streams/streamsAsyncActions'
import { clearStreamLessons, streamsSelector } from '../../store/streams/streamsSlice'
import { StreamLessonsTableHead } from '../../components/StreamsPage/StreamLessonsTableHead'
import { StreamLessonsTableBody } from '../../components/StreamsPage/StreamLessonsTableBody'
import { AddGroupsToStreamModal } from '../../components/StreamsPage/AddGroupsToStreamModal'
import { AddLessonToStreamModal } from '../../components/StreamsPage/AddLessonToStreamModal'

export type StreamsTableSortType = {
  key: 'name' | 'semester' | 'group'
  order: 'asc' | 'desc'
}

const StreamsPage = () => {
  const dispatch = useAppDispatch()

  const { groupCategories } = useSelector(groupsSelector)
  const { streams, streamLessons, loadingStatus } = useSelector(streamsSelector)

  const [actionsModalVisible, setActionsModalVisible] = React.useState(false)
  const [selectedLessons, setSelectedLessons] = React.useState<GroupLoadType[][]>([])
  const [selectedStream, setSelectedStream] = React.useState<null | StreamsType>(null)
  const [actionsModalType, setActionsModalType] = React.useState<'create' | 'update'>('create')
  const [addGroupsToStreamModalVisible, setAddGroupsToStreamModalVisible] = React.useState(false)
  const [addLessonToStreamModalVisible, setAddLessonToStreamModalVisible] = React.useState(false)
  const [sortBy, setSortBy] = React.useState<StreamsTableSortType>({ key: 'name', order: 'asc' })
  const [isCombineLessonsToStreamButtonDisabled, setIsCombineLessonsToStreamButtonDisabled] = React.useState(false)

  React.useEffect(() => {
    if (groupCategories) return
    dispatch(getGroupCategories(false))
  }, [])

  React.useEffect(() => {
    if (streams) return
    dispatch(getStreams())

    return () => {
      dispatch(clearStreamLessons())
    }
  }, [])

  React.useEffect(() => {
    if (!selectedStream) return
    dispatch(clearStreamLessons())
    const fetchGroups = async () => {
      Promise.allSettled(
        selectedStream.groups.map(async (el) => {
          await dispatch(getStreamLessons(el.id))
        })
      )
    }
    fetchGroups()
  }, [selectedStream])

  React.useEffect(() => {
    if (selectedLessons.length > 1) {
      const isDisabled = areAllFieldsInStreamEqual(selectedLessons)
      setIsCombineLessonsToStreamButtonDisabled(!isDisabled)
    } else {
      setIsCombineLessonsToStreamButtonDisabled(true)
    }
  }, [selectedLessons])

  return (
    <>
      <StreamActionsModal
        open={actionsModalVisible}
        modalType={actionsModalType}
        selectedStream={selectedStream}
        setOpen={setActionsModalVisible}
      />

      <AddGroupsToStreamModal
        selectedStream={selectedStream}
        groupCategories={groupCategories}
        open={addGroupsToStreamModalVisible}
        setSelectedStream={setSelectedStream}
        setOpen={setAddGroupsToStreamModalVisible}
      />

      <AddLessonToStreamModal
        selectedStream={selectedStream}
        selectedLessons={selectedLessons}
        open={addLessonToStreamModalVisible}
        setOpen={setAddLessonToStreamModalVisible}
      />

      <Grid container columnSpacing={2.75} sx={{ justifyContent: 'center' }}>
        <Grid item xs={12} sx={{ mb: 3 }}>
          <Grid container>
            <Grid item>
              <Typography variant="h5">Потоки</Typography>
            </Grid>
            <Grid item />
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Grid item xs={12} sx={{ display: 'flex' }}>
            <Grid item xs={9} sx={{ mr: 2 }}>
              <MainCard sx={{ '& .MuiCardContent-root': { px: 1 } }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    whiteSpace: 'nowrap',
                    overflowY: 'auto',
                  }}
                >
                  <Typography
                    variant="button"
                    sx={{ textAlign: 'center', display: 'block', textTransform: 'uppercase', px: 2 }}
                  >
                    {selectedStream ? `Потік: ${selectedStream.name}` : 'Виберіть потік'}
                  </Typography>

                  <div>
                    <Tooltip title="Об'єднати вибрані дисципліни в потік">
                      <IconButton
                        sx={{ mr: 1 }}
                        disabled={isCombineLessonsToStreamButtonDisabled}
                        onClick={() => setAddLessonToStreamModalVisible(true)}
                      >
                        <FormOutlined />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Фільтрувати дисципліни">
                      <IconButton disabled>
                        <FilterOutlined />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>

                <Divider />

                {!selectedStream && <EmptyCard text="Потік не вибраний" />}
                {selectedStream && !streamLessons && loadingStatus === LoadingStatusTypes.LOADING && <LoadingSpinner />}
                {selectedStream && !streamLessons && loadingStatus === LoadingStatusTypes.ERROR && (
                  <EmptyCard text="Не знайдено" />
                )}

                {selectedStream && streamLessons && (
                  <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
                    <StreamLessonsTableHead sortBy={sortBy} setSortBy={setSortBy} />
                    <StreamLessonsTableBody
                      sortBy={sortBy}
                      streamLessons={streamLessons}
                      selectedLessons={selectedLessons}
                      setSelectedLessons={setSelectedLessons}
                    />
                  </Table>
                )}
              </MainCard>
            </Grid>

            <StreamSelections
              streams={streams}
              selectedStream={selectedStream}
              setSelectedStream={setSelectedStream}
              setActionsModalType={setActionsModalType}
              setActionsModalVisible={setActionsModalVisible}
              setAddGroupsToStreamModalVisible={setAddGroupsToStreamModalVisible}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default StreamsPage
