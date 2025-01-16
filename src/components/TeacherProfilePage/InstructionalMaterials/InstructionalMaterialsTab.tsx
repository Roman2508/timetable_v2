import {
  Stack,
  Table,
  Select,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  InputLabel,
  FormControl,
  OutlinedInput,
} from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { EditOutlined } from '@ant-design/icons'

import {
  findAllTeacherLessonsById,
  findAllTeacherLessonsByIdAndYear,
  getInstructionalMaterials,
} from '../../../store/teacherProfile/teacherProfileAsyncActions'
import EmptyCard from '../../EmptyCard/EmptyCard'
import { customDayjs } from '../../Calendar/Calendar'
import ExportLessonThemes from './ExportLessonThemes'
import { useAppDispatch } from '../../../store/store'
import ImportLessonThemes from './ImportLessonThemes'
import { LoadingStatusTypes } from '../../../store/appTypes'
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner'
import { GroupLoadType } from '../../../store/groups/groupsTypes'
import { InstructionalMaterialsModal } from './InstructionalMaterialsModal'
import { teacherProfileSelector } from '../../../store/teacherProfile/teacherProfileSlice'
import { InstructionalMaterialsType } from '../../../store/teacherProfile/teacherProfileTypes'
import { authSelector } from '../../../store/auth/authSlice'
import { UserRoles } from '../../../store/auth/authTypes'

interface Props {}

interface IFilter {
  ['1']: GroupLoadType[]
  ['2']: GroupLoadType[]
}

