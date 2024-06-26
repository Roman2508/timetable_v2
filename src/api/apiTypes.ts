import { GradeBookSummaryTypes, GradeType } from '../store/gradeBook/gradeBookTypes'
import { GroupsType } from '../store/groups/groupsTypes'
import { LessonsTypeRu } from '../store/scheduleLessons/scheduleLessonsTypes'
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
} & Omit<TeachersType, 'id' | 'category' | 'calendarId'>

export type UpdateTeacherPayloadType = {
  category: number
} & Omit<TeachersType, 'category' | 'calendarId'>

/* Plans */

export type CreatePlanPayloadType = {
  name: string
  categoryId: number
}

/* Groups */

export type UpdateGroupPayloadType = Pick<
  GroupsType,
  'id' | 'name' | 'courseNumber' | 'yearOfAdmission' | 'formOfEducation'
> & { educationPlan: number; category: number }

/* Groups-load */

export type FindLessonsForSchedulePayloadType = {
  semester: number
  itemId: number
  scheduleType: 'group' | 'teacher' | 'auditory'
  // scheduleType: 'group' | 'teacher'
}

export type FindLessonStudentsPayloadType = {
  semester: number
  groupId: number
}

/* Plan-subjects */

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

export type ChangeStudentsCountType = {
  id: number
  students: number
  typeRu: string
  name: string
  semester: number
  subgroupNumber: number | null
  specialization: string | null
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
  lessonsIds: number[]
}

export type AddLessonsToStreamPayloadType = {
  streamId: number
  streamName: string
  lessonsIds: number[]
}

/* attachTeacher */
export type AttachTeacherPayloadType = {
  lessonId: number
  teacherId: number
}

/* schedule lessons */

export type GetScheduleLessonsPayloadType = {
  semester: number
  type: 'group' | 'teacher' | 'auditory'
  id: number
}

export type GetTeachersOverlayPayloadType = {
  date: string
  lessonNumber: number
}

export type CreateScheduleLessonsPayloadType = {
  name: string
  date: string
  subgroupNumber: number | null
  typeRu: 'ЛК' | 'ПЗ' | 'ЛАБ' | 'СЕМ' | 'ЕКЗ'
  lessonNumber: number
  isRemote: boolean
  semester: number
  students: number
  group: number
  teacher: number
  auditory: number | null
  stream: number | null
}

export type CopyWeekSchedulePayloadType = {
  groupId: number
  copyFromStartDay: string
  copyToStartDay: string
}

export type CopyDaySchedulePayloadType = {
  groupId: number
  copyFromDay: string
  copyToDay: string
}

export type CreateReplacementPayloadType = {
  lessonId: number
  teacherId: number
}

export type UpdateScheduleLessonsPayloadType = {
  // schedule lesson id
  id: number
  auditoryId: number | null
  auditoryName?: string
  seatsNumber?: number
  isRemote: boolean
}

export type GetAuditoryOverlayPayloadType = {
  date: string
  lessonNumber: number
  auditoryId: number
}

export type GetGroupOverlayPayloadType = {
  groupId: number
  semester: number
}

/* students */
export type CreateStudentsPayloadType = {
  name: string
  login: string
  password: string
  email: string
  group: number | string
}

export type UpdateStudentsPayloadType = Omit<CreateStudentsPayloadType, 'group'> & {
  status: 'Навчається' | 'Відраховано' | 'Академічна відпустка'
  group: number
  id: number
}

/* grade book */
export type GetGradeBookPayloadType = {
  semester: number
  group: number
  lesson: number
  type: LessonsTypeRu
}

export type AddGradeBookSummaryPayloadType = {
  id: number
  afterLesson: number
  type: GradeBookSummaryTypes
}

export type DeleteGradeBookSummaryPayloadType = AddGradeBookSummaryPayloadType

export type GetGradesPayloadType = {
  studentId: number
  semester: number
}

export type UpdateGradePayloadType = {
  id: number
  studentId: number
  gradeBookId: number
}

export type DeleteGradePayloadType = {
  lessonId: number
  studentId: number
}

export type AddSummaryResponceType = {
  id: number
  summary: { afterLesson: number; type: GradeBookSummaryTypes }[]
}

export type GetGradesResponceType = {
  id: number
  grades: GradeType[]
  student: { id: number; name: string }
  gradeBook: { id: number }
}

export type UpdateGradesResponceType = {
  id: number
  grades: GradeType
}
