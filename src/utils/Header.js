import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { Button } from '@mui/material';

// Стилизиран компонент за заглавието
const Title = styled(Typography)`
  flex-grow: 1;
  text-align: center;
`;

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Title variant="h6">Audio Store</Title>
        <Button href="/" color="inherit">Home</Button>
      </Toolbar>
    </AppBar>
  );
};