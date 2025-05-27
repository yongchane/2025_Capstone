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
  height: 100vh;
  background-color: ${({ $pathname }) =>
    $pathname === "/home" ? "#E5F2FF" : "#f7fbff"};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
