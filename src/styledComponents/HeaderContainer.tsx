import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";

export const HeaderContainer = styled.div`
  font-family: ${({ theme }) => theme.fonts.main};
  ${breakpoint("mobile")`
    font-size: ${({ theme }) => theme.fontSize.mobile};
  `}
  ${breakpoint("tablet")`
    font-size: ${({ theme }) => theme.fontSize.main};
  `}
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: center;
`;
