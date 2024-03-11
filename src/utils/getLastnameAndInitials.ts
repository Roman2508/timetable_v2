import { TeachersType } from '../store/teachers/teachersTypes'

export const getLastnameAndInitials = (teacher: TeachersType) => {
  return `${teacher.lastName} ${teacher.firstName[0]}. ${teacher.middleName[0]}. `
}
