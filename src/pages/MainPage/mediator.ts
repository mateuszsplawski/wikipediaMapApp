import geolocationAPI from "services/geolocation";
import { Coords } from "google-map-react";
import { debounce } from "lodash";

import { Articles, wikiArticlesGetResponse } from "types/index";
import useMapStore from "pages/MainPage/state";
import wikiApiClient from "services/api/wikipedia";
import localStorageDB from "services/localStorageDB";

type Event =
  | "mapLoaded"
  | "searchBarItemSelected"
  | "markerClicked"
  | "redirectButtonClicked"
  | "drawerButtonClicked";
type Listeners = Record<Event, Function>;

const listeners: Listeners = {
  mapLoaded: () => null,
  searchBarItemSelected: () => null,
  markerClicked: () => null,
  redirectButtonClicked: () => null,
  drawerButtonClicked: () => null,
};

const attachListener = (eventName: Event, listener: Function) =>
  (listeners[eventName] = listener);

const mapWikiApiResponse = (response: wikiArticlesGetResponse) => {
  return response.query.geosearch.map(({ lat, lon, pageid, title }) => ({
    lat,
    pageid,
    lng: lon,
    title,
    isViewed: false,
  }));
};

const mapReadArticles = (articles: Articles[]) =>
  articles.map((article) => ({
    ...article,
    isViewed: localStorageDB.isArticleRead({
      title: article.title,
    }),
  }));

const debounceFunction = ({
  fn,
  debounceTime,
}: {
  fn: () => void;
  debounceTime: number;
}) => {
  return debounce(fn, debounceTime);
};

let map: any;

const useMediator = () => {
  const [
    ,
    {
      addMarkers,
      setGoogleApiLoadedStatus,
      setModalStatus,
      setMarkerStatus,
      setDrawerStatus,
      saveCurrentLocation,
      displayRedirectNotification,
    },
  ] = useMapStore();

  const handleMapCenterChange = async () => {
    const coords = map.center.toJSON();
    const response = await wikiApiClient.getArticles({ coords, limit: 50 });
    const articles = mapWikiApiResponse(response);

    addMarkers(mapReadArticles(articles));
  };

  const handleMapLoad = (googleMapInstance: any) => {
    setGoogleApiLoadedStatus({ isGoogleApiLoaded: true });
    map = googleMapInstance;
    map.addListener(
      "idle",
      debounceFunction({ fn: handleMapCenterChange, debounceTime: 750 })
    );
  };

  const handleSearchBarItemSelect = (selectedItemCoords: Coords) => {
    map.setCenter(selectedItemCoords);
  };

  const handleMarkerClick = async ({
    pageid,
    coords,
  }: {
    pageid: number;
    coords: Coords;
  }) => {
    const article = await wikiApiClient.getArticle({ pageid });
    const articleUrl = Object.values(article.query.pages)[0].fullurl.replace(
      ".wikipedia.org",
      ".m.wikipedia.org"
    );
    const title = Object.values(article.query.pages)[0].title;

    setModalStatus({
      isVisible: true,
      modalData: { title, url: articleUrl },
    });
    setMarkerStatus({ title, isViewed: true });

    localStorageDB.setArticleAsRead({ title, coords });
  };

  const handleRedirectButtonClick = ({
    inDrawer,
    coords,
  }: {
    inDrawer: boolean;
    coords: {} | Coords;
  }) => {
    if (inDrawer) {
      map.setCenter(coords);
      setDrawerStatus({ isVisible: false, data: [] });
    } else {
      const getUserCoords = async () => {
        displayRedirectNotification({ stage: "fetching" });
        try {
          const response = (await geolocationAPI.getCurrentCoords()) as any;
          const coords = {
            lat: response.coords.latitude,
            lng: response.coords.longitude,
          };
          map.setCenter(coords);
          saveCurrentLocation({ coords });
          displayRedirectNotification({ stage: "success" });
        } catch (err) {
          console.error(err.message);
          displayRedirectNotification({ stage: "error" });
        }
      };
      getUserCoords();
    }
  };

  const handleViewedArticleButtonClick = () => {
    const readArticles = localStorageDB.getReadArticles();
    setDrawerStatus({ isVisible: true, data: readArticles });
  };

  attachListener("redirectButtonClicked", handleRedirectButtonClick);
  attachListener("markerClicked", handleMarkerClick);
  attachListener("mapLoaded", handleMapLoad);
  attachListener("searchBarItemSelected", handleSearchBarItemSelect);
  attachListener("drawerButtonClicked", handleViewedArticleButtonClick);
};

export const emit = (eventName: Event, ...args: any[]) => {
  const listener = listeners[eventName];
  listener(...args);
};

export const Mediator: React.FC = () => {
  useMediator();
  return null;
};

export default Mediator;
