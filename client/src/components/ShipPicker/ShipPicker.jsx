import React from 'react'
import { ShipPickerWrapper, RotateButton } from './ShipPicker.styles'
import { Ship } from '..'
import { useState } from 'react'

const ShipPicker = ({ ships }) => {
  const [isRotated, setRotated] = useState(false)
  return (
    <ShipPickerWrapper>
      <RotateButton onClick={() => setRotated(!isRotated)}>🔄</RotateButton>
      <div>
        {ships &&
          ships.map((ship, idx) => (
            <Ship isRotated={isRotated} key={idx} type={ship} />
          ))}
      </div>
    </ShipPickerWrapper>
  )
}

export default ShipPicker
