import { PayloadAction, createSlice } from '@reduxjs/toolkit'

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
} from './scheduleLessonsAsyncActions'
import { RootState } from '../store'
import { LoadingStatusTypes } from '../appTypes'
import { GroupLoadType } from '../groups/groupsTypes'
import { ScheduleLessonInitialStateType, ScheduleLessonType } from './scheduleLessonsTypes'
import { TeachersType } from '../teachers/teachersTypes'

const scheduleLessonsInitialState: ScheduleLessonInitialStateType = {
  groupLoad: null,
  teacherLessons: null,
  auditoryOverlay: null,
  groupOverlay: null,
  teacherOverlay: null,
  scheduleLessons: null,
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
  },
})

export const scheduleLessonsSelector = (state: RootState) => state.scheduleLessons

export const { setLoadingStatus, clearGroupLoad, deleteTeacherOverlay, clearTeacherOverlay, clearGroupOverlay } =
  scheduleLessonsSlice.actions

export default scheduleLessonsSlice.reducer
