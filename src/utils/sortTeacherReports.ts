import { TeacherReportType } from "../store/teacherProfile/teacherProfileTypes"

export const sortTeacherReports = (report: TeacherReportType[]): TeacherReportType[] => {
  const reportsCopy = JSON.parse(JSON.stringify(report))

  reportsCopy.sort((a: TeacherReportType, b: TeacherReportType) => {
    if (a.individualWork.name < b.individualWork.name) return -1
    if (a.individualWork.name > b.individualWork.name) return 1
    return 0
  })

  return reportsCopy
}
