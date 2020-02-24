import styled from '@emotion/styled'
import { css } from '@emotion/core'

import bomb from '../../img/bomb.png'
import ferry from '../../img/ferry.png'
import shot from '../../img/shot.svg'
import sailboat from '../../img/sailboat.png'
import speedboat from '../../img/speedboat.png'
import ship from '../../img/ship.png'

export const PlayFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 3rem;
`

export const Field = styled.div`
  margin: 6rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 10px;
  z-index: 2;
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
  background-color: white;
  background-size: 70%;
  background-position: center;
  background-repeat: no-repeat;
  ${props => {
    switch (props.status) {
      case 'ferry':
        return css`
          background-image: url('${ferry}');
        `
      case 'ship':
        return css`
          background-image: url('${ship}');
        `
      case 'speedboat':
        return css`
          background-image: url('${speedboat}');
        `
      case 'sailboat':
        return css`
          background-image: url('${sailboat}');
        `

      case 'hit':
        return css`
          background-image: url('${bomb}');
        `
      case 'shot':
        return css`
          background-size: 40%;
          background-image: url('${shot}');
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

export const CenterField = styled.section`
  position: absolute;
  margin-left: 6rem;
  margin-top: 6rem;
  width: calc(2 * ((50px * 10) + 22px) + 12rem);
  height: calc((50px * 10) + 22px);
  display: grid;
  justify-content: center;
  align-content: center;
  text-align: center;
  z-index: 1;
  p {
    width: 9rem;
    height: 2rem;
    text-align: center;
    font-size: 10pt;
  }
`
