import { createStore, createHook, defaults, Action } from "react-sweet-state";
import { produce } from "immer";

defaults.devtools = true;
defaults.mutator = (currentState, producer) => produce(currentState, producer);

export type Articles = {
  lat: number;
  pageid: number;
  title: string;
  lng: number;
  isViewed: boolean;
};
type State = {
  articles: Articles[];
  isGoogleApiLoaded: boolean;
  modal: { isVisible: boolean; data: { title?: string; url?: string } };
};
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
};

const Store = createStore<State, Actions>({
  initialState,
  actions,
  name: "mapStore",
});

const useMapStore = createHook(Store);

export default useMapStore;
