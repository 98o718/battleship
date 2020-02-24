import styled from '@emotion/styled'
import { css } from '@emotion/core'

export const PlayFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const Field = styled.div`
  margin: 30px;
`

export const Line = styled.div`
  display: flex;
  flex-direction: row;

  &:first-of-type {
    div:nth-of-type(1) {
      border-radius: 10px 0 0 0;
    }

    div:nth-of-type(10) {
      border-radius: 0 10px 0 0;
    }
  }

  &:last-child {
    div:nth-of-type(1) {
      border-radius: 0 0 0 10px;
    }

    div:nth-of-type(10) {
      border-radius: 0 0 10px 0;
    }
  }
`

export const Point = styled.div`
  ${props => {
    switch (props.status) {
      case 1:
        return css`
          background-color: #3f51b5;
        `
      case 2:
        return css`
          background-color: #f44336;
        `
      case 3:
        return css`
          background-color: #ffeb3b;
        `
      default:
        break
    }
  }}

  ${props =>
    props.opponent &&
    css`
      cursor: pointer;
    `}

  width: 50px;
  height: 50px;
  border: 1px solid lightgray;
`

export const Button = styled.button`
  display: flex;
  padding: 15px 30px;
  border: none;
  background-color: #4caf50;
  color: white;
  width: fit-content;
  cursor: pointer;
  transition: 0.2s;
  border-radius: 5px;
  align-self: center;

  &:hover {
    background-color: #2e7d32;
  }
  /* width: auto; */
`
