import React from "react";
import { Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextInput from "components/TextInput";
import Message from "./Message";

const Container = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  justifyContent: 'space-between',
  width: "500px",
  height: "500px",
});

const Dialog = () => {

  return (
    <Container>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        px: 2,
        height: '100%',
        overflowY: 'scroll',
        '&::-webkit-scrollbar-thumb': {
          border: `5px solid white`
        } 
      }}>
        <Message
          message="h fghfghfg fhfgh fgfh f"
          timestamp="MM/DD 00:00"
          photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
          displayName="Вася"
        />
        <Message
          message="fghfghghff fhfg fghfg fgh f hfh fh fgh fg"
          timestamp="MM/DD 00:00"
          photoURL=""
          displayName="Вася"
        />
        <Message
          message="gfhfgh fh fgh fg fgh fg hfg"
          timestamp="MM/DD 00:00"
          photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
          displayName="Петя"
          isMyMessage
        />
        <Message
          message="m fgh fhfghggfh f hfh"
          timestamp="MM/DD 00:00"
          photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
          displayName="Петя"
          isMyMessage
        />
        <Message
          message="m fgh fhfghggfh f hfh"
          timestamp="MM/DD 00:00"
          photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
          displayName="Петя"
          isMyMessage
        />
        <Message
          message="m fgh fhfghggfh f hfh"
          timestamp="MM/DD 00:00"
          photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
          displayName="Петя"
          isMyMessage
        />
      </Box>
      <TextInput />
    </Container>
  );
};

export default React.memo(Dialog);