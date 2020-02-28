import React from 'react'
import { useDrop } from 'react-dnd'
import { shipTypes } from '../../constants'

import { CellWrapper } from './Cell.styles'
import { shipSizes } from '../../constants'

const Cell = ({ x, y, status, dropShip, canPlace, onClick, opponent }) => {
  const [{ isOver, canDrop, ship }, drop] = useDrop({
    accept: [
      shipTypes.FERRY,
      shipTypes.SHIP,
      shipTypes.SPEEDBOAT,
      shipTypes.SAILBOAT,
    ],
    canDrop: item => canPlace(x, y, item),
    drop: item => dropShip(x, y, item),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      ship: monitor.getItem(),
    }),
  })

  let radius = 'none'

  if (
    ship &&
    !ship.isRotated &&
    ((shipSizes[ship.type] === 4 && x === 0 && y === 6) ||
      (shipSizes[ship.type] === 3 && x === 0 && y === 7) |
        (shipSizes[ship.type] === 2 && x === 0 && y === 8))
  ) {
    radius = '0 0 0 10px'
  } else if (
    ship &&
    !ship.isRotated &&
    ((shipSizes[ship.type] === 4 && x === 9 && y === 6) ||
      (shipSizes[ship.type] === 3 && x === 9 && y === 7) |
        (shipSizes[ship.type] === 2 && x === 9 && y === 8))
  ) {
    radius = '0 0 10px 0'
  } else if (
    ship &&
    ship.isRotated &&
    ((shipSizes[ship.type] === 4 && x === 6 && y === 0) ||
      (shipSizes[ship.type] === 3 && x === 7 && y === 0) |
        (shipSizes[ship.type] === 2 && x === 8 && y === 0))
  ) {
    radius = '0 10px 0 0'
  } else if (
    ship &&
    ship.isRotated &&
    ((shipSizes[ship.type] === 4 && x === 6 && y === 9) ||
      (shipSizes[ship.type] === 3 && x === 7 && y === 9) |
        (shipSizes[ship.type] === 2 && x === 8 && y === 9))
  ) {
    radius = '0 0 10px 0'
  }

  return (
    <CellWrapper
      isOver={isOver}
      canDrop={canDrop}
      size={ship ? shipSizes[ship.type] : 0}
      isRotated={ship ? ship.isRotated : false}
      status={status}
      radius={radius}
      ref={drop}
      onClick={onClick}
      opponent={opponent}
    />
  )
}

export default Cell
