import ky from "ky";

interface wikiQueryParameters {
  coord: { lat: number; lng: number };
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

interface wikiArticleGetResponse {
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

const client = ky.create({
  prefixUrl: "https://pl.wikipedia.org/w/",
});

const wikiApiClient = {
  getArticles({
    coord,
    radius = 10000,
    limit = 10,
  }: wikiQueryParameters): Promise<wikiArticlesGetResponse> {
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
