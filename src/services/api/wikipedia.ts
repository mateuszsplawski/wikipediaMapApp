import ky from "ky";

import {
  wikiArticlesQueryParameters,
  wikiArticlesGetResponse,
  wikiArticleGetResponse,
} from "types";

const client = ky.create({
  prefixUrl: "https://pl.wikipedia.org/w/",
});

const wikiApiClient = {
  getArticles({
    coord,
    radius = 10000,
    limit = 10,
  }: wikiArticlesQueryParameters): Promise<wikiArticlesGetResponse> {
    const params = {
      action: "query",
      list: "geosearch",
      format: "json",
      origin: "*",
    };
    return client
      .get(`api.php?`, {
        searchParams: {
          ...params,
          gscoord: coord.lat + "|" + coord.lng,
          gsradius: radius,
          gslimit: limit,
        },
      })
      .json();
  },
  getArticle({ pageid }: { pageid: number }): Promise<wikiArticleGetResponse> {
    const params = {
      action: "query",
      format: "json",
      pageids: pageid,
      inprop: "url",
      origin: "*",
      prop: "info",
    };
    return client
      .get(`api.php?`, {
        searchParams: {
          ...params,
        },
      })
      .json();
  },
};

export default wikiApiClient;
