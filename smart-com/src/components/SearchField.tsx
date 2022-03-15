import type { FC } from 'react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  SvgIcon,
  TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import useDebounce from 'hooks/useDebounce';

const Container = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  '& > button': {
    marginBottom: 1
  }
}));

type OwnProps = {
  query: string;
  placeholder?: string;
  onSubmit: (query: string) => void;
};

const SearchField: FC<OwnProps> = ({ query, placeholder, onSubmit }) => {
  const [isDebounce, setDebounce] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>(query || '');
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    if (typeof onSubmit === 'function') {
      onSubmit(debouncedValue);
    }
  }, [debouncedValue, query]);

  const handleQueryChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setDebounce(true);
      event.persist();
      setSearchQuery(event.target.value);
    },
    [setSearchQuery]
  );

  useDebounce(
    () => {
      setDebounce(false);
      setDebouncedValue(searchQuery);
    },
    2000,
    [searchQuery]
  );

  const handleClear = () => {
    setSearchQuery('');
    setDebouncedValue('');
  };

  return (
    <Container>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon fontSize="small" color="action">
                <SearchIcon />
              </SvgIcon>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {isDebounce && <CircularProgress size={20} />}
              {searchQuery && (
                <IconButton size="small" onClick={handleClear}>
                  <CloseIcon />
                </IconButton>
              )}
            </InputAdornment>
          )
        }}
        onChange={handleQueryChange}
        placeholder={placeholder ?? 'Найти'}
        value={searchQuery}
        size="small"
        variant="outlined"
        fullWidth
      />
    </Container>
  );
};

export default SearchField;