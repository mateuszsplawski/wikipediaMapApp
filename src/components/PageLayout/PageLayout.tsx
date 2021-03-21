import { Layout } from "antd";

import { StyledLogo, StyledFooter, StyledLayout } from "./PageLayout.styled";

const { Content, Header } = Layout;

interface PageLayoutProps {
  children: React.ReactNode;
}
const logoText = "WikipediaMap";
const footerText = "WikipediaMap ©2018 Created by MS";

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <StyledLayout>
      <Header>
        <StyledLogo>
          <h2>{logoText}</h2>
        </StyledLogo>
      </Header>
      <Content>{children}</Content>
      <StyledFooter>{footerText}</StyledFooter>
    </StyledLayout>
  );
};

export default PageLayout;
