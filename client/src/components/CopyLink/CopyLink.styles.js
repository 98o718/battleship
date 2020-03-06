import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { zoomIn } from 'react-animations'
import { keyframes } from '@emotion/core'

export const CopyLinkWrapper = styled.div`
  display: flex;
`
const zoomInAnimation = keyframes`${zoomIn}`

export const GlobalStyle = isOpen => css`
  .ReactModalPortal:focus {
    outline: none;
  }
  .model-class-copy-link:focus {
    outline: none;
  }
  .model-overlay-copy-link {
    position: fixed;
    width: 100%;
    height: 100vh;
    transition: 0.5s;
    background: linear-gradient(0deg, #00c3ff 0%, rgba(3, 255, 0, 0) 100%);
    transform: translateY(${isOpen ? '0%' : '100%'});
    top: 0;
    left: 0;
    animation: start 0.5s ease;
    z-index: 1000000000;
    display: grid;
    justify-content: center;
    align-content: center;
  }
  @keyframes start {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
`

export const Container = styled.div`
  width: 540px;
  /* min-height: 280px; */
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  padding: 50px;
  animation: 1s ${props => (props.isOpen ? zoomInAnimation : '')} ease;

  &:focus {
    outline: none;
  }
`
export const Text = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  opacity: 0.5;
  text-align: center;
`

export const Input = styled.input`
  /* position: relative; */
  text-align: center;
  border: none;
  border-bottom: 1px solid black;
  transition: 0.3s;
  width: 45%;
  margin: 17px;
  padding: 10px;
  opacity: 0.5;
  float: none;
  &:focus {
    outline: none;
    width: 50%;
    opacity: 1;
    border-bottom: 1px solid black;
  }
  &::placeholder {
    transition: 0.3s;
  }
  &:focus::placeholder {
    opacity: 0;
  }
  &:hover {
    opacity: 1;
  }
`
