import React, { Dispatch, SetStateAction } from 'react'
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'
import { BackwardOutlined, CaretLeftOutlined, ClearOutlined, CloseCircleOutlined } from '@ant-design/icons'

import { GroupLoadType } from '../../store/groups/groupsTypes'
import { AttachmentTypes } from './DistributionTeachersToLessons'

interface IDistributionActionsProps {
  attachmentType: AttachmentTypes
  selectedLesson: GroupLoadType[] | null
  onAttachTeacher: (lessonId: number) => void
  onUnpinTeacher: (lessonId: number) => void
  setAttachmentType: Dispatch<SetStateAction<AttachmentTypes>>
}

const attachmentButtons = [
  { title: 'Відкріпити всі', type: 'unpin-all', icon: <ClearOutlined /> },
  { title: 'Відкріпити від одного', type: 'unpin-one', icon: <CloseCircleOutlined /> },
  { title: 'Прикріпити на всі', type: 'attach-all', icon: <BackwardOutlined /> },
  { title: 'Прикріпити одного', type: 'attach-one', icon: <CaretLeftOutlined /> },
] as const

const DistributionActions: React.FC<IDistributionActionsProps> = ({
  attachmentType,
  selectedLesson,
  onUnpinTeacher,
  onAttachTeacher,
  setAttachmentType,
}) => {
  const handleAttachment = (_: React.MouseEvent<HTMLElement>, newAttachment: AttachmentTypes) => {
    setAttachmentType(newAttachment)
  }

  const onClickActionButton = (type: AttachmentTypes) => {
    console.log(type)
    if (type !== 'attach-all' && type !== 'unpin-all') return
    if (!selectedLesson) return

    const lessonsIds = selectedLesson.map((el) => el.id)

    if (attachmentType === 'attach-all') {
      lessonsIds.map((id) => {
        onAttachTeacher(id)
      })
      return
    }
    if (attachmentType === 'unpin-all') {
      if (!window.confirm('Ви дійсно хочете відкріпити викладача від всіх видів занять?')) return
      lessonsIds.map((id) => {
        onUnpinTeacher(id)
      })
      return
    }
  }

  return (
    <ToggleButtonGroup
      exclusive
      value={attachmentType}
      onChange={handleAttachment}
      aria-label="attach teachers"
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      {attachmentButtons.map((el) => (
        <Tooltip title={el.title} onClick={() => onClickActionButton(el.type)}>
          <ToggleButton value={el.type}>{el.icon}</ToggleButton>
        </Tooltip>
      ))}
    </ToggleButtonGroup>
  )
}

export default DistributionActions
