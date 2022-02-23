import { TextField as MuiTextField } from '@mui/material';
import type { FC } from 'react';
import type { TextFieldProps } from '@mui/material';

const TextField: FC<TextFieldProps> = (props) => (
  <MuiTextField
    {...props}
    variant="outlined"
    fullWidth={props.fullWidth ?? true}
  />
);

export default TextField;