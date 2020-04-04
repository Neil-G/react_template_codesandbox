import React from 'react'
import styled from 'styled-components'
import chroma from 'chroma-js'

export const configureButton = ({ color, background, borderColor }) => {
  const hoverBg = chroma(background).darken(0.4)
  return styled.button`
    border: 1px solid ${borderColor || background};
    font-weight: 550;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 18px;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    width: fit-content;
    color: ${color};
    background: ${background};
    transition: background 250ms;
    font-size: 16px;
    outline: none;
    &:hover {
      background: ${hoverBg};
    }
    @media (max-width: 720px) {
      font-size: 12px;
    }
  `
}

const buttonConfigs = {
  primary: {
    color: 'whitesmoke',
    background: '#0F8B8D',
  },
  white: {
    color: '#333',
    background: 'white',
    borderColor: '#eeeeee',
  },
}

export const PrimaryButton = configureButton(buttonConfigs.primary)
export const WhiteButton = configureButton(buttonConfigs.white)

export default {
  Primary: PrimaryButton,
  White: WhiteButton,
}
