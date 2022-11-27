import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();
export default function CircularIndeterminate() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
          <Box sx={{ display: 'flex', alignItems: 'center'}}>
            <CircularProgress />
          </Box>
      </Container>
    </ThemeProvider>
  );
}