import { debounce } from "lodash";
import { ReactNode } from "react";
import { notification } from "antd";
import { Coords } from "google-map-react";

import localStorageDB from "services/localStorageDB";
import { wikiArticlesGetResponse, Articles } from "types";

export const initializeGoogleSearchBar = ({
  inputId,
  callback,
}: {
  inputId: string;
  callback: ({ coords, title }: { coords: Coords; title: string }) => void;
}) => {
  const input = document.getElementById(inputId) as HTMLInputElement;
  const searchBox = new (window as any).google.maps.places.SearchBox(input);
  searchBox.addListener("places_changed", () => {
    const selectedItem = searchBox.getPlaces();
    const selectedItemCoords = selectedItem[0].geometry.location.toJSON();
    callback({ coords: selectedItemCoords, title: selectedItem[0].title });
  });
};

export const createRedirectNotification = ({
  stage,
  btn,
}: {
  stage: "initial" | "fetching" | "success" | "error";
  btn?: ReactNode;
}) => {
  if (stage === "initial") {
    notification.info({
      message: "Redirect to current location",
      description: "Check your location settings before.",
      btn,
    });
  } else if (stage === "fetching") {
    notification.destroy();
    notification.info({ message: "Getting your location information" });
  } else if (stage === "success") {
    notification.success({ message: "Redirecting" });
  } else if (stage === "error") {
    notification.error({
      message: "Something went wrong",
      description: "Please, check again your location settings.",
    });
  }
};

export const mapWikiApiResponse = (response: wikiArticlesGetResponse) => {
  return response.query.geosearch.map(({ lat, lon, pageid, title }) => ({
    lat,
    pageid,
    lng: lon,
    title,
    isViewed: false,
  }));
};

export const debounceFunction = ({
  fn,
  debounceTime,
}: {
  fn: () => void;
  debounceTime: number;
}) => {
  return debounce(fn, debounceTime);
};

export const mapReadArticles = (articles: Articles[]) =>
  articles.map((article) => ({
    ...article,
    isViewed: localStorageDB.isArticleRead({
      title: article.title,
    }),
  }));
