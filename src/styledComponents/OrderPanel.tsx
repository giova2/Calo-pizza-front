import styled, { css } from "styled-components";
import breakpoint from "styled-components-breakpoint";

export const OrderPanelContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const OrderPanel = styled.div<{ state: any }>`
  ${breakpoint("mobile")`
    width: 95vw;
  `}
  ${breakpoint("tablet")`
    width: 60vw;
  `}
  height:auto;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.main};
  overflow: auto;
  border: 1rem solid black;
  transition: 0.5s;
  transform: scaleY(
    ${({ state }) =>
      state === "entering" || state === "entered" ? "1" : "0.1"}
  );
`;

export const OrderClosePanel = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.mobile};
  position: absolute;
  margin-top: 0.5rem;
  height: ${({ theme }) => theme.fontSize.main};
  /* this is because needs to be same height than the header to be aligned */
`;

export const Close = styled.span`
  cursor: pointer;
  ${breakpoint("mobile")`
    padding-right: 0;
  `}
  ${breakpoint("tablet")`
    padding-right: ${({ theme }) => theme.fontSize.mobile};
  `}
`;
export const Clear = styled.button`
  width: fit-content;
  align-self: center;
  position: relative;
  color: ${({ theme }) => theme.colors.main};
  cursor: pointer;
  font-weight: bold;
  margin: 0.25rem;
  &::before {
    content: "🗑";
    margin-right: 0.75rem;
  }
  max-height: 10vh;
`;

export const OrderHeader = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSize.main};
  color: ${({ theme }) => theme.colors.secondary};
  max-height: 20vh;
`;

export const OrderInfo = styled.div`
  display: flex;
  overflow: auto;
  max-height: 65vh;
  ${breakpoint("mobile")`
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  `};
  ${breakpoint("tablet")`
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
  `};
`;

const formStyles = css`
  ${breakpoint("mobile")`
      width:100%;
  `}
  ${breakpoint("tablet")`
    width: 50%;
  `}
  padding: 0.25rem;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

export const MyForm = styled.form`
  ${formStyles};
`;

export const NoItemsOrder = styled.div`
  ${formStyles};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const ErrorMsg = styled.span<{ severity?: string }>`
  ${breakpoint("mobile")`
    padding: 0.25rem;
    font-size: 0.8rem;
  `}
  ${breakpoint("tablet")`
    padding: 0.5rem;
    font-size: 1rem;
  `}
  background: ${({ theme, severity }) =>
    severity
      ? theme.backgroundColors.info
      : theme.backgroundColors.secondary}77;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const InputDelivery = styled.input`
  padding: 0.5rem;
  /* margin: 0.25rem; */
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

export const Button = styled.button<{ disable: boolean }>`
  background: ${({ theme, disable }) =>
    disable ? "grey" : theme.backgroundColors.main};
  cursor: ${({ disable }) => (disable ? "default" : "pointer")};
  padding: 0.5rem;
  /* margin: 0.25rem; */
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.secondary};
`;
