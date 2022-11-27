import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GaugeChart from 'react-gauge-chart'

const theme = createTheme();
export default function CircularIndeterminate(score) {

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
          <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <GaugeChart id="gauge-chart3" 
            nrOfLevels={5} 
            colors={["#fa0505", "#fa4605", "#fac105","#a8fa05","#05fa32"]}              
            percent={Math.trunc(score["score"])/100}
            needleColor="#6d6e6d"
            textColor="#000000"
            />
          </Box>
      </Container>
    </ThemeProvider>
  );
}