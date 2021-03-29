import {
  Button,
  Divider,
  List,
  Row,
  Typography,
  Drawer as AntDrawer,
} from "antd";
import { AimOutlined } from "@ant-design/icons";

import useMapStore from "pages/MainPage/state";
import { emit } from "pages/MainPage/mediator";

export const Drawer: React.FC = () => {
  const drawerWidth = "60vw";
  const [
    {
      drawer: { isVisible, data },
    },
    { setDrawerStatus },
  ] = useMapStore();
  return (
    <AntDrawer
      width={drawerWidth}
      visible={isVisible}
      onClose={() => setDrawerStatus({ isVisible: false, data: [] })}
    >
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
              <Button
                type="primary"
                icon={<AimOutlined />}
                onClick={() => emit("viewedArticleButtonClicked", { coords })}
              ></Button>
            </Row>
          </List.Item>
        )}
      ></List>
    </AntDrawer>
  );
};
