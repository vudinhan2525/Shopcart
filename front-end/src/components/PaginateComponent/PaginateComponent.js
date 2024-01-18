import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../utils/MUITheme';
export default function PaginationControlled({ cntProd, setPaginate, paginate }) {
  const handleChange = (event, value) => {
    setPaginate(value);
  };
  return (
    <div className="flex justify-center mt-4 ">
      <ThemeProvider theme={theme}>
        <Stack spacing={10}>
          <Pagination
            count={Math.ceil(cntProd / 8)}
            page={paginate}
            size="large"
            color="primary"
            onChange={handleChange}
          />
        </Stack>
      </ThemeProvider>
    </div>
  );
}
