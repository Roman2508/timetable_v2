import { GradeBookSummaryType, GradeType } from "../store/gradeBook/gradeBookTypes"

export const gradeBookSummary = {
  getModuleRate(
    summary: GradeBookSummaryType[],
    grades: GradeType[],
    currentRange: number,
    type: "average" | "sum"
  ): string {
    const indices = summary.map((item) => item.afterLesson)
    const gradesCopy = JSON.parse(JSON.stringify(grades))
    const sotredGrades: GradeType[] = gradesCopy.sort((a: GradeType, b: GradeType) => a.lessonNumber - b.lessonNumber)
    const parts = []

    let start = 0

    for (let i = 0; i < indices.length; i++) {
      let end = indices[i]
      parts.push(sotredGrades.slice(start, end))
      start = end
    }

    if (currentRange < 0) return ""

    const selectedPartIndex = summary.findIndex((el) => el.afterLesson === currentRange)
    const selectedPart = parts[selectedPartIndex]

    if (!selectedPart) return ""

    if (type === "average") {
      const average = selectedPart.reduce((acc, grade) => acc + grade.rating, 0) / selectedPart.length
      if (isNaN(average)) return "-"
      return average.toFixed(0)
    }

    if (type === "sum") {
      const sum = selectedPart.reduce((acc, grade) => acc + grade.rating, 0)
      if (isNaN(sum)) return "-"
      return String(sum)
    }

    return ""
  },

  getTotalRate(grades: GradeType[], type: "average" | "sum") {
    if (type === "average") {
      const rate = grades.reduce((acc, cur) => cur.rating + acc, 0) / grades.length
      return rate.toFixed(0)
    }

    if (type === "sum") {
      const rate = grades.reduce((acc, cur) => cur.rating + acc, 0)
      return rate
    }
  },
}
