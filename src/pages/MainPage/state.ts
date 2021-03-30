import { Coords } from "google-map-react";
import { createStore, createHook, defaults, Action } from "react-sweet-state";
import { produce } from "immer";

import { Articles, Modal, ReadArticle } from "types/index";

// React-sweet-state config
defaults.devtools = true;
defaults.mutator = (currentState, producer) => produce(currentState, producer);

type State = {
  articles: Articles[];
  isGoogleApiLoaded: boolean;
  modal: Modal;
  drawer: { isVisible: boolean; data: ReadArticle[] | [] };
  currentLocation: {} | Coords;
  redirectNotification: { stage: "fetching" | "success" | "error" | "" };
};

// React-sweet-state necesarry types
type Actions = typeof actions;

declare module "react-sweet-state" {
  interface SetState<TState> {
    (producer: (draftState: TState) => void): void;
  }
}

const initialState: State = {
  isGoogleApiLoaded: false,
  articles: [],
  modal: { isVisible: false, data: {} },
  drawer: { isVisible: false, data: [] },
  currentLocation: {},
  redirectNotification: { stage: "" },
};

const actions = {
  addMarkers: (payload: Articles[]): Action<State> => ({
    setState,
    getState,
  }) => {
    const currentArticles = getState().articles;
    const currentArticlesPageIds = currentArticles.map(({ pageid }) => pageid);
    const filteredPayload = payload.filter(
      ({ pageid }) => !currentArticlesPageIds.includes(pageid)
    );

    setState((draft) => {
      draft.articles = [...currentArticles, ...filteredPayload];
    });
  },
  setGoogleApiLoadedStatus: ({
    isGoogleApiLoaded,
  }: {
    isGoogleApiLoaded: boolean;
  }): Action<State> => ({ setState }) => {
    setState((draft) => {
      draft.isGoogleApiLoaded = isGoogleApiLoaded;
    });
  },
  setModalStatus: ({
    isVisible,
    modalData,
  }: {
    isVisible: boolean;
    modalData?: { title: string; url: string };
  }): Action<State> => ({ setState }) => {
    setState((draft) => {
      draft.modal = { isVisible: isVisible, data: modalData ? modalData : {} };
    });
  },
  setMarkerStatus: ({
    isViewed,
    title,
  }: {
    isViewed: boolean;
    title: string;
  }): Action<State> => ({ setState, getState }) => {
    const currentArticles = getState().articles;
    const currentArticlesPageTitles = currentArticles.map(({ title }) => title);
    const articleIndex = currentArticlesPageTitles.findIndex(
      (articleTitle) => articleTitle === title
    );
    setState((draft) => {
      draft.articles[articleIndex] = {
        ...currentArticles[articleIndex],
        isViewed: isViewed,
      };
    });
  },
  setDrawerStatus: ({
    isVisible,
    data,
  }: {
    isVisible: boolean;
    data: ReadArticle[] | [];
  }): Action<State> => ({ setState }) => {
    setState((draft) => {
      draft.drawer = { isVisible, data };
    });
  },
  saveCurrentLocation: ({ coords }: { coords: Coords }): Action<State> => ({
    setState,
  }) => {
    console.log(coords);
    setState((draft) => {
      draft.currentLocation = coords;
    });
  },
  displayRedirectNotification: ({
    stage,
  }: {
    stage: "fetching" | "success" | "error" | "";
  }): Action<State> => ({ setState }) => {
    setState((draft) => {
      draft.redirectNotification.stage = stage;
    });
  },
};

const Store = createStore<State, Actions>({
  initialState,
  actions,
  name: "mapStore",
});

const useMapStore = createHook(Store);

export default useMapStore;
