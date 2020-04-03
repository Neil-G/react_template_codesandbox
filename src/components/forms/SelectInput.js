import React from 'react'
import Select from 'react-select'
import { noop } from 'lodash'

const generalSelectInputStyle = {
  control: provided => ({ ...provided }),
  multiValue: provided => ({
    ...provided,
    background: 'whitesmoke',
    border: '1px solid #cfd8dc',
    padding: '6px',
  }),
}

export default ({ options = [], value, onChange = noop }) => {
  return (
    <Select
      value={value}
      styles={generalSelectInputStyle}
      options={options}
      onChange={selected => onChange(selected)}
    />
  )
}
