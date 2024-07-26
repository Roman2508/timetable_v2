import React from 'react'
import { Button } from '@mui/material'
import { OutputBlockData } from '@editorjs/editorjs'

import Editor from './Editor'

const initialData = [
  {
    id: 'gYuJj9fa_2',
    type: 'list',
    data: {
      style: 'ordered',
      items: [
        'Пташник Р. Фінансування STARTUPS. Студентські наукові читання -&nbsp;2019&nbsp;: матеріали конференції першого туру Всеукраїнського конкурсу&nbsp;студентських наукових робіт на факультетах обліку та фінансів і економіки&nbsp;та менеджменту Житомирського національного агроекологічного&nbsp;університету, 20 листопада 2019 р. Житомир:&nbsp;ЖНАЕУ, 2019. С. 65-68.',
        'Пташник Р. В. Цифрова обробка зображень за допомогою штучного інтелекту. Тези доповідей ІV Всеукраїнської науково-практичної інтернет- конференції здобувачів вищої освіти і молодих учених «Інформаційно- комп’ютерні технології: стан, досягнення та перспективи розвитку», м.Житомир, 25-26 листопада 2021 р.– Житомир: Житомирська політехніка, 2021. С. 17-18.',
      ],
    },
  },
]

const PrintedWorksTab = () => {
  const [blocks, setBlocks] = React.useState<OutputBlockData<string, any>[]>(initialData)

  const onSubmit = async () => {
    console.log(blocks)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 50px)' }}>
      <div style={{ flex: 1 }}>
        <Editor blocks={blocks} setBlocks={setBlocks} />
      </div>

      <div style={{ textAlign: 'center' }}>
        <Button
          fullWidth
          color="primary"
          onClick={onSubmit}
          variant="contained"
          sx={{ maxWidth: '84%' }}
          disabled={!blocks.length}
        >
          Зберегти
        </Button>
      </div>
    </div>
  )
}

export default PrintedWorksTab
