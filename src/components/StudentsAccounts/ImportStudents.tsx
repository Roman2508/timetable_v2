import React from 'react'
import * as XLSX from 'xlsx'
import { Tooltip, IconButton } from '@mui/material'
import { QuestionOutlined, UploadOutlined } from '@ant-design/icons'

import { useAppDispatch } from '../../store/store'
import { CreateStudentsPayloadType } from '../../api/apiTypes'
import { createStudent } from '../../store/students/studentsAsyncActions'

interface IImportStudentsProps {
  setHelperModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ImportStudents: React.FC<IImportStudentsProps> = ({ setHelperModalVisible }) => {
  const dispatch = useAppDispatch()

  const fileRef = React.useRef<HTMLInputElement | null>(null)
  const [disabledUploadButton, setDisabledUploadButton] = React.useState(false)

  const onClickUpload = () => {
    if (!fileRef.current) return
    fileRef.current.click()
  }

  const handleChangeUpload = (e: any /* Event */) => {
    e.preventDefault()

    const files = (e.target as HTMLInputElement).files

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

      const newStudents = dataParse
        .map((el, index) => {
          if (index === 0) return

          const element = el as string[]

          const obj: CreateStudentsPayloadType = {
            name: element[0],
            login: element[1],
            password: element[2],
            email: element[3],
            group: element[4],
          }

          return obj
        })
        .filter((el) => !!el)

      Promise.all(
        newStudents.map(async (el) => {
          if (!el) return
          try {
            setDisabledUploadButton(true)
            dispatch(createStudent(el))
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
      <input type="file" ref={fileRef} onChange={handleChangeUpload} style={{ display: 'none' }} />
      <Tooltip title="В якому форматі має бути Excel файл?">
        <IconButton onClick={() => setHelperModalVisible(true)}>
          <QuestionOutlined style={{ width: '32px', height: '32px', padding: '6px' }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Імпортувати студентів">
        <IconButton onClick={onClickUpload} disabled={disabledUploadButton}>
          <UploadOutlined style={{ width: '32px', height: '32px', padding: '6px' }} />
        </IconButton>
      </Tooltip>
    </>
  )
}

export { ImportStudents }
