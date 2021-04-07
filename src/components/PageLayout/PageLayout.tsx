import { Layout } from "antd";

import Header from "./Header";
import { StyledLayout } from "./PageLayout.styled";

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <StyledLayout>
      <Header />
      <Layout.Content>{children}</Layout.Content>
    </StyledLayout>
  );
};
