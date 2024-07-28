import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import {
  getInstructionalMaterials,
  findAllTeacherLessonsById,
  createInstructionalMaterials,
  deleteInstructionalMaterials,
  updateInstructionalMaterials,
} from "./teacherProfileAsyncActions"
import { RootState } from "../store"
import { LoadingStatusTypes } from "../appTypes"
import { GroupLoadType } from "../groups/groupsTypes"
import { InstructionalMaterialsType, TeacherProfileInitialInitialState } from "./teacherProfileTypes"

const teacherProfileInitialState: TeacherProfileInitialInitialState = {
  report: null,
  workload: null,
  generalInfo: null,
  filterLesson: null,
  individualWorkPlan: null,
  instructionalMaterials: null,
  loadingStatus: LoadingStatusTypes.NEVER,
}

const teacherProfileSlice = createSlice({
  name: "teacher-profile",
  initialState: teacherProfileInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },
    clearInstructionalMaterials(state) {
      state.instructionalMaterials = null
    },
  },
  extraReducers: (builder) => {
    /* --- instructional-materials --- */

    /* --- getInstructionalMaterials-materials --- */
    builder.addCase(
      getInstructionalMaterials.fulfilled,
      (state, action: PayloadAction<InstructionalMaterialsType[]>) => {
        state.instructionalMaterials = action.payload
        state.loadingStatus = LoadingStatusTypes.SUCCESS
      }
    )

    /* createInstructionalMaterials */
    builder.addCase(
      createInstructionalMaterials.fulfilled,
      (state, action: PayloadAction<InstructionalMaterialsType>) => {
        if (!state.instructionalMaterials) return
        state.instructionalMaterials.push(action.payload)
        state.loadingStatus = LoadingStatusTypes.SUCCESS
      }
    )

    /* updateInstructionalMaterials */
    builder.addCase(
      updateInstructionalMaterials.fulfilled,
      (state, action: PayloadAction<InstructionalMaterialsType>) => {
        if (!state.instructionalMaterials) return
        const instructionalMaterials = state.instructionalMaterials.map((el) => {
          if (el.id === action.payload.id) {
            return { ...el, ...action.payload }
          }
          return el
        })

        state.instructionalMaterials = instructionalMaterials
        state.loadingStatus = LoadingStatusTypes.SUCCESS
      }
    )

    /* deleteInstructionalMaterials */
    builder.addCase(deleteInstructionalMaterials.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.instructionalMaterials) return
      const instructionalMaterials = state.instructionalMaterials.filter((el) => el.id !== action.payload)
      state.instructionalMaterials = instructionalMaterials
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })

    /* lessons */

    /* findAllTeacherLessonsById */
    builder.addCase(findAllTeacherLessonsById.fulfilled, (state, action: PayloadAction<GroupLoadType[]>) => {
      state.filterLesson = action.payload
      state.loadingStatus = LoadingStatusTypes.SUCCESS
    })
  },
})

export const { setLoadingStatus /* clearTeachers */ } = teacherProfileSlice.actions

export default teacherProfileSlice.reducer

export const teacherProfileSelector = (state: RootState) => state.teacherProfile
