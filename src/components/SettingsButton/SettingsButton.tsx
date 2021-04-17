import { SettingFilled } from "@ant-design/icons";
import { Affix, Button } from "antd";

export const SettingsButton = () => {
  return (
    <Affix offsetBottom={30}>
      <Button type="primary" icon={<SettingFilled />}>
        Settings
      </Button>
    </Affix>
  );
};
