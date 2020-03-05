import React from 'react'
import {
  FieldWrapper,
  Line,
  PlayerInfoWrapper,
  PlayerInfoField,
  Emoji,
} from './Field.styles'
import { Cell } from '../.'

const Field = ({
  matrix,
  dropShip,
  canPlace,
  style,
  handleShot,
  opponent,
  player,
}) => {
  return (
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
      {player && (
        <PlayerInfoWrapper>
          <PlayerInfoField>
            {player.username ? player.username : 'ПРОТИВНИК'}
          </PlayerInfoField>
          {player.rating !== null && player.rating >= 0 && (
            <>
              <PlayerInfoField>
                <Emoji role="img" aria-label="wins emoji">
                  🎉
                </Emoji>
                {player.counts.wins}
              </PlayerInfoField>
              <PlayerInfoField>
                <Emoji role="img" aria-label="loss emoji">
                  💣
                </Emoji>
                {player.counts.loss}
              </PlayerInfoField>
              <PlayerInfoField>
                <Emoji role="img" aria-label="rating emoji">
                  📜
                </Emoji>
                {player.rating}
              </PlayerInfoField>
            </>
          )}
        </PlayerInfoWrapper>
      )}
    </FieldWrapper>
  )
}

export default Field
