import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";

interface BackgroundWrapperProps {
  children: ReactNode;
}

export const BackgroundWrapper = ({ children }: BackgroundWrapperProps) => {
  const { pathname } = useLocation();

  return <Background $pathname={pathname}>{children}</Background>;
};

export const Background = styled.div<{ $pathname: string }>`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: ${({ $pathname }) =>
    $pathname === "/home"
      ? "#E5F2FF"
      : $pathname === "/search"
      ? "#ffffff"
      : "#f7fbff"};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
  overflow-y: auto;
`;
