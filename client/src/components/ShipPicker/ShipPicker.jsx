import React from 'react'
import { ShipPickerWrapper, RotateButton } from './ShipPicker.styles'
import { Ship } from '..'
import { useState } from 'react'

const ShipPicker = ({ ships }) => {
  const [isRotated, setRotated] = useState(false)
  return (
    <ShipPickerWrapper>
      {ships && ships.length !== 0 && (
        <RotateButton onClick={() => setRotated(!isRotated)}>
          <span role="img" aria-label="img">
            🔄
          </span>
        </RotateButton>
      )}
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
