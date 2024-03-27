import { GroupsType } from '../store/groups/groupsTypes'
import { TeachersType } from '../store/teachers/teachersTypes'

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
  id: number
  name: string
}

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

/* plan-subjects */

export type CreateSubjectPayloadType = {
  name: string
  cmk: number
  planId: number
}

export type UpdateSubjectNamePayloadType = {
  oldName: string
  newName: string
  cmk: number
  planId: number
}

export type UpdateSubjectHoursPayloadType = {
  id: number
  name: string
  planId: number
  cmk: number
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

// Specialization

export type AttachSpecializationPayloadType = {
  planSubjectId: number
  groupId: number
  name: string | null
}

export type CreateSpecializationPayloadType = {
  groupId: number
  name: string
}

export type UpdateSpecializationPayloadType = {
  groupId: number
  oldName: string
  newName: string
}

export type DeleteSpecializationPayloadType = CreateSpecializationPayloadType

// Subgroups

export type CreateSubgroupsPayloadType = {
  planSubjectId: number
  groupId: number
  typeEn: 'lectures' | 'practical' | 'laboratory' | 'seminars' | 'exams'
  subgroupsCount: number
}

/* Streams */

export type AddGroupToStreamPayloadType = {
  streamId: number
  groupId: number
}

export type DeleteGroupFromStreamPayloadType = AddGroupToStreamPayloadType

export type DeleteGroupFromStreamResponseType = {
  streamId: number
  groupId: number
  updatedLessons: []
}

export type DeleteLessonFromStreamPayloadType = {
  // name: string
  // hours: number
  // typeEn: string
  // semester: number
  // streamId: number
  // subgroupNumber: number | null
  lessonsIds: number[]
}

export type AddLessonsToStreamPayloadType = {
  streamId: number
  streamName: string
  lessonsIds: number[]
}
