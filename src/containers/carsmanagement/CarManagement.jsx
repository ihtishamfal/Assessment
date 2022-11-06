/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// Resuable components import
import H1 from '../../common/h1/H1Tag';
import P from '../../common/ptag/P';
import Label from '../../common/label/Label';
import InputField from '../../common/inputField/InputField';

import DataTableCars from '../datagrid/DataTableCars';

function CarManagement({
  vehicleCategories,
  getRegisteredCars,
  registeredCars,
  setState,
  formData,
  addCar,
  error,
  editError,
  setEditError,
}) {
  return (
    <div className="categories_section w-100">
      <div className="cs_form_container d-flex justify-center">
        <div className="d-flex flex-col w-50">
          <H1 className="header-tag" text="Cars Registration" />
          <Box sx={{ minWidth: 120, marginTop: '2%' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData?.category}
                label="Categories"
                onChange={(e) => setState('category', e.target.value)}
              >
                {vehicleCategories?.map((_) => (
                  <MenuItem value={_?.id}>{_?.categoryname}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {error.key === 'Category' ? <P className="error" text={error.message} /> : ''}
          <Label text="Color" htmlFor="ccolor" />
          <InputField
            onChange={(e) => setState('color', e.target.value)}
            value={formData?.color}
            placeholder="Car Color..."
          />
          {error.key === 'Color' ? <P className="error" text={error.message} /> : ''}
          <Label text="Model" htmlFor="cmodel" />
          <InputField
            onChange={(e) => setState('model', e.target.value)}
            value={formData?.model}
            placeholder="Model..."
          />
          {error.key === 'Model' ? <P className="error" text={error.message} /> : ''}
          <Label text="Make By" htmlFor="makeby" />
          <InputField
            onChange={(e) => setState('makeby', e.target.value)}
            value={formData?.makeby}
            placeholder="Make By..."
          />
          {error.key === 'Make by' ? <P className="error" text={error.message} /> : ''}
          <Label text="Registration No" htmlFor="registrationno" />
          <InputField
            onChange={(e) => setState('registrationno', e.target.value)}
            value={formData?.registrationno}
            placeholder="Registration no..."
          />
          {error.key === 'Registration no' ? <P className="error" text={error.message} /> : ''}
          {/* {error.key === 'Description' ? <P className="error" text={error.message} /> : ''} */}
          <div role="presentation" className="btn-container w-100 d-flex justify-center">
            <Button onClick={addCar} variant="contained">
              Add Car
            </Button>
          </div>
        </div>
      </div>
      <DataTableCars
        vehicleCategories={vehicleCategories}
        getRegisteredCars={getRegisteredCars}
        registeredCars={registeredCars}
        editError={editError}
        setEditError={setEditError}
      />
    </div>
  );
}

export default CarManagement;
