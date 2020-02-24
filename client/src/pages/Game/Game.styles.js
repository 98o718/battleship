import styled from '@emotion/styled'

import backGroundWave from '../../img/backGroundWave.svg'

export const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1;
  background-image: url('${backGroundWave}');
  background-repeat:no-repeat;
  background-position: bottom left;
  font-family: 'Montserrat', sans-serif;
`
