import { GradeBookSummaryType, GradeType } from '../store/gradeBook/gradeBookTypes'

export const calculateGradeBookSummary = (
  summary: GradeBookSummaryType[],
  grades: GradeType[],
  currentRange: number
) => {
  const indices = summary.map((item) => item.afterLesson)

  const sotredGrades: GradeType[] = JSON.parse(JSON.stringify(grades)).sort(
    (a: GradeType, b: GradeType) => a.lessonNumber - b.lessonNumber
  )

  const parts = []

  let start = 0

  for (let i = 0; i < indices.length; i++) {
    let end = indices[i]
    parts.push(sotredGrades.slice(start, end))
    start = end
  }

  const relevantParts = parts.slice(0, -1)

  if (currentRange < 0) {
    return ''
  }

  const selectedPartIndex = summary.findIndex((el) => el.afterLesson === currentRange)
  const selectedPart = relevantParts[selectedPartIndex]

  if (!selectedPart) return ''

  const average = selectedPart.reduce((acc, grade) => acc + grade.rating, 0) / selectedPart.length

  return average.toFixed(1)
}
