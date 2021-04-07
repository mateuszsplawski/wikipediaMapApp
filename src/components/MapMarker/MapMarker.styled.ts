import styled from "styled-components";

export const StyledMapMarker = styled.button<{ isViewed: boolean }>`
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
        ? theme.colors.mainMarkerShadow
        : theme.colors.viewedMarkerShadow};

  svg {
    color: ${({ isViewed, theme }) =>
      isViewed ? theme.colors.mainMarkerBg : theme.colors.viewedMarkerShadow};
    font-size: 1.6rem;
  }

  &:hover {
    opacity: unset;
  }
`;
