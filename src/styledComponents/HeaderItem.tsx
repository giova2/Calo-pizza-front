import styled, { css } from "styled-components";

const DFlexCentered = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderItem = styled.div<{ flexEnd?: any; itemsCentered?: any }>`
  align-self: ${(props: any) => (props.flexEnd ? "flex-end" : "center")};
  width: 33.3%;
  ${({ itemsCentered }) => (itemsCentered ? DFlexCentered : "")};
  position: relative;
`;
