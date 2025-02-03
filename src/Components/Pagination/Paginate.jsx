import * as React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'


export default function PaginationControlled({currentPage,setCurrentPage,pagesCount}) {

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };


  return (
    <Stack  spacing={6}>
      <Pagination count={pagesCount} page={currentPage} onChange={handleChange} />
    </Stack>
  );
}