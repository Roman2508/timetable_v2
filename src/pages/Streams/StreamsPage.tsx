// material-ui
import React from 'react'
import { useSelector } from 'react-redux'
import { FilterOutlined, FormOutlined } from '@ant-design/icons'
import { Grid, Table, Divider, IconButton, Typography, Tooltip } from '@mui/material'

// project import
import MainCard from '../../components/MainCard'
import { useAppDispatch } from '../../store/store'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import { GroupLoadType } from '../../store/groups/groupsTypes'
import { StreamsType } from '../../store/streams/streamsTypes'
import { groupsSelector } from '../../store/groups/groupsSlice'
import { streamsSelector } from '../../store/streams/streamsSlice'
import { getGroupCategories } from '../../store/groups/groupsAsyncActions'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import StreamSelections from '../../components/StreamsPage/StreamSelections'
import { StreamActionsModal } from '../../components/StreamsPage/StreamActionsModal'
import { getStreamLessons, getStreams } from '../../store/streams/streamsAsyncActions'
import { StreamLessonsTableHead } from '../../components/StreamsPage/StreamLessonsTableHead'
import { StreamLessonsTableBody } from '../../components/StreamsPage/StreamLessonsTableBody'
import { AddGroupsToStreamModal } from '../../components/StreamsPage/AddGroupsToStreamModal'
import { AddLessonToStreamModal } from '../../components/StreamsPage/AddLessonToStreamModal'
import { areAllFieldsInStreamEqual } from '../../utils/compateStreamFilelds'

// ==============================|| STREAMS ||============================== //

const StreamsPage = () => {
  const dispatch = useAppDispatch()

  const { streams, streamLessons } = useSelector(streamsSelector)
  const { groupCategories } = useSelector(groupsSelector)

  const [actionsModalVisible, setActionsModalVisible] = React.useState(false)
  const [selectedLessons, setSelectedLessons] = React.useState<GroupLoadType[][]>([])
  const [selectedStream, setSelectedStream] = React.useState<null | StreamsType>(null)
  const [actionsModalType, setActionsModalType] = React.useState<'create' | 'update'>('create')
  const [addGroupsToStreamModalVisible, setAddGroupsToStreamModalVisible] = React.useState(false)
  const [addLessonToStreamModalVisible, setAddLessonToStreamModalVisible] = React.useState(false)
  const [isCombineLessonsToStreamButtonDisabled, setIsCombineLessonsToStreamButtonDisabled] = React.useState(false)

  React.useEffect(() => {
    if (groupCategories) return
    dispatch(getGroupCategories())
  }, [])

  React.useEffect(() => {
    if (streams) return
    dispatch(getStreams())
  }, [])

  React.useEffect(() => {
    if (!selectedStream) return
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
        open={addLessonToStreamModalVisible}
        setOpen={setAddLessonToStreamModalVisible}
      />

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: 'center' }}>
        <Grid item xs={12}>
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
                  }}
                >
                  <Typography
                    variant="button"
                    sx={{
                      textAlign: 'center',
                      display: 'block',
                      textTransform: 'uppercase',
                      px: 2,
                    }}
                  >
                    {selectedStream ? `Потік: ${selectedStream.name}` : 'Виберіть потік'}
                  </Typography>

                  <div>
                    <Tooltip title="Об'єднати вибрані дисципліни в потік">
                      <IconButton
                        sx={{ mr: 1 }}
                        onClick={() => setAddLessonToStreamModalVisible(true)}
                        disabled={isCombineLessonsToStreamButtonDisabled}
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
                {selectedStream && !streamLessons && <LoadingSpinner />}

                {selectedStream && streamLessons && (
                  <Table>
                    <StreamLessonsTableHead />
                    <StreamLessonsTableBody
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

export { StreamsPage }
