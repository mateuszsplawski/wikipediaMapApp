import { Tooltip } from "antd";

import { StyledMapMarker } from "./MapMarker.styled";

interface MapMarkerProps {
  lat: number;
  lng: number;
  pageid: number;
  title: string;
}

export const MapMarker: React.FC<MapMarkerProps> = ({ title }) => {
  return (
    <Tooltip title={title}>
      <StyledMapMarker />
    </Tooltip>
  );
};

export default MapMarker;
