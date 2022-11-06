/* eslint-disable no-console */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

import { toast } from 'react-toastify';
import InputField from '../inputField/InputField';
import Label from '../label/Label';
import P from '../ptag/P';
import * as FormValidations from '../../utils/Validations';
import api from '../../api';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 300,
  bgcolor: 'background.paper',
  border: '2px solid #1976d2',
  boxShadow: 24,
  p: 2,
};

export default function BasicModal({
  open,
  setOpen,
  editError,
  setEditError,
  formData,
  setState,
  ModalHeader,
  getVehicleCategories,
}) {
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const updateCategory = async () => {
    try {
      const isValidated = FormValidations.addCategory(formData);
      setEditError({
        key: isValidated?.key,
        message: isValidated?.message,
      });
      if (isValidated?.key) {
        return;
      }
      const response = await api('put', `categories/${formData?.id}`, formData);
      if (response.status === 200) {
        toast.success('Category updated Successfuly');
        getVehicleCategories();
        handleClose();
      } else {
        toast.error('!error');
      }
    } catch (err) {
      console.trace(err);
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
                setEditError({ key: '', message: '' });
              }}
            />
          </div>
          <div className="d-flex justify-center">{ModalHeader}</div>
          <div className="d-flex flex-col w-100">
            <Label text="Category Name" />
            <InputField
              onChange={(e) => setState('categoryname', e.target.value)}
              value={formData?.categoryname}
              placeholder="Category Name"
            />
            {editError.key === 'Category Name' ? (
              <P className="error" text={editError.message} />
            ) : (
              ''
            )}
            <Label text="Category Description" />
            <InputField
              onChange={(e) => setState('description', e.target.value)}
              value={formData?.description}
              placeholder="Category Description"
            />
            {editError.key === 'Description' ? (
              <P className="error" text={editError.message} />
            ) : (
              ''
            )}
          </div>
          <div className="d-flex justify-center label">
            <Button onClick={updateCategory} variant="contained">
              Update
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
