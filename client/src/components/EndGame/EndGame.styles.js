import styled from '@emotion/styled'

import { keyframes } from '@emotion/core'
import { tada } from 'react-animations'

import bomb from '../../img/bomb.png'
import party from '../../img/party.png'

const tadaAnimation = keyframes`${tada}`

export const EndGameWrapper = styled.section`
  position: fixed;
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    0deg,
    ${props => (props.state ? '#00E676' : '#FF6E40')} 0%,
    rgba(3, 255, 0, 0) 100%
  );
  top: 0;
  left: 0;
  z-index: 100;
  opacity: ${props => (props.active ? '1' : '0')};
  visibility: ${props => (props.active ? 'visible' : 'hidden')};
  transform: translateY(${props => (props.active ? '0' : '100%')});
  transition: 0.5s;
  display: grid;
  justify-content: center;
  align-content: center;
`

export const Container = styled.div`
  width: 840px;
  height: 380px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  animation: 1s ${props => (props.active ? tadaAnimation : '')} ease;
`

export const Image = styled.div`
  width: 40%;
  height: 100%;
  background-image: url('${props => (props.state ? party : bomb)}');
  background-position: center;
  background-repeat: no-repeat;
  float: left;
`

export const Text = styled.div`
  width: 60%;
  height: 100%;
  display: grid;
  text-align: center;
  align-content: center;
  justify-content: center;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  h1 {
    font-weight: 500;
    margin: -15px 0;
    font-size: 3rem;
  }
  p {
    font-size: 3rem;
    margin-bottom: 30px;
  }
  a {
    color: #424242;
    text-transform: uppercase;
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
