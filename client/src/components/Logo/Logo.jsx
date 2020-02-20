import React from 'react'
import { LogoWrapper, LogoImage } from './Logo.styles'

import logo from '../../img/logo.svg'

const Logo = props => (
  <LogoWrapper>
    <LogoImage src={logo} alt="logo" />
  </LogoWrapper>
)

export default Logo
