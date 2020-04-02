import React from 'react'
import styled from 'styled-components'

export const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

export const FormInputLabel = styled.label`
  color: #202c40;
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
  width: 100%;
  font-weight: 600;
`

export const InputContainer = styled.div`
  box-sizing: border-box;
  margin-bottom: 18px;
  width: ${({ quarter, half, threeQuarters, third, twoThirds, full }) => {
    if (full) return '100%'
    if (quarter) return '24%'
    if (half) return '49%'
    if (threeQuarters) return '49%'
    if (third) return '32.5%'
    if (twoThirds) return '65.5%'
    return '100%'
  }};
  @media (max-width: 720px) {
    width: ${({ fullWidthOnMobile = true }) => fullWidthOnMobile && '100%'};
  }
`
