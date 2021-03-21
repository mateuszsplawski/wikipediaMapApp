import "./App.css";
import { GoogleMap } from "./components/GoogleMap/GoogleMap";
import { PageLayout } from "./components/PageLayout/PageLayout";

export default function App() {
  return (
    <PageLayout>
      <GoogleMap />
    </PageLayout>
  );
}
