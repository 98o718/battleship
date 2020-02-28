import styled from '@emotion/styled'

export const ShipPickerWrapper = styled.div`
  display: flex;
  margin-right: 25px;
  flex-direction: row;
`

export const RotateButton = styled.button`
  border: none;
  height: 50px;
  width: fit-content;
  cursor: pointer;
  background-color: transparent;
  outline: none;
  font-size: 50px;
  transition: 0.2s;
  align-self: center;
  margin-right: 15px;

  &:hover {
    transform: scale(0.9);
  }

  &:active {
    transform: scale(0.85);
  }
`
