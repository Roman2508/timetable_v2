import React from 'react'

interface ICurrentHours {
  totalHours: number
  lectures: number
  practical: number
  laboratory: number
  independentWork: number
  seminars: number
}

const useTotalAndCurrendSubjectHours = (currentHours: ICurrentHours): { total: number; current: number } => {
  const [total, setTotal] = React.useState(0)
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!currentHours) return

    const { totalHours, lectures, practical, laboratory, independentWork, seminars } = currentHours

    setTotal(Number(totalHours))

    const sum = Number(lectures) + Number(practical) + Number(laboratory) + Number(seminars) + Number(independentWork)
    setCurrent(sum)
  }, [currentHours])

  return { total, current }
}

export default useTotalAndCurrendSubjectHours
