import { PlanSubjectType } from '../store/plans/plansTypes'

export const groupLessonsByName = (subjects: PlanSubjectType[]): PlanSubjectType[][] => {
  const groupedSubjects: Record<string, any> = {}

  subjects.forEach((subject) => {
    const subjectName = subject.name

    if (!groupedSubjects[subjectName]) {
      groupedSubjects[subjectName] = []
    }

    groupedSubjects[subjectName].push(subject)
  })
  return Object.values(groupedSubjects)
}
