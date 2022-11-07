import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

const theme = createTheme();

export default function Statistics(json_data) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const data = JSON.parse(json_data["json_data"]);
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />

        <Grid container spacing={2}>
          <Grid item md={3}>
            <Typography variant="subtitle1" >
              Account Value
            </Typography>
            <Typography variant="h2">
              {data.account_value}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="subtitle1" >
              Oldest Transaction Age
            </Typography>
            <Typography variant="h2">
            {data.oldest_transaction_age}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="subtitle1" >
              Newest Transaction Age
            </Typography>
            <Typography variant="h2">
            {data.newest_transaction_age}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="subtitle1" >
              Highest Transaction Value
            </Typography>
            <Typography variant="h2">
            {data.max_transaction_value}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
    
  );
}