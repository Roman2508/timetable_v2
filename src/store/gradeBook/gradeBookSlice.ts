import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { RootState } from "../store"
import { LoadingStatusTypes } from "../appTypes"
import { GradeBookInitialStateType, GradeBookType } from "./gradeBookTypes"
import { addSummary, deleteSummary, getGradeBook, getGrades, updateGrade } from "./gradeBookAsyncActions"
import { AddSummaryResponceType, GetGradesResponceType, UpdateGradesResponceType } from "../../api/apiTypes"

const gradeBookInitialState: GradeBookInitialStateType = {
  // @ts-ignore
  // gradeBook: testInitialData[0],
  gradeBook: null,
  loadingStatus: LoadingStatusTypes.NEVER,
}

export const gradeBookSlice = createSlice({
  name: "gradeBook",
  initialState: gradeBookInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },
    updateGradesLocally(
      state,
      action: PayloadAction<{ id: number; rating: number; isAbsence: boolean; lessonNumber: number }>
    ) {
      if (!state.gradeBook) return

      const isGradesExist = state.gradeBook.grades.find((el) => el.id === action.payload.id)
      const isLessonExist = isGradesExist?.grades.find((el) => el.lessonNumber === action.payload.lessonNumber)
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
            if (grade.lessonNumber === action.payload.lessonNumber) {
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
      const summary = state.gradeBook.summary.filter((el) => el.afterLesson !== afterLesson || el.type === type)
      state.gradeBook.summary = summary
    })

    /* getGrades */
    builder.addCase(getGrades.fulfilled, (state, action: PayloadAction<GetGradesResponceType>) => {
      if (!state.gradeBook) return
      /*  */
      /*  */
      /*  */
      /*  */
      alert("ckeck console")
      console.log(action.payload)
      /*  */
      /*  */
      /*  */
      /*  */
    })

    /* updateGrade */
    builder.addCase(updateGrade.fulfilled, (state, action: PayloadAction<UpdateGradesResponceType>) => {
      if (!state.gradeBook) return
      const allLessonGrades = state.gradeBook.grades.map((el) => {
        if (el.id === action.payload.id) {
          //
          const studentGrades = el.grades.map((grade) => {
            if (grade.lessonNumber === action.payload.grades.lessonNumber) {
              return action.payload.grades
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
    })
  },
})

export const { setLoadingStatus, updateGradesLocally } = gradeBookSlice.actions

export default gradeBookSlice.reducer

export const gradeBookSelector = (state: RootState) => state.gradeBook
