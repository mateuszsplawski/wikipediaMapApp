import { Input, Button, Space, Badge } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import useMapStore from "pages/MainPage/state";
import { StyledHeader, StyledLogo } from "./Header.styled";
import { emit } from "pages/MainPage/mediator";
import content from "constant/content.json";
import localStorageDB from "services/localStorageDB";
import RedirectButton from "components/RedirectButton";

export const Header: React.FC = () => {
  const [{ isGoogleApiLoaded }] = useMapStore();
  const inputId = "searchBar";

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (isGoogleApiLoaded) {
      const input = document.getElementById(inputId) as HTMLInputElement;
      const searchBox = new (window as any).google.maps.places.SearchBox(input);
      searchBox.addListener("places_changed", () => {
        const selectedItem = searchBox.getPlaces();
        const selectedItemCoords = selectedItem[0].geometry.location.toJSON();
        setInputValue(selectedItem[0].name);
        emit("searchBarItemSelected", selectedItemCoords);
      });
    }
  }, [isGoogleApiLoaded]);
  return (
    <StyledHeader>
      <StyledLogo>
        <h2>{content.header.logo}</h2>
      </StyledLogo>
      <Space size="large">
        <label htmlFor={inputId}>
          <Input
            id={inputId}
            placeholder={content.header.placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
          />
        </label>
        <Space size="large">
          <Badge count={localStorageDB.getReadArticlesCount()}>
            <Button
              icon={<BookOutlined />}
              onClick={() => emit("drawerButtonClicked")}
            >
              Viewed articles
            </Button>
          </Badge>
          <RedirectButton />
        </Space>
      </Space>
    </StyledHeader>
  );
};
