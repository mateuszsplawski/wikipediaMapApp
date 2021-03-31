import { Divider, List, Row, Typography, Drawer as AntDrawer } from "antd";

import useMapStore from "pages/MainPage/state";
import RedirectButton from "components/RedirectButton";

export const Drawer: React.FC = () => {
  const drawerWidth = "60vw";

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
    <AntDrawer width={drawerWidth} visible={isVisible} onClose={handleClose}>
      <Typography.Title level={3}>Viewed articles</Typography.Title>
      <Divider />
      <List
        dataSource={data}
        renderItem={({ title, coords }) => (
          <List.Item>
            <Row
              style={{ width: "100%" }}
              align="middle"
              justify="space-between"
            >
              <Typography.Text>{title}</Typography.Text>
              <RedirectButton inDrawer={true} coords={coords} />
            </Row>
          </List.Item>
        )}
      ></List>
    </AntDrawer>
  );
};
