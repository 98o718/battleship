import styled from '@emotion/styled'
import { css } from '@emotion/core'

import bomb from '../../assets/bomb.png'
import ferry from '../../assets/ferry.png'
import shot from '../../assets/shot.svg'
import sailboat from '../../assets/sailboat.png'
import speedboat from '../../assets/speedboat.png'
import ship from '../../assets/ship.png'

export const CellWrapper = styled.div`
  background-color: white;
  background-size: 70%;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  transition: 0.1s;

  &:hover {
    background-color: #f1f1f1;
  }

  &:before {
    content: "";
    pointer-events: none;

    display: ${({ isOver, canDrop }) =>
      isOver && canDrop ? 'inline-block' : 'none'};
    top: ${({ isRotated }) => (isRotated ? 0 : '100%')};
    left: ${({ isRotated }) => (isRotated ? '100%' : 0)};
    position: absolute;
    width: ${({ isRotated, size }) =>
      isRotated ? `${(size - 1) * 105}%` : '100%'};
    height: ${({ isRotated, size }) =>
      isRotated ? '100%' : `${(size - 1) * 105}%`};
    background-color: rgba(139, 195, 74, 0.5);
    z-index: 1;
    border-radius: ${({ radius }) => radius}
  }

  ${({ isOver, canDrop }) =>
    isOver &&
    (canDrop
      ? css`
          background-color: rgba(139, 195, 74, 0.5);
        `
      : css`
          background-color: #f44336;
        `)}

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
