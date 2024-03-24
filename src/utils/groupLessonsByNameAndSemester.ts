import { GroupLoadType } from "../store/groups/groupsTypes"

export const groupLessonsByNameAndSemester = (lessons: GroupLoadType[]): GroupLoadType[][] => {
  const groupedLessons: Record<string, GroupLoadType[]> = {}

  lessons.forEach((subject) => {
    const subjectName = subject.name + subject.semester

    if (!groupedLessons[subjectName]) {
      groupedLessons[subjectName] = []
    }

    groupedLessons[subjectName].push(subject)
  })
  return Object.values(groupedLessons)
}

interface IGroupByProps {
  lessonName: boolean
  semester: boolean
  groupName: boolean
}

export const groupLessonsByFields = (
  lessons: GroupLoadType[],
  groupBy: IGroupByProps
): GroupLoadType[][] => {
  const groupedLessons: Record<string, GroupLoadType[]> = {}

  lessons.forEach((subject) => {
    const key1 = groupBy.lessonName ? subject.name : ""
    const key2 = groupBy.semester ? subject.semester : ""
    const key3 = groupBy.groupName ? subject.group.name : ""

    const key = key1 + key2 + key3

    if (!groupedLessons[key]) {
      groupedLessons[key] = []
    }

    groupedLessons[key].push(subject)
  })
  return Object.values(groupedLessons)
}
