import styled from '@emotion/styled'
import { css } from '@emotion/core'

export const PlayFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Line = styled.div`
  display: flex;
  flex-direction: row;
`

export const Point = styled.div`
  ${props =>
    props.black &&
    css`
      background-color: black;
    `}

  width: 50px;
  height: 50px;
  border: 1px solid black;
`
