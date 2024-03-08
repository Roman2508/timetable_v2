// material-ui
import {
  Grid,
  List,
  Typography,
  ListItemText,
  ListItemButton,
  IconButton,
  Tooltip,
} from "@mui/material"
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons"

// project import
import React from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../store/store"
import MainCard from "../../components/MainCard"
import { groupsSelector } from "../../store/groups/groupsSlice"
import { GroupCategoriesType } from "../../store/groups/groupsTypes"
import { GroupsTable } from "../../components/GroupsPage/GroupsTable"
import { getGroupCategories } from "../../store/groups/groupsAsyncActions"
import EmptyCard from "../../components/EmptyCard/EmptyCard"

// ==============================|| GROUPS ||============================== //

const categories = [
  { name: "Фармація, промислова фармація (ДФ)" },
  { name: "Фармація, промислова фармація (ЗФ)" },
  { name: "Лабораторна діагностика (ДФ)" },
]

const GroupsPage = () => {
  const dispatch = useAppDispatch()

  const { groupCategories } = useSelector(groupsSelector)

  const [activeGroupCategory, setActiveGroupCategory] = React.useState<null | GroupCategoriesType>(
    null
  )

  React.useEffect(() => {
    if (groupCategories) {
      setActiveGroupCategory(groupCategories[0])
      return
    }

    const fetchData = async () => {
      const { payload } = await dispatch(getGroupCategories())
      setActiveGroupCategory((payload as GroupCategoriesType[])[0])
    }
    fetchData()
  }, [])

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* Категорії (відділення) */}
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" sx={{ mr: "10px" }}>
              Структурні підрозділи
            </Typography>

            <Tooltip title="Створити структурний підрозділ" enterDelay={1000}>
              <IconButton>
                <PlusCircleOutlined />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          {groupCategories ? (
            <List sx={{ p: 0, "& .MuiListItemButton-root": { py: 2 } }}>
              {groupCategories.map((el) => (
                <ListItemButton
                  divider
                  sx={{
                    my: 0,
                    background: activeGroupCategory?.id === el.id ? "#e6f7ff" : "transparent",
                    "&:hover": {
                      background: activeGroupCategory?.id === el.id ? "#e6f7ff" : "#fafafa",
                    },
                  }}
                  onClick={() => setActiveGroupCategory(el)}
                >
                  <ListItemText primary={el.name} />
                </ListItemButton>
              ))}
            </List>
          ) : (
            <EmptyCard />
          )}
        </MainCard>
      </Grid>

      {/* Групи */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item sx={{ flexGrow: 1 }}>
            <Typography variant="h5">Групи</Typography>
          </Grid>

          <Grid item alignItems="center" sx={{ display: "flex" }}>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              {activeGroupCategory ? activeGroupCategory.name : "Завантаження..."}
            </Typography>

            <Tooltip title="Перейменувати структурний підрозділ" enterDelay={1000}>
              <IconButton sx={{ mr: "5px", ml: "20px" }}>
                <EditOutlined />
              </IconButton>
            </Tooltip>

            <Tooltip title="Видалити структурний підрозділ" enterDelay={1000}>
              <IconButton sx={{ mr: "5px" }}>
                <DeleteOutlined />
              </IconButton>
            </Tooltip>

            <Tooltip title="Додати групу до структурного підрозділу" enterDelay={1000}>
              <IconButton>
                <PlusCircleOutlined />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>

        <MainCard sx={{ mt: 2 }} content={false}>
          {activeGroupCategory ? (
            <GroupsTable groups={activeGroupCategory.groups} />
          ) : (
            <EmptyCard />
          )}
        </MainCard>
      </Grid>
    </Grid>
  )
}

export { GroupsPage }
