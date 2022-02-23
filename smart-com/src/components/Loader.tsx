import type { FC } from 'react';
import { Typography, Skeleton as MuiSkeleton, Stack, Box } from '@mui/material';
import { styled } from '@mui/system';

const Skeleton = styled(MuiSkeleton)(() => ({
  borderRadius: '4px'
}));

const filtersSkeleton = (
  <Box sx={{ marginBottom: 3 }}>
    <Skeleton
      variant="rectangular"
      width="100%"
      height={68}
    />
  </Box>
);

const itemSkeleton = (
  <Box sx={{ marginBottom: 3 }}>
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h3">
        <MuiSkeleton />
      </Typography>
    </Box>
    <Skeleton
      variant="rectangular"
      width="100%"
      height={60}
    />
  </Box>
);

const Loader: FC = () => (
  <Stack spacing={1}>
    {filtersSkeleton}
    {itemSkeleton}
    {itemSkeleton}
  </Stack>
);

export default Loader;