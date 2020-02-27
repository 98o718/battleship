import React from 'react'
import {
  AuthorizationWrapper,
  Form,
  Img,
  Logo,
  Line,
  Change,
  Input,
} from './Authorization.styles'
import Button from '../Button'
import authImg from '../../img/authImg.png'
const Authorization = props => {
  return (
    <AuthorizationWrapper
      active={props.active}
      onClick={() => props.setActive(false)}
    >
      <Form active={props.active} onClick={e => e.stopPropagation()}>
        <Img src={authImg} alt="authImg" />
        <p>
          <Logo>Авториазция</Logo>
          <Line />
          <Change
            onClick={() => {
              props.setReg(true)
              props.setActive(false)
            }}
            href="#"
          >
            Регистрация
          </Change>
        </p>
        <Input type="text" placeholder="Логин или email" />
        <Input type="password" placeholder="Пароль" />
        <Button type="submit" state="form" text="Войти" />
      </Form>
    </AuthorizationWrapper>
  )
}

export default Authorization
