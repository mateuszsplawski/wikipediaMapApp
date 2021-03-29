import { Tooltip } from "antd";

import { emit } from "pages/MainPage/mediator";
import { StyledMapMarker } from "./MapMarker.styled";

interface MapMarkerProps {
  lat: number;
  lng: number;
  pageid: number;
  title: string;
  isViewed: boolean;
}

export const MapMarker: React.FC<MapMarkerProps> = ({
  title,
  pageid,
  isViewed,
  lat,
  lng,
}) => {
  return (
    <Tooltip title={title}>
      <StyledMapMarker
        isViewed={isViewed}
        onClick={() => emit("markerClicked", { pageid, coords: { lat, lng } })}
      />
    </Tooltip>
  );
};
