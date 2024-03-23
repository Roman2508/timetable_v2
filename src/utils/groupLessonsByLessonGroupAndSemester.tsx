import { GroupLoadType } from "../store/groups/groupsTypes"

export const groupLessonsByLessonGroupAndSemester = (
  lessons: GroupLoadType[]
): GroupLoadType[][] => {
  const groupedLessons: Record<string, GroupLoadType[]> = {}

  lessons.forEach((subject) => {
    const subjectName = subject.name + subject.semester + subject.group.name

    if (!groupedLessons[subjectName]) {
      groupedLessons[subjectName] = []
    }

    groupedLessons[subjectName].push(subject)
  })
  return Object.values(groupedLessons)
}
