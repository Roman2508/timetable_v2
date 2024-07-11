import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'
import { LoadingStatusTypes } from '../appTypes'
import { addSummary, deleteSummary, getGradeBook, getGrades } from './gradeBookAsyncActions'
import { GradeBookInitialStateType, GradeBookSummaryTypes, GradeBookType } from './gradeBookTypes'
import { AddSummaryResponceType, DeleteGradeBookSummaryPayloadType, GetGradesResponceType } from '../../api/apiTypes'

const gradeBookInitialState: GradeBookInitialStateType = {
  gradeBook: null,
  loadingStatus: LoadingStatusTypes.NEVER,
}

export const gradeBookSlice = createSlice({
  name: 'gradeBook',
  initialState: gradeBookInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },
    updateGradesLocally(
      state,
      action: PayloadAction<{
        id: number
        rating: number
        isAbsence: boolean
        lessonNumber: number
        summaryType: null | GradeBookSummaryTypes
      }>
    ) {
      if (!state.gradeBook) return

      const isGradesExist = state.gradeBook.grades.find((el) => el.id === action.payload.id)
      const isLessonExist = isGradesExist?.grades.find(
        (el) => el.lessonNumber === action.payload.lessonNumber && el.summaryType === action.payload.summaryType
      )
      if (!isLessonExist) {
        const newGrades = state.gradeBook.grades.map((el) => {
          if (el.id === action.payload.id) {
            const { id, ...rest } = action.payload
            return { ...el, grades: [...el.grades, rest] }
          } else {
            return el
          }
        })

        state.gradeBook.grades = newGrades
        return
      }

      const allLessonGrades = state.gradeBook.grades.map((el) => {
        if (el.id === action.payload.id) {
          //
          const studentGrades = el.grades.map((grade) => {
            if (
              grade.lessonNumber === action.payload.lessonNumber &&
              grade.summaryType === action.payload.summaryType
            ) {
              return action.payload
            } else {
              return grade
            }
          })
          return { ...el, grades: studentGrades }
          //
        } else {
          return el
        }
      })
      state.gradeBook.grades = allLessonGrades
    },
    deleteSummaryGradesLocally(state, action: PayloadAction<DeleteGradeBookSummaryPayloadType>) {
      if (!state.gradeBook) return

      const newGrades = state.gradeBook.grades.map((grade) => {
        const grades = grade.grades.filter(
          (el) => el.lessonNumber !== action.payload.afterLesson - 1 || el.summaryType !== action.payload.type
        )
        return { ...grade, grades }
      })

      state.gradeBook.grades = newGrades
    },
  },
  extraReducers: (builder) => {
    /* getGradeBook */
    builder.addCase(getGradeBook.fulfilled, (state, action: PayloadAction<GradeBookType>) => {
      state.gradeBook = action.payload
    })

    /* addSummary */
    builder.addCase(addSummary.fulfilled, (state, action: PayloadAction<AddSummaryResponceType>) => {
      if (!state.gradeBook) return
      state.gradeBook.summary = action.payload.summary
    })

    /* deleteSummary */
    builder.addCase(deleteSummary.fulfilled, (state, action: PayloadAction<AddSummaryResponceType>) => {
      if (!state.gradeBook) return
      const { afterLesson, type } = action.payload.summary[0]
      const summary = state.gradeBook.summary.filter((el) => el.afterLesson !== afterLesson || el.type !== type)
      state.gradeBook.summary = summary
    })

    /* getGrades */
    builder.addCase(getGrades.fulfilled, (state, action: PayloadAction<GetGradesResponceType>) => {
      if (!state.gradeBook) return
      /*  */
      /*  */
      /*  */
      alert('ckeck console')
      console.log(action.payload)
      /*  */
      /*  */
      /*  */
    })
  },
})

export const { setLoadingStatus, updateGradesLocally, deleteSummaryGradesLocally } = gradeBookSlice.actions

export default gradeBookSlice.reducer

export const gradeBookSelector = (state: RootState) => state.gradeBook
