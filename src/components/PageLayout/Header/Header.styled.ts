import styled from "styled-components";
import { Button } from "antd";
import { Header } from "antd/lib/layout/layout";

export const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    margin: 0 10px 0 0;
  }

  ${({ theme }) => theme.breakpoints.m} {
    padding: 0 20px;
  }
`;

export const StyledLogo = styled.div`
  h2 {
    color: #fff;
    font-weight: 300;
  }

  ${({ theme }) => theme.breakpoints.m} {
    h2 {
      font-size: 16px;
    }
  }

  ${({ theme }) => theme.breakpoints.s} {
    h2 {
      font-size: 14px;
    }
  }
`;

export const StyledLabel = styled.label`
  margin: 0 10px;

  input {
    width: 300px;
  }

  ${({ theme }) => theme.breakpoints.xl} {
    input {
      width: 100%;
    }
  }
`;

export const StyledButton = styled(Button)`
  ${({ theme }) => theme.breakpoints.l} {
    width: 32px;
    height: 32px;
    padding: 2.4px 0;

    span:last-of-type {
      display: none;
    }
  }
`;
