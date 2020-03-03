import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { BarLoader } from 'react-spinners'
import { useCookies } from 'react-cookie'
import { useAction } from '@reatom/react'

import {
  RegistrationWrapper,
  Form,
  Img,
  Logo,
  Line,
  Change,
  Input,
} from './Registration.styles'
import reg from '../../assets/reg.png'

import Button from '../Button'
import { login } from '../../model'

const Registration = props => {
  const [credentials, setCredentials] = useState({
    email: '',
    username: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [, setCookie] = useCookies()
  const doLogin = useAction(login)

  const validate = () => {
    const { email, username, password } = credentials

    const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!email || !emailCheck.test(email)) {
      toast.error('Введите корректный email!')
      return false
    } else if (!username) {
      toast.error('Введите имя!')
      return false
    } else if (password.length < 8) {
      toast.error('Длина пароля должна быть не меньше 8 символов!')
      return false
    }

    return true
  }

  const handleChange = e => {
    setCredentials(
      Object.assign({}, credentials, {
        [e.target.name]: e.target.value.trim(),
      })
    )
  }

  const handleSubmit = async () => {
    const isValid = validate()

    if (isValid) {
      try {
        setLoading(true)

        const result = await fetch(process.env.REACT_APP_SIGNUP_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        })

        const data = await result.json()

        if (!result.ok) {
          toast.error(data.message)
        } else if (data.token) {
          toast.success('Успешная регистрация!')
          setCookie('token', data.token)
          doLogin(credentials)
          props.setActive(false)
        }
        setLoading(false)
      } catch (e) {
        toast.error('Ошибка регистрации!')
        setLoading(false)
      }
    }
  }

  return (
    <RegistrationWrapper
      active={props.active}
      onClick={() => props.setActive(false)}
      auth={props.auth}
    >
      <Form
        active={props.active}
        onClick={e => {
          e.stopPropagation()
          e.preventDefault()
        }}
      >
        <Img src={reg} alt="authImg" />
        <div>
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
        </div>
        <Input
          type="text"
          placeholder="Email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
        />
        <Input
          type="text"
          placeholder="Имя"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <Input
          type="password"
          placeholder="Пароль"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          state="form"
          style={{ height: 50 }}
          disabled={loading}
          text={
            loading ? (
              <BarLoader width={203} color="white" />
            ) : (
              'Зарегистрироваться'
            )
          }
          onClick={handleSubmit}
        />
      </Form>
    </RegistrationWrapper>
  )
}

export default Registration
