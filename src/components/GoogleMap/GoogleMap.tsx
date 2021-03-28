import GoogleMapReact, { ChangeEventValue } from "google-map-react";

import MapMarker from "components/MapMarker/MapMarker";
import { emit } from "pages/MainPage/mediator";
import useMapStore from "pages/MainPage/state";

const poznanCoords = { lat: 52.32737567310198, lng: 16.882423352150823 };
const googleApiKey = String(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
const defaultZoom = 13;

export const GoogleMap: React.FC = () => {
  const [{ articles }] = useMapStore();

  const handleChange = (e: ChangeEventValue) => {
    emit("mapDragged", e.center);
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
      onGoogleApiLoaded={({ map: googleMapInstance }) =>
        emit("mapLoaded", googleMapInstance)
      }
      onChange={handleChange}
    >
      {articles.map(({ lat, lng, pageid, title }) => (
        <MapMarker
          lat={lat}
          lng={lng}
          key={pageid}
          pageid={pageid}
          title={title}
        />
      ))}
    </GoogleMapReact>
  );
};

export default GoogleMap;
