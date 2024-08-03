import React, { Dispatch, SetStateAction } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Stack, Button, MenuItem, TextField, InputLabel, OutlinedInput } from "@mui/material"

import { useAppDispatch } from "../../../store/store"
import { IndividualTeacherWordTypes } from "../../../store/teacherProfile/teacherProfileTypes"
import {
  createIndividualTeacherWork,
  updateIndividualTeacherWork,
} from "../../../store/teacherProfile/teacherProfileAsyncActions"
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner"

export interface IFormState {
  id: number
  name: string
  hours: number
  type: IndividualTeacherWordTypes
}

export const categoriesTypes: `${IndividualTeacherWordTypes}`[] = [
  "Методична робота",
  "Наукова робота",
  "Організаційна робота",
]

const initialFormValues = { id: 0, name: "", hours: 0, type: IndividualTeacherWordTypes.METHODICAL_WORK }

interface IIndividualTeacherWorkFormProps {
  editingIndividualTeacherWork: IFormState | null
  setEditingIndividualTeacherWork: Dispatch<SetStateAction<IFormState | null>>
}

export const IndividualTeacherWorkForm: React.FC<IIndividualTeacherWorkFormProps> = (props) => {
  const { editingIndividualTeacherWork, setEditingIndividualTeacherWork } = props

  const dispatch = useAppDispatch()

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IFormState>({
    mode: "onBlur",
    defaultValues: initialFormValues,
  })

  const isSomeFieldIsEmpty = !watch("name") || !watch("hours") || !watch("type")

  const onSubmit: SubmitHandler<IFormState> = async (data) => {
    try {
      // update
      if (editingIndividualTeacherWork) {
        await dispatch(updateIndividualTeacherWork({ ...data, id: editingIndividualTeacherWork.id }))
        setEditingIndividualTeacherWork(null)
        reset(initialFormValues)
        return
      }

      // create
      await dispatch(createIndividualTeacherWork(data))
      reset(initialFormValues)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (!editingIndividualTeacherWork) return
    setValue("id", editingIndividualTeacherWork.id)
    setValue("name", editingIndividualTeacherWork.name)
    setValue("type", editingIndividualTeacherWork.type)
    setValue("hours", editingIndividualTeacherWork.hours)
  }, [editingIndividualTeacherWork])

  return (
    <form style={{ display: "flex", alignItems: "flex-end", gap: 10 }} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <Stack spacing={1} sx={{ mt: 2, flex: 1 }}>
              <InputLabel htmlFor="name">Вид діяльності*</InputLabel>
              <OutlinedInput {...field} fullWidth id="name" name="name" />
            </Stack>
          )
        }}
      />

      <Controller
        name="hours"
        control={control}
        rules={{ required: true }}
        render={({ field }) => {
          return (
            <Stack spacing={1} sx={{ mt: 2, flex: 1 }}>
              <InputLabel htmlFor="hours">Години*</InputLabel>
              <OutlinedInput {...field} fullWidth id="hours" name="hours" type="number" />
            </Stack>
          )
        }}
      />

      <Controller
        name="type"
        control={control}
        rules={{ required: "Вкажіть категорію" }}
        render={({ field }) => {
          return (
            <Stack spacing={1} sx={{ mt: 2, flex: 1 }}>
              <InputLabel>Категорія*</InputLabel>
              <TextField select {...field} sx={{ "& .MuiInputBase-input": { py: "10.4px", fontSize: "0.875rem" } }}>
                {categoriesTypes.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          )
        }}
      />

      {editingIndividualTeacherWork?.name && (
        <Button
          type="button"
          color="primary"
          variant="outlined"
          disabled={isSubmitting || isSomeFieldIsEmpty}
          onClick={() => setEditingIndividualTeacherWork(initialFormValues)}
          sx={{ textTransform: "capitalize", width: "100%", p: "7.6px 15px", mt: 3, maxWidth: "120px" }}
        >
          Відмінити
        </Button>
      )}

      <Button
        type="submit"
        color="primary"
        variant="contained"
        disabled={isSubmitting || isSomeFieldIsEmpty}
        sx={{ textTransform: "capitalize", p: "8.4px 15px", mt: 3, width: "120px" }}
      >
        {isSubmitting ? (
          <LoadingSpinner size={24.5} disablePadding />
        ) : editingIndividualTeacherWork?.name ? (
          "Оновити"
        ) : (
          "Cтворити"
        )}

        {/* {editingIndividualTeacherWork?.name ? "Оновити" : "Cтворити"} */}
      </Button>
    </form>
  )
}
