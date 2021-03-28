import { createStore, createHook, defaults, Action } from "react-sweet-state";
import { produce } from "immer";

defaults.devtools = true;
defaults.mutator = (currentState, producer) => produce(currentState, producer);

type Articles = {
  lat: number;
  pageid: number;
  title: string;
  lng: number;
};
type State = { articles: Articles[]; isGoogleApiLoaded: boolean };
type Actions = typeof actions;

declare module "react-sweet-state" {
  interface SetState<TState> {
    (producer: (draftState: TState) => void): void;
  }
}

const initialState: State = {
  isGoogleApiLoaded: false,
  articles: [],
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
  setGoogleApiLoadedStatus: (isGoogleApiLoaded: boolean): Action<State> => ({
    setState,
  }) => {
    setState((draft) => {
      draft.isGoogleApiLoaded = isGoogleApiLoaded;
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
