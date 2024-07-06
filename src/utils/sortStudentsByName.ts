import { StudentType } from "../store/students/studentsTypes"

export const sortStudentsByName = (students: StudentType[]) => {
  const studentsCopy = JSON.parse(JSON.stringify(students))

  studentsCopy.sort((a: StudentType, b: StudentType) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })

  return studentsCopy
}
