import { Button } from "antd";
import { AimOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { Coords } from "google-map-react";

import { emit } from "pages/MainPage/mediator";
import useMapStore from "pages/MainPage/state";
import { createRedirectNotification } from "utils";

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
      // prettier-ignore
      createRedirectNotification({
        stage: "initial",
        btn: (<Button type="primary" onClick={() => {emit("redirectButtonClicked", { coords: {}, inDrawer: false });}}>Got it, redirect</Button>),
      });
    }
  };

  useEffect(() => {
    if (!inDrawer) {
      if (redirectNotification.stage === "fetching") {
        createRedirectNotification({ stage: "fetching" });
      } else if (redirectNotification.stage === "success") {
        createRedirectNotification({ stage: "success" });
      } else if (redirectNotification.stage === "error") {
        createRedirectNotification({ stage: "error" });
      }
    }
  }, [redirectNotification.stage, inDrawer]);
  return (
    <Button
      type="primary"
      loading={redirectNotification.stage === "fetching"}
      icon={<AimOutlined />}
      onClick={handleClick}
    ></Button>
  );
};
