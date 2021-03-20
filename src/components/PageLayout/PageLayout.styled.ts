import styled from "styled-components";
import { Layout } from "antd";

const { Footer } = Layout;

export const StyledLogo = styled.div`
  h2 {
    color: #fff;
    font-weight: 300;
  }
`;

export const StyledFooter = styled(Footer)`
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
`;
