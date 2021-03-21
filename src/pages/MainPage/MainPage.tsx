import GoogleMap from "components/GoogleMap/GoogleMap";
import PageLayout from "components/PageLayout/PageLayout";

export const MainPage: React.FC = () => {
  return (
    <PageLayout>
      <GoogleMap />
    </PageLayout>
  );
};

export default MainPage;
