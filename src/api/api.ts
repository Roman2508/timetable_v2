import axios from "axios"

export { plansAPI } from "./plansAPI"
export { groupsAPI } from "./groupsAPI"
export { streamsAPI } from "./streamsAPI"
export { settingsAPI } from "./settingsAPI"
export { teachersAPI } from "./teachersAPI"
export { studentsAPI } from "./studentsAPI"
export { gradeBookAPI } from "./gradeBookAPI"
export { auditoriesAPI } from "./auditoriesAPI"
export { planSubjectsAPI } from "./planSubjectsAPI"
export { teacherProfileAPI } from "./teacherProfileAPI"
export { scheduleLessonsAPI } from "./scheduleLessonsAPI"
export { groupLoadLessonsAPI } from "./groupLoadLessonsAPI"

export const instanse = axios.create({
  baseURL: "http://localhost:7777/",
  // headers: {
  //   ['Content-Type']: 'application/json',
  //   responseType: 'json',
  // },
  // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:4444/' : 'https://timetable-server.onrender.com/',
})

// Якщо є токен, вшиваю його в конфігурацію axios
// @ts-ignore
instanse.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = String(
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIzNTY1NDUxLCJleHAiOjE3MjYxNTc0NTF9.JYRj4VGXXeRQbSewnqTnSFIjXIzhqQOKc7yjxBwHUfo"
    )
    // config.headers.Authorization = String(window.localStorage.getItem('token'))

    return config
  }
})
