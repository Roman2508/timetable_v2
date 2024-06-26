import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'

import {
  getGroupOverlay,
  copyDaySchedule,
  copyWeekSchedule,
  getTeacherLessons,
  createReplacement,
  getAuditoryOverlay,
  getScheduleLessons,
  createScheduleLesson,
  deleteScheduleLesson,
  updateScheduleLesson,
  findLessonsForSchedule,
  getTeacherOverlay,
  findLessonStudents,
} from './scheduleLessonsAsyncActions'
import { RootState } from '../store'
import { LoadingStatusTypes } from '../appTypes'
import { GroupLoadType } from '../groups/groupsTypes'
import { ILastSelectedData, ScheduleLessonInitialStateType, ScheduleLessonType } from './scheduleLessonsTypes'
import { TeachersType } from '../teachers/teachersTypes'

const scheduleLessonsInitialState: ScheduleLessonInitialStateType = {
  groupLoad: null,
  teacherLessons: null,
  auditoryOverlay: null,
  groupOverlay: null,
  teacherOverlay: null,
  scheduleLessons: null,

  lastOpenedSemester: 1,
  lastOpenedWeek: 1,
  lastSelectedItemId: 7,
  lastSelectedScheduleType: 'group',
  lastSelectedStructuralUnitId: 1,

  loadingStatus: LoadingStatusTypes.NEVER,
}

const scheduleLessonsSlice = createSlice({
  name: 'scheduleLessons',
  initialState: scheduleLessonsInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },
    clearGroupLoad(state) {
      state.groupLoad = null
    },
    deleteTeacherOverlay(state, action: PayloadAction<number>) {
      if (!state.teacherLessons) return
      const lessons = state.teacherLessons.filter((el) => el.id !== action.payload)
      state.teacherLessons = lessons
    },
    // clearTeacherOverlay(state) {
    //   state.teacherLessons = []
    // },
    clearGroupOverlay(state) {
      state.groupOverlay = []
    },
    clearTeacherOverlay(state) {
      state.teacherOverlay = []
    },
    setLastSelectedData(state, action: PayloadAction<ILastSelectedData>) {
      if (action.payload.lastSelectedScheduleType) {
        state.lastSelectedScheduleType = action.payload.lastSelectedScheduleType
      }
      if (action.payload.lastOpenedSemester) {
        state.lastOpenedSemester = action.payload.lastOpenedSemester
      }
      if (action.payload.lastOpenedWeek) {
        state.lastOpenedWeek = action.payload.lastOpenedWeek
      }
      if (action.payload.lastSelectedItemId) {
        state.lastSelectedItemId = action.payload.lastSelectedItemId
      }
      if (action.payload.lastSelectedStructuralUnitId) {
        state.lastSelectedStructuralUnitId = action.payload.lastSelectedStructuralUnitId
      }
    },
  },
  extraReducers: (builder) => {
    /* getScheduleLessons */
    builder.addCase(getScheduleLessons.fulfilled, (state, action: PayloadAction<ScheduleLessonType[]>) => {
      state.scheduleLessons = action.payload
    })

    /* getGroupOverlay */
    builder.addCase(getGroupOverlay.fulfilled, (state, action: PayloadAction<ScheduleLessonType[]>) => {
      if (!state.groupOverlay) return
      state.groupOverlay = [...state.groupOverlay, ...action.payload]
    })

    /* getTeacherLessons */
    builder.addCase(getTeacherLessons.fulfilled, (state, action: PayloadAction<ScheduleLessonType[]>) => {
      state.teacherLessons = action.payload
    })

    /* getAuditoryOverlay */
    builder.addCase(getAuditoryOverlay.fulfilled, (state, action: PayloadAction<{ id: number; name: string }[]>) => {
      state.auditoryOverlay = action.payload
    })

    /* getTeacherOverlay */
    builder.addCase(getTeacherOverlay.fulfilled, (state, action: PayloadAction<TeachersType[]>) => {
      state.teacherOverlay = action.payload
    })

    /* createScheduleLesson */
    builder.addCase(createScheduleLesson.fulfilled, (state, action: PayloadAction<ScheduleLessonType>) => {
      if (!state.scheduleLessons) return
      state.scheduleLessons.push(action.payload)
    })

    /* copyWeekSchedule */

    builder.addCase(copyWeekSchedule.fulfilled, (state, action: PayloadAction<ScheduleLessonType[]>) => {
      if (!state.scheduleLessons) return
      state.scheduleLessons = [...state.scheduleLessons, ...action.payload]
    })

    /* copyDaySchedule */
    builder.addCase(copyDaySchedule.fulfilled, (state, action: PayloadAction<ScheduleLessonType[]>) => {
      if (!state.scheduleLessons) return
      state.scheduleLessons = [...state.scheduleLessons, ...action.payload]
    })

    /* createReplacement */
    builder.addCase(createReplacement.fulfilled, (state, action: PayloadAction<ScheduleLessonType>) => {
      if (!state.scheduleLessons) return

      const updatedLessons = state.scheduleLessons.map((el) => {
        if (el.id === action.payload.id) {
          return { ...el, ...action.payload }
        }
        return el
      })
      state.scheduleLessons = updatedLessons
    })

    /* updateScheduleLesson */
    builder.addCase(updateScheduleLesson.fulfilled, (state, action: PayloadAction<ScheduleLessonType>) => {
      if (!state.scheduleLessons) return
      const updatedLessons = state.scheduleLessons.map((el) => {
        if (el.id === action.payload.id) {
          return { ...el, ...action.payload }
        }
        return el
      })
      state.scheduleLessons = updatedLessons
    })

    /* deleteScheduleLesson */
    builder.addCase(deleteScheduleLesson.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.scheduleLessons) return
      const updatedLessons = state.scheduleLessons.filter((el) => el.id !== action.payload)
      state.scheduleLessons = updatedLessons
    })

    /* findLessonsForSchedule */
    builder.addCase(findLessonsForSchedule.fulfilled, (state, action: PayloadAction<GroupLoadType[]>) => {
      state.groupLoad = action.payload
    })
    builder.addCase(findLessonsForSchedule.rejected, (state) => {
      state.groupLoad = []
    })

    /* findLessonStudents */
    builder.addCase(findLessonStudents.fulfilled, (state, action: PayloadAction<GroupLoadType[]>) => {
      state.groupLoad = action.payload
    })
  },
})

