import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { shipTypes } from '../../constants'

import ferry from '../../img/ferry.png'
import sailboat from '../../img/sailboat.png'
import speedboat from '../../img/speedboat.png'
import ship from '../../img/ship.png'

export const ShipWrapper = styled.div`
  /* background-color: white; */
  background-size: 70%;
  background-position: center;
  background-repeat: no-repeat;
  transition: 0.2s;
  border-radius: 50%;

  &:hover {
    transform: scale(1.2);
  }

  ${props =>
    props.isRotated &&
    css`
      transform: rotate(-90deg);
    `}

  ${props => {
    switch (props.type) {
      case shipTypes.FERRY:
        return css`
          background-image: url('${ferry}');
        `
      case shipTypes.SHIP:
        return css`
          background-image: url('${ship}');
        `
      case shipTypes.SPEEDBOAT:
        return css`
          background-image: url('${speedboat}');
        `
      case shipTypes.SAILBOAT:
        return css`
          background-image: url('${sailboat}');
        `
      default:
        break
    }
  }}

  cursor: pointer;

  width: 50px;
  height: 50px;
  /* border: 1px solid lightgray; */
`
