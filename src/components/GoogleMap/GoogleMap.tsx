import GoogleMapReact from "google-map-react";

export const GoogleMap: React.FC = () => {
  const googleApiKey = String(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  const poznanCoords = { lat: 52.4082542, lng: 16.9314335 };
  const defaultZoom = 10;
  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: googleApiKey,
        libraries: ["places"],
      }}
      defaultCenter={poznanCoords}
      defaultZoom={defaultZoom}
      yesIWantToUseGoogleMapApiInternals
    ></GoogleMapReact>
  );
};

export default GoogleMap;
