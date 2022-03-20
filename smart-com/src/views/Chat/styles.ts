import { Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Container = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: 'space-between',
  width: "500px",
  height: "500px",
  boxShadow: 'none',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '100%'
  },
}));

export const Heading = styled(Box)(({ theme }) => ({
  display: 'none',
  backgroundColor: '#bfbaba',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    display: 'block'
  }
}));

export const Messages = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 16,
  height: '100%',
  overflowY: 'scroll',
  '&::-webkit-scrollbar-thumb': {
    border: `5px solid white`
  },
  [theme.breakpoints.down('md')]: {
    height: 'calc(100vh - 313px)'
  }
}));

export const InputContainer = styled('div')(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  borderRadius: '0 0 5px 5px',
  padding: 15,
  backgroundColor: '#bfbaba',
  [theme.breakpoints.down('sm')]: {
    borderRadius: 0
  }
}));