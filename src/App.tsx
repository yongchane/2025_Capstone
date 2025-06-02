import { RouterProvider } from "react-router-dom";
import router from "./router";
import GlobalStyle from "./style/_global";
import { FontSizeProvider } from "./context/FontSizeContext";

function App() {
  return (
    <>
      <GlobalStyle />
      <FontSizeProvider>
        <RouterProvider router={router} />
      </FontSizeProvider>
    </>
  );
}

export default App;
