import styled, { keyframes } from "styled-components";
import PizzaSVG from "../assets/images/pizza-loading.svg";

const breatheSpin = keyframes`
  0%{ 
      transform: scale(0.75) rotate(0deg);
      
      }
  50%{ transform: scale(1) rotate(360deg);}
  100%{ transform: scale(0.75) rotate(720deg);}
`;

export const LoadingContainer = styled.div<{
  customHeight?: string;
  show: boolean;
}>`
  width: 100%;
  height: ${({ customHeight, theme }) =>
    customHeight ? theme.menu.height : "100%"};
  background: rgba(0, 0, 0, 0.5);
  display: ${({ show }) => (show === true ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 999;
`;

export const LoadingText = styled.div``;

export const LoadingImg = styled.div`
  background-image: url(${PizzaSVG});
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100px;
  height: 100px;
  animation: ${breatheSpin};
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;
