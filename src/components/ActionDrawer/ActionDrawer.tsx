import React from 'react'
import { Drawer } from '@mui/material'

interface IActionDrawerProps {
  drawerSx: any
  isOpen: boolean
  children: React.PropsWithChildren
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ActionDrawer: React.FC<React.PropsWithChildren<IActionDrawerProps>> = (props) => {
  const { isOpen, setIsOpen, drawerSx, children } = props

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      PaperProps={{
        sx: {
          zIndex: 11,
          minWidth: '300px',
          ...drawerSx,
        },
      }}
    >
      {children}
    </Drawer>
  )
}

export default ActionDrawer
