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
  cursor: pointer;
  text-transform: uppercase;
  font-size: 18pt;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  &:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  &:focus {
    outline: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
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
  cursor: pointer;
  text-transform: uppercase;
  font-size: 12pt;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);
  &:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
  &:focus {
    outline: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
`

const defaultState = css`
  background-color: blue;
  color: white;
`
export const ButtonWrapper = styled.button(props => {
  switch (props.state) {
    case 'start':
      return start
    case 'ready':
      return ready
    default:
      return defaultState
  }
})
