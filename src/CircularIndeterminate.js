import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


export default function CircularIndeterminate() {
  return (
    <div id="loading_div">
      <Container component="main" maxWidth="sm">
        
          <Box sx={{ display: 'flex', alignItems: 'center'}}>
            <CircularProgress />
          </Box>
      </Container>
      </div>
  );
}