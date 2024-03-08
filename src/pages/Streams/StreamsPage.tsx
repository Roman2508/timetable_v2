// material-ui
import {
  Grid,
  List,
  Divider,
  ListItem,
  Accordion,
  IconButton,
  Typography,
  ListItemText,
  ListItemButton,
  AccordionSummary,
  AccordionDetails,
  Stack,
  InputLabel,
  TextField,
  Tooltip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import {
  DownOutlined,
  LeftSquareOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  FilterOutlined,
} from '@ant-design/icons'

// project import
import React from 'react'
import MainCard from '../../components/MainCard'
import { AccordionItemsList } from '../../components/AccordionItemsList/AccordionItemsList'

// ==============================|| AUDITORIES ||============================== //

const groups = [
  {
    id: 1,
    name: 'Фармація, промислова фармація (ДФ)',
    groups: [
      { id: 1, name: 'PH9-24-1' },
      { id: 2, name: 'PH9-24-2' },
      { id: 3, name: 'PH9-24-3' },
      { id: 4, name: 'PH11-24-1' },
      { id: 5, name: 'PH11-24-2' },
    ],
  },
  {
    id: 2,
    name: 'Фармація, промислова фармація (ЗФ)',
    groups: [
      { id: 6, name: 'Фармація, промислова фармація (ЗФ)' },
      { id: 7, name: 'Фармація, промислова фармація (ДФ)' },
      { id: 8, name: 'Фармація, промислова фармація (ЗФ)' },
    ],
  },
  {
    id: 3,
    name: 'Лабораторна діагностика (ДФ)',
    groups: [
      { id: 9, name: 'Фармація, промислова фармація (ЗФ)' },
      { id: 10, name: 'Фармація, промислова фармація (ЗФ)' },
      { id: 11, name: 'Лабораторна діагностика (ДФ)' },
    ],
  },
]

const StreamsPage = () => {
  return (
    <>
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
          <Grid item xs={4}>
            <MainCard sx={{ '& .MuiCardContent-root': { p: 0 } }}>
              <AccordionItemsList items={groups} />
            </MainCard>
          </Grid>

          <Grid item xs={8}>
            <Grid item sx={{ display: 'flex', gap: 2 }}>
              <Grid item xs={6}>
                <Grid item xs={12} sx={{ mb: 2 }}>
                  <MainCard sx={{ '& .MuiCardContent-root': { p: 0 }, p: 0 }}>
                    <Typography
                      variant="button"
                      sx={{
                        textAlign: 'center',
                        display: 'block',
                        textTransform: 'uppercase',
                        my: 2.6,
                      }}
                    >
                      Виберіть потік
                    </Typography>

                    <Divider />
                    <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 }, maxHeight: '235px', overflowY: 'auto' }}>
                      {[{ name: '1' }, { name: '1' }, { name: '1' }, { name: '1' }, { name: '1' }, { name: '1' }].map(
                        (el) => (
                          <ListItemButton divider sx={{ padding: '8px 24px !important' }}>
                            <ListItemText primary={el.name} />
                          </ListItemButton>
                        )
                      )}
                    </List>
                  </MainCard>
                </Grid>
              </Grid>

              <Grid item xs={6}>
                <MainCard sx={{ '& .MuiCardContent-root': { p: 0 }, p: 0 }}>
                  <Typography
                    variant="button"
                    sx={{
                      textAlign: 'center',
                      display: 'block',
                      textTransform: 'uppercase',
                      my: 2.6,
                    }}
                  >
                    Потік: PH-24
                  </Typography>

                  <Divider />
                  <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 }, maxHeight: '235px', overflowY: 'auto' }}>
                    {[{ name: '1' }, { name: '1' }, { name: '1' }, { name: '1' }, { name: '1' }, { name: '1' }].map(
                      (el) => (
                        <ListItemButton divider sx={{ padding: '8px 24px !important' }}>
                          <ListItemText primary={el.name} />
                        </ListItemButton>
                      )
                    )}
                  </List>
                </MainCard>
              </Grid>
            </Grid>

            <Grid item sx={{ mt: 2 }}>
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
                    Навантаження групи PH-24-1
                  </Typography>
                  <IconButton>
                    <FilterOutlined />
                  </IconButton>
                </div>

                <Divider />

                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="none" align="left">
                        Назва дисципліни
                      </TableCell>
                      <TableCell padding="none" align="right">
                        Семестр
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {Array(10)
                      .fill(null)
                      .map((_, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            '&:hover': { backgroundColor: 'secondary.lighter', cursor: 'pointer' },
                          }}
                        >
                          <TableCell padding="none" align="left">
                            Інформаційні технології в фармації
                          </TableCell>
                          <TableCell padding="none" align="right">
                            1
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export { StreamsPage }
