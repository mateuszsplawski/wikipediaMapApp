import { Coords } from "google-map-react";
import { debounce } from "lodash";

import { Articles, wikiArticlesGetResponse } from "types/index";
import useMapStore from "pages/MainPage/state";
import wikiApiClient from "services/api/wikipedia";
import localStorageDB from "services/localStorageDB";

type Event = "mapLoaded" | "searchBarItemSelected" | "markerClicked";
type Listeners = Record<Event, Function>;

const listeners: Listeners = {
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
    isViewed: false,
  }));
};

const mapReadArticles = (articles: Articles[]) =>
  articles.map((article) => ({
    ...article,
    isViewed: localStorageDB.isArticleRead(article.title),
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
    { addMarkers, setGoogleApiLoadedStatus, setModalStatus, setMarkerStatus },
  ] = useMapStore();

  const handleMapCenterChange = async () => {
    const coord = map.center.toJSON();
    const response = await wikiApiClient.getArticles({ coord, limit: 50 });
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
    localStorageDB.setArticleAsRead(articleTitle);
    setMarkerStatus({ title: articleTitle, isViewed: true });
  };

  attachListener("markerClicked", handleMarkerClick);
  attachListener("mapLoaded", handleMapLoad);
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
