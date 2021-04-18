import styled from "styled-components";

export const StyledMapMarker = styled.button<{
  isViewed: boolean;
  viewedMarkerColor?: string;
  mainMarkerColor?: string;
}>`
  width: 1.4rem;
  height: 1.4rem;
  border: unset;
  border-radius: 50%;
  background: white;
  opacity: 70%;
  cursor: pointer;
  transition: opacity 0.5s;
  will-change: opacity;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 5px
    ${({ isViewed, theme }) =>
      isViewed
        ? theme.colors.viewedMarkerShadow
        : theme.colors.mainMarkerShadow};

  svg {
    color: ${({ isViewed, theme, viewedMarkerColor, mainMarkerColor }) =>
      isViewed
        ? viewedMarkerColor
          ? viewedMarkerColor
          : theme.colors.viewedMarkerBg
        : mainMarkerColor
        ? mainMarkerColor
        : theme.colors.mainMarkerShadow};
    font-size: 1.6rem;
  }

  &:hover {
    opacity: unset;
  }
`;
