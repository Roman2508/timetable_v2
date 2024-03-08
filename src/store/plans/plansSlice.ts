import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PlanType, PlansCategoriesType, PlansInitialState, PlansType } from './plansTypes'
import { LoadingStatusTypes } from '../appTypes'
import {
  createPlan,
  createPlanCategory,
  deletePlan,
  deletePlanCategory,
  getPlanSubjects,
  getPlansCategories,
  updatePlan,
  updatePlanCategory,
} from './plansAsyncActions'
import { RootState } from '../store'

const plansInitialState: PlansInitialState = {
  plansCategories: null,
  plan: null,
  loadingStatus: LoadingStatusTypes.NEVER,
}

const plansSlice = createSlice({
  name: 'plans',
  initialState: plansInitialState,
  reducers: {
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload
    },
  },
  extraReducers: (builder) => {
    /* --- categories --- */

    /* getPlansCategories */
    builder.addCase(getPlansCategories.fulfilled, (state, action: PayloadAction<PlansCategoriesType[]>) => {
      state.plansCategories = action.payload
    })

    /* createPlanCategory */
    builder.addCase(createPlanCategory.fulfilled, (state, action: PayloadAction<PlansCategoriesType>) => {
      if (!state.plansCategories) return
      state.plansCategories = [...state.plansCategories, action.payload]
    })

    /* updatePlanCategory */
    builder.addCase(updatePlanCategory.fulfilled, (state, action: PayloadAction<PlansCategoriesType>) => {
      if (!state.plansCategories) return

      const newCategories = state.plansCategories.map((el) => {
        if (el.id === action.payload.id) {
          return { ...action.payload }
        }

        return el
      })

      state.plansCategories = newCategories
    })

    /* deletePlanCategory */
    builder.addCase(deletePlanCategory.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.plansCategories) return

      const newCategories = state.plansCategories.filter((el) => el.id !== action.payload)

      state.plansCategories = newCategories
    })

    /* --- plans --- */

    /* createPlan */
    builder.addCase(createPlan.fulfilled, (state, action: PayloadAction<PlansType>) => {
      if (!state.plansCategories) return

      const newPlansCategories = state.plansCategories.map((el) => {
        if (el.id === action.payload.category.id) {
          return { ...el, plans: [...el.plans, action.payload] }
        }

        return el
      })

      state.plansCategories = newPlansCategories
    })

    /* updatePlan */
    builder.addCase(updatePlan.fulfilled, (state, action: PayloadAction<PlansType>) => {
      if (!state.plansCategories) return

      const newPlansCategories = state.plansCategories.map((el) => {
        if (el.id === action.payload.category.id) {
          const newPlans = el.plans.map((plan) => {
            if (plan.id === action.payload.id) {
              return action.payload
            }

            return plan
          })

          return { ...el, plans: newPlans }
        }

        return el
      })

      state.plansCategories = newPlansCategories
    })

    /* deletePlan */
    builder.addCase(deletePlan.fulfilled, (state, action: PayloadAction<number>) => {
      if (!state.plansCategories) return

      const updatedCategories = state.plansCategories.map((el) => {
        const newPlans = el.plans.filter((plan) => plan.id !== action.payload)

        return { ...el, plans: newPlans }
      })

      state.plansCategories = updatedCategories
    })

    /* getPlanSubjects */
    builder.addCase(getPlanSubjects.fulfilled, (state, action: PayloadAction<PlanType>) => {
      state.plan = action.payload
    })
  },
})

export const { setLoadingStatus } = plansSlice.actions

export default plansSlice.reducer

export const plansSelector = (state: RootState) => state.plans
