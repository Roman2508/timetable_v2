// material-ui
import { Grid, List, Typography, ListItemText, ListItemButton, IconButton, Tooltip } from '@mui/material'
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'

// project import
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { deleteGroup, getGroupCategories, deleteGroupCategory } from '../../store/groups/groupsAsyncActions'
import MainCard from '../../components/MainCard'
import { useAppDispatch } from '../../store/store'
import { LoadingStatusTypes } from '../../store/appTypes'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import { groupsSelector } from '../../store/groups/groupsSlice'
import { GroupCategoriesType } from '../../store/groups/groupsTypes'
import { GroupsTable } from '../../components/GroupsPage/GroupsTable'
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
import { GroupsActionsModal } from '../../components/GroupsPage/GroupsActionsModal'

// ==============================|| GROUPS ||============================== //

const GroupsPage = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const { groupCategories, loadingStatus } = useSelector(groupsSelector)

  const [modalVisible, setModalVisible] = useState(false)
  const [groupsVisible, setGroupsVisible] = useState(false)
  const [activeGroupCategory, setActiveGroupCategory] = useState<null | GroupCategoriesType>(null)
  const [actionsModalType, setActionsModalType] = useState<'create-category' | 'update-category'>('create-category')

  const onDeleteEntity = async (type: 'category' | 'group', id: number) => {
    if (type === 'category') {
      if (window.confirm('Ви дійсно хочете видалити категорію?')) {
        await dispatch(deleteGroupCategory(id))

        if (groupCategories) {
          setActiveGroupCategory(groupCategories[0])
        }
      }
    }

    if (type === 'group') {
      if (window.confirm('Ви дійсно хочете видалити групу?')) {
        const { payload } = await dispatch(deleteGroup(id))
        setActiveGroupCategory((prev) => {
          if (prev) {
            const groups = prev.groups.filter((el) => el.id !== payload)
            return { ...prev, groups }
          }
          return null
        })
      }
    }
  }

  React.useEffect(() => {
    if (groupCategories) {
      setActiveGroupCategory(groupCategories[0])
    }

    const fetchData = async () => {
      const { payload } = await dispatch(getGroupCategories(groupsVisible))
      setActiveGroupCategory((payload as GroupCategoriesType[])[0])
    }
    fetchData()
  }, [groupsVisible])

  return (
    <>
      <GroupsActionsModal
        open={modalVisible}
        setOpen={setModalVisible}
        modalType={actionsModalType}
        activeGroupCategory={activeGroupCategory}
        setActiveGroupCategory={setActiveGroupCategory}
      />

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ m: '0 auto', maxWidth: '1200px' }}>
        {/* Категорії (відділення) */}
        <Grid item xs={12} md={5} lg={5}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ mr: '10px' }}>
                Структурні підрозділи
              </Typography>

              <Tooltip title="Створити структурний підрозділ" enterDelay={1000}>
                <IconButton
                  onClick={() => {
                    setActionsModalType('create-category')
                    setModalVisible(true)
                  }}
                >
                  <PlusCircleOutlined />
                </IconButton>
              </Tooltip>

              <Tooltip title={groupsVisible ? 'Показати видимі групи' : 'Показати приховані групи'} enterDelay={1000}>
                <IconButton
                  onClick={() => {
                    setGroupsVisible((prev) => !prev)
                  }}
                >
                  {groupsVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            {loadingStatus === LoadingStatusTypes.LOADING && !groupCategories && <LoadingSpinner />}
            {loadingStatus !== LoadingStatusTypes.LOADING && !groupCategories && <EmptyCard />}
            {groupCategories && (
              <List sx={{ p: 0, '& .MuiListItemButton-root': { py: '12px' } }}>
                {groupCategories.map((el) => (
                  <ListItemButton
                    divider
                    sx={{
                      my: 0,
                      background: activeGroupCategory?.id === el.id ? '#e6f7ff' : 'transparent',
                      '&:hover': {
                        background: activeGroupCategory?.id === el.id ? '#e6f7ff' : '#fafafa',
                      },
                    }}
                    onClick={() => setActiveGroupCategory(el)}
                  >
                    <ListItemText primary={el.name} />
                  </ListItemButton>
                ))}
              </List>
            )}
          </MainCard>
        </Grid>

        {/* Групи */}
        <Grid item xs={12} md={7} lg={7}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item sx={{ flexGrow: 1 }}>
              <Typography variant="h5">Групи</Typography>
            </Grid>

            <Grid item alignItems="center" sx={{ display: 'flex' }}>
              <Typography variant="h5" sx={activeGroupCategory ? { flexGrow: 1 } : { flexGrow: 1, mb: '12px' }}>
                {activeGroupCategory ? activeGroupCategory.name : 'Завантаження...'}
              </Typography>

              {activeGroupCategory && (
                <>
                  <Tooltip title="Додати групу до структурного підрозділу" enterDelay={1000}>
                    <IconButton
                      sx={{ ml: '20px' }}
                      onClick={() => navigate(`/groups/create/${activeGroupCategory.id}`)}
                    >
                      <PlusCircleOutlined />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Перейменувати структурний підрозділ" enterDelay={1000}>
                    <IconButton
                      sx={{ mr: '5px' }}
                      onClick={() => {
                        setActionsModalType('update-category')
                        setModalVisible(true)
                      }}
                    >
                      <EditOutlined />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Видалити структурний підрозділ" enterDelay={1000}>
                    <IconButton sx={{ mr: '5px' }} onClick={() => onDeleteEntity('category', activeGroupCategory.id)}>
                      <DeleteOutlined />
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </Grid>
          </Grid>

          <MainCard sx={{ mt: 2 }} content={false}>
            {loadingStatus === LoadingStatusTypes.LOADING && !activeGroupCategory && <LoadingSpinner />}
            {activeGroupCategory && (
              <GroupsTable
                onDeleteEntity={onDeleteEntity}
                groups={activeGroupCategory.groups}
                setActiveGroupCategory={setActiveGroupCategory}
              />
            )}
            {!activeGroupCategory?.groups.length && loadingStatus !== LoadingStatusTypes.LOADING && <EmptyCard />}

            {/* {activeGroupCategory ? (
              <GroupsTable groups={activeGroupCategory.groups} onDeleteEntity={onDeleteEntity} />
            ) : (
              <EmptyCard />
            )} */}
          </MainCard>
        </Grid>
      </Grid>
    </>
  )
}

export default GroupsPage
