import { LoadingStatusTypes } from '../appTypes'

export type PlansInitialState = {
  plansCategories: PlansCategoriesType[] | null
  plan: PlanType | null
  loadingStatus: LoadingStatusTypes
}

export type PlansCategoriesType = {
  id: number
  name: string
  plans: PlansType[]
}

export type PlansType = {
  id: number
  name: string
  category: { id: number; name: string }
}

export type PlanType = {
  id: number
  name: string
  subjects: PlanSubjectType[]
}

export type PlanSubjectType = {
  id: number
  name: string
  totalHours: number
  semesterNumber: number
  lectures: number
  practical: number
  laboratory: number
  seminars: number
  exams: number
  examsConsulation: number
  metodologicalGuidance: number
  independentWork: number
  plan: {
    id: number
  }
}
