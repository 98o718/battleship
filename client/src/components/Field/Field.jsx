import React from 'react'
import { FieldWrapper, Line } from './Field.styles'
import { Cell } from '../.'

const Field = ({ matrix, dropShip, canPlace, style, handleShot, opponent }) => (
  <FieldWrapper style={style}>
    {matrix &&
      matrix.map((line, y) => {
        return (
          <Line key={y}>
            {line.map((point, x) => (
              <Cell
                dropShip={dropShip}
                canPlace={canPlace}
                x={x}
                y={y}
                status={point}
                key={x}
                opponent={opponent}
                onClick={() => opponent && handleShot(x, y)}
              />
            ))}
          </Line>
        )
      })}
  </FieldWrapper>
)

export default Field
