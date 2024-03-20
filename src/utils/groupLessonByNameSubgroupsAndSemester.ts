import { GroupLoadType } from '../store/groups/groupsTypes'

export const groupLessonByNameSubgroupsAndSemester = (lessons: GroupLoadType[]): GroupLoadType[][] => {
  const groupedLessons: Record<string, GroupLoadType[]> = {}

  lessons.forEach((subject) => {
    const subjectKey = subject.name + subject.semester

    if (!groupedLessons[subjectKey]) {
      groupedLessons[subjectKey] = []
    }

    groupedLessons[subjectKey].push(subject)
  })

  const lessonsArr = Object.values(groupedLessons)

  const filteredLessons = lessonsArr.map((group) => {
    const uniqueValues: Record<string, GroupLoadType[]> = {}

    group.forEach((el) => {
      const subjectAlias = el.name + el.typeEn

      if (!uniqueValues[subjectAlias]) {
        uniqueValues[subjectAlias] = []
      }

      uniqueValues[subjectAlias].push(el)
    })

    const filtred = Object.values(uniqueValues).map((el) => {
      const maxSubgroupNumber = Math.max(...el.map((subject) => subject.subgroupNumber))

      return el.filter((f) => {
        if (f.subgroupNumber < maxSubgroupNumber) {
          return false
        } else {
          return true
        }
      })
    })

    return filtred.flatMap((array) => array)
  })

  return filteredLessons
}
