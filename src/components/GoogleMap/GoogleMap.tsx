import GoogleMapReact, { ChangeEventValue } from "google-map-react";
import React from "react";

import wikiApiClient from "services/api/wikipedia";

export const GoogleMap: React.FC = () => {
  const googleApiKey = String(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  const poznanCoords = { lat: 52.4082542, lng: 16.9314335 };
  const defaultZoom = 10;

  const handleChange = async (e: ChangeEventValue) => {
    const articles = await wikiApiClient.getArticles({ coord: e.center });
    console.log(...articles.query.geosearch);
  };

  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: googleApiKey,
        libraries: ["places"],
      }}
      defaultCenter={poznanCoords}
      defaultZoom={defaultZoom}
      yesIWantToUseGoogleMapApiInternals
      onChange={handleChange}
    ></GoogleMapReact>
  );
};

export default GoogleMap;
