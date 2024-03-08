import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AuditoryCategoriesTypes, AuditoriesInitialState, AuditoriesTypes } from "./auditoriesTypes"
import { LoadingStatusTypes } from "../appTypes"
import {
  createAuditory,
  createAuditoryCategory,
  deleteAuditory,
  deleteAuditoryCategory,
  getAuditoryCategories,
  updateAuditory,
  updateAuditoryCategory,
} from "./auditoriesAsyncActions"
import { RootState } from "../store"

const auditoriesInitialState: AuditoriesInitialState = {
  auditoriCategories: null,
  loadingStatus: LoadingStatusTypes.NEVER,
}

const auditoriesSlice = createSlice({
  name: "auditories",
  initialState: auditoriesInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },
  },
  extraReducers: (builder) => {
    /* --- categories --- */

    /* getAuditoryCategories */
    builder.addCase(
      getAuditoryCategories.fulfilled,
      (state, action: PayloadAction<AuditoryCategoriesTypes[]>) => {
        state.auditoriCategories = action.payload
      }
    )

    /* createAuditoryCategory */
    builder.addCase(
      createAuditoryCategory.fulfilled,
      (state, action: PayloadAction<AuditoryCategoriesTypes>) => {
        state.auditoriCategories?.push(action.payload)
      }
    )

    /* updateAuditoryCategory */
    builder.addCase(
      updateAuditoryCategory.fulfilled,
      (state, action: PayloadAction<AuditoryCategoriesTypes>) => {
        if (!state.auditoriCategories) return

        const newAuditories = state.auditoriCategories.map((el) => {
          if (el.id === action.payload.id) {
            return { ...action.payload }
          }

          return el
        })

        state.auditoriCategories = newAuditories
      }
    )

    /* deleteAuditoryCategory */
    builder.addCase(deleteAuditoryCategory.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.auditoriCategories) return

      const newCategories = state.auditoriCategories.filter((el) => el.id !== action.payload)

      state.auditoriCategories = newCategories
    })

    /* --- auditories --- */

    /* createAuditory */
    builder.addCase(createAuditory.fulfilled, (state, action: PayloadAction<AuditoriesTypes>) => {
      if (!state.auditoriCategories) return

      const newAuditories = state.auditoriCategories.map((el) => {
        if (el.id === action.payload.category.id) {
          return { ...el, auditories: [...el.auditories, action.payload] }
        }

        return el
      })

      state.auditoriCategories = newAuditories
    })

    /* updateAuditory */
    builder.addCase(updateAuditory.fulfilled, (state, action: PayloadAction<AuditoriesTypes>) => {
      if (!state.auditoriCategories) return

      const newAuditories = state.auditoriCategories.map((el) => {
        if (el.id === action.payload.category.id) {
          const newAuditories = el.auditories.map((auditory) => {
            if (auditory.id === action.payload.id) {
              return action.payload
            }

            return auditory
          })

          return { ...el, auditories: newAuditories }
        }

        return el
      })

      state.auditoriCategories = newAuditories
    })

    /* deleteAuditory */
    builder.addCase(deleteAuditory.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.auditoriCategories) return

      const updatedCategories = state.auditoriCategories.map((el) => {
        const newAuditories = el.auditories.filter((auditory) => auditory.id !== action.payload)

        return { ...el, auditories: newAuditories }
      })

      state.auditoriCategories = updatedCategories
    })
  },
})

export const auditoriesSelector = (state: RootState) => state.auditories

export const { setLoadingStatus } = auditoriesSlice.actions

export default auditoriesSlice.reducer
