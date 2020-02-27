import React from 'react'
import { ButtonWrapper } from './Button.styles'

const Button = props => (
  <ButtonWrapper {...props} state={props.state}>
    {props.text}
  </ButtonWrapper>
)

export default Button
