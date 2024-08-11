import React from "react"
import * as XLSX from "xlsx"
import { Button } from "@mui/material"
import { InstructionalMaterialsType } from "../../../store/teacherProfile/teacherProfileTypes"

type Props = {
  instructionalMaterials: InstructionalMaterialsType[] | null
}

const ExportLessonThemes: React.FC<Props> = ({ instructionalMaterials }) => {
  const handleExport = () => {
    if (!instructionalMaterials) return

    const themes = instructionalMaterials.map((el) => {
      return {
        lessonNumber: el.lessonNumber,
        lessonName: el.name,
      }
    })

    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(themes)

    let newObj: any = {}

    // Зміщую всі рядки на 1 вверх, щоб прибрати шапку таблиці
    for (var k in ws) {
      if (k !== "!ref") {
        const rowNum = k.length === 2 ? k[1] : k.length === 3 ? `${k[1]}${k[2]}` : `${k[1]}${k[2]}${k[3]}`

        newObj[`${k[0]}${rowNum}`] = ws[`${k[0]}${Number(rowNum) + 1}`]
      } else {
        newObj["!ref"] = ws["!ref"]
      }
    }

    // Видаляю всі undefined з об`єкта
    for (var k in newObj) {
      if (!newObj[k]) {
        delete newObj[k]
      }
    }

    XLSX.utils.book_append_sheet(wb, newObj, "Лист 1")
    XLSX.writeFile(wb, `${instructionalMaterials[0].lesson.name}.xlsx`)
  }

  return (
    <Button
      variant="outlined"
      onClick={handleExport}
      disabled={!instructionalMaterials}
      style={{ textTransform: "initial", whiteSpace: "nowrap", padding: "7.32px 15px" }}
    >
      Експортувати теми
    </Button>
  )
}

export default ExportLessonThemes
