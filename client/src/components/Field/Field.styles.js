import styled from '@emotion/styled'

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Line = styled.div`
  display: flex;
  flex-direction: row;

  &:first-of-type {
    div:nth-of-type(1) {
      border-radius: 10px 0 0 0;
    }

    div:nth-of-type(10) {
      border-radius: 0 10px 0 0;
    }
  }

  &:last-of-type {
    div:nth-of-type(1) {
      border-radius: 0 0 0 10px;
    }

    div:nth-of-type(10) {
      border-radius: 0 0 10px 0;
    }
  }
`

export const PlayerInfoWrapper = styled.span`
  min-height: 35px;
  border-radius: 0 0 20px 20px;
  display: flex;
  flex-direction: row;
  background-color: #00c3ff;
  padding: 15px;
`
export const PlayerInfoField = styled.p`
  margin: 0;
  margin-right: 20px;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;

  &:last-of-type {
    margin-right: 0;
  }
`

export const Emoji = styled.span`
  font-size: 30px;
  vertical-align: middle;
  margin-right: 10px;
`
