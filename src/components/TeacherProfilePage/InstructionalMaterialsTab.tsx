import {
  Table,
  Select,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  IconButton,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons"

import { useAppDispatch } from "../../store/store"
import { GroupLoadType } from "../../store/groups/groupsTypes"
import { teacherProfileSelector } from "../../store/teacherProfile/teacherProfileSlice"
import { findAllTeacherLessonsById } from "../../store/teacherProfile/teacherProfileAsyncActions"
import EmptyCard from "../EmptyCard/EmptyCard"
import { InstructionalMaterialsModal } from "./InstructionalMaterialsModal"

interface Props {}

interface IFilter {
  ["1"]: GroupLoadType[]
  ["2"]: GroupLoadType[]
}

function createData(id: number, name: string, hours: number) {
  return { id, name, hours }
}

const rows = [
  createData(1, "Інформація, інформаційні технології та людина в інформаційному суспільстві", 2),
  createData(3, "Інформаційна безпека та основи кібергігієни", 2),
  createData(7, "Цифрове навчання та комп’ютерно-орієнтовані засоби навчальної діяльності", 2),
  createData(4, "Сучасні інформаційні технології та їх вплив на суспільство", 2),
  createData(9, "Сучасні інформаційні технології та їх вплив на суспільство", 2),
  createData(6, "Комп’ютерне моделювання та комп'ютерний експеримент", 2),
]

export const InstructionalMaterialsTab = React.memo(({}: Props) => {
  const dispatch = useAppDispatch()

  const { filterLesson, instructionalMaterials } = useSelector(teacherProfileSelector)

  const [semester, setSemester] = React.useState(1)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [filter, setFilter] = React.useState<IFilter>({ ["1"]: [], ["2"]: [] })
  const [selectedLesson, setSelectedLesson] = React.useState<GroupLoadType | null>(null)

  const handleChangeSelectedLesson = (id: number) => {
    if (!filterLesson) return
    const lesson = filterLesson.find((el) => el.id === id)
    if (lesson) setSelectedLesson(lesson)
  }

  React.useEffect(() => {
    dispatch(findAllTeacherLessonsById(14))
  }, [])

  React.useEffect(() => {
    if (!filterLesson) return

    filterLesson.forEach((el) => {
      if (el.semester === 1 || el.semester === 3 || el.semester === 5) {
        setFilter((prev) => ({ ["1"]: [...prev["1"], el], ["2"]: [...prev["2"]] }))
        return
      }

      setFilter((prev) => ({ ["1"]: [...prev["1"]], ["2"]: [...prev["2"], el] }))
    })
  }, [filterLesson])

  return (
    <>
      <InstructionalMaterialsModal open={isModalOpen} setOpen={setIsModalOpen} selectedLesson={selectedLesson} />

      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel sx={{ overflow: "visible !important" }}>Семестр</InputLabel>
          <Select onChange={(e) => setSemester(Number(e.target.value))} value={semester}>
            {[1, 2].map((el) => (
              <MenuItem value={el}>{el}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3, ml: 2 }}>
          <InputLabel sx={{ overflow: "visible !important" }}>Дисципліна</InputLabel>
          <Select
            value={selectedLesson ? selectedLesson.id : ""}
            onChange={(e) => handleChangeSelectedLesson(Number(e.target.value))}
          >
            {/* @ts-ignore */}
            {(filterLesson ? filter[semester] : []).map((el: GroupLoadType) => (
              <MenuItem value={el.id}>{`${el.group.name} / ${el.typeRu} / ${el.name}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Divider sx={{ mb: 3 }} />

      {!selectedLesson ? (
        <EmptyCard text="Виберіть дисципліну" />
      ) : (
        <Table sx={{ minWidth: 450, mb: 10 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "50px", padding: "0px 6px" }} align="center">
                №
              </TableCell>
              <TableCell>Тема</TableCell>
              <TableCell align="center" sx={{ width: "50px" }}>
                Години
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Array(selectedLesson ? selectedLesson.hours : 0)
              .fill(null)
              .map((_, i) => {
                const lesson = rows.find((el) => el.id === i + 1)

                return (
                  <TableRow key={i}>
                    <TableCell component="th" align="center" sx={{ width: "50px", height: "48px", padding: "0px 6px" }}>
                      {i + 1}
                    </TableCell>

                    <TableCell
                      align="left"
                      sx={{
                        height: "48px",
                        display: "flex",
                        padding: "0px 6px",
                        alignItems: "center",
                        "&:hover span": { display: "inline-block !important" },
                      }}
                    >
                      <Typography style={{ flexGrow: 1, margin: 0 }}>{lesson?.name}</Typography>

                      <IconButton
                        onClick={() => {
                          if (!lesson) return
                          setSelectedLesson(lesson)
                          setIsModalOpen(true)
                        }}
                      >
                        <EditOutlined style={{ display: "none", cursor: "pointer" }} />
                      </IconButton>
                    </TableCell>
                    <TableCell>{lesson ? lesson.hours : "-"}</TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      )}
    </>
  )
})
