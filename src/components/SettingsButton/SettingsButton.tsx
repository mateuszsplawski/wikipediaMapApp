import { SettingFilled } from "@ant-design/icons";
import { Affix, Button } from "antd";
import useMapStore from "pages/MainPage/state";

export const SettingsButton = () => {
  const [, { setSettings }] = useMapStore();

  const handleClick = () => {
    setSettings({
      isSettingsModalVisible: true,
    });
  };
  return (
    <Affix offsetBottom={30}>
      <Button onClick={handleClick} type="primary" icon={<SettingFilled />}>
        Settings
      </Button>
    </Affix>
  );
};
