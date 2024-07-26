import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'
import { LoadingStatusTypes } from '../appTypes'
import { TeacherProfileInitialInitialState } from './teacherProfileTypes'

const teacherProfileInitialState: TeacherProfileInitialInitialState = {
  lesson: null,
  workload: null,
  generalInfo: null,
  individualWorkPlan: null,
  report: null,
  instructionalMaterials: null,
  loadingStatus: LoadingStatusTypes.NEVER,
}

const teacherProfileSlice = createSlice({
  name: 'teacher-profile',
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
    /* --- categories --- */
    //   builder.addCase(getTeachersCategories.fulfilled, (state, action: PayloadAction<TeachersCategoryType[]>) => {
    // state.teachersCategories = action.payload
    // state.loadingStatus = LoadingStatusTypes.SUCCESS
    //   })
  },
})

export const { setLoadingStatus /* clearTeachers */ } = teacherProfileSlice.actions

export default teacherProfileSlice.reducer

export const teacherProfileSelector = (state: RootState) => state.teachers
