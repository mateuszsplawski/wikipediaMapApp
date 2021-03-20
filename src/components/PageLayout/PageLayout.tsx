import { Layout } from "antd";

import { StyledLogo, StyledFooter } from "./PageLayout.styled";

const { Header, Content } = Layout;

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const logoText = "WikipediaMap";
  const footerText = "WikipediaMap ©2018 Created by MS";
  return (
    <Layout>
      <Header>
        <StyledLogo>
          <h2>{logoText}</h2>
        </StyledLogo>
      </Header>
      <Content>{children}</Content>
      <StyledFooter>{footerText}</StyledFooter>
    </Layout>
  );
};

export default Layout;
