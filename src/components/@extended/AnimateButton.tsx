// third-party
import { motion } from 'framer-motion'

// ==============================|| ANIMATION BUTTON ||============================== //

interface IAnimateButtonProps {
  children: React.PropsWithChildren
  type?: 'slide' | 'scale' | 'rotate'
}

const AnimateButton: React.FC<React.PropsWithChildren<IAnimateButtonProps>> = ({ children, type = 'scale' }) => {
  switch (type) {
    case 'rotate': // only available in paid version
    case 'slide': // only available in paid version
    case 'scale': // only available in paid version
    default:
      return (
        <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
          {children}
        </motion.div>
      )
  }
}

export default AnimateButton
