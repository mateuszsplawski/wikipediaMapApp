import GoogleMap from "components/GoogleMap/GoogleMap";
import PageLayout from "components/PageLayout/PageLayout";
import Mediator from "./mediator";

export const MainPage: React.FC = () => {
  return (
    <PageLayout>
      <GoogleMap />
      <Mediator />
    </PageLayout>
  );
};

export default MainPage;
