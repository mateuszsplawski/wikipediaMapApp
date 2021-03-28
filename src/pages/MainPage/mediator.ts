import { wikiGetResponse } from "services/api/wikipedia";
import useMapStore from "pages/MainPage/state";
import { Coords } from "google-map-react";

import wikiApiClient from "services/api/wikipedia";

type Event = "mapDragged" | "mapLoaded" | "searchBarItemSelected";
type Listeners = Record<Event, Function>;

const listeners: Listeners = {
  mapDragged: () => null,
  mapLoaded: () => null,
  searchBarItemSelected: () => null,
};

const attachListener = (eventName: Event, listener: Function) =>
  (listeners[eventName] = listener);

const mapWikiApiResponse = (response: wikiGetResponse) => {
  return response.query.geosearch.map(({ lat, lon, pageid, title }) => ({
    lat,
    pageid,
    lng: lon,
    title,
  }));
};

let map: any;

const useMediator = () => {
  const [, { addMarkers, setGoogleApiLoadedStatus }] = useMapStore();

  const handleMapDragging = async (coord: Coords) => {
    const articles = await wikiApiClient.getArticles({ coord });
    addMarkers(mapWikiApiResponse(articles));
  };
  attachListener("mapDragged", handleMapDragging);

  const handleMapLoad = (googleMapInstance: any) => {
    setGoogleApiLoadedStatus(true);
    map = googleMapInstance;
  };
  attachListener("mapLoaded", handleMapLoad);
};

const handleSearchBarItemSelect = (selectedItemCoords: Coords) => {
  map.setCenter(selectedItemCoords);
};
attachListener("searchBarItemSelected", handleSearchBarItemSelect);

export const emit = (eventName: Event, ...args: any[]) => {
  const listener = listeners[eventName];
  listener(...args);
};

export const Mediator: React.FC = () => {
  useMediator();
  return null;
};

export default Mediator;
