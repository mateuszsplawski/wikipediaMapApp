import { Modal as AntModal, Typography } from "antd";

import useMapStore from "pages/MainPage/state";
import { StyledIframe } from "./Modal.styled";

export const Modal: React.FC = () => {
  const modalSize = { width: "85vw", height: "85vh" };

  const [
    {
      modal: {
        isVisible,
        data: { title, url },
      },
    },
    { setModalStatus },
  ] = useMapStore();

  const handleCancel = () => {
    setModalStatus({ isVisible: false });
  };
  return (
    <AntModal
      footer={null}
      visible={isVisible}
      onCancel={handleCancel}
      width={modalSize.width}
      bodyStyle={{ height: modalSize.height }}
    >
      <Typography>{title}</Typography>
      <StyledIframe title={title} src={url}></StyledIframe>
    </AntModal>
  );
};
