import { styled } from '@mui/material/styles';
import { Paper, Box, Typography } from '@mui/material';

export const DialogsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '500px',
  overflow: 'hidden',
  marginTop: 10,
  [theme.breakpoints.down('sm')]: {
    height: '100%',
    marginTop: 0
  },
}));

export const DialogContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  justifyContent: 'space-between',
  height: "100%",
  boxShadow: 'none',
  [theme.breakpoints.down('sm')]: {
    borderRadius: 0
  },
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '5px 15px',
  backgroundColor: '#bfbaba',
  borderRadius: '5px 5px 0 0',
  [theme.breakpoints.down('sm')]: {
    borderRadius: 0
  },
}));

interface StyledFollowersProps {
  isMd: boolean;
  isUriId: boolean;
};

export const FollowersContainer = styled(Box, {
  shouldForwardProp: (prop) => (
    prop !== 'isMd'
    && prop !== 'isUriId'
  )
})<StyledFollowersProps>(({
  theme, isMd, isUriId
}) => ({
  display: !isMd && isUriId ? 'none' : 'flex',
  flexDirection: 'column',
  flexBasis: '400px',
  overflowY: 'scroll',
  paddingRight: 16,
  marginRight: 8,
  [theme.breakpoints.down('md')]: {
    flexBasis: '100%',
    marginRight: 0,
    padding: 8
  }
}));

interface StyledFollowerProps {
  hasNewMessages: boolean;
  isActive: boolean;
};

export const FollowerContainer = styled(Box, {
  shouldForwardProp: (prop) => (
    prop !== 'hasNewMessages'
    && prop !== 'isActive'
  )
})<StyledFollowerProps>(({
  theme,
  hasNewMessages,
  isActive = false
}) => ({
  display: 'flex',
  alignItems: 'center',
  border: `2px solid ${isActive ? theme.palette.primary.main : 'none'}`,
  borderRadius: 15,
  padding: 8,
  cursor: 'pointer',
  width: '100%',
  backgroundColor: hasNewMessages ? '#CCFF99' : 'white'
}));

export const ActivityDate = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.text.secondary
}));

export const InputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  borderRadius: '0 0 5px 5px',
  padding: 15,
  backgroundColor: '#bfbaba',
  [theme.breakpoints.down('sm')]: {
    borderRadius: 0
  },
}));