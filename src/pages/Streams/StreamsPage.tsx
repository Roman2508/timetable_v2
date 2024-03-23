// material-ui
import React from "react"
import { useSelector } from "react-redux"
import { FilterOutlined } from "@ant-design/icons"
import { Grid, Table, Divider, IconButton, Typography } from "@mui/material"

// project import
import MainCard from "../../components/MainCard"
import { useAppDispatch } from "../../store/store"
import { StreamsType } from "../../store/streams/streamsTypes"
import { groupsSelector } from "../../store/groups/groupsSlice"
import { streamsSelector } from "../../store/streams/streamsSlice"
import { getStreamLessons, getStreams } from "../../store/streams/streamsAsyncActions"
import { getGroupCategories } from "../../store/groups/groupsAsyncActions"
import StreamSelections from "../../components/StreamsPage/StreamSelections"
import { StreamActionsModal } from "../../components/StreamsPage/StreamActionsModal"
import { AccordionItemsList } from "../../components/AccordionItemsList/AccordionItemsList"
import { StreamLessonsTableHead } from "../../components/StreamsPage/StreamLessonsTableHead"
import { StreamLessonsTableBody } from "../../components/StreamsPage/StreamLessonsTableBody"
import { AddGroupsToStreamModal } from "../../components/StreamsPage/AddGroupsToStreamModal"

// ==============================|| STREAMS ||============================== //

const StreamsPage = () => {
  const dispatch = useAppDispatch()

  const { streams, streamLessons } = useSelector(streamsSelector)
  const { groupCategories } = useSelector(groupsSelector)

  const [actionsModalVisible, setActionsModalVisible] = React.useState(false)
  const [selectedStream, setSelectedStream] = React.useState<null | StreamsType>(null)
  const [actionsModalType, setActionsModalType] = React.useState<"create" | "update">("create")
  const [addGroupsToStreamModalVisible, setAddGroupsToStreamModalVisible] = React.useState(false)

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

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: "center" }}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <Typography variant="h5">Потоки</Typography>
            </Grid>
            <Grid item />
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          {/* <Grid
            item
            xs={4}
            sx={{
              "& .MuiCardContent-root": { p: 0 },
              ".MuiCardContent-root:last-child": { p: 0 },
              p: 0,
            }}
          >
            <MainCard>
              <AccordionItemsList
                activeItemId={selectedGroupId}
                onSelectItem={setSelectedGroupId}
                items={groupCategories ? groupCategories : []}
              />
            </MainCard>
          </Grid> */}

          <Grid item xs={12} sx={{ display: "flex" }}>
            {/* <Grid item xs={8}> */}

            <Grid item xs={9} sx={{ mr: 2 }}>
              <MainCard sx={{ "& .MuiCardContent-root": { px: 1 } }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <Typography
                    variant="button"
                    sx={{
                      textAlign: "center",
                      display: "block",
                      textTransform: "uppercase",
                      px: 2,
                    }}
                  >
                    Навантаження групи PH-24-1
                  </Typography>
                  <IconButton>
                    <FilterOutlined />
                  </IconButton>
                </div>

                <Divider />

                <Table>
                  <StreamLessonsTableHead />
                  <StreamLessonsTableBody
                    selectedLesson={null}
                    streamLessons={streamLessons}
                    setSelectedLesson={() => {}}
                  />
                </Table>
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
