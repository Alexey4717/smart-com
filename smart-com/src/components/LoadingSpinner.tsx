import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

interface OwnProps {
  nonOverlay?: boolean;
};

const ContainerOverlay = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  zIndex: 1
}));

const ContainerNonOverlay = styled('div')(() => ({
  textAlign: 'center',
  padding: '50px 0'
}));

const LoadingSpinner = ({ nonOverlay = false }: OwnProps) => {
  const Container = nonOverlay ? ContainerNonOverlay : ContainerOverlay;

  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

export default LoadingSpinner;