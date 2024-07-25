import { LeftSquareOutlined } from '@ant-design/icons'
import React, { Dispatch, SetStateAction } from 'react'
import { Grid, Stack, Divider, Tooltip, TextField, Typography, IconButton, InputLabel } from '@mui/material'

import EmptyCard from '../EmptyCard/EmptyCard'
import MainCard from '../../components/MainCard'
import { useAppDispatch } from '../../store/store'
import DistributionActions from './DistributionActions'
import { GroupLoadType } from '../../store/groups/groupsTypes'
import { TeachersType } from '../../store/teachers/teachersTypes'
import { getLastnameAndInitials } from '../../utils/getLastnameAndInitials'
import { sortLessonsByLessonType } from '../../utils/sortLessonsByLessonType'
import { attachTeacher, unpinTeacher } from '../../store/scheduleLessons/scheduleLessonsAsyncActions'

export type AttachmentTypes = 'attach-one' | 'attach-all' | 'unpin-one' | 'unpin-all'

interface IDistributionTeachersToLessonsProps {
  selectedTeacherId: number | null
  selectedLesson: GroupLoadType[] | null
  setSelectedLesson: Dispatch<SetStateAction<GroupLoadType[] | null>>
}

const DistributionTeachersToLessons: React.FC<IDistributionTeachersToLessonsProps> = ({
  selectedLesson,
  setSelectedLesson,
  selectedTeacherId,
}) => {
  const dispatch = useAppDispatch()

  const [attachmentType, setAttachmentType] = React.useState<AttachmentTypes>('attach-one')

  const onAttachTeacher = async (lessonId: number) => {
    if (!selectedTeacherId) return alert('Виберіть викладача')
    const { payload } = await dispatch(attachTeacher({ lessonId, teacherId: selectedTeacherId }))
    const data = payload as { lessonId: number; teacher: TeachersType }
    setSelectedLesson((prev) => {
      if (prev) {
        return prev.map((lesson) => {
          if (lesson.id === data.lessonId) {
            return { ...lesson, teacher: data.teacher }
          }
          return lesson
        })
      }

      return prev
    })
  }

  const onUnpinTeacher = async (lessonId: number) => {
    const { payload } = await dispatch(unpinTeacher(lessonId))
    const data = payload as { lessonId: number }
    setSelectedLesson((prev) => {
      if (prev) {
        return prev.map((lesson) => {
          if (lesson.id === data.lessonId) {
            return { ...lesson, teacher: null }
          }
          return lesson
        })
      }

      return prev
    })
  }

  const onClickActionButton = async (lessonId: number) => {
    if (attachmentType === 'attach-one') {
      onAttachTeacher(lessonId)
      return
    }
    if (attachmentType === 'unpin-one') {
      onUnpinTeacher(lessonId)
      return
    }
  }

  return (
    <Grid item xs={12} sx={{ mb: 2 }}>
      <MainCard>
        <Typography
          variant="button"
          sx={{ textAlign: 'center', display: 'block', textTransform: 'uppercase', mb: 2.6 }}
        >
          {selectedLesson ? selectedLesson[0].name : 'Виберіть дисципліну'}
        </Typography>

        <Divider />
        <DistributionActions
          selectedLesson={selectedLesson}
          attachmentType={attachmentType}
          onUnpinTeacher={onUnpinTeacher}
          onAttachTeacher={onAttachTeacher}
          setAttachmentType={setAttachmentType}
        />
        <Divider />

        <form autoComplete="off">
          {!selectedLesson && <EmptyCard />}

          {selectedLesson &&
            sortLessonsByLessonType(selectedLesson).map((lesson) => {
              const stream = lesson.stream ? `${lesson.stream.name} ` : ''
              const subgroup = lesson.subgroupNumber ? `підгр. ${lesson.subgroupNumber}` : ''
              const specialization = lesson.specialization ? `${lesson.specialization} спец. ` : ''
              const remark = (stream || specialization || subgroup) && `(${stream}${specialization}${subgroup})`

              const teacher = lesson.teacher ? getLastnameAndInitials(lesson.teacher) : ''

              return (
                <Stack
                  spacing={1}
                  key={lesson.id}
                  sx={{ mt: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                >
                  <Tooltip title={`${lesson.typeRu} ${remark}`}>
                    <InputLabel htmlFor="name" sx={{ flexGrow: 1, mt: '8px !important' }}>
                      {lesson.typeRu} {remark}
                    </InputLabel>
                  </Tooltip>
                  <TextField
                    name={lesson.typeEn}
                    size="small"
                    placeholder=""
                    value={lesson.hours}
                    InputProps={{ readOnly: true }}
                    sx={{
                      maxWidth: '45px',
                      mr: '8px !important',
                      '& .MuiInputBase-root': { p: 0 },
                      '& input': { textAlign: 'center', cursor: 'default' },
                    }}
                  />
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    size="small"
                    placeholder=""
                    value={teacher}
                    sx={{ maxWidth: '140px', mr: '8px !important', '& .MuiInputBase-root': { p: 0 } }}
                  />
                  <IconButton
                    onClick={() => onClickActionButton(lesson.id)}
                    disabled={attachmentType === 'unpin-one' && !teacher}
                  >
                    <LeftSquareOutlined />
                  </IconButton>
                </Stack>
              )
            })}
        </form>
      </MainCard>
    </Grid>
  )
}

export default DistributionTeachersToLessons
