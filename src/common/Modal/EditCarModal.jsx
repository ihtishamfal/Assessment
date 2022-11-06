/* eslint-disable no-console */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

import { toast } from 'react-toastify';

import * as FormValidations from '../../utils/Validations';
import InputField from '../inputField/InputField';
import Label from '../label/Label';
import P from '../ptag/P';
import api from '../../api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 550,
  bgcolor: 'background.paper',
  border: '2px solid #1976d2',
  boxShadow: 24,
  p: 2,
};

function EditCarModal({
  open,
  setOpen,
  formData,
  setState,
  vehicleCategories,
  getRegisteredCars,
  editError,
  setEditError,
}) {
  const handleClose = () => setOpen(false);
  const updateCar = async () => {
    const isValidated = FormValidations.addCar(formData);
    setEditError({
      key: isValidated?.key,
      message: isValidated?.message,
    });
    if (isValidated?.key) {
      return;
    }
    try {
      const response = await api('put', `Cars/${formData?.id}`, formData);
      if (response.status === 200) {
        toast.success('Car updated Successfuly');
        getRegisteredCars();
        handleClose();
      } else {
        toast.error('!error');
      }
    } catch (error) {
      console.trace(error);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="d-flex justify-content-end">
            <DisabledByDefaultIcon
              onClick={() => {
                handleClose();
              }}
            />
          </div>
          <div className="d-flex flex-col w-100">
            <Box sx={{ minWidth: 120 }}>
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
            {editError.key === 'Category' ? <P className="error" text={editError.message} /> : ''}
            <Label text="Color" htmlFor="ccolor" />
            <InputField
              onChange={(e) => setState('color', e.target.value)}
              value={formData?.color}
              placeholder="Car Color..."
            />
            {editError.key === 'Color' ? <P className="error" text={editError.message} /> : ''}
            <Label text="Model" htmlFor="cmodel" />
            <InputField
              onChange={(e) => setState('model', e.target.value)}
              value={formData?.model}
              placeholder="Model..."
            />
            {editError.key === 'Model' ? <P className="error" text={editError.message} /> : ''}
            <Label text="Make By" htmlFor="makeby" />
            <InputField
              onChange={(e) => setState('makeby', e.target.value)}
              value={formData?.makeby}
              placeholder="Make By..."
            />
            {editError.key === 'Make by' ? <P className="error" text={editError.message} /> : ''}
            <Label text="Registration No" htmlFor="registrationno" />
            <InputField
              onChange={(e) => setState('registrationno', e.target.value)}
              value={formData?.registrationno}
              placeholder="Registration no..."
            />
            {editError.key === 'Registration no' ? (
              <P className="error" text={editError.message} />
            ) : (
              ''
            )}
          </div>
          <div className="d-flex justify-center label">
            <Button onClick={updateCar} variant="contained">
              Update
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default EditCarModal;
