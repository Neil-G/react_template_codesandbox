import React from 'react'
import styled from 'styled-components'

const StyledIcon = styled.i`
  margin-left: ${({ marginLeft }) => (marginLeft ? 12 : 0)}px;
  margin-right: ${({ marginRight }) => (marginRight ? 12 : 0)}px;
`

const AddIcon = props => <StyledIcon className='fas fa-plus' {...props} />

export default {
  Add: AddIcon,
}
