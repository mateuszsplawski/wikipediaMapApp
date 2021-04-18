import { Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import { SwatchesPicker } from "react-color";

import useMapStore from "pages/MainPage/state";
import { StyledCard } from "./SettingsModal.styled";

export const SettingsModal = () => {
  const modalSize = { width: "90vw", height: "80vh" };

  const [
    {
      settings: { isSettingsModalVisible },
    },
    { setSettings },
  ] = useMapStore();

  const handleChange = ({
    isMainMarkerColor,
    color,
  }: {
    isMainMarkerColor?: boolean;
    color: string;
  }) => {
    if (isMainMarkerColor) {
      setSettings({ mainMarkerColor: color });
    } else {
      setSettings({ viewedMarkerColor: color });
    }
  };

  const handleCancel = () => {
    setSettings({ isSettingsModalVisible: false });
  };
  return (
    <Modal
      centered
      visible={isSettingsModalVisible}
      onCancel={handleCancel}
      width={modalSize.width}
      bodyStyle={{ height: modalSize.height }}
    >
      <Row>
        <StyledCard title="Main marker color">
          <SwatchesPicker
            onChange={(e) =>
              handleChange({ isMainMarkerColor: true, color: e.hex })
            }
          />
        </StyledCard>
        <StyledCard title="Viewed marker color">
          <SwatchesPicker onChange={(e) => handleChange({ color: e.hex })} />
        </StyledCard>
      </Row>
    </Modal>
  );
};
