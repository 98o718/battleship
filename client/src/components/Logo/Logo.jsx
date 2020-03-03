import React from 'react'
import { LogoWrapper, LogoImage } from './Logo.styles'

import logo from '../../assets/logo.svg'
import { useLocation } from 'wouter'

const Logo = props => {
  const [, setLocation] = useLocation()
  return (
    <LogoWrapper>
      <LogoImage
        src={logo}
        alt="logo"
        onClick={() => (props.game ? setLocation('/') : '')}
        game={props.game}
      />
    </LogoWrapper>
  )
}

export default Logo
