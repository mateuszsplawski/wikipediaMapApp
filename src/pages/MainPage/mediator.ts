import { wikiGetResponse } from "services/api/wikipedia";
import useMapStore from "pages/MainPage/state";
import { Coords } from "google-map-react";

import wikiApiClient from "services/api/wikipedia";

type Event = "mapDragged" | "mapLoaded";
type Listeners = Record<Event, Function>;

const listeners: Listeners = {
  mapDragged: () => null,
  mapLoaded: () => null,
};

const attachListener = (eventName: Event, listener: Function) =>
  (listeners[eventName] = listener);

const mapWikiApiResponse = (response: wikiGetResponse) => {
  return response.query.geosearch.map(({ lat, lon, pageid }) => ({
    lat,
    pageid,
    lng: lon,
  }));
};

const useMediator = () => {
  const [, { addMarkers }] = useMapStore();

  const handleMapDragging = async (coord: Coords) => {
    const articles = await wikiApiClient.getArticles({ coord });
    addMarkers(mapWikiApiResponse(articles));
  };
  attachListener("mapDragged", handleMapDragging);

  const handleMapLoad = async (coord: Coords) => {
    const articles = await wikiApiClient.getArticles({ coord });
    addMarkers(mapWikiApiResponse(articles));
  };
  attachListener("mapLoaded", handleMapLoad);
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
