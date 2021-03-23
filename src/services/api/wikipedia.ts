import ky from "ky";

interface wikiQueryParameters {
  coord: { lat: number; lng: number };
  radius?: number;
  limit?: number;
}

export interface wikiGetResponse {
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

const client = ky.create({
  prefixUrl: "https://en.wikipedia.org/w/",
});

const wikiApiClient = {
  getArticles({
    coord,
    radius = 10000,
    limit = 10,
  }: wikiQueryParameters): Promise<wikiGetResponse> {
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
};

export default wikiApiClient;
