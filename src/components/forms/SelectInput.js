import React from 'react'
import Select from 'react-select'
import { noop } from 'lodash'
import { FormInputLabel } from './StyledComponents'

const generalSelectInputStyle = {
  control: provided => ({ ...provided }),
  multiValue: provided => ({
    ...provided,
    background: 'whitesmoke',
    border: '1px solid #cfd8dc',
    padding: '6px',
  }),
}

export default ({ label = '', options = [], value, onChange = noop }) => {
  return (
    <>
      <FormInputLabel>{label}</FormInputLabel>
      <Select
        value={value}
        styles={generalSelectInputStyle}
        options={options}
        onChange={selected => onChange(selected)}
      />
    </>
  )
}
