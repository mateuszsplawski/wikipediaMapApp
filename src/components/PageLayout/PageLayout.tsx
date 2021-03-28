import { Layout } from "antd";

import Header from "./Header";
import { StyledFooter, StyledLayout } from "./PageLayout.styled";

const { Content } = Layout;

interface PageLayoutProps {
  children: React.ReactNode;
}

const footerText = "WikipediaMap ©2018 Created by MS";

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <StyledLayout>
      <Header />
      <Content>{children}</Content>
      <StyledFooter>{footerText}</StyledFooter>
    </StyledLayout>
  );
};

export default PageLayout;
