import { Modal as AntModal, Typography } from "antd";

import useMapStore from "pages/MainPage/state";
import { StyledIframe } from "./Modal.styled";

const modalSize = { width: "85vw", height: "85vh" };

export const Modal: React.FC = () => {
  const [
    {
      modal: {
        isVisible,
        data: { title, url },
      },
    },
    { setModalStatus },
  ] = useMapStore();
  return (
    <AntModal
      footer={null}
      visible={isVisible}
      onCancel={() => setModalStatus({ isVisible: false })}
      width={modalSize.width}
      bodyStyle={{ height: modalSize.height }}
    >
      <Typography>{title}</Typography>
      <StyledIframe title={title} src={url}></StyledIframe>
    </AntModal>
  );
};
