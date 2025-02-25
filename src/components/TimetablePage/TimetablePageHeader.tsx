import { useSelector } from 'react-redux'
import React, { Dispatch, SetStateAction } from 'react'
import { Grid, Stack, Button, MenuItem, TextField, InputLabel } from '@mui/material'

import {
  clearTeacherLessons,
  setLastSelectedData,
  clearScheduleLessons,
  lastSelectedDataSelector,
} from '../../store/scheduleLessons/scheduleLessonsSlice'
import { useAppDispatch } from '../../store/store'
import { groupsSelector } from '../../store/groups/groupsSlice'
import { GroupCategoriesType } from '../../store/groups/groupsTypes'
import { teachersSelector } from '../../store/teachers/teachersSlice'
import { TeachersCategoryType } from '../../store/teachers/teachersTypes'
import { getGroupCategories } from '../../store/groups/groupsAsyncActions'
import { auditoriesSelector } from '../../store/auditories/auditoriesSlise'
import { getLastnameAndInitials } from '../../utils/getLastnameAndInitials'
import { AuditoryCategoriesTypes } from '../../store/auditories/auditoriesTypes'
import { getTeachersCategories } from '../../store/teachers/teachersAsyncActions'
import { getAuditoryCategories } from '../../store/auditories/auditoriesAsyncActions'
import { ISelectedLesson } from '../../pages/Timetable/TimetablePage'

interface IListItem {
  label: string
  value: number
}

interface ITimetablePageHeaderProps {
  weeksCount: number
  selectedSemester: 1 | 2
  currentWeekNumber: number
  setSlectedGroupId: Dispatch<SetStateAction<number | null>>
  setSelectedTeacherId: Dispatch<SetStateAction<number | null>>
  setSelectedAuditoryId: Dispatch<SetStateAction<number | null>>
  setSelectedLesson: Dispatch<SetStateAction<ISelectedLesson | null>>
}

