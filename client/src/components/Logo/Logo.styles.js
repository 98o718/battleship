import styled from '@emotion/styled'

export const LogoWrapper = styled.div`
  position: fixed;
  top: 2rem;
  left: 2rem;
`
export const LogoImage = styled.img`
  width: 30rem;
  cursor: ${props => (props.game ? 'pointer' : 'default')};
`
