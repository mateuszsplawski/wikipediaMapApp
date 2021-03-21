import ky from "ky";

const client = ky.create({
  prefixUrl: "https://en.wikipedia.org/w/",
});

const wikiApiClient = {
  getArticles({
    coord = { lat: 52.4082542, lng: 16.9314335 },
    radius = 10000,
    limit = 10,
  } = {}) {
    const params = {
      action: "query",
      list: "geosearch",
      format: "json",
      origin: "*",
    };
    if (!coord) {
      console.error("Wikipedia API: no coord passed to getArticles");
    } else {
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
    }
  },
};

export default wikiApiClient;
