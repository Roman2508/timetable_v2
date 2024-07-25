import React from 'react'
import emptyImage from '../../assets/empty-image .png'
import { Typography } from '@mui/material'

const EmptyCard: React.FC<{ text?: string; padding?: number; textMaxWidth?: string }> = ({
  text = 'Пусто',
  padding = 20,
  textMaxWidth = '100%',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${padding}px`,
        whiteSpace: 'pre-wrap',
      }}
    >
      <img src={emptyImage} alt="empty image" width={100} />
      <Typography variant="h5" sx={{ maxWidth: textMaxWidth }}>
        {text}
      </Typography>
    </div>
  )
}

export default EmptyCard
