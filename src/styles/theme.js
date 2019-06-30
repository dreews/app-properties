import { createGlobalStyle } from 'styled-components';

const blue = '#1190cd';
const lightgray = '#e4e4e2';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&display=swap');

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

  html, body, #root, .App {
    min-height: 100vh;
  }

  body {
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    moz-osx-font-smothing: grayscale;
    text-rendering: optimizeLegibility;
    background-color: ${lightgray};
  }
`;

export const theme = {
  fontSizes: [
    12, 14, 16, 24, 32, 48, 64,
  ],
  colors: {
    blue,
    lightgray,
  },
  buttons: {
    primary: {
      color: '#fff',
      backgroundColor: blue,
    },
    outline: {
      color: blue,
      backgroundColor: 'transparent',
      boxShadow: 'inset 0 0 2px',
    },
  },
};
