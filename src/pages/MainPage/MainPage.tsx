import GoogleMap from "components/GoogleMap";
import PageLayout from "components/PageLayout";
import Modal from "components/Modal";
import Drawer from "components/Drawer";
import Mediator from "./mediator";

export const MainPage: React.FC = () => {
  return (
    <PageLayout>
      <Modal />
      <Drawer />
      <GoogleMap />
      <Mediator />
    </PageLayout>
  );
};
