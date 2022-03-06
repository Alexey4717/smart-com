import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Form = styled('form')({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  borderRadius: '0 0 5px 5px',
  padding: 15,
  backgroundColor: '#bfbaba'
});

const Text = styled(TextField)({
  width: "100%",
  borderRadius: '0 0 0 10px',
});

const TextInput = () => {

  return (
    <Form>
      <Text
        name="message"
        label="Введите сообщение"
        classes={{
          root: 'borderRadius: 0 0 0 10px'
        }}
      />
      <Button sx={{ ml: 2 }} variant="contained" color="primary">
        <SendIcon />
      </Button>
    </Form>
  )
};

export default React.memo(TextInput);