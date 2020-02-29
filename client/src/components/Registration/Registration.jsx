import React from 'react'
import {
  RegistrationWrapper,
  Form,
  Img,
  Logo,
  Line,
  Change,
  Input,
} from './Registration.styles'
import Button from '../Button'
import reg from '../../assets/reg.png'
const Registration = props => (
  <RegistrationWrapper
    active={props.active}
    onClick={() => props.setActive(false)}
    auth={props.auth}
  >
    <Form active={props.active} onClick={e => e.stopPropagation()}>
      <Img src={reg} alt="authImg" />
      <p>
        <Logo>Регистрация</Logo>
        <Line />
        <Change
          onClick={() => {
            props.setAuth(true)
            props.setActive(false)
          }}
          href="#"
        >
          Авторизация
        </Change>
      </p>
      <Input type="text" placeholder="Email" />
      <Input type="password" placeholder="Пароль" />
      <Input type="password" placeholder="Повторить пароль" />
      <Button type="submit" state="form" text="Зарегистрироваться" />
    </Form>
  </RegistrationWrapper>
)

export default Registration
