import { LoadingStatusTypes } from '../appTypes'
import { GroupLoadType, GroupsType } from '../groups/groupsTypes'
import { LessonsTypeRu } from '../scheduleLessons/scheduleLessonsTypes'
import { StudentType } from '../students/studentsTypes'

export type GradeBookInitialStateType = {
  gradeBook: GradeBookType | null
  loadingStatus: LoadingStatusTypes
}

export type GradeBookType = {
  id: number
  year: number
  semester: number
  typeRu: LessonsTypeRu
  lesson: GroupLoadType
  group: GroupsType
  grades: StudentGradesType[]
  summary: GradeBookSummaryType[]
}

export type StudentGradesType = {
  id: number
  student: StudentType
  gradeBook: GradeBookType
  grades: GradeType[]
}

export type GradeType = {
  lessonNumber: number
  isAbsence: boolean
  rating: number
}

export type GradeBookSummaryType = {
  afterLesson: number
  type: GradeBookSummaryTypes
}

export enum GradeBookSummaryTypes {
  MODULE_RATING = 'MODULE_RATING',
  MODULE_TEST = 'MODULE_TEST',
}
