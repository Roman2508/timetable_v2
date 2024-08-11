import { TeacherReportType } from "../store/teacherProfile/teacherProfileTypes"

const splitTeacherReportsByType = (reports: TeacherReportType[]) => {
  const methodicalWork: TeacherReportType[] = []
  const scientificWork: TeacherReportType[] = []
  const organizationalWork: TeacherReportType[] = []

  reports.forEach((el) => {
    if (el.individualWork.type === "Методична робота") {
      methodicalWork.push(el)
      return
    }

    if (el.individualWork.type === "Наукова робота") {
      scientificWork.push(el)
      return
    }

    if (el.individualWork.type === "Організаційна робота") {
      organizationalWork.push(el)
    }
  })

  return { methodicalWork, scientificWork, organizationalWork }
}

export default splitTeacherReportsByType
