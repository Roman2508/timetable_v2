import React from 'react'
import Editor from './Editor'
import { useSelector } from 'react-redux'
import { Button, Typography } from '@mui/material'

import { useAppDispatch } from '../../store/store'
import { OutputBlockData } from '@editorjs/editorjs'
import { UserRoles } from '../../store/auth/authTypes'
import { authSelector } from '../../store/auth/authSlice'
import { updateTeacherBio } from '../../store/auth/authAsyncActions'
import { EditorJSItemType } from '../../store/teachers/teachersTypes'

const initialData = [
  {
    id: 'DLfwcvbMxZ',
    type: 'paragraph',
    data: {
      text: '<b>Біографія:</b>',
    },
  },
  {
    id: '6EzIedeCpt',
    type: 'paragraph',
    data: {
      text: 'народився 25 серпня 1999 року в м.Андрушівка Житомирської області. З 2006 року по 2016 рік навчався в ЗОШ №1 м.Андрушівка. В 2018 році закінчив Житомирський кооперативний коледж бізнесу та права. У 2021 році закінчив факультет інформаційно-комп\'ютерних технологій Державного університету "Житомирська політехніка" і отримав диплом магістра з інженерії програмного забезпечення. З серпня 2019 року по серпень 2022 року працював на посаді фахівця навчально-наукового центру організації освітнього процесу в Поліському національному університеті.',
    },
  },
  {
    id: '-VjvRtkVaH',
    type: 'paragraph',
    data: {
      text: '<b>Початок роботи в коледжі:</b>',
    },
  },
  {
    id: 'e6Ne1p26zn',
    type: 'paragraph',
    data: {
      text: 'з серпня 2022 року.',
    },
  },
  {
    id: 'llD1MhNl0o',
    type: 'paragraph',
    data: {
      text: '<b>Наукові інтереси та досягнення:&nbsp;</b>',
    },
  },
  {
    id: 'uNvC-ufKsM',
    type: 'paragraph',
    data: {
      text: "комп'ютерне програмування",
    },
  },
]

const GeneralInfoTab = () => {
  const dispatch = useAppDispatch()

  const { user } = useSelector(authSelector)

  const [isFetching, setIsFetching] = React.useState(false)
  const [blocks, setBlocks] = React.useState<EditorJSItemType[]>([])
  // const [blocks, setBlocks] = React.useState<OutputBlockData<string, any>[]>(initialData)

  const onSubmit = async () => {
    if (!user || !user.teacher) return
    try {
      setIsFetching(true)
      await dispatch(updateTeacherBio({ id: user.teacher.id, data: blocks }))
    } catch (error) {
      console.log(error)
    } finally {
      setIsFetching(false)
    }
  }

  React.useEffect(() => {
    if (user && user.role === UserRoles.TEACHER && user.teacher) {
      setBlocks(user.teacher.bio)
    }
  }, [user])

  if (user && user.role !== UserRoles.TEACHER) {
    return (
      <Typography align="center" sx={{ mt: 1 }}>
        Сторінка доступна лише викладачам!
      </Typography>
    )
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 50px)' }}>
        <div style={{ flex: 1 }}>
          <Editor blocks={user?.teacher?.bio || []} setBlocks={setBlocks} />
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
      {/* <b>Біографія:</b>
      <p style={{ marginTop: 0 }}>
        народився 25 серпня 1999 року в м.Андрушівка Житомирської області. З 2006 року по 2016 рік навчався в ЗОШ №1
        м.Андрушівка. В 2018 році закінчив Житомирський кооперативний коледж бізнесу та права. У 2021 році закінчив
        факультет інформаційно-комп'ютерних технологій Державного університету "Житомирська політехніка" і отримав
        диплом магістра з інженерії програмного забезпечення. З серпня 2019 року по серпень 2022 року працював на посаді
        фахівця навчально-наукового центру організації освітнього процесу в Поліському національному університеті.
      </p>
      <b>Початок роботи в коледжі:</b>
      <p style={{ marginTop: 0 }}>з серпня 2022 року.</p>
      <b>Наукові інтереси та досягнення:</b> <p style={{ marginTop: 0 }}>комп'ютерне програмування</p> */}
    </>
  )
}

export default GeneralInfoTab
