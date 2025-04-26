import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        lineHeight: '1.6',
      },
    },
  },
  colors: {
    brand: {
      500: '#3182ce',
      600: '#2b6cb0',
    },
  },
});

export default theme;