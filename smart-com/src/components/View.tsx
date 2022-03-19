import React from 'react';
import type { FC, ReactNode } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Pagination,
  Skeleton
} from '@mui/material';
import Page from 'components/Page';
import { styled } from '@mui/material/styles';
import useMediaQuery from 'hooks/useMediaQuery';
import SearchField from './SearchField';

interface OwnProps {
  pageTitle?: string;
  pageSubTitle?: string | ReactNode;
  search?: {
    query: string;
    placeholder?: string;
    onSubmit: (query: string) => void;
  };
  pagination?: {
    count: number;
    currentPage: number
    handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  },
  isLoading?: boolean;
}

const ViewContainer = styled(Page)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: '100%',
  width: '100%',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    width: '100%',
    '&::-webkit-scrollbar': { width: 0 }
  },
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(7),
  },
}));

const Wrapper = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: 0
  }
}));

const Title = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const SearchWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  [theme.breakpoints.down('sm')]: {
    '& > *': {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      padding: '0 10px 0 35px'
    }
  }
}));

const View: FC<OwnProps> = ({
  pageTitle,
  pageSubTitle,
  children,
  search,
  pagination,
  isLoading = false,
}) => {

  const searchEnabled = Boolean(search);
  const paginationEnabled = Boolean(pagination);

  const isXl = useMediaQuery('(min-width: 1700px)');
  const isLg = useMediaQuery('(min-width: 1400px)');
  const isMd = useMediaQuery('(min-width: 900px)');
  const isSm = useMediaQuery('(min-width: 600px)');

  const siblingCount = (
    isXl && 5
    || isLg && 3
    || isMd && 2
    || isSm && 1
  );

  return (
    <ViewContainer title={pageTitle}>
      <Wrapper sx={{px: 0}} maxWidth={false}>
        <Grid container spacing={3} alignItems="baseline">
          <Grid item xs>
            {pageTitle && (
              <Title variant="h3" color="textPrimary">
                {isLoading ? <Skeleton width={480} /> : pageTitle}
              </Title>
            )}
            {pageSubTitle && (
              <Title>
                {isLoading ? <Skeleton width={320} /> : pageSubTitle}
              </Title>
            )}
          </Grid>
          {searchEnabled && (
            <SearchWrapper>
              <SearchField
                query={search.query}
                placeholder={search.placeholder}
                onSubmit={search.onSubmit}
                //@ts-ignore
                styles={{ width: '100%' }}
              />
            </SearchWrapper>
          )}
        </Grid>
        {paginationEnabled && (
          <Box sx={{ mt: 2 }}>
            <Pagination
              sx={{ '& > *': { justifyContent: !isMd && 'center' } }}
              count={pagination.count}
              page={pagination.currentPage}
              onChange={pagination.handleChange}
              siblingCount={siblingCount}
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
        <Box mt={3}>{children}</Box>
      </Wrapper>
    </ViewContainer>
  );
};

export default View;