const TimetablePageHeader: React.FC<ITimetablePageHeaderProps> = ({
  weeksCount,
  selectedSemester,
  currentWeekNumber,
  setSlectedGroupId,
  setSelectedLesson,
  setSelectedTeacherId,
  setSelectedAuditoryId,
}) => {
  const dispatch = useAppDispatch()

  const isMountingTabRef = React.useRef(false)
  const isMountingCategoryRef = React.useRef(false)

  const { groupCategories } = useSelector(groupsSelector)
  const { teachersCategories } = useSelector(teachersSelector)
  const { auditoriCategories } = useSelector(auditoriesSelector)
  const { lastSelectedItemId, lastSelectedScheduleType, lastSelectedStructuralUnitId } =
    useSelector(lastSelectedDataSelector)

  const [itemsList, setItemsList] = React.useState<IListItem[]>([])
  const [categoriesList, setCategoriesList] = React.useState<IListItem[]>([])

  const weeksList = () => {
    const weeks: { value: string; label: string }[] = []
    for (let i = 0; i < weeksCount; i++) {
      weeks.push({ value: String(i + 1), label: String(i + 1) })
    }

    return weeks
  }

  // set group/teacher/auditory id
  React.useEffect(() => {
    dispatch(clearScheduleLessons())
    dispatch(clearTeacherLessons())
    setSelectedLesson(null)

    if (lastSelectedScheduleType === 'group') setSlectedGroupId(lastSelectedItemId)
    if (lastSelectedScheduleType === 'teacher') setSelectedTeacherId(lastSelectedItemId)
    if (lastSelectedScheduleType === 'auditory') setSelectedAuditoryId(lastSelectedItemId)
  }, [lastSelectedItemId, lastSelectedScheduleType])

  // on tab click (disable on first render)
  React.useEffect(() => {
    if (!isMountingTabRef.current) {
      isMountingTabRef.current = true
      return
    }

    if (!lastSelectedStructuralUnitId) return

    if (lastSelectedScheduleType === 'group') {
      if (!groupCategories) return
      const categoriesList = groupCategories.map((el) => ({
        value: el.id,
        label: el.name,
      }))
      setCategoriesList(categoriesList)

      const selectedData = {
        lastSelectedScheduleType: 'group' as const,
        lastSelectedItemId: groupCategories[0].groups[0]?.id,
        lastSelectedStructuralUnitId: groupCategories[0].id,
      }
      dispatch(setLastSelectedData(selectedData))

      const itemsList = groupCategories[0]?.groups.map((el) => ({ value: el.id, label: el.name }))
      setItemsList(itemsList)
      return
    }

    if (lastSelectedScheduleType === 'teacher') {
      if (!teachersCategories) return
      const categoriesList = teachersCategories.map((el) => ({
        value: el.id,
        label: el.name,
      }))
      setCategoriesList(categoriesList)

      const selectedData = {
        lastSelectedScheduleType: 'teacher' as const,
        lastSelectedItemId: teachersCategories[0].teachers[0]?.id,
        lastSelectedStructuralUnitId: teachersCategories[0].id,
      }
      dispatch(setLastSelectedData(selectedData))

      const itemsList = teachersCategories[0]?.teachers.map((el) => ({
        value: el.id,
        label: getLastnameAndInitials(el),
      }))
      setItemsList(itemsList)
      return
    }

    if (lastSelectedScheduleType === 'auditory') {
      if (!auditoriCategories) return
      const categoriesList = auditoriCategories.map((el) => ({
        value: el.id,
        label: el.name,
      }))
      setCategoriesList(categoriesList)

      const selectedData = {
        lastSelectedScheduleType: 'auditory' as const,
        lastSelectedItemId: auditoriCategories[0].auditories[0]?.id,
        lastSelectedStructuralUnitId: auditoriCategories[0].id,
      }
      dispatch(setLastSelectedData(selectedData))

      const itemsList = auditoriCategories[0]?.auditories?.map((el) => ({
        value: el.id,
        label: el.name,
      }))
      setItemsList(itemsList)
    }
  }, [lastSelectedScheduleType])

  // first render
  React.useEffect(() => {
    const fetchData = async () => {
      // if page open first time and local storage is empty lastSelectedScheduleType = 'group'
      dispatch(setLastSelectedData({ lastSelectedScheduleType: lastSelectedScheduleType || 'group' }))

      const groups = await dispatch(getGroupCategories(false))
      const groupsPayload = groups.payload as GroupCategoriesType[]

      const teachers = await dispatch(getTeachersCategories(false))
      const teachersPayload = teachers.payload as TeachersCategoryType[]

      const auditory = await dispatch(getAuditoryCategories())
      const auditoryPayload = auditory.payload as AuditoryCategoriesTypes[]

      // if data does not exist in local storage
      if (!lastSelectedScheduleType || !lastSelectedStructuralUnitId || !lastSelectedItemId) {
        dispatch(
          setLastSelectedData({
            lastSelectedScheduleType,
            lastSelectedItemId: groupsPayload[0].groups[0]?.id,
            lastSelectedStructuralUnitId: groupsPayload[0].id,
          })
        )

        const categoriesList = groupsPayload.map((el) => ({ value: el.id, label: el.name }))
        setCategoriesList(categoriesList)

        const itemsList = groupsPayload[0].groups.map((el) => ({ value: el.id, label: el.name }))
        setItemsList(itemsList)
        setSlectedGroupId(groupsPayload[0].groups[0]?.id)
        return
      }

      // if data exist in local storage
      if (lastSelectedScheduleType === 'group') {
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
      } else if (lastSelectedScheduleType === 'teacher') {
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
      } else if (lastSelectedScheduleType === 'auditory') {
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

      dispatch(setLastSelectedData({ lastSelectedItemId, lastSelectedStructuralUnitId }))
    }

    fetchData()
  }, [])

  // on change category (disabled on first render)
  React.useEffect(() => {
    if (!isMountingCategoryRef.current) {
      isMountingCategoryRef.current = true
      return
    }

    if (!lastSelectedStructuralUnitId) return

    dispatch(clearTeacherLessons())

    if (lastSelectedScheduleType === 'group') {
      if (!groupCategories) return
      const category = groupCategories.find((el) => el.id === lastSelectedStructuralUnitId)

      if (!category) return
      const itemsList = category.groups.map((el) => ({ value: el.id, label: el.name }))
      setItemsList(itemsList)
      setSlectedGroupId(category.groups[0].id)

      dispatch(
        setLastSelectedData({
          lastSelectedItemId: itemsList[0]?.value,
          lastSelectedStructuralUnitId: lastSelectedStructuralUnitId || category.id,
        })
      )
      return
    }

    if (lastSelectedScheduleType === 'teacher') {
      if (!teachersCategories) return
      const category = teachersCategories.find((el) => el.id === lastSelectedStructuralUnitId)
      if (!category) return
      const itemsList = category.teachers.map((el) => ({
        value: el.id,
        label: getLastnameAndInitials(el),
      }))
      setItemsList(itemsList)
      dispatch(
        setLastSelectedData({
          lastSelectedItemId: itemsList[0]?.value,
          lastSelectedStructuralUnitId: lastSelectedStructuralUnitId || category.id,
        })
      )
      return
    }

    if (lastSelectedScheduleType === 'auditory') {
      if (!auditoriCategories) return
      const category = auditoriCategories.find((el) => el.id === lastSelectedStructuralUnitId)
      if (!category) return
      const itemsList = category.auditories.map((el) => ({ value: el.id, label: el.name }))
      setItemsList(itemsList)
      dispatch(
        setLastSelectedData({
          lastSelectedItemId: itemsList[0]?.value,
          lastSelectedStructuralUnitId: lastSelectedStructuralUnitId || category.id,
        })
      )
    }
  }, [lastSelectedStructuralUnitId])

  return (
    <Grid container sx={{ display: 'flex', alignItems: 'flex-end' }} className="timatable-header-wrapper">
      <Grid item sx={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', gap: 3 }}>
        <Stack spacing={1} sx={{ mt: 2 }}>
          <InputLabel htmlFor="category">Структурний підрозділ</InputLabel>
          <TextField
            select
            size="small"
            id="category"
            sx={{ width: '280px' }}
            value={String(lastSelectedStructuralUnitId)}
            onChange={(e) => {
              dispatch(setLastSelectedData({ lastSelectedStructuralUnitId: Number(e.target.value) }))
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
            {lastSelectedScheduleType === 'group' && 'Група'}
            {lastSelectedScheduleType === 'teacher' && 'Викладач'}
            {lastSelectedScheduleType === 'auditory' && 'Аудиторія'}
          </InputLabel>
          <TextField
            select
            size="small"
            id="category"
            value={String(lastSelectedItemId)}
            onChange={(e) => {
              dispatch(setLastSelectedData({ lastSelectedItemId: Number(e.target.value) }))
              // setSelectedAuditoryId(null)
            }}
            sx={{ width: '120px' }}
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
            defaultValue={1}
            value={selectedSemester}
            onChange={(e) => {
              const semester = Number(e.target.value) as 1 | 2
              // setSelectedSemester(semester)
              // setLastSelectedDataToLocalStorage({ lastOpenedSemester: semester })
              dispatch(setLastSelectedData({ lastOpenedSemester: semester }))
            }}
            sx={{ width: '80px' }}
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
              dispatch(setLastSelectedData({ lastOpenedWeek: Number(e.target.value) }))
            }}
            sx={{ width: '80px' }}
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
            sx={{ width: '100px', py: 0.674 }}
            color={lastSelectedScheduleType === 'group' ? 'primary' : 'secondary'}
            variant={lastSelectedScheduleType === 'group' ? 'outlined' : 'text'}
            onClick={() => dispatch(setLastSelectedData({ lastSelectedScheduleType: 'group' }))}
          >
            Група
          </Button>
          <Button
            size="small"
            sx={{ width: '100px', py: 0.674 }}
            color={lastSelectedScheduleType === 'teacher' ? 'primary' : 'secondary'}
            variant={lastSelectedScheduleType === 'teacher' ? 'outlined' : 'text'}
            onClick={() => dispatch(setLastSelectedData({ lastSelectedScheduleType: 'teacher' }))}
          >
            Викладач
          </Button>
          <Button
            size="small"
            sx={{ width: '100px', py: 0.674 }}
            color={lastSelectedScheduleType === 'auditory' ? 'primary' : 'secondary'}
            variant={lastSelectedScheduleType === 'auditory' ? 'outlined' : 'text'}
            onClick={() => dispatch(setLastSelectedData({ lastSelectedScheduleType: 'auditory' }))}
          >
            Аудиторія
          </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}

export { TimetablePageHeader }
