import { Layout } from "antd";

import Header from "./Header";
import Modal from "components/Modal";
import { StyledFooter, StyledLayout } from "./PageLayout.styled";
import content from "constant/content.json";

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <StyledLayout>
      <Modal />
      <Header />
      <Layout.Content>{children}</Layout.Content>
      <StyledFooter>{content.footer}</StyledFooter>
    </StyledLayout>
  );
};
