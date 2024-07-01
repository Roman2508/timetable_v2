import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'
import { LoadingStatusTypes } from '../appTypes'
import { GradeBookInitialStateType } from './gradeBookTypes'
import testInitialData from './testGradeBookData.json'

const gradeBookInitialState: GradeBookInitialStateType = {
  // @ts-ignore
  gradeBook: testInitialData[0],
  loadingStatus: LoadingStatusTypes.NEVER,
}

export const gradeBookSlice = createSlice({
  name: 'gradeBook',
  initialState: gradeBookInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(getPlansCategories.fulfilled, (state, action: PayloadAction<PlansCategoriesType[]>) => {
    //   state.plansCategories = action.payload
    // })
  },
})

export const { setLoadingStatus } = gradeBookSlice.actions

export default gradeBookSlice.reducer

export const gradeBookSelector = (state: RootState) => state.gradeBook
