/* eslint-disable no-console */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-undef */
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import { toast } from 'react-toastify';

import EditCarModal from '../../common/Modal/EditCarModal';
import api from '../../api';

function DataTableCars({
  registeredCars,
  getRegisteredCars,
  vehicleCategories,
  editError,
  setEditError,
}) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({}); // state to set form data
  const setState = (key, value) => {
    const obj = {};
    obj[key] = value;
    setFormData({ ...formData, ...obj });
  };
  // delete Category
  const deleteCategory = async (params) => {
    try {
      const response = await api('delete', `Cars/${params?.row?.id}`);
      if (response.status === 200) {
        toast.success('Car Deleted Successfuly');
        getRegisteredCars();
      } else {
        toast.error('!error');
      }
    } catch (error) {
      console.trace(error);
    }
  };
  // delete Category
  const columnsCars = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'color', headerName: 'Color', width: 180 },
    { field: 'model', headerName: 'Model', width: 180 },
    { field: 'makeby', headerName: 'Make by', width: 180 },
    { field: 'registrationno', headerName: 'Registration no', width: 180 },
    {
      field: 'Update',
      headerName: '',
      sortable: false,
      minWidth: 100,
      renderCell: (params) => (
        <div style={{ cursor: 'pointer' }}>
          <Button
            onClick={() => {
              setOpen(true);
              setFormData({
                id: params?.row?.id,
                carId: params?.row?.carId,
                category: params?.row?.category,
                color: params?.row?.color,
                model: params?.row?.model,
                makeby: params?.row?.makeby,
                registrationno: params?.row?.registrationno,
              });
            }}
            variant="contained"
          >
            Update
          </Button>
        </div>
      ),
    },
    {
      field: 'Delete',
      headerName: '',
      sortable: false,
      minWidth: 100,
      renderCell: (params) => (
        <div style={{ cursor: 'pointer' }}>
          <Button onClick={() => deleteCategory(params)} variant="contained">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-100 h-30">
      <EditCarModal
        open={open}
        setOpen={setOpen}
        formData={formData}
        setFormData={setFormData}
        setState={setState}
        editError={editError}
        setEditError={setEditError}
        vehicleCategories={vehicleCategories}
        getRegisteredCars={getRegisteredCars}
      />
      <DataGrid
        rows={registeredCars || []}
        columns={columnsCars || []}
        pageSize={3}
        rowsPerPageOptions={[3]}
      />
    </div>
  );
}

export default DataTableCars;
