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

export const CenterField = styled.section`
  margin-left: 25px;
  margin-right: 25px;
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
