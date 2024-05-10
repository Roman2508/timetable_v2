import React from 'react'
import * as XLSX from 'xlsx'
import { UploadOutlined } from '@ant-design/icons'
import { Tooltip, IconButton } from '@mui/material'

const UploadStudents = () => {
  const fileRef = React.useRef<HTMLInputElement | null>(null)

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

          const obj = {
            name: element[0] || 0,
            login: element[1] || '-',
            password: element[2] || '-',
            email: element[3] || '-',
            group: element[4] || '-',
          }

          return obj
        })
        .filter((el) => !!el)

      console.log(newStudents)

      //   Promise.all(
      //     newStudents.map(async (el: any) => {
      //       try {
      //         setButtonDisabled((prev) => ({ ...prev, uploadPharmacies: true }))
      //         await gql.CreatePharmacy(el)
      //         setAlert({
      //           isShow: true,
      //           message: 'Бази практик успішно завантажені',
      //           severity: 'success',
      //         })
      //       } catch (err) {
      //         setAlert({
      //           isShow: true,
      //           message: 'Помилка при завантажені баз практик',
      //           severity: 'error',
      //         })
      //         console.log(err)
      //       } finally {
      //         setButtonDisabled((prev) => ({ ...prev, uploadPharmacies: false }))
      //         setTimeout(() => {
      //           setAlert((prev) => ({ ...prev, isShow: false }))
      //         }, 3000)
      //       }
      //     })
      //   )
    }
    reader.readAsBinaryString(f)
  }

  return (
    <div style={{ position: 'absolute', top: '-6px', right: 0 }}>
      <input type="file" ref={fileRef} onChange={handleChangeUpload} style={{ display: 'none' }} />
      <Tooltip title="Завантажити студентів">
        <IconButton onClick={onClickUpload}>
          <UploadOutlined style={{ width: '32px', height: '32px', padding: '6px' }} />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export { UploadStudents }
