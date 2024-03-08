import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// material-ui
import { ButtonBase } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

// project import
import Logo from './Logo'
import config from '../../config'
import { activeItem } from '../../store/menu/menuSlice'

// ==============================|| MAIN LOGO ||============================== //

interface ILogoSectionProps {
  sx?: object
  to?: string
}

const LogoSection: React.FC<ILogoSectionProps> = ({ sx, to }) => {
  const { defaultId } = useSelector((state) => state.menu)
  const dispatch = useDispatch()
  return (
    <ButtonBase
      disableRipple
      component={Link}
      onClick={() => dispatch(activeItem({ openItem: [defaultId] }))}
      to={!to ? config.defaultPath : to}
      sx={sx}
    >
      <Logo />
    </ButtonBase>
  )
}

export default LogoSection
