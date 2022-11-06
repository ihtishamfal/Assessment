/* eslint-disable no-console */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import Modal from '../../common/Modal/EditCategoriesModal';

import api from '../../api';

export default function DataTable({
  vehicleCategories,
  getVehicleCategories,
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
      const response = await api('delete', `categories/${params?.row?.id}`);
      if (response.status === 200) {
        toast.success('Category Deleted');
        getVehicleCategories();
      } else {
        toast.error('!error');
      }
    } catch (err) {
      console.trace(err);
    }
  };
  // delete Category
  const columnsCategories = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'categoryname', headerName: 'Category Name', width: 300 },
    { field: 'description', headerName: 'Category Description', width: 300 },
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
                categoryname: params?.row?.categoryname,
                description: params?.row?.description,
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
      <Modal
        open={open}
        setOpen={setOpen}
        setEditError={setEditError}
        formData={formData}
        setFormData={setFormData}
        setState={setState}
        editError={editError}
        getVehicleCategories={getVehicleCategories}
        ModalHeader="Update Category"
      />
      <DataGrid
        rows={vehicleCategories || []}
        columns={columnsCategories || []}
        pageSize={3}
        rowsPerPageOptions={[3]}
      />
    </div>
  );
}
