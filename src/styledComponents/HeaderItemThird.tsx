import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import GoogleSVG from "../assets/images/google-icon.svg";

export const CurrencyContainer = styled.div`
  ${breakpoint("mobile")`
      width: 100%;
      order:1;
  `}
  ${breakpoint("tablet")`
      width: 50%;
      order:0;
  `}
  
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Currency = styled.img<{ selected: boolean }>`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin: 5px;
  &:hover {
    opacity: ${({ selected }) => (selected ? 1 : 0.5)};
  }
`;

export const LoginContainer = styled.div`
  ${breakpoint("mobile")`
      width: 100%;
  `}
  ${breakpoint("tablet")`
      width: 50%;
  `}
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const LoginAction = styled.a`
  font-family: "Montserrat";
  font-size: 1rem;
  margin: 0.5rem;
  cursor: pointer;
`;

export const GoogleIcon = styled.div<{ before: string }>`
  width: 30px;
  height: 30px;
  background-image: url(${GoogleSVG});
  background-position: center;
  background-size: cover;
  position:relative;
  &::before{
    ${breakpoint("mobile")`
        color: ${({ theme }) => theme.colors.main};
        left: 50%;
        top: 100%;
        transform: translateX(-50%);
      `}
      ${breakpoint("tablet")`
        color: ${({ theme }) => theme.colors.secondary};
        left: 0;
        top: 15%;
        transform: translateX(-105%);
      `}
    content: "${({ before }) => before}";
    
    position: absolute;
    font-weight: bold;
  }
`;
