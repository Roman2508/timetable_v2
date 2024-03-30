import { useSelector } from "react-redux"
import React, { Dispatch, SetStateAction } from "react"
import { Grid, Stack, Button, MenuItem, TextField, InputLabel } from "@mui/material"

import { useAppDispatch } from "../../store/store"
import { groupsSelector } from "../../store/groups/groupsSlice"
import { GroupCategoriesType } from "../../store/groups/groupsTypes"
import { teachersSelector } from "../../store/teachers/teachersSlice"
import { getGroupCategories } from "../../store/groups/groupsAsyncActions"
import { auditoriesSelector } from "../../store/auditories/auditoriesSlise"
import { getLastnameAndInitials } from "../../utils/getLastnameAndInitials"
import { getTeachersCategories } from "../../store/teachers/teachersAsyncActions"
import { getAuditoryCategories } from "../../store/auditories/auditoriesAsyncActions"

interface IListItem {
  label: string
  value: number
}

interface ITimetablePageHeaderProps {
  currentWeekNumber: number
  selectedItemId: number | null
  scheduleType: "group" | "teacher" | "auditory"
  setCurrentWeekNumber: Dispatch<SetStateAction<number>>
  setSelectedItemId: Dispatch<SetStateAction<number | null>>
  setScheduleType: Dispatch<SetStateAction<"group" | "teacher" | "auditory">>
}

