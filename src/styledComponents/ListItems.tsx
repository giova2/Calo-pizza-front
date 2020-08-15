import styled, { css } from "styled-components";

export const ContainerListItems = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: ${({ theme }) => theme.menu.height};
  overflow-y: auto;
`;

export const ListItems = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.secondary};
  flex-wrap: wrap;
  overflow-y: auto;
`;

export const HeaderList = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.main};
  font-family: ${({ theme }) => theme.fonts.main};
`;

const FilterCss = css`
  font-size: ${({ theme }) => theme.fontSize.secondary};
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-weight: bold;
  margin: 0.25rem;
  padding: 0.5rem;
  text-transform: capitalize;
`;

export const ButtonSize = styled.button<{ selected: boolean }>`
  ${FilterCss};
  background: ${({ theme }) => theme.backgroundColors.info};
  filter: ${({ selected }) => (selected ? "invert(1)" : "invert(0)")};
  border: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    opacity: ${({ selected }) => (selected ? 1 : 0.5)};
  }
`;

export const SearchDiv = styled.div`
  display: inline-block;
  position: relative;
  &::after {
    content: "🔎";
    position: absolute;
    top: 50%;
    transform: translate(100%, -50%);
    right: 15%;
  }
`;

export const SearchInput = styled.input`
  ${FilterCss};
`;
