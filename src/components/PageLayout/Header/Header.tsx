import { Input, Button, Space, Badge } from "antd";
import { BookOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import useMapStore from "pages/MainPage/state";
import { StyledHeader, StyledLogo } from "./Header.styled";
import { emit } from "pages/MainPage/mediator";
import content from "constant/content.json";
import localStorageDB from "services/localStorageDB";
import RedirectButton from "components/RedirectButton";
import { initializeGoogleSearchBar } from "utils";

export const Header: React.FC = () => {
  const inputId = "searchBar";

  const [{ isGoogleApiLoaded }] = useMapStore();
  const [inputValue, setInputValue] = useState("");

  const handleClick = () => {
    emit("drawerButtonClicked");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  useEffect(() => {
    if (isGoogleApiLoaded) {
      initializeGoogleSearchBar({
        inputId,
        callback: ({ coords, title }) => {
          setInputValue(title);
          emit("searchBarItemSelected", coords);
        },
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
            onChange={handleChange}
          />
        </label>
        <Space size="large">
          <Badge count={localStorageDB.getReadArticlesCount()}>
            <Button icon={<BookOutlined />} onClick={handleClick}>
              Viewed articles
            </Button>
          </Badge>
          <RedirectButton />
        </Space>
      </Space>
    </StyledHeader>
  );
};
