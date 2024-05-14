import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            _focus: {
              borderColor: 'yellow.100',
            }
          }
        }
      }
    }
  }
});

export default theme;
