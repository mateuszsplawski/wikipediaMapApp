import { Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import { SwatchesPicker } from "react-color";

import { StyledCard } from "./SettingsModal.styled";

export const SettingsModal = () => {
  const modalSize = { width: "90vw", height: "80vh" };
  const isVisible = true;

  const handleCancel = () => {};
  return (
    <Modal
      centered
      visible={isVisible}
      onCancel={handleCancel}
      width={modalSize.width}
      bodyStyle={{ height: modalSize.height }}
    >
      <Row>
        <StyledCard title="Main marker color">
          <SwatchesPicker />
        </StyledCard>
        <StyledCard title="Viewed marker color">
          <SwatchesPicker />
        </StyledCard>
      </Row>
    </Modal>
  );
};
