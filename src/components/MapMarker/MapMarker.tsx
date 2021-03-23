import { StyledMapMarker } from "./MapMarket.styled";

interface MapMarkerProps {
  lat: number;
  lng: number;
  pageid: number;
}

export const MapMarker: React.FC<MapMarkerProps> = () => {
  return <StyledMapMarker></StyledMapMarker>;
};

export default MapMarker;
