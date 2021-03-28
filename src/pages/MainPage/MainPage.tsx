import GoogleMap from "components/GoogleMap";
import PageLayout from "components/PageLayout";
import Mediator from "./mediator";

export const MainPage: React.FC = () => {
  return (
    <PageLayout>
      <GoogleMap />
      <Mediator />
    </PageLayout>
  );
};
