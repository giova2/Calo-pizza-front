import styled from "styled-components";

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
