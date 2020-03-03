import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { BarLoader } from 'react-spinners'
import { useCookies } from 'react-cookie'
import { useAction } from '@reatom/react'

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
import { login } from '../../model'
import authImg from '../../assets/authImg.png'

const Authorization = props => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [, setCookie] = useCookies()
  const doLogin = useAction(login)

  const validate = () => {
    const { email, password } = credentials

    const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!email || !emailCheck.test(email)) {
      toast.error('Введите корректный email!')
      return false
    } else if (!password) {
      toast.error('Введите пароль!')
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

        const result = await fetch(process.env.REACT_APP_LOGIN_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        })

        const data = await result.json()

        if (!result.ok) {
          toast.error(data.message)
        } else {
          toast.success('Успешная авторизация!')
          setCookie('token', data.token)
          doLogin(data)
          props.setActive(false)
        }
        setLoading(false)
      } catch (e) {
        toast.error('Ошибка авторизации!')
        setLoading(false)
      }
    }
  }

  return (
    <AuthorizationWrapper
      active={props.active}
      onClick={() => props.setActive(false)}
    >
      <Form
        active={props.active}
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <Img src={authImg} alt="authImg" />
        <div>
          <Logo>Авторизация</Logo>
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
        </div>
        <Input
          type="text"
          placeholder="Email"
          name="email"
          value={credentials.email}
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
          text={loading ? <BarLoader width={62} /> : 'Войти'}
          onClick={handleSubmit}
        />
      </Form>
    </AuthorizationWrapper>
  )
}

export default Authorization
