import { declareAtom } from '@reatom/core'
import Cookies from 'universal-cookie'

import { login, logout } from '.'

const cookies = new Cookies()

export const authAtom = declareAtom(['isAuth'], false, on => [
  on(login, () => true),
  on(logout, () => {
    cookies.remove('token')
    return false
  }),
])

export const usernameAtom = declareAtom(['username'], '', on => [
  on(login, (state, value) => value.username),
  on(logout, () => ''),
])
