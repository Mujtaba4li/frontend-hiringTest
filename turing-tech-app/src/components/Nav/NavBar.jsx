import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import itlogo from '../../assets/images/it-logo.png'

import './nav.css'
export default function NavBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className='background'>
        <Toolbar>
        
        
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           <img
          alt="ShareClub"
          src={itlogo}
          style={{ width: 200,}}
        />
          </Typography>
          <Button variant="contained" className={props.display}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
