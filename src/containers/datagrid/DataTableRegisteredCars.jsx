import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

function DataTableRegisteredCars({ registeredCarsData }) {
  const columnsCategories = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'color', headerName: 'Color', width: 300 },
    { field: 'makeby', headerName: 'Make by', width: 300 },
    { field: 'model', headerName: 'Model', width: 300 },
    { field: 'registrationno', headerName: 'Registration no', width: 300 },
  ];
  return (
    <div className="w-100 h-30">
      <DataGrid
        rows={registeredCarsData || []}
        columns={columnsCategories || []}
        pageSize={3}
        rowsPerPageOptions={[3]}
      />
    </div>
  );
}

export default DataTableRegisteredCars;
