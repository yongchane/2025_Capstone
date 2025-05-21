import { Global, css } from "@emotion/react";
import { ResetStyle } from "./_reset";

const GlobalStyle = () => (
  <>
    <ResetStyle />
    <Global
      styles={css`
        @font-face {
          font-family: "Pretendard";
          src: url("../../assets/Pretendard-Medium.otf") format("opentype");
        }

        * {
          font-family: "Pretendard";
        }

        @media (min-width: 375px) {
          #root {
            width: 430px;
          }
        }

        @media (max-width: 500px) {
          #root {
            width: 100vw;
          }
        }

        #root {
          box-shadow: rgba(100, 100, 111, 0.5) 0px 7px 29px 0px;
          margin: 0 auto;
          min-height: 100vh;
          position: relative;
        }

        body {
          align-items: center;
          display: flex;
          justify-content: center;
          min-height: 100vh;
        }

        button {
          cursor: pointer;
        }
      `}
    />
  </>
);

export default GlobalStyle;
