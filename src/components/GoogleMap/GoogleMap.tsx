import { useEffect } from "react";
import GoogleMapReact, { ChangeEventValue } from "google-map-react";

import { emit } from "pages/MainPage/mediator";

const poznanCoords = { lat: 52.32737567310198, lng: 16.882423352150823 };
const googleApiKey = String(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
const defaultZoom = 10;

export const GoogleMap: React.FC = () => {
  const handleChange = (e: ChangeEventValue) => {
    const { center } = e;
    center !== poznanCoords && emit("mapDragged", center);
  };
  useEffect(() => {
    emit("mapLoaded", poznanCoords);
  }, []);
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
