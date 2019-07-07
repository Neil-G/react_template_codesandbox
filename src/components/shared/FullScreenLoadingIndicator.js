import React from "react";
import styled from "styled-components";

/*
|--------------------------------------------------------------------------
| Styled Components
|--------------------------------------------------------------------------
*/

const Container = styled.div`
  position: fixed;
  top: -10px;
  right: -10px;
  bottom: -10px;
  left: -10px;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;

const LoadingMessageContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background: white;
  padding: 18px;
`;
/*
|--------------------------------------------------------------------------
| Main Export
|--------------------------------------------------------------------------
*/

export default ({ text }) => {
  return (
    <Container>
      <LoadingMessageContainer>{text}</LoadingMessageContainer>
    </Container>
  );
};
