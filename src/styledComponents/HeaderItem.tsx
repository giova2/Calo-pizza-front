import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";

export const HeaderItem = styled.div<{ flexEnd?: any }>`
  align-self: ${(props: any) => (props.flexEnd ? "flex-end" : "center")};
  width: 33.3%;
`;

export const OrdersMade = styled.div<{ visible: boolean | undefined }>`
  position: absolute;
  top: calc(${({ theme }) => theme.header.height} - 5vh);
  left: 1.666%;
  width: 33%;
  height: 20vh;
  display: ${({ visible }) => (visible ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
`;

export const PizzaImg = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

export const PanelLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  z-index: 1;
`;

export const Panel = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  background: black;
  ${breakpoint("mobile")`
    padding: 0.5rem;
    margin: 0.5rem;
  `}
  ${breakpoint("tablet")`
    padding: 1rem;
    margin: 1rem;
  `}
  font-size: ${({ theme }) => theme.fontSize.secondary};
  font-family: ${({ theme }) => theme.fonts.secondary};
  overflow: auto;
  position: relative;
`;

export const PanelHeader = styled.div`
  font-family: ${({ theme }) => theme.fonts.main};
  font-size: ${({ theme }) => theme.fontSize.main};
`;

export const PanelTable = styled.table`
  border-color: ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.backgroundColors.main};
  & td {
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    padding: 0.5rem;
  }
  & th {
    font-weight: bold;
    padding: 0.5rem;
    border: 2px solid ${({ theme }) => theme.colors.secondary};
  }
`;

export const ClosePanel = styled.div`
  ${breakpoint("mobile")`
    width: 90%;
  `}
  ${breakpoint("tablet")`
    width: 100%;
  `}
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.mobile};
  position: absolute;
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
