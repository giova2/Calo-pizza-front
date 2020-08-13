import styled, { css } from "styled-components";
import breakpoint from "styled-components-breakpoint";
import { OrderItemEnum } from "../types";

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
    height: 90vh;
  `}
  ${breakpoint("tablet")`
    width: 60vw;
    height: 70vh;
  `}
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

export const OrderHeader = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSize.main};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const OrderInfo = styled.div`
  display: flex;
  justify-content: center;
  ${breakpoint("mobile")`
    flex-direction: column;
    align-items: center;
  `};
  ${breakpoint("tablet")`
    flex-direction: row;
    align-items: baseline;
  `};
`;

export const OrderTable = styled.table`
  ${breakpoint("mobile")`
    margin: 0.5rem 1.25rem 0 1.25rem;
    width:100%; 
  `};
  ${breakpoint("tablet")`
    margin: 0.25rem;
    width:50%;
  `};
  height: 100%;
  flex-grow: 1;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.main};
  border-collapse: collapse;
`;
export const OrderTableBody = styled.tbody``;

const chooseBackground = (type: OrderItemEnum) => {
  switch (type) {
    case OrderItemEnum.header:
      return "#ffffff";
    case OrderItemEnum.fees:
      return "#f6ee0d55";
    case OrderItemEnum.total:
      return "#4a934655";
    case OrderItemEnum.subtotal:
      return "#cf373755";
    default:
      return "#cf373733";
  }
};
const chooseFontWeight = (type: OrderItemEnum) => {
  switch (type) {
    case OrderItemEnum.header:
      return "bolder";
    case OrderItemEnum.total:
    case OrderItemEnum.subtotal:
      return "bold";
    default:
      return "normal";
  }
};

const chooseBorderBottom = (type: OrderItemEnum) => {
  switch (type) {
    case OrderItemEnum.header:
      return "2px solid black";
  }
};
const chooseBorderTop = (type: OrderItemEnum) => {
  switch (type) {
    case OrderItemEnum.total:
      return "2px solid black";
  }
};
export const OrderItem = styled.tr<{ type?: OrderItemEnum }>`
  background: ${({ type }) => type && chooseBackground(type)};
  font-weight: ${({ type }) => type && chooseFontWeight(type)};
  width: 100%;
`;

export const OrderItemProperty = styled.td<{ type?: OrderItemEnum }>`
  border-bottom: ${({ type }) => type && chooseBorderBottom(type)};
  border-top: ${({ type }) => type && chooseBorderTop(type)};
  ${breakpoint("mobile")`
    padding: 0;
  `}
  ${breakpoint("tablet")`
    padding: 0.25rem;
  `}
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

export const Button = styled.button`
  background: ${({ theme }) => theme.backgroundColors.main};
  padding: 0.5rem;
  /* margin: 0.25rem; */
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  font-weight: bold;
  font-family: ${({ theme }) => theme.fonts.secondary};
`;
