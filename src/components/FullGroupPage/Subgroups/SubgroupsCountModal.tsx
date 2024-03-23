import {
  Stack,
  Dialog,
  Button,
  MenuItem,
  TextField,
  InputLabel,
  IconButton,
  DialogTitle,
  DialogContent,
} from "@mui/material"
import { CloseOutlined } from "@ant-design/icons"
import React, { Dispatch, SetStateAction } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { useAppDispatch } from "../../../store/store"
import { GroupLoadType } from "../../../store/groups/groupsTypes"
import { createSubgroups } from "../../../store/groups/groupsAsyncActions"
import {
  SubgroupsCountList,
  getLessonSubgroups,
  lessonsTypes,
} from "../../../utils/getLessonSubgroups"

interface ISubgroupsCountModalProps {
  open: boolean
  groupId: number
  selectedLesson: GroupLoadType[] | null
  setOpen: Dispatch<SetStateAction<boolean>>
}

interface IFieldsType {
  lectures: string
  practical: string
  laboratory: string
  seminars: string
  exams: string
}

const initialFormState = [
  {
    count: 1,
    isDisabled: false,
    typeEn: "lectures",
    label: "Лекції",
  },
  {
    count: 1,
    isDisabled: false,
    typeEn: "practical",
    label: "Практичні",
  },
  {
    count: 1,
    isDisabled: false,
    typeEn: "laboratory",
    label: "Лабораторні",
  },
  {
    count: 1,
    isDisabled: false,
    typeEn: "seminars",
    label: "Семінари",
  },
  {
    count: 1,
    isDisabled: false,
    typeEn: "exams",
    label: "Екзамени",
  },
] as SubgroupsCountList[]

const SubgroupsCountModal: React.FC<ISubgroupsCountModalProps> = ({
  open,
  groupId,
  setOpen,
  selectedLesson,
}) => {
  const dispatch = useAppDispatch()

  const [initialFormValues, setInitialFormValues] =
    React.useState<SubgroupsCountList[]>(initialFormState)

  const {
    control,
    setValue,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<IFieldsType>({ mode: "onBlur" })

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit: SubmitHandler<IFieldsType> = async (data) => {
    try {
      if (!selectedLesson) return

      const keys = Object.keys(data)
      keys.map(async (k: string) => {
        /* @ts-ignore */
        if (!data[k]) return

        const lessonType = initialFormValues.find((el) => el.typeEn === k)
        if (lessonType?.isDisabled) return

        const payload = {
          groupId,
          /* @ts-ignore */
          subgroupsCount: Number(data[k]),
          typeEn: k as keyof typeof lessonsTypes,
          planSubjectId: selectedLesson[0].planSubjectId.id,
        }

        await dispatch(createSubgroups(payload))
      })
      handleClose()
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    if (!selectedLesson) return
    // handleClearValues()
    const data = getLessonSubgroups(selectedLesson)
    setInitialFormValues(data)
    setValue("lectures", String(data[0].isDisabled ? "" : data[0].count))
    setValue("practical", String(data[1].isDisabled ? "" : data[1].count))
    setValue("laboratory", String(data[2].isDisabled ? "" : data[2].count))
    setValue("seminars", String(data[3].isDisabled ? "" : data[3].count))
    setValue("exams", String(data[4].isDisabled ? "" : data[4].count))
  }, [selectedLesson])

  return (
    <Dialog
      open={open}
      maxWidth={"sm"}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <DialogTitle>{"Спеціалізовані підгрупи"}</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {initialFormValues.map((lessonType) => (
            <Controller
              control={control}
              key={lessonType.typeEn}
              name={lessonType.typeEn}
              render={({ field }) => {
                return (
                  <Stack>
                    <InputLabel htmlFor="name">{lessonType.label}*</InputLabel>
                    <TextField
                      select
                      fullWidth
                      id="name"
                      {...field}
                      defaultValue={lessonType.count}
                      disabled={lessonType.isDisabled}
                      sx={{
                        width: "100%",
                        pb: 2,
                        "& .MuiInputBase-input": { py: "10.4px", fontSize: "0.875rem" },
                      }}
                    >
                      {["1", "2", "3", "4"].map((el) => (
                        <MenuItem key={`${lessonType}_${el}`} value={el}>
                          {el}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                )
              }}
            />
          ))}

          <Button
            type="submit"
            variant="contained"
            sx={{ p: "7.44px 15px", width: "100%" }}
            disabled={isSubmitting}
          >
            Зберегти
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { SubgroupsCountModal }
