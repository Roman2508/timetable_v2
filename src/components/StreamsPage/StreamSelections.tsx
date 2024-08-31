import { useSelector } from 'react-redux'
import React, { Dispatch, SetStateAction } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Grid, List, Tooltip, Divider, IconButton, Typography, ListItemText, ListItemButton } from '@mui/material'

import MainCard from '../MainCard'
import EmptyCard from '../EmptyCard/EmptyCard'
import { useAppDispatch } from '../../store/store'
import { LoadingStatusTypes } from '../../store/appTypes'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import { StreamsType } from '../../store/streams/streamsTypes'
import { streamsSelector } from '../../store/streams/streamsSlice'
import { DeleteGroupFromStreamResponseType } from '../../api/apiTypes'
import { deleteStream, deleteGroupFromStream } from '../../store/streams/streamsAsyncActions'

interface IStreamSelectionsProps {
  streams: StreamsType[] | null
  selectedStream: StreamsType | null
  setActionsModalVisible: Dispatch<SetStateAction<boolean>>
  setSelectedStream: Dispatch<SetStateAction<StreamsType | null>>
  setActionsModalType: Dispatch<SetStateAction<'create' | 'update'>>
  setAddGroupsToStreamModalVisible: Dispatch<SetStateAction<boolean>>
}

const StreamSelections: React.FC<IStreamSelectionsProps> = ({
  setAddGroupsToStreamModalVisible,
  setActionsModalVisible,
  setActionsModalType,
  setSelectedStream,
  selectedStream,
  streams,
}) => {
  const dispatch = useAppDispatch()
  const { loadingStatus } = useSelector(streamsSelector)

  const onDeleteStream = async () => {
    if (!selectedStream) return alert('Потік не вибраний')
    if (!window.confirm('Ви дійсно хочете видалити потік?')) return
    if (selectedStream.groups.length) return alert('Неможливо видалити потік в якому є групи')
    await dispatch(deleteStream(selectedStream.id))
    setSelectedStream(null)
  }

  const onRemoveGroupFromStream = async (groupId: number) => {
    if (!selectedStream) return alert('Потік не вибраний')
    if (!window.confirm('Ви дійсно хочете видалити групу з потоку?')) return
    const { payload } = await dispatch(deleteGroupFromStream({ groupId, streamId: selectedStream.id }))
    setSelectedStream((prev) => {
      if (!prev) return null
      const streamGroups = prev.groups.filter((g) => g.id !== (payload as DeleteGroupFromStreamResponseType).groupId)
      return { ...prev, groups: streamGroups }
    })
  }

  return (
    <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <MainCard sx={{ '& .MuiCardContent-root': { p: 0 }, p: 0 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingRight: '8px',
              }}
            >
              <Typography
                variant="button"
                sx={{
                  textAlign: 'left',
                  display: 'block',
                  textTransform: 'uppercase',
                  my: 2.6,
                  px: 3,
                }}
              >
                Потоки:
              </Typography>

              <Tooltip title="Створити потік">
                <IconButton
                  onClick={() => {
                    setActionsModalVisible(true)
                    setActionsModalType('create')
                  }}
                  sx={{ mr: '5px' }}
                >
                  <PlusOutlined />
                </IconButton>
              </Tooltip>
            </div>

            <Divider />
            <List
              sx={{
                p: 0,
                '& .MuiListItemButton-root': { py: 2 },
                maxHeight: '235px',
                height: '235px',
                overflowY: 'auto',
              }}
            >
              {!streams && loadingStatus === LoadingStatusTypes.ERROR && <EmptyCard />}
              {!streams && loadingStatus !== LoadingStatusTypes.ERROR && <LoadingSpinner />}

              {(streams ? streams : []).map((el) => (
                <ListItemButton
                  divider
                  key={el.id}
                  onClick={() => setSelectedStream(el)}
                  selected={selectedStream?.id === el.id}
                  sx={{ padding: '8px 24px !important' }}
                >
                  <ListItemText primary={el.name} />
                </ListItemButton>
              ))}
            </List>
          </MainCard>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <MainCard sx={{ '& .MuiCardContent-root': { p: 0 }, p: 0 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 8px 0 24px',
            }}
          >
            <Tooltip title={selectedStream ? `Групи потоку: ${selectedStream.name}` : 'Виберіть потік'}>
              <Typography
                variant="button"
                sx={{
                  my: 2.6,
                  display: 'block',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {selectedStream ? `Групи потоку: ${selectedStream.name}` : 'Виберіть потік'}
              </Typography>
            </Tooltip>

            {selectedStream && (
              <div style={{ display: 'flex', backgroundColor: '#fff' }}>
                <Tooltip title="Додати групу до потоку">
                  <IconButton onClick={() => setAddGroupsToStreamModalVisible(true)} sx={{ mr: '5px' }}>
                    <PlusOutlined />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Переіменувати потік">
                  <IconButton
                    onClick={() => {
                      setActionsModalVisible(true)
                      setActionsModalType('update')
                    }}
                    sx={{ mr: '5px' }}
                  >
                    <EditOutlined />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Видалити потік">
                  <IconButton onClick={() => onDeleteStream()} sx={{ mr: '5px' }}>
                    <DeleteOutlined />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </div>

          <Divider />
          <List
            sx={{
              p: 0,
              '& .MuiListItemButton-root': { py: 2 },
              maxHeight: '235px',
              height: '235px',
              overflowY: 'auto',
            }}
          >
            {(selectedStream ? selectedStream.groups : []).map((el) => (
              <ListItemButton
                divider
                disableRipple
                key={el.id}
                sx={{
                  '&:hover .MuiButtonBase-root': { display: 'block' },
                  padding: '8px 8px 8px 24px !important',
                  cursor: 'default',
                }}
              >
                <ListItemText primary={el.name} />

                <Tooltip title="Видалити групу з потоку">
                  <IconButton
                    onClick={() => onRemoveGroupFromStream(el.id)}
                    sx={{
                      mr: '8px',
                      p: '0px',
                      width: '28px',
                      height: '28px',
                      display: 'none',
                    }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                </Tooltip>
              </ListItemButton>
            ))}
          </List>
        </MainCard>
      </Grid>
    </Grid>
  )
}

export default StreamSelections
