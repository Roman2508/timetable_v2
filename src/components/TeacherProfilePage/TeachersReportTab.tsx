import {
  Chip,
  Stack,
  Button,
  Divider,
  Accordion,
  InputLabel,
  OutlinedInput,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  TextareaAutosize,
} from '@mui/material'
import React from 'react'
import { DownOutlined } from '@ant-design/icons'
import { CustomDatePicker } from '../CustomDatePicker'

function createData(
  id: number,
  name: string,
  description: string,
  hours: number,
  plannedDate: string,
  doneDate: string,
  status: boolean
) {
  return { id, name, description, hours, plannedDate, doneDate, status }
}

const data = [
  createData(
    1,
    'Написання конкурсної роботи для представлення на обласному, регіональному рівні',
    '',
    50,
    '30.06.2024',
    '30.06.2024',
    false
  ),
  createData(2, 'Участь у коледжній науково-методичній виставці', '', 50, '30.06.2024', '30.06.2024', true),
  createData(
    3,
    'Діяльність як члена атестаційної комісії викладачів ( І рівня та/або ІІ рівня)',
    '',
    50,
    '30.06.2024',
    '30.06.2024',
    true
  ),
  createData(4, 'Підготовка доповіді на засідання ЦК', '', 50, '30.06.2024', '30.06.2024', false),
  createData(
    5,
    'Організація проведення заходів, свят, концертів коледжного рівня',
    '',
    50,
    '30.06.2024',
    '30.06.2024',
    false
  ),
  createData(6, 'Складання плану роботи кабінету', '', 50, '30.06.2024', '30.06.2024', true),
]

interface Props {}

const TeachersReportTab: React.FC<Props> = (props) => {
  const {} = props

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ marginBottom: '30px' }}>
        <Button variant="outlined" sx={{ mr: 1 }} style={{ textTransform: 'initial' }}>
          Експортувати звіт в PDF
        </Button>

        <Button variant="outlined" style={{ textTransform: 'initial' }}>
          Експортувати звіт в WORD
        </Button>
      </div>

      {data.map((el) => {
        return (
          <Accordion
            key={el.id}
            sx={{
              '&.Mui-expanded': { /* margin: "32px 0 !important" */ background: 'white' },
              '&.Mui-expanded .MuiAccordionSummary-root': {
                /* margin: "32px 0 !important" */ background: '#fafafb',
              },
            }}
          >
            <AccordionSummary expandIcon={<DownOutlined />} sx={{ fontWeight: 600 }}>
              {el.name}
              <Chip
                size="small"
                variant="outlined"
                label={el.status ? 'Виконано' : 'Не виконано'}
                color={el.status ? 'primary' : 'error'}
                sx={{ width: '106px', ml: 'auto', mr: 2 }}
              />
            </AccordionSummary>

            <Divider />

            <AccordionDetails>
              <div style={{ marginBottom: '30px', display: 'flex', gap: 14 }}>
                <Stack spacing={1} sx={{ flex: 1 }}>
                  <InputLabel htmlFor="hours">Кількість годин</InputLabel>
                  <OutlinedInput fullWidth type="number" id="hours" name="hours" />
                </Stack>

                <Stack spacing={1} sx={{ flex: 1 }}>
                  <InputLabel>Планована дата виконання</InputLabel>
                  <CustomDatePicker
                    //   value={}
                    width="100%"
                    sx={{ paddingTop: 0 }}
                    setValue={(e) => console.log('firstSemesterEnd', e)}
                  />
                </Stack>

                <Stack spacing={1} sx={{ flex: 1 }}>
                  <InputLabel>Фактично виконано</InputLabel>
                  <CustomDatePicker
                    //   value={}
                    width="100%"
                    sx={{ paddingTop: 0 }}
                    setValue={(e) => console.log('firstSemesterEnd', e)}
                  />
                </Stack>
              </div>

              <TextareaAutosize
                color="neutral"
                placeholder="Зміст роботи"
                minRows={4}
                maxRows={4}
                style={{
                  border: '1px solid #d9d9d9',
                  borderRadius: '4px',
                  padding: '10px',
                  fontSize: '16px',
                  outline: 'none',
                  resize: 'none',
                  width: '100%',
                }}
              />
            </AccordionDetails>

            <AccordionActions sx={{ px: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                  {Array(4)
                    .fill(null)
                    .map((_, index) => (
                      <Chip
                        key={index}
                        size="small"
                        sx={{ mx: 1, my: 0.5 }}
                        label="Example.pdf"
                        onDelete={(e) => console.log(e)}
                      />
                    ))}
                </div>

                <Button variant="outlined" sx={{ whiteSpace: 'nowrap', textTransform: 'initial', minWidth: '120px' }}>
                  Додати файли
                </Button>
              </div>

              <div>
                <Button variant="contained" sx={{ whiteSpace: 'nowrap', textTransform: 'initial' }}>
                  Позначити як виконане
                </Button>
              </div>
            </AccordionActions>
          </Accordion>
        )
      })}
    </div>
  )
}

export default TeachersReportTab
