import styled, { keyframes } from "styled-components";

const breathe = keyframes`
  0%{ transform: scale(0.75);}
  50%{ transform: scale(1);}
  100%{ transform: scale(0.75);}
`;

const Gralwidth = 40;

export const ShoppingCartButton = styled.div<{ quantity: number | undefined }>`
  display: ${({ quantity }) => (quantity ? "inline-block" : "none")};
  width: ${Gralwidth}px;
  height: ${Gralwidth}px;
  position:relative;
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSize.secondary};
  &::after{
    content: "${({ quantity }) => (quantity ? quantity : "")}";
    width: ${Gralwidth / 2}px;
    height: ${Gralwidth / 2}px;
    padding: 4px;
    background: ${({ theme }) => theme.backgroundColors.secondary};
    border-radius: 50%;
    color: ${({ theme }) => theme.colors.secondary};
    position: absolute;
    left: 100%;
    top: -20%;
    line-height:1.4;
  }
`;

export const ShoppingCartImg = styled.img<{
  visible: boolean | undefined;
  animate: boolean | undefined;
}>`
  display: ${({ visible }) => (visible ? "inline-block" : "none")};
  width: ${Gralwidth}px;
  height: ${Gralwidth}px;
  cursor: pointer;
  animation: ${({ animate }) => (animate ? breathe : null)};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

export const OrderTableHoverContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: ${Gralwidth}px;
  left: ${Gralwidth}px;
`;
