import { createGlobalStyle } from 'styled-components';

export const theme = {};

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;

    &::before,
    &::after {
      box-sizing: inherit;
    }
  }

  html, body {
    min-height: 100vh;
  }

  body {
    font-family: 'Verdana';
    -webkit-font-smoothing: antialiased;
    moz-osx-font-smothing: grayscale;
    text-rendering: optimizeLegibility;
  }
`;
