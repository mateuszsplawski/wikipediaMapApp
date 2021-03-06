import GoogleMapReact from "google-map-react";

import MapMarker from "components/MapMarker";
import { emit } from "pages/MainPage/mediator";
import useMapStore from "pages/MainPage/state";
import theme from "theme";
import { defaultMapCoords, defaultMapZoom, googleApiKey } from "constant";

export const GoogleMap: React.FC = () => {
  const [{ articles }] = useMapStore();

  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: googleApiKey,
        libraries: ["places"],
      }}
      defaultCenter={defaultMapCoords}
      defaultZoom={defaultMapZoom}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={({ map: googleMapInstance }) =>
        emit("mapLoaded", googleMapInstance)
      }
      options={{
        styles: theme.googleMaps.default,
      }}
    >
      {articles.map(({ lat, lng, pageid, title, isViewed }) => (
        <MapMarker
          lat={lat}
          lng={lng}
          key={pageid}
          pageid={pageid}
          title={title}
          isViewed={isViewed}
        />
      ))}
    </GoogleMapReact>
  );
};
