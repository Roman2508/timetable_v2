import React from 'react'
import { useSelector } from 'react-redux'
import { EditOutlined } from '@ant-design/icons'
import { Chip, Divider, Checkbox, TextField, Typography, IconButton, FormControlLabel } from '@mui/material'

import { CustomDatePicker } from '../../CustomDatePicker'
import { menuSelector } from '../../../store/menu/menuSlice'
import { IFormState, IndividualTeacherWorkForm } from './IndividualTeacherWorkForm'
import { UseFormSetValue } from 'react-hook-form'

/* 
individual-teacher-work
{
  id: number
  name: string
  type: 'Методична робота' | 'Наукова робота' | 'Організаційна робота'
  hours: number
  date: string
  description: string
}

teacher-report
{
  id: number
  name: string
  type: 'Методична робота' | 'Наукова робота' | 'Організаційна робота'
  hours: number
  status: boolean
  doneDate: string
  plannedDate: string
  description: string
  files: string[] // string це посилання на google drive
}
*/

const data = [
  {
    id: 1,
    name: 'Методична робота',
    items: [
      { id: 1, name: 'Створення силабуса навчальної дисципліни', hours: 50, description: '' },
      { id: 2, name: 'Складання завдання для поточного тестового контролю (розділ)', hours: 50, description: '' },
      { id: 3, name: 'Складання зібрника тестових завдань з дисципліни', hours: 50, description: '' },
      {
        id: 4,
        name: 'Складання завдань для вхідного контролю знань студентів заочної форми навчання (вперше за новою робочою програмою)',
        hours: 50,
        description: '',
      },
      { id: 5, name: 'Підготовка відеоматеріалу для використання на навчальному занятті', hours: 50, description: '' },
      { id: 6, name: 'Створення щоденника-звіту з практики', hours: 50, description: '' },
    ],
  },
  {
    id: 2,
    name: 'Наукова робота',
    items: [
      { id: 1, name: 'Участь в організації викладацької конференції', hours: 50, description: '' },
      { id: 2, name: 'Керівництво пошуково-дослідною роботою студента', hours: 50, description: '' },
      {
        id: 3,
        name: 'Написання конкурсної роботи для представлення на обласному, регіональному рівні',
        hours: 50,
        description: '',
      },
      { id: 4, name: 'Участь у коледжній науково-методичній виставці', hours: 50, description: '' },
      { id: 5, name: "Участь у роботі обласного методичного об'єднання без доповіді", hours: 50, description: '' },
      { id: 6, name: 'Підготовка доповіді на засідання ЦК', hours: 50, description: '' },
    ],
  },
  {
    id: 3,
    name: 'Організаційна робота',
    items: [
      { id: 1, name: 'Оформлення паспорту кабінета', hours: 50, description: '' },
      { id: 2, name: 'Організація проведення заходів, свят, концертів коледжного рівня', hours: 50, description: '' },
      { id: 3, name: 'Складання плану роботи кабінету', hours: 50, description: '' },
      { id: 4, name: 'Участь у виховній роботі студентського колективу', hours: 50, description: '' },
      { id: 5, name: 'Участь у профорієнтаційній роботі', hours: 50, description: '' },
      {
        id: 6,
        name: 'Діяльність як члена атестаційної комісії викладачів ( І рівня та/або ІІ рівня)',
        hours: 50,
        description: '',
      },
    ],
  },
] as const

const IndividualTeacherWorkPlan = () => {
  const { drawerOpen } = useSelector(menuSelector)

  const [checked, setChecked] = React.useState<string[]>([])
  const [editingIndividualTeacherWork, setEditingIndividualTeacherWork] = React.useState<IFormState | null>(null)

  const handleCheckedChange = (name: string) => {
    setChecked((prev) => {
      const isExist = prev.find((el) => el === name)

      if (isExist) {
        return prev.filter((el) => el !== name)
      }

      return [...prev, name]
    })
  }

  const onEditIndividualTeacherWork = (values: IFormState) => {
    setEditingIndividualTeacherWork(values)
    window.scrollTo(0, 0)
  }

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          right: 0,
          bottom: 0,
          zIndex: '99',
          position: 'fixed',
          textAlign: 'center',
          left: drawerOpen ? 260 : 0,
        }}
      >
        <Typography
          variant="h5"
          style={{
            width: '100%',
            padding: '16px',
            background: '#fff',
            display: 'inline-block',
            maxWidth: drawerOpen ? '1620px' : '1770px',
          }}
        >
          Заплановано на навчальний рік 0 годин.
        </Typography>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <IndividualTeacherWorkForm
          editingIndividualTeacherWork={editingIndividualTeacherWork}
          setEditingIndividualTeacherWork={setEditingIndividualTeacherWork}
        />
      </div>

      {data.map((category) => (
        <div key={category.id}>
          <Divider>
            <Chip label={category.name} size="medium" />
          </Divider>

          {category.items.map((el) => {
            const isChecked = checked.find((item) => item === el.name)

            return (
              <div key={el.id} style={{ padding: '16px', border: '1px solid #f0f0f0', margin: '10px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <FormControlLabel
                      label={el.name}
                      sx={{ userSelect: 'none' }}
                      control={
                        <Checkbox
                          onChange={() => handleCheckedChange(el.name)}
                          value={Boolean(isChecked)}
                          checked={Boolean(isChecked)}
                        />
                      }
                    />

                    <Chip label={el.hours} sx={{ userSelect: 'none' }} size="small" variant="outlined" />
                  </div>

                  <IconButton
                    onClick={() =>
                      onEditIndividualTeacherWork({
                        name: el.name,
                        hours: el.hours,
                        category: category.name,
                      })
                    }
                  >
                    <EditOutlined />
                  </IconButton>
                </div>

                {isChecked && (
                  <div style={{ display: 'flex' }}>
                    <CustomDatePicker
                      //   value={}
                      sx={{
                        mr: 2,
                        paddingTop: '0 !important',
                        '& .MuiTextField-root': { minWidth: '130px', maxWidth: '130px' },
                        '& .MuiInputBase-root': { height: '41px !important' },
                        // '& fieldset': { border: 0 },
                      }}
                      setValue={(e) => console.log('firstSemesterEnd', e)}
                    />

                    <TextField
                      fullWidth
                      id="category"
                      placeholder="Зміст роботи"
                      sx={{ '& .MuiInputBase-input': { py: '10.51px' } }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))}

      <br />
      <br />
    </div>
  )
}

export default IndividualTeacherWorkPlan
