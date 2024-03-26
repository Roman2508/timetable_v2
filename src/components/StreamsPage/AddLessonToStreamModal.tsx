import {
  Stack,
  Dialog,
  Button,
  Checkbox,
  FormGroup,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
} from "@mui/material"
import { CloseOutlined } from "@ant-design/icons"
import React, { Dispatch, SetStateAction } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { useAppDispatch } from "../../store/store"
import { StreamsType } from "../../store/streams/streamsTypes"
import { GroupLoadType } from "../../store/groups/groupsTypes"
import { addLessonToStream, deleteLessonFromStream } from "../../store/streams/streamsAsyncActions"
import { isCombinedInStream, isFieldNull } from "../../utils/compateStreamFilelds"

interface IAddLessonToStreamModalProps {
  open: boolean
  selectedStream: null | StreamsType
  selectedLessons: GroupLoadType[][]
  setOpen: Dispatch<SetStateAction<boolean>>
}

interface IFormFields {
  lectures: boolean
  practical: boolean
  laboratory: boolean
  seminars: boolean
  exams: boolean
}

interface IinitialFormValues {
  label: "Лекції" | "Практичні" | "Лабораторні" | "Семінари" | "Екзамени"
  value: "lectures" | "practical" | "laboratory" | "seminars" | "exams"
  isChecked: boolean
  isDisabled: boolean
}

const initialFormValues: IinitialFormValues[] = [
  { label: "Лекції", value: "lectures", isChecked: false, isDisabled: false },
  { label: "Практичні", value: "practical", isChecked: false, isDisabled: false },
  { label: "Лабораторні", value: "laboratory", isChecked: false, isDisabled: false },
  { label: "Семінари", value: "seminars", isChecked: false, isDisabled: true },
  { label: "Екзамени", value: "exams", isChecked: false, isDisabled: false },
]

const AddLessonToStreamModal: React.FC<IAddLessonToStreamModalProps> = ({
  open,
  setOpen,
  selectedStream,
  selectedLessons,
}) => {
  const dispatch = useAppDispatch()

  const [formData, setFormData] = React.useState(initialFormValues)

  const {
    reset,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<IFormFields>({
    mode: "onBlur",
    // defaultValues: editingTeacher
    //   ? { ...editingTeacher, category: editingTeacher.category.id }
    //   : {},
  })

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      if (!selectedStream) return
      const allLessonkeys = Object.keys(data) as IinitialFormValues["value"][]

      const combinedLessonKeys = allLessonkeys.filter((k) => typeof data[k] === "boolean")

      const lessonsIds = selectedLessons.map((el) => {
        const l = el.filter((l) => {
          return combinedLessonKeys.some((s) => s === l.typeEn)
        })
        return l[0]?.id
      })

      combinedLessonKeys.map(async (k) => {
        if (data[k]) {
          // data[k] === true = дисципліна об'єднана в потік
          const payload = {
            streamId: selectedStream.id,
            lessonsIds: lessonsIds,
          }

          await dispatch(addLessonToStream(payload))
        } else {
          // data[k] !== true = дисципліна НЕ об'єднана в потік
          const payload = {
            typeEn: k,
            streamId: selectedStream.id,
            name: selectedLessons[0][0].name,
            hours: selectedLessons[0][0].hours,
            semester: selectedLessons[0][0].semester,
            subgroupNumber: selectedLessons[0][0].subgroupNumber,
          }

          await dispatch(deleteLessonFromStream(payload))
          /* 
            name: string
            hours: number
            typeEn: string
            semester: number
            streamId: number
            subgroupNumber: number
          */
        }
      })

      console.log(combinedLessonKeys)
    } catch (error) {
      console.error(error)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  React.useEffect(() => {
    setFormData((prev) => {
      const newFormData = prev.map((el) => {
        const isDisabled = isFieldNull(selectedLessons, el.value)
        const isChecked = isCombinedInStream(selectedLessons, el.value)

        return { ...el, isDisabled, isChecked }
      })

      return newFormData
    })
  }, [selectedLessons])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <DialogTitle id="alert-dialog-title">{"Об'єднати в потік"}</DialogTitle>

        <IconButton sx={{ mt: 1, mr: 1 }} onClick={handleClose}>
          <CloseOutlined />
        </IconButton>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ padding: "0 24px 20px" }}>
          <FormGroup>
            {formData.map((el) => (
              <Controller
                key={el.value}
                name={el.value}
                control={control}
                render={({ field }) => {
                  return (
                    <Stack spacing={1}>
                      <FormControlLabel
                        disabled={el.isDisabled}
                        control={<Checkbox defaultChecked={el.isChecked} />}
                        label={el.label}
                        {...field}
                      />
                    </Stack>
                  )
                }}
              />
            ))}
          </FormGroup>
        </DialogContent>

        <DialogActions>
          <Button type="submit" disabled={isSubmitting} variant="contained">
            Зберегти
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export { AddLessonToStreamModal }

