import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GaugeChart from 'react-gauge-chart'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const theme = createTheme();

export default function ScoreInformation(score) {
  
  if(score["score"] == null || score["score"] == ""){
    return ( <div id="score_div"></div>);
  }else{
    var p = Math.trunc(score["score"])/100

    var c = "#000000"
    if(p < 0.2){
      c = "#fa0505"
    }else if( (0.4 > p ) >= 0.2){
      c = "#fa4605"
    }else if((0.6 > p) >= 0.4){
      c = "#fac105"
    }else if((0.8 > p) >= 0.6){
      c = "#a8fa05"
    }else{
      c = "#05fa32"
    }

    return ( 
      <div id="score_div">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="lg">        
          <Grid container spacing={1}  alignItems="center">
              <Grid item xs={8}>
              <Box sx={{ display: 'flex', alignItems: 'center'}}>
                <GaugeChart id="gauge-chart3" 
                  nrOfLevels={5} 
                  colors={["#fa0505", "#fa4605", "#fac105","#a8fa05","#05fa32"]}              
                  percent={Math.trunc(score["score"])/100}
                  needleColor="#6d6e6d"
                  textColor={c}
                  />
                </Box>
                
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle1" >
                  <b>Trust Score </b> on the left gives you an indication how much you can trust this wallet ID. 
                  If the score is low, it might mean that the account might be fraudelent or recently created with no history or controlled by a software. 
                </Typography>
              </Grid>
            </Grid>
            
        </Container>
      </ThemeProvider>
      </div>
    );
  }
}