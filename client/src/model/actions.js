import { declareAction } from '@reatom/core'

export const login = declareAction('login')

export const logout = declareAction('logout')

export const setGameType = declareAction('setGameType')

export const setRoomType = declareAction('setRoomType')

export const updateUser = declareAction('updateUser')
