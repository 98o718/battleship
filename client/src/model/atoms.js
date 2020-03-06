import { declareAtom } from '@reatom/core'
import Cookies from 'universal-cookie'

import { gameTypes, roomTypes } from '../constants'

import { login, logout, setGameType, updateUser, setRoomType } from './actions'

const cookies = new Cookies()

export const authAtom = declareAtom(['isAuth'], false, on => [
  on(login, () => true),
  on(logout, () => {
    cookies.remove('token')
    return false
  }),
])

export const userAtom = declareAtom(['user'], null, on => [
  on(login, (state, value) => value),
  on(logout, () => ''),
  on(updateUser, (state, value) => Object.assign({}, state, value)),
])

export const gameTypeAtom = declareAtom(['gameType'], gameTypes.REGULAR, on => [
  on(setGameType, (state, value) => value),
])

export const roomTypeAtom = declareAtom(['roomType'], roomTypes.FRIEND, on => [
  on(setRoomType, (state, value) => value),
])