export const InstructionalMaterialsTab = React.memo(({}: Props) => {
  const dispatch = useAppDispatch()

  const { user } = useSelector(authSelector)
  const { filterLesson, instructionalMaterials, loadingStatus } = useSelector(teacherProfileSelector)

  const [semester, setSemester] = React.useState(1)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [showedYear, setShowedYear] = React.useState(customDayjs().year())
  const [filter, setFilter] = React.useState<IFilter>({ ['1']: [], ['2']: [] })
  const [actionType, setActiveType] = React.useState<'create' | 'update'>('create')
  const [selectedLesson, setSelectedLesson] = React.useState<GroupLoadType | null>(null)
  const [editingTheme, setEditingTheme] = React.useState<InstructionalMaterialsType | null>(null)

  const handleChangeSelectedLesson = (id: number) => {
    if (!filterLesson) return
    const lesson = filterLesson.find((el) => el.id === id)
    if (lesson) setSelectedLesson(lesson)
  }

  const handleEditTheme = (lessonNumber: number, theme?: InstructionalMaterialsType) => {
    if (!selectedLesson) return alert('Урок не вибраний')
    setIsModalOpen(true)

    if (theme) {
      setActiveType('update')
      setEditingTheme(theme)
      return
    }

    setActiveType('create')
    setEditingTheme({ id: 0, lessonNumber, name: '', lesson: selectedLesson })
  }

  React.useEffect(() => {
    if (!user) return

    if (user.role === UserRoles.TEACHER) {
      dispatch(findAllTeacherLessonsByIdAndYear({ teacherId: user.id, year: showedYear }))
      // dispatch(findAllTeacherLessonsById(user.id))
    } else {
      alert(
        'Якщо роль не викладач (скоріше за все адміністратор, методист і т.д.) то потрібно підвантажувати всі дисципліни'
      )
    }
  }, [user, showedYear])

  React.useEffect(() => {
    if (!selectedLesson) return
    const payload = { id: selectedLesson.id, year: showedYear }
    dispatch(getInstructionalMaterials(payload))
  }, [selectedLesson, showedYear])

  React.useEffect(() => {
    if (!filterLesson) return

    filterLesson.forEach((el) => {
      if (el.semester === 1 || el.semester === 3 || el.semester === 5) {
        setFilter((prev) => ({ ['1']: [...prev['1'], el], ['2']: [...prev['2']] }))
        return
      }

      setFilter((prev) => ({ ['1']: [...prev['1']], ['2']: [...prev['2'], el] }))
    })
  }, [filterLesson])

  return (
    <>
      <InstructionalMaterialsModal
        open={isModalOpen}
        showedYear={showedYear}
        actionType={actionType}
        setOpen={setIsModalOpen}
        editingTheme={editingTheme}
        selectedLesson={selectedLesson}
      />

      <div className="instructional-materials__actions">
        <div
          style={{
            gap: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '210px',
            margin: '0 auto',
          }}
        >
          <Typography variant="button" sx={{ textTransform: 'inherit' }}>
            НМК за
          </Typography>
          <Stack spacing={1}>
            <OutlinedInput
              fullWidth
              name="hours"
              type="number"
              value={showedYear}
              onChange={(e) => {
                setFilter({ ['1']: [], ['2']: [] })
                setShowedYear(Number(e.target.value))
              }}
              sx={{ width: '70px', input: { padding: '8.2px 2px 8.2px 16px' } }}
            />
          </Stack>
          <Typography variant="button" sx={{ textTransform: 'inherit', width: '77px' }}>
            - {showedYear + 1} н.р.
          </Typography>
        </div>

        <div className="instructional-materials__filter">
          <FormControl fullWidth>
            <InputLabel sx={{ overflow: 'visible !important' }}>Семестр</InputLabel>
            <Select
              onChange={(e) => {
                setFilter({ ['1']: [], ['2']: [] })
                setSemester(Number(e.target.value))
              }}
              value={semester}
            >
              {[1, 2].map((el) => (
                <MenuItem value={el} key={el}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel sx={{ overflow: 'visible !important' }}>Дисципліна</InputLabel>
            <Select
              defaultValue={0}
              value={selectedLesson ? selectedLesson.id : ''}
              onChange={(e) => handleChangeSelectedLesson(Number(e.target.value))}
            >
              {!filterLesson && (
                <MenuItem value={0} sx={{ height: '34px' }} disabled>
                  {/* <LoadingSpinner size={20} /> */}
                  Завантаження...
                </MenuItem>
              )}

              {/* @ts-ignore */}
              {(filterLesson ? filter[semester] : []).map((el: GroupLoadType) => (
                <MenuItem value={el.id} key={el.id}>{`${el.group.name} / ${el.typeRu} / ${el.name}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="instructional-materials__buttons">
          <ExportLessonThemes instructionalMaterials={instructionalMaterials} />
          <ImportLessonThemes selectedLesson={selectedLesson} showedYear={showedYear} />
        </div>
      </div>

      <Divider sx={{ mb: 3 }} />

      {!selectedLesson ? (
        <EmptyCard text="Виберіть дисципліну" />
      ) : loadingStatus === LoadingStatusTypes.LOADING ? (
        <LoadingSpinner />
      ) : (
        <Table sx={{ minWidth: 450, mb: 10 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '50px', padding: '0px 6px' }} align="center">
                №
              </TableCell>
              <TableCell>Тема</TableCell>
              <TableCell align="center" sx={{ width: '50px' }}>
                Години
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Array(selectedLesson ? selectedLesson.hours : 0)
              .fill(null)
              .map((_, i) => {
                // const lesson = rows.find((el) => el.id === i + 1)
                const isLast = selectedLesson?.hours === i + 1
                const theme = instructionalMaterials?.find((el) => el.lessonNumber === i + 1)

                return (
                  <TableRow key={i}>
                    <TableCell component="th" align="center" sx={{ width: '50px', height: '48px', padding: '0px 6px' }}>
                      {i + 1}
                    </TableCell>

                    <TableCell
                      align="left"
                      sx={{
                        height: '48px',
                        display: 'flex',
                        padding: '0px 6px',
                        alignItems: 'center',
                        '&:hover span': { display: 'inline-block !important' },
                      }}
                    >
                      <Typography style={{ flexGrow: 1, margin: 0 }}>{theme?.name}</Typography>

                      <IconButton onClick={() => handleEditTheme(i + 1, theme)}>
                        <EditOutlined style={{ display: 'none', cursor: 'pointer' }} />
                      </IconButton>
                    </TableCell>
                    <TableCell>{theme && !isLast ? 2 : theme && isLast ? 1 : '-'}</TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      )}
    </>
  )
})
