import { LoadingStatusTypes } from "../appTypes"
import { GroupLoadType } from "../groups/groupsTypes"
import { StreamsType } from "../streams/streamsTypes"
import { StudentType } from "../students/studentsTypes"
import { TeachersType } from "../teachers/teachersTypes"
import { AuditoriesTypes } from "../auditories/auditoriesTypes"

export enum LessonsTypeRu {
  LECTURES = "ЛК",
  PRACTICAL = "ПЗ",
  LABORATORY = "ЛАБ",
  SEMINARS = "СЕМ",
  EXAMS = "ЕКЗ",
}

export type ScheduleLessonInitialStateType = {
  // Виставлені ел. розкладу
  scheduleLessons: ScheduleLessonType[] | null

  // Якщо група об'єднана в потік - накладки всіх груп в потоці
  groupOverlay: ScheduleLessonType[] | null
  // Накладки викладачів (уроки викладача за весь час)
  teacherLessons: ScheduleLessonType[] | null
  // Накладки аудиторій
  auditoryOverlay: { id: number; name: string }[] | null

  // Накладки викладачів (при заміні) - уроки всіх викладачів на певну дату
  teacherOverlay: TeachersType[] | null

  // Навантаження (все)
  groupLoad: GroupLoadType[] | null
  loadingStatus: LoadingStatusTypes

  lessonStudents: StudentType[] | null

  // last selected filter
  lastOpenedWeek: number
  lastOpenedSemester: 1 | 2
  lastSelectedItemId: number
  lastSelectedScheduleType: "group" | "teacher" | "auditory"
  lastSelectedStructuralUnitId: number
}

export type ScheduleLessonType = {
  type: any
  id: number
  name: string
  date: Date
  lessonNumber: number
  semester: number
  hours: number
  typeRu: "ЛК" | "ПЗ" | "ЛАБ" | "СЕМ" | "ЕКЗ"
  isRemote: boolean
  students: number
  currentLessonHours: number
  replacement: TeachersType | null
  note: string
  group: { id: number; name: string }
  teacher: TeachersType
  auditory: AuditoriesTypes | null
  stream: StreamsType
  subgroupNumber: number | null
  specialization: string | null
}

export interface ILastSelectedData {
  lastOpenedSemester?: 1 | 2
  lastOpenedWeek?: number
  lastSelectedItemId?: number
  lastSelectedStructuralUnitId?: number
  lastSelectedScheduleType?: "group" | "teacher" | "auditory"
}
