import React, { ElementType, Fragment } from 'react';
import type { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Typography,
  IconButton,
  Skeleton,
  SvgIcon
} from '@mui/material';
import type { ButtonProps, IconButtonProps } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Page from 'components/Page';
import { styled } from '@mui/material/styles';
import SearchField from './SearchField';

export type ActionType = {
  buttonProps: ButtonProps<ElementType, { component?: ElementType }>;
  buttonText: string;
};

type LinksType = {
  url: string;
  title: string;
};

interface OwnProps {
  pageTitle?: string;
  pageSubTitle?: string | ReactNode;
  actions?: ActionType[];
  rightLinks?: LinksType[];
  moreVertButton?: {
    iconButtonProps: IconButtonProps;
  };
  isLoading?: boolean;
  search?: {
    query: string;
    placeholder?: string;
    onSubmit: (query: string) => void;
  };
}

const ViewContainer = styled(Page)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: '100%',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3)
}));

const HeaderAction = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  '& + &': {
    marginLeft: theme.spacing(1)
  }
}));

const View: FC<OwnProps> = ({
  pageTitle,
  pageSubTitle,
  actions,
  rightLinks,
  moreVertButton,
  isLoading = false,
  children,
  search
}) => {

  const searchEnabled = Boolean(search);

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
          {actions?.map((action) => (
            <Grid item key={action.buttonText}>
              <HeaderAction
                variant={action.buttonProps.variant ?? 'outlined'}
                {...action.buttonProps}
              >
                {action.buttonText}
              </HeaderAction>
            </Grid>
          ))}
          {rightLinks && rightLinks.length ? (
            <Grid item>
              <Box display="flex">
                {rightLinks.map((link, index) => (
                  <Fragment key={link.url}>
                    <Link
                      color="primary"
                      component={RouterLink}
                      to={link.url}
                      variant="subtitle2"
                    >
                      {link.title}
                    </Link>
                    {rightLinks.length !== index + 1 && (
                      <Typography variant="subtitle2">
                        &nbsp; / &nbsp;
                      </Typography>
                    )}
                  </Fragment>
                ))}
              </Box>
            </Grid>
          ) : null}
          {searchEnabled && (
            <Box>
              <SearchField
                query={search.query}
                placeholder={search.placeholder}
                onSubmit={search.onSubmit}
              />
            </Box>
          )}
          {moreVertButton && (
            <Grid item>
              <IconButton {...moreVertButton.iconButtonProps}>
                <SvgIcon fontSize="small">
                  <MoreVertIcon />
                </SvgIcon>
              </IconButton>
            </Grid>
          )}
        </Grid>
        <Box mt={3}>{children}</Box>
      </Container>
    </ViewContainer>
  );
};

export default View;