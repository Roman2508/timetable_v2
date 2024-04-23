import { useSelector } from "react-redux"
import React, { Dispatch, SetStateAction } from "react"
import { Grid, Stack, Button, MenuItem, TextField, InputLabel } from "@mui/material"

import { useAppDispatch } from "../../store/store"
import { groupsSelector } from "../../store/groups/groupsSlice"
import { GroupCategoriesType } from "../../store/groups/groupsTypes"
import { teachersSelector } from "../../store/teachers/teachersSlice"
import { TeachersCategoryType } from "../../store/teachers/teachersTypes"
import { getGroupCategories } from "../../store/groups/groupsAsyncActions"
import { auditoriesSelector } from "../../store/auditories/auditoriesSlise"
import { getLastnameAndInitials } from "../../utils/getLastnameAndInitials"
import { AuditoryCategoriesTypes } from "../../store/auditories/auditoriesTypes"
import { getTeachersCategories } from "../../store/teachers/teachersAsyncActions"
import { getAuditoryCategories } from "../../store/auditories/auditoriesAsyncActions"
import { setLastSelectedDataToLocalStorage } from "../../utils/setLastSelectedDataToLocalStorage"
import { getLastSelectedDataToLocalStorage } from "../../utils/getLastSelectedDataToLocalStorage"

interface IListItem {
  label: string
  value: number
}

interface ITimetablePageHeaderProps {
  weeksCount: number
  selectedSemester: 1 | 2
  currentWeekNumber: number
  selectedItemId: number | null
  scheduleType: "group" | "teacher" | "auditory"
  setCurrentWeekNumber: Dispatch<SetStateAction<number>>
  setSelectedItemId: Dispatch<SetStateAction<number | null>>
  setSelectedSemester: React.Dispatch<React.SetStateAction<1 | 2>>
  setScheduleType: Dispatch<SetStateAction<"group" | "teacher" | "auditory">>
}

