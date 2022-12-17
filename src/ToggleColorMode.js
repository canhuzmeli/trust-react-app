import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness5Icon from '@mui/icons-material/Brightness5';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });



export default function ToggleColorMode({parentCallback}) {
   const [mode, setMode] = React.useState('light');
   const colorMode = React.useMemo(
     () => ({
       toggleColorMode: () => {         
         if(mode == 'light'){
          parentCallback('dark')
          setMode('dark')
         }else{
          parentCallback('light')
          setMode('light')
         }
       },
     }),
     [mode],
   );
 
   const theme = React.useMemo(
     () =>
       createTheme({
         palette: {
           mode,
         },
       }),
     [mode],
   );
 
   return (
     <ColorModeContext.Provider value={colorMode}>
       <ThemeProvider theme={theme}>
         <Box variant='contained' sx={{ position: "fixed", top: 0, right: 0, zIndex: 2000  }}>
            {theme.palette.mode} 
            <IconButton  onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness4Icon /> :  <Brightness5Icon />}
            </IconButton>
         </Box>
       </ThemeProvider>
     </ColorModeContext.Provider> 
   );
 }