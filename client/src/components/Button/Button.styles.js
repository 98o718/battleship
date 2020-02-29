import styled from '@emotion/styled'
import { css } from '@emotion/core'

const start = css`
  background-color: white;
  border: none;
  color: #424242;
  width: 70%;
  /* margin-bottom: 3rem; */
  padding: 1.4rem;
  border-radius: 10px;
  min-width: fit-content;
  transition: 0.14s;
  font-size: 18pt;
`

const ready = css`
  background-color: #8bc34a;
  border: none;
  color: white;
  width: 9rem;
  /* margin-bottom: 3rem; */
  padding: 1rem;
  border-radius: 10px;
  transition: 0.14s;
  font-size: 12pt;
`

const form = css`
  background-color: #00c3ff;
  border: none;
  color: white;
  margin: 20px 20%;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  transition: 0.14s;
  font-size: 12pt;
`

const common = css`
  background-color: white;
  border: none;
  color: black;
  width: 9rem;
  /* margin-bottom: 3rem; */
  padding: 1rem;
  border-radius: 10px;
  transition: 0.14s;
  font-size: 12pt;
`

const defaultState = css`
  background-color: blue;
  color: white;
`

const stateForAll = css`
  cursor: pointer;
  text-transform: uppercase;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);
  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  &:focus {
    outline: none;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  &:active {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  &:disabled {
    cursor: default;
    opacity: 0.4;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);
  }
`
export const ButtonWrapper = styled.button(props => {
  switch (props.state) {
    case 'start':
      return start
    case 'ready':
      return ready
    case 'common':
      return common
    case 'form':
      return form
    default:
      return defaultState
  }
}, stateForAll)
