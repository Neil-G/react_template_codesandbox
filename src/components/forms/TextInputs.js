import React, { useState } from 'react'
import styled from 'styled-components'
import { get, noop } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheck,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import { FormInputLabel } from './StyledComponents'
/*
|--------------------------------------------------------------------------
| Styled Components
|--------------------------------------------------------------------------
*/

const TextInputContainer = styled.div`
  width: 100%;
  position: relative;
  box-sizing: border-box;
`

const StyledTextInput = styled.input`
  width: 100%;
  height: 40px;
  margin: auto;
  box-sizing: border-box;
  padding: 6px 18px;
  outline: none;
  border-radius: 3px;
  background: ${({ disabled }) => disabled && 'rgba(0,0,0,0.05)'};
  border: 1px solid #e3eaef !important;
  transition: 0.2s background;
  &:focus {
    background: #e3f2fd;
  }
`

const StyledTextArea = styled.textarea`
  width: 100%;
  margin: auto;
  max-width: 100%;
  box-sizing: border-box;
  padding: 12px;
  outline: none;
  border-radius: 3px;
  border: 1px solid #e3eaef !important;
`

/*
|--------------------------------------------------------------------------
| Base Template Components
|--------------------------------------------------------------------------
*/

export const TextInput = ({
  width,
  label,
  type = 'text',
  value = '',
  onChange,
  labelStyle = {},
  placeholder = '',
  isValid,
  disabled = false,
  inputStyle = {},
  handleSaveChange,
  lastSavedValue,
}) => {
  const [isSaving, setIsSaving] = useState(false)
  return (
    <TextInputContainer width={width}>
      <FormInputLabel>{label}</FormInputLabel>
      <StyledTextInput
        style={inputStyle}
        disabled={disabled}
        placeholder={placeholder}
        min={0}
        max={100}
        type={type}
        value={value}
        onChange={!!onChange && onChange}
        onBlur={async () => {
          if (!!handleSaveChange && value !== lastSavedValue) {
            setIsSaving(true)
            await handleSaveChange()
            setIsSaving(false)
          }
        }}
      />
      {isValid === true && (
        <FontAwesomeIcon
          color='#2e7d32'
          style={{ position: 'absolute', top: '50%', right: '14px' }}
          icon={faCheck}
        />
      )}
      {isValid === false && (
        <FontAwesomeIcon
          color='tomato'
          style={{ position: 'absolute', top: '50%', right: '14px' }}
          icon={faExclamationTriangle}
        />
      )}
    </TextInputContainer>
  )
}

export const TextArea = ({
  label,
  characterCountLimit,
  onChange,
  value = '',
  width = '100%',
  isValid,
  placeholder,
}) => {
  return (
    <TextInputContainer width={width}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormInputLabel>{label}</FormInputLabel>
        <div>
          {!!characterCountLimit && (
            <div style={{ fontSize: '14px' }}>
              Characters left:{' '}
              {Math.max(0, characterCountLimit - get(value, 'length', 0))}
            </div>
          )}
        </div>
      </div>
      <StyledTextArea
        placeholder={placeholder}
        value={
          !!characterCountLimit
            ? (value || '').substring(0, characterCountLimit - 1)
            : value
        }
        onChange={!!onChange && onChange}
      />
      {isValid === true && (
        <FontAwesomeIcon
          color='#2e7d32'
          style={{ position: 'absolute', bottom: '12px', right: '12px' }}
          icon={faCheck}
        />
      )}
      {isValid === false && (
        <FontAwesomeIcon
          color='tomato'
          style={{ position: 'absolute', bottom: '12px', right: '12px' }}
          icon={faExclamationTriangle}
        />
      )}
    </TextInputContainer>
  )
}
