// material-ui
import {
  Box,
  Grid,
  List,
  Stack,
  Button,
  MenuItem,
  TextField,
  Typography,
  ListItemText,
  ListItemButton,
} from '@mui/material'

// project import
import MainCard from '../../components/MainCard'
import OrdersTable from '../../pages/dashboard/OrdersTable'
import { GroupsTable } from '../../components/GroupsPage/GroupsTable'

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const categories = [
  { name: 'Фармація, промислова фармація (ДФ)' },
  { name: 'Фармація, промислова фармація (ЗФ)' },
  { name: 'Лабораторна діагностика (ДФ)' },
]

const GroupsPage = () => {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* Категорії (відділення) */}
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Категорії</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
            {categories.map((el) => (
              <ListItemButton divider sx={{ my: 0 }}>
                <ListItemText primary={el.name} />
              </ListItemButton>
            ))}
          </List>
        </MainCard>
      </Grid>

      {/* Групи */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Групи</Typography>
        </Grid>

        <MainCard sx={{ mt: 2 }} content={false}>
          <GroupsTable />
        </MainCard>
      </Grid>
    </Grid>
  )
}

export { GroupsPage }
