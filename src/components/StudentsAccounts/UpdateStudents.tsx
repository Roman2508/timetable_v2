import React from 'react'
import * as XLSX from 'xlsx'
import { SyncOutlined } from '@ant-design/icons'
import { Tooltip, IconButton } from '@mui/material'

import { useAppDispatch } from '../../store/store'
import { updateStudent } from '../../store/students/studentsAsyncActions'

interface IUpdateStudentsProps {}

interface IUpdateStudentDtoType {
  name: string
  login: string
  password: string
  email: string
  status: 'Навчається' | 'Відраховано' | 'Академічна відпустка'
  group: number
  id: number
}

const UpdateStudents: React.FC<IUpdateStudentsProps> = () => {
  const dispatch = useAppDispatch()

  const fileRef = React.useRef<HTMLInputElement | null>(null)
  const [disabledUploadButton, setDisabledUploadButton] = React.useState(false)

  const onClickUpdate = () => {
    if (!fileRef.current) return
    fileRef.current.click()
  }

  const handleChangeUpdate = (e: any) => {
    e.preventDefault()
    const files = (e.target as HTMLInputElement).files
    console.log(files)

    if (!files?.length) return

    const f = files[0]
    const reader = new FileReader()

    reader.onload = function (e) {
      if (e.target === null) return

      const data = e.target.result
      let readedData = XLSX.read(data, { type: 'binary' })
      const wsname = readedData.SheetNames[0]
      const ws = readedData.Sheets[wsname]

      /* Convert array to json*/
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 })

      const students = dataParse
        .map((el, index) => {
          if (index === 0) return

          const element = el as string[]
          const availableStatus = ['Навчається', 'Відраховано', 'Академічна відпустка'] as const
          type availableStatusType = (typeof availableStatus)[number]

          const status = (
            availableStatus.some((el) => el === element[4]) ? element[4] : 'Навчається'
          ) as availableStatusType

          const obj: IUpdateStudentDtoType = {
            name: element[0],
            login: element[1],
            password: element[2],
            email: element[3],
            status,
            group: Number(element[5]),
            id: Number(element[6]),
          }

          return obj
        })
        .filter((el) => !!el)

      Promise.all(
        students.map(async (el) => {
          if (!el) return
          try {
            setDisabledUploadButton(true)
            console.log(el)
            dispatch(updateStudent(el))
          } catch (err) {
            console.log(err)
          } finally {
            setDisabledUploadButton(false)
          }
        })
      )
    }
    reader.readAsBinaryString(f)
    if (!fileRef.current) return
    fileRef.current.value = ''
  }

  return (
    <>
      <input type="file" ref={fileRef} onChange={handleChangeUpdate} style={{ display: 'none' }} />

      <Tooltip title="Оновити інформацію про студентів">
        <IconButton onClick={onClickUpdate} disabled={disabledUploadButton}>
          <SyncOutlined style={{ width: '32px', height: '32px', padding: '6px' }} />
        </IconButton>
      </Tooltip>
    </>
  )
}

export { UpdateStudents }
