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

        :root {
          /* 기본 폰트 사이즈 변수들 */
          --base-font-size: 18px;
          --font-scale: 1;
          --title-font-size: 27px;
          --subtitle-font-size: 16.2px;
          --small-font-size: 14.4px;
        }

        * {
          font-family: "Pretendard";
        }

        /* 폰트 사이즈 적용 클래스들 */
        .text-base {
          font-size: var(--base-font-size);
        }

        .text-title {
          font-size: var(--title-font-size);
        }

        .text-subtitle {
          font-size: var(--subtitle-font-size);
        }

        .text-small {
          font-size: var(--small-font-size);
        }

        /* 기본 텍스트 요소들에 폰트 사이즈 적용 */
        p,
        div,
        span,
        button,
        input,
        textarea {
          font-size: var(--base-font-size);
        }

        h1 {
          font-size: var(--title-font-size);
        }

        h2,
        h3 {
          font-size: var(--subtitle-font-size);
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