const TimetablePageHeader: React.FC<ITimetablePageHeaderProps> = ({
  scheduleType,
  setScheduleType,
  selectedItemId,
  currentWeekNumber,
  setSelectedItemId,
  setCurrentWeekNumber,
}) => {
  const dispatch = useAppDispatch()

  const { groupCategories } = useSelector(groupsSelector)
  const { teachersCategories } = useSelector(teachersSelector)
  const { auditoriCategories } = useSelector(auditoriesSelector)

  const [itemsList, setItemsList] = React.useState<IListItem[]>([])
  const [categoriesList, setCategoriesList] = React.useState<IListItem[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<number | null>(null)

  // on tab click
  React.useEffect(() => {
    if (!selectedCategoryId) return

    if (scheduleType === "group") {
      if (!groupCategories) return
      const categoriesList = groupCategories.map((el) => ({
        value: el.id,
        label: el.name,
      }))
      setCategoriesList(categoriesList)
      setSelectedCategoryId(groupCategories[0].id)
      setSelectedItemId(groupCategories[0].groups[0]?.id)

      const itemsList = groupCategories[0]?.groups.map((el) => ({ value: el.id, label: el.name }))
      setItemsList(itemsList)
      return
    }

    if (scheduleType === "teacher") {
      if (!teachersCategories) return
      const categoriesList = teachersCategories.map((el) => ({
        value: el.id,
        label: el.name,
      }))
      setCategoriesList(categoriesList)
      setSelectedCategoryId(teachersCategories[0].id)
      setSelectedItemId(teachersCategories[0].teachers[0]?.id)

      const itemsList = teachersCategories[0]?.teachers.map((el) => ({
        value: el.id,
        label: getLastnameAndInitials(el),
      }))
      setItemsList(itemsList)
      return
    }

    if (scheduleType === "auditory") {
      if (!auditoriCategories) return
      const categoriesList = auditoriCategories.map((el) => ({
        value: el.id,
        label: el.name,
      }))
      setCategoriesList(categoriesList)
      setSelectedCategoryId(auditoriCategories[0].id)
      setSelectedItemId(auditoriCategories[0].auditories[0]?.id)

      const itemsList = auditoriCategories[0]?.auditories?.map((el) => ({
        value: el.id,
        label: el.name,
      }))
      setItemsList(itemsList)
    }
  }, [scheduleType])

  // first render
  React.useEffect(() => {
    const fetchData = async () => {
      const { payload } = await dispatch(getGroupCategories())
      const categoriesList = (payload as GroupCategoriesType[]).map((el) => ({
        value: el.id,
        label: el.name,
      }))
      setCategoriesList(categoriesList)

      const firstCategory = (payload as GroupCategoriesType[])[0]
      setSelectedCategoryId(firstCategory.id)
      setSelectedItemId(firstCategory.groups[0]?.id)

      const itemsList = firstCategory.groups.map((el) => ({ value: el.id, label: el.name }))
      setItemsList(itemsList)

      await dispatch(getTeachersCategories())
      await dispatch(getAuditoryCategories())
    }
    fetchData()
  }, [])

  // on change
  React.useEffect(() => {
    if (!selectedCategoryId) return

    if (scheduleType === "group") {
      if (!groupCategories) return
      const category = groupCategories.filter((el) => el.id === selectedCategoryId)
      if (!category) return
      const itemsList = category[0].groups.map((el) => ({ value: el.id, label: el.name }))
      setItemsList(itemsList)
      setSelectedItemId(itemsList[0]?.value)
      return
    }

    if (scheduleType === "teacher") {
      if (!teachersCategories) return
      const category = teachersCategories.filter((el) => el.id === selectedCategoryId)
      if (!category) return
      const itemsList = category[0].teachers.map((el) => ({
        value: el.id,
        label: getLastnameAndInitials(el),
      }))
      setItemsList(itemsList)
      setSelectedItemId(itemsList[0]?.value)
      return
    }

    if (scheduleType === "auditory") {
      if (!auditoriCategories) return
      const category = auditoriCategories.filter((el) => el.id === selectedCategoryId)
      if (!category) return
      const itemsList = category[0].auditories.map((el) => ({ value: el.id, label: el.name }))
      setItemsList(itemsList)
      setSelectedItemId(itemsList[0]?.value)
    }
  }, [selectedCategoryId])

  React.useEffect(() => {}, [])

  return (
    <Grid container sx={{ display: "flex", alignItems: "flex-end" }}>
      <Grid item sx={{ flexGrow: 1, display: "flex", alignItems: "flex-end", gap: 3 }}>
        <Stack spacing={1} sx={{ mt: 2 }}>
          <InputLabel htmlFor="category">Структурний підрозділ</InputLabel>
          <TextField
            select
            size="small"
            id="category"
            sx={{ width: "300px" }}
            value={String(selectedCategoryId)}
            onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
          >
            {categoriesList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Stack spacing={1} sx={{ mt: 2 }}>
          <InputLabel htmlFor="category">
            {scheduleType === "group" && "Група"}
            {scheduleType === "teacher" && "Викладач"}
            {scheduleType === "auditory" && "Аудиторія"}
          </InputLabel>
          <TextField
            select
            size="small"
            id="category"
            value={String(selectedItemId)}
            onChange={(e) => setSelectedItemId(Number(e.target.value))}
            sx={{ width: "160px" }}
          >
            {itemsList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Stack spacing={1} sx={{ mt: 2 }}>
          <InputLabel htmlFor="category">Тиждень</InputLabel>
          <TextField
            select
            size="small"
            id="category"
            value={currentWeekNumber}
            onChange={(e) => setCurrentWeekNumber(Number(e.target.value))}
            sx={{ width: "100px" }}
          >
            {[
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4", label: "4" },
              { value: "5", label: "5" },
              { value: "6", label: "6" },
              { value: "7", label: "7" },
            ].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Grid>

      <Grid item>
        <Stack direction="row" alignItems="center" spacing={0}>
          <Button
            size="small"
            onClick={() => setScheduleType("group")}
            sx={{ width: "100px", py: 0.674 }}
            color={scheduleType === "group" ? "primary" : "secondary"}
            variant={scheduleType === "group" ? "outlined" : "text"}
          >
            Група
          </Button>
          <Button
            size="small"
            onClick={() => setScheduleType("teacher")}
            sx={{ width: "100px", py: 0.674 }}
            color={scheduleType === "teacher" ? "primary" : "secondary"}
            variant={scheduleType === "teacher" ? "outlined" : "text"}
          >
            Викладач
          </Button>
          <Button
            size="small"
            onClick={() => setScheduleType("auditory")}
            sx={{ width: "100px", py: 0.674 }}
            color={scheduleType === "auditory" ? "primary" : "secondary"}
            variant={scheduleType === "auditory" ? "outlined" : "text"}
          >
            Аудиторія
          </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}

export { TimetablePageHeader }
