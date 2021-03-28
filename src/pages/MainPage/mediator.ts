import { wikiArticlesGetResponse } from "services/api/wikipedia";
import useMapStore from "pages/MainPage/state";
import { Coords } from "google-map-react";

import wikiApiClient from "services/api/wikipedia";

type Event =
  | "mapDragged"
  | "mapLoaded"
  | "searchBarItemSelected"
  | "markerClicked";
type Listeners = Record<Event, Function>;

const listeners: Listeners = {
  mapDragged: () => null,
  mapLoaded: () => null,
  searchBarItemSelected: () => null,
  markerClicked: () => null,
};

const attachListener = (eventName: Event, listener: Function) =>
  (listeners[eventName] = listener);

const mapWikiApiResponse = (response: wikiArticlesGetResponse) => {
  return response.query.geosearch.map(({ lat, lon, pageid, title }) => ({
    lat,
    pageid,
    lng: lon,
    title,
  }));
};

let map: any;

const useMediator = () => {
  const [
    ,
    { addMarkers, setGoogleApiLoadedStatus, setModalStatus },
  ] = useMapStore();

  const handleMapDragging = async (coord: Coords) => {
    const articles = await wikiApiClient.getArticles({ coord });
    addMarkers(mapWikiApiResponse(articles));
  };

  const handleMapLoad = (googleMapInstance: any) => {
    setGoogleApiLoadedStatus({ isGoogleApiLoaded: true });
    map = googleMapInstance;
  };

  const handleSearchBarItemSelect = (selectedItemCoords: Coords) => {
    map.setCenter(selectedItemCoords);
  };

  const handleMarkerClick = async (pageid: number) => {
    const article = await wikiApiClient.getArticle({ pageid });
    const articleUrl = Object.values(article.query.pages)[0].fullurl.replace(
      ".wikipedia.org",
      ".m.wikipedia.org"
    );
    const articleTitle = Object.values(article.query.pages)[0].title;
    setModalStatus({
      isVisible: true,
      modalData: { title: articleTitle, url: articleUrl },
    });
  };

  attachListener("markerClicked", handleMarkerClick);
  attachListener("mapLoaded", handleMapLoad);
  attachListener("mapDragged", handleMapDragging);
  attachListener("searchBarItemSelected", handleSearchBarItemSelect);
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