export const scheduleLessonsSelector = (state: RootState) => state.scheduleLessons

export const lastSelectedDataSelector = createSelector([scheduleLessonsSelector], (scheduleLessons) => ({
  lastOpenedSemester: scheduleLessons.lastOpenedSemester,
  lastOpenedWeek: scheduleLessons.lastOpenedWeek,
  lastSelectedItemId: scheduleLessons.lastSelectedItemId,
  lastSelectedScheduleType: scheduleLessons.lastSelectedScheduleType,
  lastSelectedStructuralUnitId: scheduleLessons.lastSelectedStructuralUnitId,
}))

export const lessonsForGradeBookSelector = createSelector(
  (state: RootState) => state.scheduleLessons.groupLoad,
  (groupLoad): { lessons: GroupLoadType[] } => {
    if (!groupLoad) return { lessons: [] }

    const lessons = groupLoad.filter(
      (el) => el.typeRu === 'ЛК' || el.typeRu === 'ПЗ' || el.typeRu === 'ЛАБ' || el.typeRu === 'СЕМ'
    )

    const lessonsCopy = JSON.parse(JSON.stringify(lessons))

    const typeOrder = ['ЛК', 'ПЗ', 'ЛАБ', 'СЕМ']

    lessonsCopy.sort((a: GroupLoadType, b: GroupLoadType) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1

      return typeOrder.indexOf(a.typeRu) - typeOrder.indexOf(b.typeRu)
    })

    return { lessons: lessonsCopy }
  }
)

export const {
  setLoadingStatus,
  clearGroupLoad,
  deleteTeacherOverlay,
  clearTeacherOverlay,
  clearGroupOverlay,
  setLastSelectedData,
} = scheduleLessonsSlice.actions

export default scheduleLessonsSlice.reducer
