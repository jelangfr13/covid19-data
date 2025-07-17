import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

const CustomDataGrid = ({ rows, columns, loading }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[10, 25, 50, 100]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        getRowId={(row) => row.country}
        sx={{
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
            outline: "none",
          },
          border: 'none',
        }}
      />
    </Box>
  );
};

export default CustomDataGrid;