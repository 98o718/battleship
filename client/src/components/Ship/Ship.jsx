import React from 'react'
import { useDrag } from 'react-dnd'

import { ShipWrapper } from './Ship.styles'

const Ship = ({ type, isRotated }) => {
  const [, drag] = useDrag({
    item: { type, isRotated },
  })

  return <ShipWrapper isRotated={isRotated} ref={drag} type={type} />
}

export default Ship
