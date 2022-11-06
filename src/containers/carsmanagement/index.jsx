/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';

import uuid from 'react-uuid';
import { toast } from 'react-toastify';
import * as FormValidations from '../../utils/Validations';
// api function import
import api from '../../api';
import CarManagement from './CarManagement';

const index = () => {
  const [formData, setFormData] = useState({
    category: '',
    color: '',
    model: '',
    makeby: '',
    registrationno: '',
  }); // state to set form data
  const [vehicleCategories, setVehicleCategories] = useState();
  const [registeredCars, setRegisteredCars] = useState();
  const [error, setError] = useState({
    key: '',
    message: '',
  }); // states for validation errors

  const [editError, setEditError] = useState({
    key: '',
    message: '',
  }); // states for edit category validation errors

  const setState = (key, value) => {
    const obj = {};
    obj[key] = value;
    setFormData({ ...formData, ...obj });
  };
  // api for getting categories
  const getVehicleCategories = async () => {
    try {
      const response = await api('get', 'categories');
      setVehicleCategories(response?.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.trace(err);
    }
  };
  // api for getting registered users
  const getRegisteredCars = async () => {
    try {
      const response = await api('get', 'Cars');
      setRegisteredCars(response?.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.trace(err);
    }
  };
  useEffect(() => {
    getVehicleCategories();
    getRegisteredCars();
  }, []);
  const addCar = async () => {
    const isValidated = FormValidations.addCar(formData);
    setError({
      key: isValidated?.key,
      message: isValidated?.message,
    });
    if (isValidated?.key) {
      return;
    }
    const obj = {
      ...formData,
      carId: uuid(),
    };
    try {
      const response = await api('post', 'Cars', obj);
      if (response.statusText === 'Created') {
        toast.success('Car Added Successfully');
        setFormData({
          category: '',
          color: '',
          model: '',
          makeby: '',
          registrationno: '',
        });
        getRegisteredCars();
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.trace(err);
    }
  };
  return (
    <CarManagement
      vehicleCategories={vehicleCategories}
      getRegisteredCars={getRegisteredCars}
      registeredCars={registeredCars}
      formData={formData}
      setFormData={setFormData}
      error={error}
      editError={editError}
      setEditError={setEditError}
      setState={setState}
      addCar={addCar}
    />
  );
};

export default index;
