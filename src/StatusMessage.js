import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';


export default function StatusMessage(message) {
  
  message = message["message"]
  if(message != null){
    return (
      <div id="error_div">
        <Container component="main" maxWidth="sm">
          
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
            <Typography variant="subtitle1">
                {message}
            </Typography>
            </Box>
        </Container>
      </div>
    );
  }else{
    return(
      <div id="error_div"></div>
    );
  }
}