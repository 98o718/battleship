import styled from '@emotion/styled'

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

  &:last-child {
    div:nth-of-type(1) {
      border-radius: 0 0 0 10px;
    }

    div:nth-of-type(10) {
      border-radius: 0 0 10px 0;
    }
  }
`
