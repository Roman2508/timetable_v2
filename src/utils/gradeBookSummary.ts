import { GradeBookSummaryType, GradeType } from '../store/gradeBook/gradeBookTypes'

export const gradeBookSummary = {
  getModuleRate(
    summary: GradeBookSummaryType[],
    grades: GradeType[],
    currentRange: number,
    type: 'average' | 'sum' | 'current_sum'
  ): string {
    const summaryCopy: GradeBookSummaryType[] = JSON.parse(JSON.stringify(summary))
    const summartWithoutRateAndTest = summaryCopy.filter(
      (el) => el.type !== 'ADDITIONAL_RATE' && el.type !== 'MODULE_TEST' && el.type !== 'EXAM'
    )
    const sortedSummary = summartWithoutRateAndTest.sort(
      (a: GradeBookSummaryType, b: GradeBookSummaryType) => a.afterLesson - b.afterLesson
    )
    const indices: number[] = sortedSummary.map((item: GradeBookSummaryType) => item.afterLesson)

    const gradesCopy = JSON.parse(JSON.stringify(grades))
    const sotredGrades: GradeType[] = gradesCopy.sort((a: GradeType, b: GradeType) => a.lessonNumber - b.lessonNumber)
    const parts: GradeType[][] = []

    indices.forEach((_, index: number) => {
      const current = indices[index]
      let prev = indices[index - 1] || 0

      if (current > prev) {
        const grades = sotredGrades.filter((el) => {
          return el.lessonNumber > prev && el.lessonNumber <= current
        })
        parts.push(grades)
        return
      }

      if (current === prev) {
        prev = indices[index - 2] || 0

        const grades = sotredGrades.filter((el) => {
          return el.lessonNumber > prev && el.lessonNumber <= current
        })
        parts.push(grades)
      }
    })

    if (currentRange < 0) return ''

    const selectedPartIndex = sortedSummary.findIndex((el: GradeBookSummaryType) => el.afterLesson === currentRange)

    const selectedPart = parts[selectedPartIndex]

    if (!selectedPart) return ''

    if (type === 'average') {
      const notZeroValues = selectedPart.filter((el) => el.rating !== 0)

      const average = notZeroValues.reduce((acc, grade) => acc + grade.rating, 0) / notZeroValues.length
      if (isNaN(average) || average === 0) return '-'
      return average.toFixed(0)
    }

    if (type === 'sum') {
      const sum = selectedPart.reduce((acc, grade) => acc + grade.rating, 0)
      if (isNaN(sum) || sum === 0) return '-'
      return String(sum)
    }

    // Рейтинг з модуля без додаткового рейтингу та модульного контролю
    if (type === 'current_sum') {
      const selectedPathWithoutSummary = selectedPart.filter((el) => !el.summaryType)
      const sum = selectedPathWithoutSummary.reduce((acc, grade) => acc + grade.rating, 0)
      if (isNaN(sum) || sum === 0) return '-'
      return String(sum)
    }

    return ''
  },

  getTotalRate(grades: GradeType[], type: 'average' | 'sum') {
    if (type === 'average') {
      const notZeroValues = grades.filter((el) => el.rating !== 0)
      const average = notZeroValues.reduce((acc, cur) => cur.rating + acc, 0) / notZeroValues.length
      if (isNaN(average) || average === 0) return '-'
      return average.toFixed(0)
    }

    if (type === 'sum') {
      const rate = grades.reduce((acc, cur) => cur.rating + acc, 0)
      if (rate === 0) return '-'
      return rate
    }
  },
}

/* trycode.pw

const gradeBookSummary = {
  getModuleRate(summary, grades, currentRange, type) {
    const summaryCopy = JSON.parse(JSON.stringify(summary));
    const sortedSummary = summaryCopy.sort((a, b) => a.afterLesson - b.afterLesson);
    const indices = sortedSummary.map(item => item.afterLesson);

    const gradesCopy = JSON.parse(JSON.stringify(grades));
    const sotredGrades = gradesCopy.sort((a, b) => a.lessonNumber - b.lessonNumber);
    const parts = [];

    indices.forEach((lessonNumber, index) => {
      const current = indices[index];
      let prev = indices[index - 1] || 0;

      console.log(prev, current, indices);

      if (current > prev) {
        const grades = sotredGrades.filter(el => {
          return el.lessonNumber > prev && el.lessonNumber <= current;
        });
        parts.push(grades);
        return;
      }

      if (current === prev) {
        prev = indices[index - 2] || 0;

        const grades = sotredGrades.filter(el => {
          return el.lessonNumber > prev && el.lessonNumber <= current;
        });
        parts.push(grades);
      }
    });

    if (currentRange < 0) return '';

    const selectedPartIndex = summary.findIndex(el => el.afterLesson === currentRange);

    const selectedPart = parts[selectedPartIndex];

    if (!selectedPart) return '';

    if (type === 'average') {
      const notZeroValues = selectedPart.filter(el => el.rating !== 0);
      const average =
        notZeroValues.reduce((acc, grade) => acc + grade.rating, 0) / selectedPart.length;
      if (isNaN(average)) return '-';
      return average.toFixed(0);
    }

    if (type === 'sum') {
      const sum = selectedPart.reduce((acc, grade) => acc + grade.rating, 0);
      if (isNaN(sum)) return '-';
      return String(sum);
    }

    return '';
  },
};

const grades = [
  { lessonNumber: 9, rate: 8 },
  { lessonNumber: 2, rate: 8 },
  { lessonNumber: 4, rate: 8 },
  { lessonNumber: 1, rate: 8 },
  { lessonNumber: 17, rate: 8 },
  { lessonNumber: 7, rate: 8 },
  { lessonNumber: 10, rate: 8 },
  { lessonNumber: 11, rate: 8 },
  { lessonNumber: 6, rate: 8 },
  { lessonNumber: 15, rate: 8 },
];

const summary = [{ afterLesson: 18 }, { afterLesson: 5 }, { afterLesson: 9 }, { afterLesson: 5 }];

// [1, 2, 4] [==5==]  [6, 7, 9] [==9==]  [10, 11, 15, 17] [==18==]

console.log(gradeBookSummary.getModuleRate(summary, grades, 9, 'sum'));

*/
