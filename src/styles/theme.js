import { createGlobalStyle } from 'styled-components';

export const theme = {};

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
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
