import { Modal as AntModal, Typography } from "antd";

import useMapStore from "pages/MainPage/state";
import { StyledIframe } from "./ArticleModal.styled";

export const ArticleModal: React.FC = () => {
  const modalSize = { width: "90vw", height: "90vh" };

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
      centered
      footer={null}
      visible={isVisible}
      onCancel={handleCancel}
      width={modalSize.width}
      bodyStyle={{ height: modalSize.height }}
    >
      <Typography.Title>{title}</Typography.Title>
      <StyledIframe title={title} src={url}></StyledIframe>
    </AntModal>
  );
};
