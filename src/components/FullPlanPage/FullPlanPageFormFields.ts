export type IFormFields = {
  lectures: number
  practical: number
  laboratory: number
  seminars: number
  exams: number
  examsConsulation: number
  metodologicalGuidance: number
  independentWork: number
  totalHours: number
}

export const formFields = [
  { label: "Лекції", value: "lectures" },
  { label: "Практичні", value: "practical" },
  { label: "Лабораторні", value: "laboratory" },
  { label: "Семінари", value: "seminars" },
  { label: "Екзамени", value: "exams" },
  { label: "Консультація перед екзаменом", value: "examsConsulation" },
  { label: "Методичне керівництво", value: "metodologicalGuidance" },
  { label: "Самостійна робота", value: "independentWork" },
  { label: "Загальна кількість годин", value: "totalHours" },
] as const
