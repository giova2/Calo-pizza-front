import styled, { css } from "styled-components";
import breakpoint from "styled-components-breakpoint";
import AddOutlineSVG from "../assets/images/add_circle_outline.svg";
import AddSVG from "../assets/images/add_circle.svg";
import AddSVGColored from "../assets/images/add_circle_colored.svg";
import RemoveOutlineSVG from "../assets/images/remove_circle_outline.svg";
import RemoveSVG from "../assets/images/remove_circle.svg";
import RemoveSVGDisabled from "../assets/images/remove_circle_disabled.svg";
import RemoveSVGColored from "../assets/images/remove_circle_colored.svg";

export const ItemContainer = styled.div`
  ${breakpoint("mobile")`
    width: 100%;
  `}

  ${breakpoint("tablet")`
    width: 30%;
  `}
  height: 30vh;
  min-height: 250px;
  margin: 1.666%;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

export const ItemTop = styled.div`
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const ItemMiddle = styled(ItemTop)`
  height: 20%;
  font-size: ${({ theme }) => theme.fontSize.main};
`;

export const ItemBottom = styled(ItemTop)`
  height: 40%;
  padding-left: 5px;
  padding-right: 5px;
`;

export const ItemInteraction = styled.div<{ state: any }>`
  background: rgba(0, 0, 0, 0.85);
  width: 100%;
  height: 100%;
  transition: 0.5s;
  transform: translateY(
    ${({ state }) =>
      state === "entering" || state === "entered" ? "-100%" : "0%"}
  );
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SVGSize = "50px";

const cssButtonSize = css`
  width: 33.3%;
  height: ${SVGSize};
  margin: 1rem;
  cursor: pointer;
`;

const cssButtonBackground = css`
  color: ${({ theme }) => theme.colors.secondary};
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: center;
`;

export const AddButton = styled.div`
  ${cssButtonSize};
  ${cssButtonBackground};
  background-image: url(${AddOutlineSVG});
  &:hover {
    background-image: url(${AddSVG});
  }
  &:active {
    background-image: url(${AddSVGColored});
  }
`;

export const RemoveButton = styled(AddButton)<{ disabled?: any }>`
  background-image: ${(props: any) =>
    props.disabled
      ? "url(" + RemoveSVGDisabled + ")"
      : "url(" + RemoveOutlineSVG + ")"};
  &:hover {
    background-image: ${(props: any) =>
      props.disabled
        ? "url(" + RemoveSVGDisabled + ")"
        : "url(" + RemoveSVG + ")"};
  }
  &:active {
    background-image: ${(props: any) =>
      props.disabled
        ? "url(" + RemoveSVGDisabled + ")"
        : "url(" + RemoveSVGColored + ")"};
  }
`;

export const ItemQuantity = styled.span`
  width: 33.3%;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${SVGSize};
  font-weight: bold;
`;

const orderTableButtonSize = css`
  width: 1.5rem;
  height: 1.5rem;
  margin: 0;
`;

export const AddButtonTable = styled(AddButton)`
  ${orderTableButtonSize}
  ${cssButtonBackground}
  filter: invert(1);
  margin-left: 0.25rem;
`;

export const RemoveButtonTable = styled(RemoveButton)`
  ${orderTableButtonSize}
  ${cssButtonBackground}
  margin-right: 0.25rem;
  filter: invert(1);
`;
