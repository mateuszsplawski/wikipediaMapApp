import GoogleMap from "components/GoogleMap";
import PageLayout from "components/PageLayout";
import ArticleModal from "components/ArticleModal";
import Drawer from "components/Drawer";
import Mediator from "./mediator";
import SettingsButton from "components/SettingsButton";
import SettingsModal from "components/SettingsModal";

export const MainPage: React.FC = () => {
  return (
    <PageLayout>
      <ArticleModal />
      <Drawer />
      <GoogleMap />
      <Mediator />
      <SettingsModal />
      <SettingsButton />
    </PageLayout>
  );
};
