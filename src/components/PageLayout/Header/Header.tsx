import { Input } from "antd";
import { useEffect } from "react";

import useMapStore from "pages/MainPage/state";
import { StyledHeader, StyledLogo } from "./Header.styled";
import { emit } from "pages/MainPage/mediator";
import content from "constant/content.json";

export const Header: React.FC = () => {
  const [{ isGoogleApiLoaded }] = useMapStore();
  const inputId = "searchBar";

  useEffect(() => {
    if (isGoogleApiLoaded) {
      const input = document.getElementById(inputId) as HTMLInputElement;
      const searchBox = new (window as any).google.maps.places.SearchBox(input);
      searchBox.addListener("places_changed", () => {
        const selectedItem = searchBox.getPlaces();
        const selectedItemCoords = selectedItem[0].geometry.location.toJSON();
        emit("searchBarItemSelected", selectedItemCoords);
      });
    }
  }, [isGoogleApiLoaded]);
  return (
    <StyledHeader>
      <StyledLogo>
        <h2>{content.header.logo}</h2>
      </StyledLogo>
      <label htmlFor={inputId}>
        <Input id={inputId} placeholder={content.header.placeholder} />
      </label>
    </StyledHeader>
  );
};
