import { TeachersType } from "../store/teachers/teachersTypes"

export const getLastnameAndInitials = (teacher: TeachersType | null) => {
  if (!teacher) return ""
  return `${teacher.lastName} ${teacher.firstName[0]}. ${teacher.middleName[0]}. `
}
