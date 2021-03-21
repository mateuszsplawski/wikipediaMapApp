import { useEffect } from "react";

import GoogleMap from "components/GoogleMap/GoogleMap";
import PageLayout from "components/PageLayout/PageLayout";
import wikiApiClient from "services/api/wikipedia";

export const MainPage: React.FC = () => {
  useEffect(() => {
    const fetchWikiArticles = async () => {
      const articles = await wikiApiClient.getArticles({});
      console.log(articles);
    };
    fetchWikiArticles();
  }, []);
  return (
    <PageLayout>
      <GoogleMap />
    </PageLayout>
  );
};

export default MainPage;
