import styled, { keyframes } from "styled-components";

const breathe = keyframes`
  0%{ transform: scale(0.85);}
  50%{ transform: scale(1.3);}
  100%{ transform: scale(0.85);}
`;

export const ShoppingCartButton = styled.img<{
  visible: boolean | undefined;
  animate: boolean | undefined;
}>`
  display: ${({ visible }) => (visible ? "inline-block" : "none")};
  width: 30px;
  height: 30px;
  cursor: pointer;
  animation: ${({ animate }) => (animate ? breathe : null)};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;