const TimetablePageHeader: React.FC<ITimetablePageHeaderProps> = ({
  weeksCount,
  scheduleType,
  selectedItemId,
  setScheduleType,
  selectedSemester,
  currentWeekNumber,
  setSelectedItemId,
  setSelectedSemester,
  setCurrentWeekNumber,
}) => {
  const dispatch = useAppDispatch()

  const isMountRef = React.useRef(false)

  const { groupCategories } = useSelector(groupsSelector)
  const { teachersCategories } = useSelector(teachersSelector)
  const { auditoriCategories } = useSelector(auditoriesSelector)

  const [itemsList, setItemsList] = React.useState<IListItem[]>([])
  const [categoriesList, setCategoriesList] = React.useState<IListItem[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<number | null>(null)

  const weeksList = () => {
    const weeks: { value: string; label: string }[] = []
    for (let i = 0; i < weeksCount; i++) {
      weeks.push({ value: String(i + 1), label: String(i + 1) })
    }

    return weeks
  }

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

      setLastSelectedDataToLocalStorage({
        lastSelectedStructuralUnitId: groupCategories[0].id,
        lastSelectedScheduleType: "group",
        lastSelectedItemId: groupCategories[0].groups[0]?.id,
      })

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

      setLastSelectedDataToLocalStorage({
        lastSelectedStructuralUnitId: teachersCategories[0].id,
        lastSelectedScheduleType: "teacher",
        lastSelectedItemId: teachersCategories[0].teachers[0]?.id,
      })

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

      setLastSelectedDataToLocalStorage({
        lastSelectedStructuralUnitId: auditoriCategories[0].id,
        lastSelectedScheduleType: "auditory",
        lastSelectedItemId: auditoriCategories[0].auditories[0]?.id,
      })

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
      const { lastSelectedStructuralUnitId, lastSelectedItemId, lastSelectedScheduleType } =
        getLastSelectedDataToLocalStorage()

      setScheduleType(lastSelectedScheduleType || "group")

      const groups = await dispatch(getGroupCategories())
      const groupsPayload = groups.payload as GroupCategoriesType[]

      const teachers = await dispatch(getTeachersCategories())
      const teachersPayload = teachers.payload as TeachersCategoryType[]

      const auditory = await dispatch(getAuditoryCategories())
      const auditoryPayload = auditory.payload as AuditoryCategoriesTypes[]

      if (!lastSelectedScheduleType || !lastSelectedStructuralUnitId || !lastSelectedItemId) {
        // if data does not exist in local storage
        const categoriesList = groupsPayload.map((el) => ({ value: el.id, label: el.name }))
        setCategoriesList(categoriesList)

        const firstCategory = groupsPayload[0]
        setSelectedCategoryId(firstCategory.id)
        setSelectedItemId(firstCategory.groups[0]?.id)

        const itemsList = firstCategory.groups.map((el) => ({ value: el.id, label: el.name }))
        setItemsList(itemsList)
      } else {
        // if data exist in local storage

        if (lastSelectedScheduleType === "group") {
          // if showed groups schedule
          const categoriesList = groupsPayload.map((el) => ({ value: el.id, label: el.name }))
          setCategoriesList(categoriesList)

          const selectedCategory = groupsPayload.find((el) => el.id === lastSelectedStructuralUnitId)

          if (selectedCategory) {
            const itemsList = selectedCategory.groups.map((el) => ({
              value: el.id,
              label: el.name,
            }))
            setItemsList(itemsList)
          }

          //
        } else if (lastSelectedScheduleType === "teacher") {
          // if showed teachers schedule
          const categoriesList = teachersPayload.map((el) => ({ value: el.id, label: el.name }))
          setCategoriesList(categoriesList)

          const selectedCategory = teachersPayload.find((el) => el.id === lastSelectedStructuralUnitId)

          if (selectedCategory) {
            const itemsList = selectedCategory.teachers.map((el) => ({
              value: el.id,
              label: getLastnameAndInitials(el),
            }))
            setItemsList(itemsList)
          }

          //
        } else if (lastSelectedScheduleType === "auditory") {
          // if showed auditories schedule
          const categoriesList = auditoryPayload.map((el) => ({ value: el.id, label: el.name }))
          setCategoriesList(categoriesList)

          const selectedCategory = auditoryPayload.find((el) => el.id === lastSelectedStructuralUnitId)

          if (selectedCategory) {
            const itemsList = selectedCategory.auditories.map((el) => ({
              value: el.id,
              label: el.name,
            }))
            setItemsList(itemsList)
          }
        }

        setSelectedCategoryId(lastSelectedStructuralUnitId)
        setSelectedItemId(lastSelectedItemId)
      }
    }

    fetchData()
  }, [])

  // on change category (disabled on first render)
  React.useEffect(() => {
    if (!selectedCategoryId) return

    const { lastSelectedItemId, lastSelectedStructuralUnitId } = getLastSelectedDataToLocalStorage()

    if (!isMountRef || !isMountRef.current) {
      //
      if (lastSelectedItemId) {
        setSelectedItemId(lastSelectedItemId)
      }
      if (lastSelectedStructuralUnitId) {
        if (!groupCategories) return
        const category = groupCategories.find((el) => el.id === lastSelectedStructuralUnitId)

        if (!category) return
        const itemsList = category.groups.map((el) => ({ value: el.id, label: el.name }))
        setItemsList(itemsList)
      }
      isMountRef.current = true
      return
    }
  
    if (scheduleType === "group") {
      if (!groupCategories) return
      const category = groupCategories.find((el) => el.id === selectedCategoryId)

      if (!category) return
      const itemsList = category.groups.map((el) => ({ value: el.id, label: el.name }))
      setItemsList(itemsList)
      setSelectedItemId(itemsList[0]?.value)

      setLastSelectedDataToLocalStorage({
        lastSelectedStructuralUnitId: lastSelectedStructuralUnitId || category.id,
        lastSelectedItemId: itemsList[0]?.value,
      })

      return
    }

    if (scheduleType === "teacher") {
      if (!teachersCategories) return
      const category = teachersCategories.find((el) => el.id === selectedCategoryId)
      if (!category) return
      const itemsList = category.teachers.map((el) => ({
        value: el.id,
        label: getLastnameAndInitials(el),
      }))
      setItemsList(itemsList)
      setSelectedItemId(itemsList[0]?.value)

      setLastSelectedDataToLocalStorage({
        lastSelectedStructuralUnitId: lastSelectedStructuralUnitId || category.id,
        lastSelectedItemId: itemsList[0]?.value,
      })
      return
    }

    if (scheduleType === "auditory") {
      if (!auditoriCategories) return
      const category = auditoriCategories.find((el) => el.id === selectedCategoryId)
      if (!category) return
      const itemsList = category.auditories.map((el) => ({ value: el.id, label: el.name }))
      setItemsList(itemsList)
      setSelectedItemId(itemsList[0]?.value)

      setLastSelectedDataToLocalStorage({
        lastSelectedStructuralUnitId: lastSelectedStructuralUnitId || category.id,
        lastSelectedItemId: itemsList[0]?.value,
      })
    }
  }, [selectedCategoryId])

  return (
    <Grid container sx={{ display: "flex", alignItems: "flex-end" }} className="timatable-header-wrapper">
      <Grid item sx={{ flexGrow: 1, display: "flex", alignItems: "flex-end", gap: 3 }}>
        <Stack spacing={1} sx={{ mt: 2 }}>
          <InputLabel htmlFor="category">Структурний підрозділ</InputLabel>
          <TextField
            select
            size="small"
            id="category"
            sx={{ width: "280px" }}
            value={String(selectedCategoryId)}
            onChange={(e) => {
              setSelectedCategoryId(Number(e.target.value))
              setLastSelectedDataToLocalStorage({
                lastSelectedStructuralUnitId: Number(e.target.value),
              })
            }}
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
            onChange={(e) => {
              setSelectedItemId(Number(e.target.value))
              setLastSelectedDataToLocalStorage({
                lastSelectedItemId: Number(e.target.value),
              })
            }}
            sx={{ width: "120px" }}
          >
            {itemsList.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Stack spacing={1} sx={{ mt: 2 }}>
          <InputLabel htmlFor="semester">Семестр</InputLabel>
          <TextField
            select
            size="small"
            id="category"
            value={selectedSemester}
            onChange={(e) => {
              const semester = Number(e.target.value) as 1 | 2
              setSelectedSemester(semester)
              setLastSelectedDataToLocalStorage({ lastOpenedSemester: semester })
            }}
            sx={{ width: "80px" }}
          >
            {[
              { value: 1, label: 1 },
              { value: 2, label: 2 },
            ].map((option) => (
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
            onChange={(e) => {
              setCurrentWeekNumber(Number(e.target.value))
              setLastSelectedDataToLocalStorage({ lastOpenedWeek: Number(e.target.value) })
            }}
            sx={{ width: "80px" }}
          >
            {weeksList().map((option) => (
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
