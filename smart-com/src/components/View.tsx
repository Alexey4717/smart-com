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
import SearchField from './SearchField';
import React from 'react';

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
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(7)
  },
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

  return (
    <ViewContainer title={pageTitle}>
      <Container maxWidth={false}>
        <Grid container spacing={3} alignItems="baseline">
          <Grid item xs>
            {pageTitle && (
              <Typography variant="h3" color="textPrimary">
                {isLoading ? <Skeleton width={480} /> : pageTitle}
              </Typography>
            )}
            {pageSubTitle && (
              <div>{isLoading ? <Skeleton width={320} /> : pageSubTitle}</div>
            )}
          </Grid>
          {searchEnabled && (
            <Box>
              <SearchField
                query={search.query}
                placeholder={search.placeholder}
                onSubmit={search.onSubmit}
              />
            </Box>
          )}
        </Grid>
        {paginationEnabled && (
          <Box sx={{ mt: 2 }}>
            <Pagination
              count={pagination.count}
              page={pagination.currentPage}
              onChange={pagination.handleChange}
              siblingCount={5}
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
        <Box mt={3}>{children}</Box>
      </Container>
    </ViewContainer>
  );
};

export default View;