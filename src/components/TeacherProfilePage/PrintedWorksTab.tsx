import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Typography } from '@mui/material'
import { OutputBlockData } from '@editorjs/editorjs'

import Editor from './Editor'
import { useAppDispatch } from '../../store/store'
import { UserRoles } from '../../store/auth/authTypes'
import { authSelector } from '../../store/auth/authSlice'
import { EditorJSItemType } from '../../store/teachers/teachersTypes'
import { updateTeacherPrintedWorks } from '../../store/auth/authAsyncActions'

// const initialData = [
//   {
//     id: 'gYuJj9fa_2',
//     type: 'list',
//     data: {
//       style: 'ordered',
//       items: [
//         'Пташник Р. Фінансування STARTUPS. Студентські наукові читання -&nbsp;2019&nbsp;: матеріали конференції першого туру Всеукраїнського конкурсу&nbsp;студентських наукових робіт на факультетах обліку та фінансів і економіки&nbsp;та менеджменту Житомирського національного агроекологічного&nbsp;університету, 20 листопада 2019 р. Житомир:&nbsp;ЖНАЕУ, 2019. С. 65-68.',
//         'Пташник Р. В. Цифрова обробка зображень за допомогою штучного інтелекту. Тези доповідей ІV Всеукраїнської науково-практичної інтернет- конференції здобувачів вищої освіти і молодих учених «Інформаційно- комп’ютерні технології: стан, досягнення та перспективи розвитку», м.Житомир, 25-26 листопада 2021 р.– Житомир: Житомирська політехніка, 2021. С. 17-18.',
//       ],
//     },
//   },
// ]

const PrintedWorksTab = () => {
  const dispatch = useAppDispatch()

  const { user } = useSelector(authSelector)

  const [isFetching, setIsFetching] = React.useState(false)
  const [blocks, setBlocks] = React.useState<EditorJSItemType[]>([])
  // const [blocks, setBlocks] = React.useState<OutputBlockData<string, any>[]>(initialData)

  const onSubmit = async () => {
    if (!user || !user.teacher) return
    try {
      setIsFetching(true)
      await dispatch(updateTeacherPrintedWorks({ id: user.teacher.id, data: blocks }))
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetching(false)
    }
  }

  React.useEffect(() => {
    if (user && user.role.includes(UserRoles.TEACHER) && user.teacher) {
      setBlocks(user.teacher.printedWorks)
    }
  }, [user])

  if (user && user.role.includes(UserRoles.TEACHER)) {
    return (
      <Typography align="center" sx={{ mt: 1 }}>
        Сторінка доступна лише викладачам!
      </Typography>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 50px)' }}>
      <div style={{ flex: 1 }}>
        <Editor blocks={user?.teacher?.printedWorks || []} setBlocks={setBlocks} />
      </div>

      <div style={{ textAlign: 'center' }}>
        <Button
          fullWidth
          color="primary"
          onClick={onSubmit}
          variant="contained"
          sx={{ maxWidth: '84%' }}
          disabled={!blocks.length || isFetching}
        >
          {isFetching ? 'Завантаження...' : 'Зберегти'}
        </Button>
      </div>
    </div>
  )
}

export default PrintedWorksTab
