
import * as React from 'react';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();


export default function Copyright(props) {
    return (
      <ThemeProvider theme={theme}>
      <Container position="absolute" bottom="0px">
     
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      </Container>
    </ThemeProvider>
    );
  }