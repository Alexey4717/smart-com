import React from 'react';
import { 
  Avatar, 
  Box, 
  Button, 
  Typography 
} from '@mui/material';
import { styled } from '@mui/material/styles';

const Container = styled('div')(({ theme }) => ({
  display: 'flex', 
  backgroundColor: theme.palette.secondary.main, 
  margin: '3px',
  borderRadius: '25px',
  padding: '5px'
}))

const Follower = ({ name, photo }) => {

  return (
    <Container>
      <Avatar sx={{ width: 55, height: 55 }} alt={`photo of ${name}`} src={photo} />
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        px: 2 
      }}>
        <Typography
          sx={{ 
            display: 'block', 
            pl: 1,
            maxWidth: '110px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
          component='span'
        >
          {name}
        </Typography>
        <Button 
          sx={{ fontSize: '10px' }}
          variant="text"
        >
          Написать
        </Button>
      </Box>
    </Container>
  );
};

export default React.memo(Follower);