import {
  Grid,
  List,
  Divider,
  Tooltip,
  ListItem,
  Accordion,
  IconButton,
  Typography,
  ListItemText,
  ListItemButton,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { EditOutlined } from "@ant-design/icons"
import { DeleteOutlined } from "@ant-design/icons"
import { DownOutlined, PlusCircleOutlined } from "@ant-design/icons"

import { useAppDispatch } from "../../store/store"
import { LoadingStatusTypes } from "../../store/appTypes"
import { sortItemsByKey } from "../../utils/sortItemsByKey"
import EmptyCard from "../../components/EmptyCard/EmptyCard"
import { plansSelector } from "../../store/plans/plansSlice"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import PlanCategoryModal from "../../components/PlansPage/PlanCategoryModal"
import { PlansCategoriesType, PlansType } from "../../store/plans/plansTypes"
import { deletePlan, deletePlanCategory, getPlansCategories } from "../../store/plans/plansAsyncActions"

export type PlansActionModalTypes = "create-plan-category" | "update-plan-category" | "create-plan" | "update-plan"
export type PlanModalInitialData = { id: number; name: string }

const PlansPage = () => {
  const dispatch = useAppDispatch()

  const { plansCategories, loadingStatus } = useSelector(plansSelector)

  const [isOpenModal, setIsOpenModal] = React.useState(false)
  const [editingPlan, setEditingPlan] = React.useState<PlanModalInitialData | null>(null)
  const [modalType, setModalType] = React.useState<PlansActionModalTypes>("create-plan")
  const [editingPlanCategory, setEditingPlanCategory] = React.useState<PlanModalInitialData | null>(null)

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

  const onDeletePlan = (id: number, name: string) => {
    if (!window.confirm(`Ви дійсно хочете видалити план ${name}?`)) return
    dispatch(deletePlan(id))
  }

  return (
    <>
      <PlanCategoryModal
        open={isOpenModal}
        modalType={modalType}
        setOpen={setIsOpenModal}
        editingPlan={editingPlan}
        setEditingPlan={setEditingPlan}
        editingPlanCategory={editingPlanCategory}
        setEditingPlanCategory={setEditingPlanCategory}
      />

      <Grid container columnSpacing={2.75} sx={{ justifyContent: "center" }}>
        {/* Категорії */}
        <Grid item xs={12} md={9}>
          <Grid container sx={{ alignItems: "center", mb: 2 }}>
            <Grid item sx={{ flexGrow: 1 }}>
              <Typography variant="h5">{plansCategories ? "Плани" : "Завантаження..."}</Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Створити нову категорію" enterDelay={1000}>
                <IconButton
                  onClick={() => {
                    setModalType("create-plan-category")
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

          {!plansCategories?.length && loadingStatus !== LoadingStatusTypes.LOADING && <EmptyCard />}

          {plansCategories?.length &&
            sortItemsByKey(plansCategories, "name").map((planCategory: PlansCategoriesType) => (
              <Accordion key={planCategory.id} disableGutters>
                <AccordionSummary expandIcon={<DownOutlined />}>
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
                        setModalType("update-plan-category")
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
                    {sortItemsByKey(planCategory.plans, "name").map((plan: PlansType) => (
                      <>
                        <Divider />
                        <ListItem disablePadding key={plan.id}>
                          <ListItemButton
                            disableRipple
                            sx={{
                              height: "45px",
                              padding: 0,
                              "&:hover .plan-actions": { display: "block !important" },
                            }}
                          >
                            <Link to={`/plans/${plan.id}`} style={{ color: "inherit", display: "flex", flex: 1 }}>
                              <ListItemText
                                primary={plan.name}
                                sx={{ height: "45px", display: "flex", paddingLeft: "24px", alignItems: "center" }}
                              />
                            </Link>

                            <div className="plan-actions" style={{ display: "none" }}>
                              <Tooltip title="Перейменувати план" enterDelay={1000}>
                                <IconButton
                                  onClick={() => {
                                    setEditingPlan({ id: plan.id, name: plan.name })
                                    setModalType("update-plan")
                                    setIsOpenModal(true)
                                  }}
                                  sx={{ mr: "5px" }}
                                >
                                  <EditOutlined />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title="Видалити план" enterDelay={1000}>
                                <IconButton onClick={() => onDeletePlan(plan.id, plan.name)} sx={{ mr: "15px" }}>
                                  <DeleteOutlined />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </ListItemButton>
                        </ListItem>
                      </>
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

export default PlansPage
