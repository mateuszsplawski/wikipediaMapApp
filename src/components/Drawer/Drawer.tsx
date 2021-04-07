import {
  Divider,
  List,
  Row,
  Typography,
  Drawer as AntDrawer,
  Space,
} from "antd";

import useMapStore from "pages/MainPage/state";
import RedirectButton from "components/RedirectButton";

export const Drawer: React.FC = () => {
  const drawerHeight = "50vh";
  const drawerPlacement = "bottom";

  const [
    {
      drawer: { isVisible, data },
    },
    { setDrawerStatus },
  ] = useMapStore();

  const handleClose = () => {
    setDrawerStatus({ isVisible: false, data: [] });
  };
  return (
    <AntDrawer
      height={drawerHeight}
      visible={isVisible}
      placement={drawerPlacement}
      onClose={handleClose}
    >
      <Typography.Title level={3}>Viewed articles</Typography.Title>
      <Divider />
      <List
        dataSource={data}
        renderItem={({ title, coords }) => (
          <List.Item>
            <Row style={{ width: "100%" }} align="middle" justify="start">
              <Space size="middle">
                <RedirectButton inDrawer={true} coords={coords} />
                <Typography.Text>{title}</Typography.Text>
              </Space>
            </Row>
          </List.Item>
        )}
      ></List>
    </AntDrawer>
  );
};
