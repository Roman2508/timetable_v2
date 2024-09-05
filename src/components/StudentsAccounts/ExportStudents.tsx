import React from 'react'
import * as XLSX from 'xlsx'
import { toast } from 'sonner'
import { IconButton, Tooltip } from '@mui/material'
import { CloudUploadOutlined, DownloadOutlined, ImportOutlined } from '@ant-design/icons'

import { useAppDispatch } from '../../store/store'
import { StudentType } from '../../store/students/studentsTypes'
import { getStudentsByGroupId } from '../../store/students/studentsAsyncActions'

interface IExportStudentsProps {
  groupId: number | undefined
}

const ExportStudents: React.FC<IExportStudentsProps> = ({ groupId }) => {
  const [isDisabled, setIsDisabled] = React.useState(false)

  const dispatch = useAppDispatch()

  const fetchData = async () => {
    try {
      if (!groupId) {
        toast.warning('Групу не вибрано')
        return
      }

      setIsDisabled(true)

      const { payload } = await dispatch(getStudentsByGroupId(groupId))
      const students = payload as StudentType[]

      if (!students.length) {
        toast.warning('Облікові записи не знайдено')
        return
      }

      const newData = students.map((student) => {
        const { name, login, email, password, status, group } = student

        return {
          ['Name [Required]']: name,
          ['login [Required]']: login,
          ['Password [Required]']: password,
          ['Email Address [Required]']: email,
          ['Status [Required]']: status,
          ['Group ID [Required]']: group.id,
        }
      })

      return newData.filter((el) => !!Object.keys(el).length)
    } catch (error) {
      console.log(error)
    } finally {
      setIsDisabled(false)
    }
  }

  const handleExportFile = async () => {
    const wb = XLSX.utils.book_new()

    const data = (await fetchData()) as any[]

    const ws = XLSX.utils.json_to_sheet(data)

    let newObj: any = {}

    // Видаляю всі undefined з об`єкта
    for (var k in newObj) {
      if (!newObj[k]) {
        delete newObj[k]
      }
    }

    XLSX.utils.book_append_sheet(wb, ws, 'Лист 1')
    XLSX.writeFile(wb, 'students.xlsx')
  }

  return (
    <Tooltip title="Експортувати студентів в XLSX">
      <IconButton onClick={handleExportFile} disabled={isDisabled}>
        <ImportOutlined style={{ width: '32px', height: '32px', padding: '6px' }} />
      </IconButton>
    </Tooltip>
  )
}

export default ExportStudents
