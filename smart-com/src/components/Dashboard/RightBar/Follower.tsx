import React from 'react';
import { Avatar, Box, Button } from '@mui/material';

const Follower = ({ name, photo }) => {

  return (
    <Box sx={{ display: 'flex', border: '1px solid black', m: 1 }}>
      <Avatar alt={`photo of ${name}`} src={photo} />
      <div>
        <div>{name}</div>
        <Button 
          sx={{ fontSize: '10px' }}
          variant="outlined"
        >
          Написать сообщение
        </Button>
      </div>
    </Box>
  );
};

export default React.memo(Follower);