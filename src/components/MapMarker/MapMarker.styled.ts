import styled from "styled-components";

export const StyledMapMarker = styled.button<{ isViewed: boolean }>`
  width: 30px;
  height: 30px;
  background: ${({ isViewed }) => (isViewed ? "#237bffe0" : "#fa8c16")};
  box-shadow: 0px 0px 5px
    ${({ isViewed }) => (isViewed ? "#698bff" : "#ffa769")};
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
