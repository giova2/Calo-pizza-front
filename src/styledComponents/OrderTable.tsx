import styled, { css } from "styled-components";
import breakpoint from "styled-components-breakpoint";
import { OrderItemEnum } from "../types";

export const OrderTable = styled.table`
  ${breakpoint("mobile")`
    margin: 0.5rem 1.25rem 0 1.25rem;
    width:100%;
    height: auto;
  `};
  ${breakpoint("tablet")`
    margin: 0.25rem;
    width:50%;
    height: 100%;
  `};
  flex-grow: 1;
  background: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSize.secondary};
  color: ${({ theme }) => theme.colors.main};
  border-collapse: collapse;
  border: 1px solid black;
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
    case OrderItemEnum.item:
      return "1px solid grey";
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
  border-bottom: ${({ type }) => type && chooseBorderBottom(type)};
  border-top: ${({ type }) => type && chooseBorderTop(type)};
  width: 100%;
`;

const flexProps = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const OrderItemProperty = styled.td<{
  type?: OrderItemEnum;
  flex?: any;
}>`
  ${({ flex }) => (flex ? flexProps : "")};
  ${breakpoint("mobile")`
    padding: 0;
  `}
  ${breakpoint("tablet")`
    padding: 0.25rem;
  `}
`;
