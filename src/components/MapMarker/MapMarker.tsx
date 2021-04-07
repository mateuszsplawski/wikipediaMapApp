import { CheckCircleFilled, InfoCircleFilled } from "@ant-design/icons";
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
  const handleClick = () => {
    emit("markerClicked", { pageid, coords: { lat, lng } });
  };
  return (
    <Tooltip title={title}>
      <StyledMapMarker isViewed={isViewed} onClick={handleClick}>
        {isViewed ? <CheckCircleFilled /> : <InfoCircleFilled />}
      </StyledMapMarker>
    </Tooltip>
  );
};
