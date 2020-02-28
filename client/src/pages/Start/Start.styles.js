import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import backGroundWave from '../../img/backGroundWave.svg'
import backGroundSea from '../../img/sea.svg'

const rotateBombAnimation = keyframes`
  0%{
    transform: rotate(0);
  }
  50%{
    transform: rotate(5deg);
  }
  100%{
    transform: rotate(0);
  }
`
const rotateFerryAnimation = keyframes`
  0%{
    transform: rotate(14deg);
  }
  50%{
    transform: rotate(19deg);
  }
  100%{
    transform: rotate(14deg);
  }
`
const waveAnimation = keyframes`
  0%{
    transform: scale(1);
  }
  50%{
    transform: scale(1.02)  translateX(-10px);
  }
  100%{
    transform: scale(1);
  }
`

export const StartWrapper = styled.section`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f1f1f1;
  background-image: url('${backGroundWave}');
  background-repeat:no-repeat;
  background-position: bottom left;
  font-family: 'Montserrat', sans-serif;

`
export const Auth = styled.section`
  position: fixed;
  top: 2rem;
  right: 2rem;
  height: 4rem;
`
export const LinkContainer = styled.div`
  height: 4rem;
  display: flex;
  padding-top: 1.8rem;
  a {
    color: #424242;
    text-transform: uppercase;
    margin: 0 0.7rem;
    text-decoration: none;
    transition: 0.2s;
  }
  a:hover {
    color: #00c3ff;
  }
  a:focus {
    outline: none;
    color: #00c3ff;
  }
`
export const AuthImg = styled.img`
  width: 4rem;
  float: left;
  opacity: 0.8;
`

export const Wave = styled.img`
  position: fixed;
  top: auto;
  bottom: 0;
  left: 0;
  animation: 10s ${waveAnimation} ease infinite;
`

export const GameMenu = styled.section`
  will-change: background-position;
  position: fixed;
  width: 33rem;
  min-width: fit-content;
  padding: 15px;
  height: 70%;
  top: auto;
  bottom: 0;
  left: auto;
  right: 10rem;
  background-color: #00c3ff;
  background-image: url('${backGroundSea}');
  background-position: bottom ;
  background-repeat: repeat-x;
  border-top-left-radius: 3rem;
  border-top-right-radius: 3rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  z-index: 2;
  color:white;
  text-align: center;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 20pt;
  animation: backWaveAnim 10s linear infinite;
  @keyframes backWaveAnim {
  from { background-position: calc(-33rem - 10px) 102%, 0 0;}
  to { background-position: 0 102%; }
}
`

export const Text = styled.h1`
  margin-top: 5rem;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 15pt;
`
export const Line = styled.div`
  position: relative;
  width: 40%;
  left: 30%;
  height: 1px;
  background-color: white;
  text-align: center;
  margin: 1.7rem 0;
`

export const Macaroni = styled.img`
  position: absolute;
  top: auto;
  bottom: 1.5rem;
  width: 60%;
  left: 20%;
`

export const Bomb = styled.img`
  position: absolute;
  top: auto;
  bottom: 1.5rem;
  left: auto;
  right: 3rem;
  z-index: 1;
  animation: 1.5s ${rotateBombAnimation} ease infinite;
`
export const Ferry = styled.img`
  position: absolute;
  top: auto;
  bottom: 45%;
  left: auto;
  right: 40rem;
  animation: 2s ${rotateFerryAnimation} ease infinite;
  z-index: 1;
`
