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
} from "@mui/material"
import { DownOutlined } from "@ant-design/icons"
import { EditOutlined } from "@ant-design/icons"
import { DeleteOutlined } from "@ant-design/icons"

// project import
import React from "react"
import MainCard from "../../components/MainCard"
import CreateAuditoryForm from "../../components/AuditoriesPage/CreateAuditoryForm"
import UpdateAuditoryModal from "../../components/AuditoriesPage/UpdateAuditoryModal"
import CreateAuditoryCategoryForm from "../../components/AuditoriesPage/CreateAuditoryCategoryForm"
import UpdateAuditoryCategoryForm from "../../components/AuditoriesPage/UpdateAuditoryCategoryForm"

// ==============================|| AUDITORIES ||============================== //

const plans = [
  {
    id: 1,
    name: "1 поверх",
    items: [
      { id: 1, name: "Фармація, промислова фармація (ДФ)" },
      { id: 2, name: "Фармація, промислова фармація (ДФ)" },
      { id: 3, name: "Фармація, промислова фармація (ДФ)" },
      { id: 4, name: "Фармація, промислова фармація (ДФ)" },
      { id: 5, name: "Фармація, промислова фармація (ДФ)" },
    ],
  },
  {
    id: 2,
    name: "2 поверх",
    items: [
      { id: 6, name: "Фармація, промислова фармація (ЗФ)" },
      { id: 7, name: "Фармація, промислова фармація (ДФ)" },
      { id: 8, name: "Фармація, промислова фармація (ЗФ)" },
    ],
  },
  {
    id: 3,
    name: "3 поверх",
    items: [
      { id: 9, name: "Фармація, промислова фармація (ЗФ)" },
      { id: 10, name: "Фармація, промислова фармація (ЗФ)" },
      { id: 11, name: "Лабораторна діагностика (ДФ)" },
    ],
  },
  {
    id: 3,
    name: "4 поверх",
    items: [
      { id: 9, name: "Фармація, промислова фармація (ЗФ)" },
      { id: 10, name: "Фармація, промислова фармація (ЗФ)" },
      { id: 11, name: "Лабораторна діагностика (ДФ)" },
    ],
  },
]

const AuditoriesPage = () => {
  const [isAuditoryModalOpen, setIsAuditoryModalOpen] = React.useState(false)
  const [isAuditoryCategoryModalOpen, setIsAuditoryCategoryModalOpen] = React.useState(false)

  return (
    <>
      <UpdateAuditoryModal open={isAuditoryModalOpen} setOpen={setIsAuditoryModalOpen} />
      <UpdateAuditoryCategoryForm
        open={isAuditoryCategoryModalOpen}
        setOpen={setIsAuditoryCategoryModalOpen}
      />

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: "center" }}>
        <Grid item xs={12} md={10}>
          <Grid container>
            <Grid item>
              <Typography variant="h5">Аудиторії</Typography>
            </Grid>
            <Grid item />
          </Grid>
        </Grid>

        <Grid item xs={12} md={10} sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid
            item
            xs={8}
            sx={{ borderRadius: "8px", border: "1px solid #e6ebf1", overflow: "hidden" }}
          >
            {plans.map((planCategory) => (
              <Accordion key={planCategory.id} sx={{ boxShadow: 0, border: "" }}>
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  expandIcon={<DownOutlined />}
                >
                  <Typography
                    sx={{
                      flexGrow: 1,
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                    }}
                    variant="h6"
                  >
                    {planCategory.name}
                  </Typography>

                  <Typography
                    sx={{
                      color: "text.secondary",
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                      mr: 4,
                    }}
                  >
                    Аудиторій: {planCategory.items.length}
                  </Typography>

                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsAuditoryCategoryModalOpen(true)
                    }}
                    sx={{ mr: "5px" }}
                  >
                    <EditOutlined />
                  </IconButton>

                  <IconButton onClick={(e) => e.stopPropagation()} sx={{ mr: "15px" }}>
                    <DeleteOutlined />
                  </IconButton>
                </AccordionSummary>

                <AccordionDetails sx={{ p: 0 }}>
                  <List>
                    {planCategory.items.map((plan) => (
                      <div>
                        <Divider />
                        <ListItem
                          disablePadding
                          key={plan.id}
                          sx={{ "&:hover .MuiButtonBase-root": { display: "block" } }}
                        >
                          <ListItemButton>
                            <ListItemText primary={plan.name} />
                          </ListItemButton>

                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation()
                              setIsAuditoryModalOpen(true)
                            }}
                            sx={{ mr: "5px", display: "none" }}
                          >
                            <EditOutlined />
                          </IconButton>

                          <IconButton
                            onClick={(e) => e.stopPropagation()}
                            sx={{ mr: "5px", display: "none" }}
                          >
                            <DeleteOutlined />
                          </IconButton>
                        </ListItem>
                      </div>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>

          <Grid item xs={4} sx={{ ml: 2 }}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <MainCard>
                <Typography
                  variant="button"
                  sx={{ textAlign: "center", display: "block", textTransform: "uppercase" }}
                >
                  Додати нову аудиторію
                </Typography>

                <CreateAuditoryForm />
              </MainCard>
            </Grid>

            <Grid item xs={12}>
              <MainCard>
                <Typography
                  variant="button"
                  sx={{ textAlign: "center", display: "block", textTransform: "uppercase" }}
                >
                  Додати нову категорію
                </Typography>

                <CreateAuditoryCategoryForm />
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export { AuditoriesPage }
