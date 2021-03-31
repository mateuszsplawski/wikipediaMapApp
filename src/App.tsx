import { ThemeProvider } from "styled-components";

import MainPage from "pages/MainPage";
import theme from "theme";
import { GlobalStyle } from "theme/GlobalStyle";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MainPage />
    </ThemeProvider>
  );
}
