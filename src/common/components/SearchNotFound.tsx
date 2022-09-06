import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

interface SearchNotFoundProps {
  searchQuery: string
}

const SearchNotFound: React.FC<SearchNotFoundProps> = ({ searchQuery = '' }) => {
  return (
    <>
      <Typography gutterBottom align="center" variant="h5">
        Not found
      </Typography>
      <Typography variant="body1" align="center">
        No results found for &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Try checking for typos or using complete words.
      </Typography>
    </>
  );
}

export default SearchNotFound;
