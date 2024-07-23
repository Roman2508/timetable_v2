import { Dayjs } from "dayjs"
import { Dispatch, SetStateAction } from "react"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

import { customDayjs } from "./Calendar/Calendar"

interface IDatePickerProps {
  sx?: any
  type?: "date" | "time"
  width?: string
  label?: string
  value?: any
  setValue?: Dispatch<SetStateAction<any>>
  [props: string]: any
}

const CustomDatePicker: React.FC<IDatePickerProps> = ({
  sx = {},
  width = "150px",
  label = "",
  type = "date",
  value = "",
  setValue = () => {},
  ...props
}) => {
  const PickerType = type === "date" ? DatePicker : TimePicker
  const pickerFormat = type === "date" ? "DD.MM.YYYY" : "HH:mm"

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <DemoContainer
        components={[String(PickerType)]}
        sx={{
          overflow: "initial",
          "& input": { padding: "10.5px 0px 10.5px 12px" },
          "&.MuiStack-root>.MuiTextField-root, .MuiStack-root>.MuiPickersTextField-root": {
            maxWidth: width,
            minWidth: width,
          },
          ...sx,
        }}
      >
        <PickerType
          {...props}
          ampm={false}
          label={label}
          format={pickerFormat}
          sx={{ maxWidth: "60px" }}
          value={customDayjs(value, pickerFormat)}
          onChange={(e: Dayjs | null) => setValue(customDayjs(e).format(pickerFormat))}
        />
      </DemoContainer>
    </LocalizationProvider>
  )
}

export { CustomDatePicker }
