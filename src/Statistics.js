import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';




export default function Statistics(json_data) {
  try{
    const handleSubmit = (event) => {
      event.preventDefault();
    };
    
    
    const data = json_data["json_data"]
    if(data != null){
      return (
        <div id="statistics_div">
          <Container component="main" maxWidth="lg">            
            <Grid container spacing={2}>
              <Grid item md={3}>
                <Typography variant="subtitle1" >
                  Account Value (Ξ)
                </Typography>
                <Typography variant="h2">
                {String(data.account_value).substring(0,6)}
                </Typography>
              </Grid>
              <Grid item md={3}>
                <Typography variant="subtitle1" >
                  Oldest Transaction Age (days)
                </Typography>
                <Typography variant="h2">
                {String((parseInt(new Date() - (new Date(data.oldest_transaction_age * 1000)))/1000)/60/60/24).split('.')[0]}
                </Typography>
              </Grid>
              <Grid item md={3}>
                <Typography variant="subtitle1" >
                  Newest Transaction Age (days)
                </Typography>
                <Typography variant="h2">
                {String((parseInt(new Date() - (new Date(data.newest_transaction_age * 1000)))/1000)/60/60/24).split('.')[0]}
                </Typography>
              </Grid>
              <Grid item md={3}>
                <Typography variant="subtitle1" >
                  Highest Transaction Value (Ξ)
                </Typography>
                <Typography variant="h2"> 
                {String(data.max_transaction_value).substring(0,6)}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={6}>
              <Grid item md={6}>
              </Grid>
              <Grid item md={6}>
              </Grid>
              <Grid item md={6}>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item md={3}>
                <Typography variant="subtitle1" >
                  Median Transaction Value (Ξ)
                </Typography>
                <Typography variant="h2">
                {String(data.median_value).substring(0,6)}
                </Typography>
              </Grid>
              <Grid item md={3}>
                <Typography variant="subtitle1" >
                  Unique Recepients
                </Typography>
                <Typography variant="h2">
                {String(data.count_unique_to)}
                </Typography>
              </Grid>
              <Grid item md={3}>
                <Typography variant="subtitle1" >
                  Unique Funders
                </Typography>
                <Typography variant="h2">
                {String(data.count_unique_from)}
                </Typography>
              </Grid>
              <Grid item md={3}>
                <Typography variant="subtitle1" >
                  Number of Transactions
                </Typography>
                <Typography variant="h2">
                {String(data.count_transactions)}
                </Typography>
              </Grid>
            </Grid>
          </Container>        
          </div>
      );
    }else{
      return(<div id="statistics_div"></div>);
    }
  }catch(err){
    return ( 
      
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Grid container spacing={2}>
            <Grid item md={3}>
              <Typography variant="subtitle1" >{String(err)}</Typography>
            </Grid>
        </Grid>
        </Container>
      
    );
  }
}