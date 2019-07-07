import React from "react";
import styled from "styled-components";

export default ({ isOn, text }) => {
  if (!isOn) return null;
  return <div>{text}</div>;
};
