import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import TroubleshootTwoTone from '@mui/icons-material/TroubleshootTwoTone';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

const theme = createTheme();



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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


        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}