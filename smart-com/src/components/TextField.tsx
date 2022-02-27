import { TextField as MuiTextField } from '@mui/material';
import type { FC } from 'react';
import { useState, useCallback } from 'react';
import type { TextFieldProps } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';

type OwnProps = TextFieldProps & {
  fullWidth?: boolean;
  withIcon?: boolean;
};

const TextField: FC<OwnProps> = ({ withIcon = false, fullWidth, ...props }) => {

  const [visiblePassword, setVisiblePasswor] = useState<boolean>(false);

  const toggleVisibiblity = useCallback(() => {
    setVisiblePasswor(prev => !prev);
  }, [setVisiblePasswor]);

  return (
    <MuiTextField
      {...props}
      variant="outlined"
      fullWidth={fullWidth ?? true}
      type={
        withIcon 
        ? (visiblePassword ? 'text' : 'password') 
        : 'text'
      }
      InputProps={withIcon && {
        endAdornment: (
          <InputAdornment position="end">
            <Box
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={toggleVisibiblity}
            >
              {
                visiblePassword
                  ? <VisibilityOffIcon />
                  : <VisibilityIcon />
              }
            </Box>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default TextField;