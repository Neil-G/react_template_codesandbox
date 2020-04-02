import React from 'react'
import Select from 'react-select'

const generalSelectInputStyle = {
  control: provided => ({ ...provided }),
  multiValue: provided => ({
    ...provided,
    background: 'whitesmoke',
    border: '1px solid #cfd8dc',
    padding: '6px',
  }),
}

export default ({ options = [], value }) => {
  return <Select styles={generalSelectInputStyle} options={options} />
}
