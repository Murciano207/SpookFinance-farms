import { createGlobalStyle } from 'styled-components';
import { YogiTheme } from 'yogi-uikit_rc';

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends YogiTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Inter', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
`;

export default GlobalStyle;
