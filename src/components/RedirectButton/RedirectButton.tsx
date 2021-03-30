import { Button, notification } from "antd";
import { AimOutlined } from "@ant-design/icons";
import { Coords } from "google-map-react";

import { emit } from "pages/MainPage/mediator";
import useMapStore from "pages/MainPage/state";
import { useEffect } from "react";

interface RedirectButtonProps {
  inDrawer?: boolean;
  coords?: Coords;
}

export const RedirectButton: React.FC<RedirectButtonProps> = ({
  inDrawer,
  coords,
}) => {
  const [{ redirectNotification }] = useMapStore();
  const handleClick = () => {
    if (inDrawer) {
      emit("redirectButtonClicked", { coords, inDrawer: true });
    } else {
      notification.info({
        message: "Redirect to current location",
        description: "Check your location settings before.",
        btn: (
          <Button
            type="primary"
            onClick={() => {
              emit("redirectButtonClicked", { coords: {}, inDrawer: false });
            }}
          >
            Got it, redirect
          </Button>
        ),
      });
    }
  };
  useEffect(() => {
    if (!inDrawer) {
      if (redirectNotification.stage === "fetching") {
        notification.destroy();
        notification.info({ message: "Getting your location information" });
      } else if (redirectNotification.stage === "success") {
        notification.success({ message: "Redirecting" });
      } else if (redirectNotification.stage === "error") {
        notification.error({
          message: "Something went wrong",
          description: "Please, check again your location settings.",
        });
      }
    }
  }, [redirectNotification.stage, inDrawer]);
  return (
    <Button
      type="primary"
      icon={<AimOutlined />}
      onClick={handleClick}
    ></Button>
  );
};
