import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type PaginateProps = {
  currentPage: number;
  pagesCount: number;
  setCurrentPage: (value: number) => void;
};

const PaginationControlled: React.FC<PaginateProps> = ({ currentPage, setCurrentPage, pagesCount }) => {

  // Типы event и value уточняются автоматически TypeScript
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value); // value - это число, номер страницы
  };

  return (
    <Stack spacing={6}>
      <Pagination count={pagesCount} page={currentPage} onChange={handleChange} />
    </Stack>
  );
};

export default PaginationControlled;
