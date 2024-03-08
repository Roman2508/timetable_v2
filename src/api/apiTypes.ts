import { GroupsType } from '../redux/groups/groupsTypes'
import { TeachersType } from '../redux/teachers/teachersTypes'

/* Global */

export type UpdateEntityNamePayloadType = {
  id: number
  name: string
}

export type CreateEntityPayloadType = {
  name: string
  categoryId: number
}

/* Auditories */

export type CreateAuditoryPayloadType = {
  name: string
  seatsNumber: number
  category: number
}

export type UpdateAuditoryCategoryPayloadType = {
  id: number
  name: string
}

export type UpdateAuditoryPayloadType = {
  id: Number
} & CreateAuditoryPayloadType

/* Teachers */

export type CreateTeacherCategoryPayloadType = {
  name: string
}

export type UpdateTeacherCategoryPayloadType = {
  id: Number
} & CreateTeacherCategoryPayloadType

export type CreateTeacherPayloadType = {
  category: number
} & Omit<TeachersType, 'id' | 'category'>

export type UpdateTeacherPayloadType = {
  category: number
} & Omit<TeachersType, 'category'>

/* Plans */

export type CreatePlanPayloadType = {
  name: string
  categoryId: number
}

/* Groups */

export type UpdateGroupPayloadType = Pick<
  GroupsType,
  'id' | 'name' | 'students' | 'courseNumber' | 'yearOfAdmission' | 'formOfEducation'
> & { educationPlan: number; category: number }

// {
//   "name": "string",
//   "students": 0,
//   "courseNumber": 0,
//   "yearOfAdmission": 0,
//   "formOfEducation": "string",
//   "educationPlan": 0
//   "category": 0,
// }

/* plan-subjects */

export type CreateSubjectPayloadType = {
  name: string
  planId: number
}

export type UpdateSubjectNamePayloadType = {
  oldName: 'string'
  newName: 'string'
  planId: number
}

export type UpdateSubjectHoursPayloadType = {
  id: number
  name: string
  plan: number
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
}
