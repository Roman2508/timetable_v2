import { LoadingStatusTypes } from "../appTypes"
import { StudentType } from "../students/studentsTypes"
import { TeachersType } from "../teachers/teachersTypes"

export type AuthInitialState = {
  user: UserType | null
  loadingStatus: LoadingStatusTypes
}

export enum UserRoles {
  ADMIN = "ADMIN",
  GUEST = "GUEST",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
  HEAD_OF_DEPARTMENT = "HEAD_OF_DEPARTMENT",
}

export type UserType = {
  id: number
  login: string // ??????
  email: string
  role: UserRoles
  teacher: TeachersType | null
  student: StudentType | null
}
