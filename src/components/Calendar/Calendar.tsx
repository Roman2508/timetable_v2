import React from "react"
import dayjs from "dayjs"
import uk from "dayjs/locale/uk"
import updateLocale from "dayjs/plugin/updateLocale"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Calendar as CalendarComponent, dayjsLocalizer, Event, SlotInfo } from "react-big-calendar"

dayjs.locale(uk)

dayjs.extend(updateLocale)

dayjs.updateLocale("uk", {
  // formats: ["DD.MM.YYYY", "HH.mm"],
  weekdaysShort: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  months: [
    "Січня",
    "Лютого",
    "Березня",
    "Квітня",
    "Травня",
    "Червня",
    "Липня",
    "Серпня",
    "Вересня",
    "Жовтня",
    "Листопада",
    "Грудня",
  ],
})

const localizer = dayjsLocalizer(dayjs)

export const customDayjs = dayjs

interface ICalendarProps {
  events?: Event[]
  onClick?: (e: Event) => void
  selectable?: boolean
  heigth?: string
  onSelectLessonsTime?: React.Dispatch<React.SetStateAction<Date | null>>
}

const Calendar: React.FC<ICalendarProps> = ({
  events = [],
  selectable = false,
  onClick = () => {},
  heigth = "",
  onSelectLessonsTime,
}) => {
  //   const isDatesOverlap = (events: Event[], selectedDate: Event) => {
  //     return events.some((dateObject) => {
  //       // Проверяем, если начальная или конечная дата выбранной даты частично перекрывается с диапазоном текущего объекта даты
  //       return (
  //         // @ts-ignore
  //         (selectedDate.start <= dateObject.start && selectedDate.end >= dateObject.end) ||
  //         // @ts-ignore
  //         (selectedDate.start >= dateObject.start && selectedDate.start < dateObject.end) ||
  //         // @ts-ignore
  //         (selectedDate.end > dateObject.start && selectedDate.end <= dateObject.end)
  //       )
  //     })
  //   }

  const eventStyleGetter = (event: any, start: Date, end: Date, isSelected: Boolean) => {
    // console.log(event, start, end, isSelected)

    const style = {
      cursor: "pointer",
      backgroundColor: "#" + event.hexColor,
      color: "#fff",
      borderRadius: "0px",
      fontSize: "12px",
      opacity: 0.8,
      border: "0px",
      display: "block",
      width: "100%",
      minWidth: "100%",
    }
    return { style: style }
  }

  React.useEffect(() => {
    return () => onSelectLessonsTime && onSelectLessonsTime(null)
  }, [])

  const today = new Date()

  return (
    <div>
      <CalendarComponent
        selectable={true}
        onSelectEvent={onClick}
        onDoubleClickEvent={onClick}
        localizer={localizer}
        events={events}
        defaultView="week"
        // timeslots={7}
        onSelectSlot={(slotInfo: SlotInfo) => {
          //   const isOverlap = isDatesOverlap(events, { start: slotInfo.start, end: slotInfo.end })
          //   if (!isOverlap) {
          //     onSelectLessonsTime && onSelectLessonsTime(slotInfo.start)
          //   } else {
          //     toast.info("Викладач зайнятий в цей час. Виберіть іншу дату")
          //   }
        }}
        eventPropGetter={eventStyleGetter}
        views={["week"]}
        startAccessor="start"
        endAccessor="end"
        min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8)}
        // max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 19)}
        max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14)}
        culture={"fr"}
        messages={{
          next: "Наступний тиждень",
          previous: "Попередній тиждень",
          today: "Сьогодні",
          week: "Тиждень",
        }}
        // timeslots={7}
        // step={30}
      />
    </div>
  )
}

export default Calendar
