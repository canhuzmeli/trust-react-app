import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

const theme = createTheme();
export default function StatusMessage(message) {
  console.log(message);
  message = message["message"]
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
          <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <Typography variant="subtitle1">
              {message}
          </Typography>
          </Box>
      </Container>
    </ThemeProvider>
  );
}