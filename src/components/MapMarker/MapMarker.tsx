import { CheckCircleFilled, InfoCircleFilled } from "@ant-design/icons";
import { Tooltip } from "antd";

import { emit } from "pages/MainPage/mediator";
import useMapStore from "pages/MainPage/state";
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
  const [
    {
      settings: { mainMarkerColor, viewedMarkerColor },
    },
  ] = useMapStore();
  const handleClick = () => {
    emit("markerClicked", { pageid, coords: { lat, lng } });
  };
  return (
    <Tooltip title={title}>
      <StyledMapMarker
        isViewed={isViewed}
        viewedMarkerColor={viewedMarkerColor}
        mainMarkerColor={mainMarkerColor}
        onClick={handleClick}
      >
        {isViewed ? <CheckCircleFilled /> : <InfoCircleFilled />}
      </StyledMapMarker>
    </Tooltip>
  );
};
