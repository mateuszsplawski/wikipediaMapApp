import { ThemeProvider } from "styled-components";

import MainPage from "pages/MainPage";
import theme from "theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  );
}
