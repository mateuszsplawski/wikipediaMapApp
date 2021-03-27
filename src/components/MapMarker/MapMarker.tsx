import { StyledMapMarker } from "./MapMarker.styled";

interface MapMarkerProps {
  lat: number;
  lng: number;
  pageid: number;
}

export const MapMarker: React.FC<MapMarkerProps> = () => {
  return <StyledMapMarker></StyledMapMarker>;
};

export default MapMarker;
