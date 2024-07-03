import { CircularProgress } from '@mui/material'
import React from 'react'

interface ILoadingSpinnerProps {
  size?: number
  disablePadding?: boolean
}

const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({ size, disablePadding }) => {
  return (
    <div
      style={{
        padding: disablePadding ? '0' : '15px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={size} />
    </div>
  )
}

export default LoadingSpinner
