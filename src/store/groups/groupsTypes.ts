import { LoadingStatusTypes } from "../appTypes"
import { TeachersType } from "../teachers/teachersTypes"

export type GroupsInitialState = {
  groupCategories: GroupCategoriesType[] | null
  group: GroupsType
  loadingStatus: LoadingStatusTypes
}

export type GroupCategoriesType = {
  id: number
  name: string
  groups: GroupsShortType[]
}

export type GroupsType = {
  id: number
  name: string
  students: number
  courseNumber: number
  yearOfAdmission: number
  specializationList: string[]
  formOfEducation: "Денна" | "Заочна"
  stream: { id: number; name: string }[]
  category: { id: number; name: string } | null
  groupLoad: GroupLoadType[] | null
  educationPlan: { id: number; name: string } | null
}

export type GroupsShortType = Pick<GroupsType, "id" | "name" | "courseNumber" | "students">

export type GroupFormType = {
  name: string
  students: number
  courseNumber: number
  yearOfAdmission: number
  educationPlan: number
  category: { value: string; label: string }
  formOfEducation: { value: string; label: string }
}

export type GroupLoadStreamType = {
  id: number
  name: string
  groups: { id: number; name: string }
  lessons: { id: number; name: string }
}

export type GroupLoadType = {
  id: number
  name: string
  semester: number
  specialization: any
  calendarId: string
  typeRu: "ЛК" | "ПЗ" | "ЛАБ" | "СЕМ" | "ЕКЗ" | "КОНС" | "МЕТОД"
  typeEn: "lectures" | "practical" | "laboratory" | "seminars" | "exams" | "examsConsulation" | "metodologicalGuidance"
  hours: number
  subgroupNumber: number
  students: number
  group: { id: number; name: string }
  planSubjectId: { id: number }
  plan: { id: number }
  stream: GroupLoadStreamType | null
  teacher: TeachersType | null
  cmk: { id: number }
}

// Pick || Omit
