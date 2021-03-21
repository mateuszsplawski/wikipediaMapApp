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

const useMediator = () => {
  const handleMapDragging = async (coord: Coords) => {
    const articles = await wikiApiClient.getArticles({ coord });
    console.log("mapDragged", ...articles.query.geosearch);
  };
  attachListener("mapDragged", handleMapDragging);

  const handleMapLoad = async (coord: Coords) => {
    const articles = await wikiApiClient.getArticles({ coord });
    console.log("mapLoaded", ...articles.query.geosearch);
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
