export interface ILastSelectedDataToLocalStoragepProps {
  lastOpenedSemester?: 1 | 2
  lastOpenedWeek?: number
  lastSelectedItemId?: number
  lastSelectedStructuralUnitId?: number
  lastSelectedScheduleType?: "group" | "teacher" | "auditory"
}

export const setLastSelectedDataToLocalStorage = (props: ILastSelectedDataToLocalStoragepProps) => {
  const data = window.localStorage.getItem("timetable-last-selected-data")

  if (!data || data === "undefined") {
    window.localStorage.setItem("timetable-last-selected-data", JSON.stringify(props))
    //
  } else {
    const lastObj = JSON.parse(data)

    const combinedData = { ...lastObj, ...props }

    window.localStorage.setItem("timetable-last-selected-data", JSON.stringify(combinedData))
  }
}
