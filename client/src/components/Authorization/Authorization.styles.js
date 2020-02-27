import styled from '@emotion/styled'

import { keyframes } from '@emotion/core'
import { zoomIn } from 'react-animations'

const zoomInAnimation = keyframes`${zoomIn}`

export const AuthorizationWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #00c3ff 0%, rgba(3, 255, 0, 0) 100%);
  top: 0;
  left: 0;
  z-index: 100;
  opacity: ${props => (props.active ? '1' : '0')};
  visibility: ${props => (props.active ? 'visible' : 'hidden')};
  transform: translateY(${props => (props.active ? '0' : '-100%')});
  transition: 0.5s;
  display: grid;
  justify-content: center;
  align-content: center;
  cursor: pointer;
`
export const Form = styled.form`
  cursor: default;
  width: 510px;
  min-height: 380px;
  padding: 20px;
  padding-top: 50px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  animation: 1s ${props => (props.active ? zoomInAnimation : '')} ease;
  text-align: center;
`
export const Img = styled.img`
  width: 130px;
`
export const Logo = styled.h1`
  font-size: 1.9rem;
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
`
export const Change = styled.h2`
  font-size: 1.3rem;
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
`
export const Line = styled.div`
  position: relative;
  width: 40%;
  left: 30%;
  height: 1px;
  background-color: black;
  opacity: 0.5;
`
export const Input = styled.input`
  position: relative;
  text-align: center;
  border: none;
  border-bottom: 1px solid black;
  transition: 0.3s;
  width: 50%;
  margin: 17px;
  padding: 10px;
  opacity: 0.5;
  text-transform: uppercase;
  float: none;
  &:focus {
    outline: none;
    width: 64%;
    opacity: 1;
    border-bottom: 1px solid black;
  }
  &::placeholder {
    transition: 0.3s;
  }
  &:focus::placeholder {
    opacity: 0;
  }
`
