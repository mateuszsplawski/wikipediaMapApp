import styled from "styled-components";

export const StyledMapMarker = styled.button<{ isViewed: boolean }>`
  width: 30px;
  height: 30px;
  background: ${({ isViewed, theme }) =>
    isViewed ? theme.colors.mainMarkerBg : theme.colors.viewedMarkerShadow};
  box-shadow: 0px 0px 5px
    ${({ isViewed, theme }) =>
      isViewed
        ? theme.colors.mainMarkerShadow
        : theme.colors.viewedMarkerShadow};
  border: unset;
  border-radius: 50%;
  opacity: 70%;
  cursor: pointer;
  transition: opacity 0.5s;
  will-change: opacity;

  &:hover {
    opacity: unset;
  }
`;
