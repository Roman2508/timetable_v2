import { summaryTypes } from "../components/GradeBookPage/AddSummaryModal"
import { UserRoles, UserType } from "../store/auth/authTypes"
import { GradeBookSummaryTypes, GradeType } from "../store/gradeBook/gradeBookTypes"
import { GroupsType } from "../store/groups/groupsTypes"
import { LessonsTypeRu } from "../store/scheduleLessons/scheduleLessonsTypes"
import { IndividualTeacherWordTypes, TeacherReportFileType } from "../store/teacherProfile/teacherProfileTypes"
import { TeachersType } from "../store/teachers/teachersTypes"

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
} & Omit<TeachersType, "id" | "category" | "calendarId">

export type UpdateTeacherPayloadType = {
  category: number
} & Omit<TeachersType, "category" | "calendarId">

/* Plans */

export type CreatePlanPayloadType = {
  name: string
  categoryId: number
}

/* Groups */

export type UpdateGroupPayloadType = Pick<
  GroupsType,
  "id" | "name" | "courseNumber" | "yearOfAdmission" | "formOfEducation"
> & { educationPlan: number; category: number }

/* Groups-load */

export type FindLessonsForSchedulePayloadType = {
  semester: number
  itemId: number
  scheduleType: "group" | "teacher" | "auditory"
  // scheduleType: 'group' | 'teacher'
}

export type FindGroupLoadLessonsByGroupIdAndSemesterPayloadType = {
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

export type AddStudentToLessonType = {
  studentIds: number[]
  lessonId: number
}
export type DeleteStudentFromLessonType = AddStudentToLessonType

export type AddStudentsToAllGroupLessonsType = {
  studentIds: number[]
  groupId: number
  semester: number
}
export type DeleteStudentsFromAllGroupLessonsType = AddStudentsToAllGroupLessonsType

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
  typeEn: "lectures" | "practical" | "laboratory" | "seminars" | "exams"
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
  type: "group" | "teacher" | "auditory"
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
  typeRu: "ЛК" | "ПЗ" | "ЛАБ" | "СЕМ" | "ЕКЗ"
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

export type UpdateStudentsPayloadType = Omit<CreateStudentsPayloadType, "group"> & {
  status: "Навчається" | "Відраховано" | "Академічна відпустка"
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
  type: (typeof summaryTypes)[number]["value"]
}

export type DeleteGradeBookSummaryPayloadType = AddGradeBookSummaryPayloadType

export type GetGradesPayloadType = {
  studentId: number
  semester: number
}

export type CreateGradesPayloadType = {
  studentIds: number[]
  lessonId: number
}

export type UpdateGradePayloadType = {
  id: number
  lessonNumber: number
  isAbsence: boolean
  rating: number
  summaryType: null | string
  // studentId: number
  // gradeBookId: number
}

export type DeleteGradesPayloadType = CreateGradesPayloadType

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

export type FindAllLessonDatesForTheSemesterPayloadType = {
  groupId: number
  semester: number
  lessonName: string
  type: string
  stream?: number
  subgroupNumber?: number
  specialization?: string
}

/* settings */
export type UpdateColorsPayloadType = {
  lectures: string
  practical: string
  laboratory: string
  seminars: string
  exams: string
}

export type CallScheduleType = {
  start: string
  end: string
}

export type UpdateCallSchedulePayloadType = {
  ["1"]: CallScheduleType
  ["2"]: CallScheduleType
  ["3"]: CallScheduleType
  ["4"]: CallScheduleType
  ["5"]: CallScheduleType
  ["6"]: CallScheduleType
  ["7"]: CallScheduleType
}

export type UpdateSemesterTermsPayloadType = {
  firstSemesterStart: string
  firstSemesterEnd: string
  secondSemesterStart: string
  secondSemesterEnd: string
}
/* // settings */

/* InstructionalMaterials */

export type CreateInstructionalMaterialsPayloadType = {
  name: string
  lessonNumber: number
  lessonId: number
  year: number
}
export type UpdateInstructionalMaterialsPayloadType = { id: number; name: string }
export type ImportInstructionalMaterialsPayloadType = {
  lessonId: number
  year: number
  themes: Pick<CreateInstructionalMaterialsPayloadType, "lessonNumber" | "name">[]
}

/* teacher-report */
export type GetTeacherReportType = {
  id: number
  year: number
}
export type CreateTeacherReportType = {
  year: number
  hours: number
  teacher: number
  description: string
  plannedDate: string
  individualWork: number
}
export type UpdateTeacherReportType = {
  id: number
  hours: number
  doneDate: string
  status?: boolean
  plannedDate: string
  description: string
}
export type TeacherReportUploadFileType = {
  id: number
  file: FormData
}
export type TeacherReportUploadFileResponceType = {
  id: number
  files: TeacherReportFileType[]
}
export type TeacherReportDeleteFileResponceType = TeacherReportUploadFileResponceType
export type TeacherReportDeleteFileType = {
  id: number
  fileId: string
}
/* // teacher-report */

/* individual-teacher-work */
export type CreateIndividualTeacherWorkType = {
  name: string
  hours: number
  type: IndividualTeacherWordTypes
}
export type UpdateIndividualTeacherWorkType = CreateIndividualTeacherWorkType & { id: number }
/* // individual-teacher-work */

/* auth */
export type RegisterPayloadType = {
  email: string
  password: string
  role: UserRoles
  roleId?: number
}
export type LoginPayloadType = {
  email: string
  password: string
}

export type GoogleLoginPayloadType = Pick<LoginPayloadType, "email">

export type AuthResponseType = {
  user: UserType
  accessToken: string
}
/* // auth */
