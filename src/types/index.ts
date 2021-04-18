import { Coords } from "google-map-react";
export interface wikiArticlesQueryParameters {
  coords: Coords;
  radius?: number;
  limit?: number;
}

export interface wikiArticlesGetResponse {
  batchcomplete: "";
  query: {
    geosearch: {
      dist: number;
      lat: number;
      lon: number;
      ns: number;
      pageid: number;
      primary: string;
      title: string;
    }[];
  };
}

export interface wikiArticleGetResponse {
  query: {
    pages: {
      pageid: {
        canonicalurl: string;
        contentmodel: string;
        editurl: string;
        fullurl: string;
        lastrevid: number;
        length: number;
        ns: number;
        pageid: number;
        pagelanguage: string;
        pagelanguagedir: string;
        pagelanguagehtmlcode: string;
        title: string;
        touched: string;
      };
    };
  };
}

export type Articles = {
  lat: number;
  pageid: number;
  title: string;
  lng: number;
  isViewed: boolean;
};

export type Modal = {
  isVisible: boolean;
  data: { title?: string; url?: string };
};

export type ReadArticle = { title: string; coords: Coords };

export type Event =
  | "mapLoaded"
  | "searchBarItemSelected"
  | "markerClicked"
  | "redirectButtonClicked"
  | "drawerButtonClicked";

export type Listeners = Record<Event, Function>;

export type Settings = {
  isSettingsModalVisible?: boolean;
  mainMarkerColor?: string;
  viewedMarkerColor?: string;
};