/* 
const selectedLessons = [
  [
    {
      group: { id: 9, name: 'PH11-23-1' },
      hours: 12,
      id: 114,
      name: 'Інформаційні технології в фармації',
      planSubjectId: { id: 21 },
      semester: 2,
      specialization: null,
      stream: null,
      students: 32,
      subgroupNumber: null,
      teacher: null,
      typeEn: 'lectures',
      typeRu: 'ЛК',
    },
    {
      group: { id: 9, name: 'PH11-23-1' },
      hours: 18,
      id: 115,
      name: 'Інформаційні технології в фармації',
      planSubjectId: { id: 21 },
      semester: 2,
      specialization: null,
      stream: null,
      students: 32,
      subgroupNumber: null,
      teacher: null,
      typeEn: 'practical',
      typeRu: 'ПЗ',
    },
  ],
  [
    {
      group: { id: 7, name: 'PH9-24-1' },
      hours: 12,
      id: 147,
      name: 'Інформаційні технології в фармації',
      planSubjectId: { id: 21 },
      semester: 2,
      specialization: 'test',
      stream: null,
      students: 25,
      subgroupNumber: 2,
      teacher: null,
      typeEn: 'lectures',
      typeRu: 'ЛК',
    },
  ],
  [
    {
      group: { id: 8, name: 'PH911-24-1' },
      hours: 12,
      id: 147,
      name: 'Інформаційні технології в фармації',
      planSubjectId: { id: 21 },
      semester: 2,
      specialization: 'test',
      stream: null,
      students: 25,
      subgroupNumber: 1,
      teacher: null,
      typeEn: 'lectures',
      typeRu: 'ЛК',
    },
  ],
];

export const convertLessonsForCompare = lessons => {
  const allLessonsArr = lessons.map(lesson => {
    let result = {
      name: '',
      semester: 0,
      stream: null,
      specialization: null,
      subgroupNumber: null,
      //
      lectures: null,
      practical: null,
      laboratory: null,
      seminars: null,
      exams: null,
    };

    lesson.forEach(el => {
      result = {
        ...result,
        name: el.name,
        stream: el.stream,
        semester: el.semester,
        specialization: el.specialization,
        subgroupNumber: el.subgroupNumber,
        [el.typeEn]: el.hours,
      };
    });

    return result;
  });

  return allLessonsArr;
};

const a = convertLessonsForCompare(selectedLessons);

export const areAllFieldsInStreamEqual = lessons => {
  const allLessonsArr = convertLessonsForCompare(lessons);

  if (allLessonsArr.length === 0) {
    return false; // Пустий масив
  }

  const sampleObject = allLessonsArr[0];
  for (let i = 1; i < allLessonsArr.length; i++) {
    const currentObject = allLessonsArr[i];
    for (const _key in sampleObject) {
      let key = _key;

      if (Object.hasOwnProperty.call(sampleObject, key)) {
        if (key === 'subgroupNumber' || key === 'specialization') {
          if (
            (sampleObject[key] !== null) !== (currentObject[key] !== null) ||
            typeof sampleObject[key] !== typeof currentObject[key]
          ) {
            return false; // Значення поля subgroupNumber не співпадають
          }
        }
        // else if (key === 'stream') {
        //   return (
        //     sampleObject.stream === currentObject.stream ||
        //     sampleObject.stream?.id === currentObject.stream?.id
        //   );
        // }
        else if (sampleObject[key] !== currentObject[key]) {
          return false; // Значення інших полів не співпадають
        }
      }
    }
  }
  return true; // Усі поля однакові
};

console.log(areAllFieldsInStreamEqual(selectedLessons));


*/
