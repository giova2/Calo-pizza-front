import styled from "styled-components";

export const CurrencyContainer = styled.div``;

export const Currency = styled.img<{ selected: boolean }>`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin: 5px;
  &:hover {
    opacity: ${({ selected }) => (selected ? 1 : 0.5)};
  }
`;
