import { Outlet } from "react-router-dom";
import { BackgroundWrapper } from "../style/_theme";

const Layout = () => {
  return (
    <div className="w-full h-full">
      <BackgroundWrapper>
        <Outlet />
      </BackgroundWrapper>
    </div>
  );
};

export default Layout;
