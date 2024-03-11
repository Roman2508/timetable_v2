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
  Tooltip,
} from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { EditOutlined } from "@ant-design/icons"
import { DeleteOutlined } from "@ant-design/icons"
import { DownOutlined, PlusCircleOutlined } from "@ant-design/icons"

// project import
import { useAppDispatch } from "../../store/store"
import { LoadingStatusTypes } from "../../store/appTypes"
import EmptyCard from "../../components/EmptyCard/EmptyCard"
import { plansSelector } from "../../store/plans/plansSlice"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import PlanCategoryModal from "../../components/PlansPage/PlanCategoryModal"
import { deletePlanCategory, getPlansCategories } from "../../store/plans/plansAsyncActions"

// ==============================|| PLANS ||============================== //

const PlansPage = () => {
  const dispatch = useAppDispatch()

  const { plansCategories, loadingStatus } = useSelector(plansSelector)

  const [isOpenModal, setIsOpenModal] = React.useState(false)
  const [editingPlanCategory, setEditingPlanCategory] = React.useState<{
    id: number
    name: string
  } | null>(null)
  const [modalType, setModalType] = React.useState<"create" | "update" | "create-plan">("create")

  React.useEffect(() => {
    if (plansCategories) return

    dispatch(getPlansCategories())
  }, [])

  const onDeleteCategory = (id: number, plansCount: number) => {
    if (!window.confirm("Ви дійсно хочете видалити категорію?")) return

    if (plansCount > 0) {
      alert("В категорії не повинно бути планів")
    } else {
      dispatch(deletePlanCategory(id))
    }
  }

  return (
    <>
      <PlanCategoryModal
        open={isOpenModal}
        modalType={modalType}
        setOpen={setIsOpenModal}
        editingPlanCategory={editingPlanCategory}
      />

      <Grid container rowSpacing={4.5} columnSpacing={2.75} sx={{ justifyContent: "center" }}>
        {/* Категорії */}
        <Grid item xs={12} md={9}>
          <Grid container sx={{ alignItems: "center" }}>
            <Grid item sx={{ flexGrow: 1 }}>
              <Typography variant="h5">Плани</Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Створити нову категорію" enterDelay={1000}>
                <IconButton
                  onClick={() => {
                    setModalType("create")
                    setIsOpenModal(true)
                  }}
                >
                  <PlusCircleOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={9}>
          {!plansCategories && loadingStatus === LoadingStatusTypes.LOADING && <LoadingSpinner />}

          {!plansCategories?.length && loadingStatus !== LoadingStatusTypes.LOADING && (
            <EmptyCard />
          )}

          {plansCategories?.length &&
            plansCategories.map((planCategory) => (
              <Accordion key={planCategory.id} disableGutters>
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
                    {planCategory.plans.length}
                  </Typography>

                  <Tooltip title="Створити новий план" enterDelay={1000}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditingPlanCategory({ id: planCategory.id, name: planCategory.name })
                        setModalType("create-plan")
                        setIsOpenModal(true)
                      }}
                      sx={{ mr: "5px" }}
                    >
                      <PlusCircleOutlined />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Перейменувати категорію" enterDelay={1000}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditingPlanCategory({ id: planCategory.id, name: planCategory.name })
                        setModalType("update")
                        setIsOpenModal(true)
                      }}
                      sx={{ mr: "5px" }}
                    >
                      <EditOutlined />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Видалити категорію" enterDelay={1000}>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteCategory(planCategory.id, planCategory.plans.length)
                      }}
                      sx={{ mr: "15px" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  </Tooltip>
                </AccordionSummary>

                <AccordionDetails sx={{ p: 0 }}>
                  <List>
                    {planCategory.plans.map((plan) => (
                      <Link to={`/plans/${plan.id}`} style={{ color: "inherit" }}>
                        <Divider />
                        <ListItem disablePadding key={plan.id}>
                          <ListItemButton>
                            <ListItemText primary={plan.name} />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
        </Grid>
      </Grid>
    </>
  )
}

export { PlansPage }
