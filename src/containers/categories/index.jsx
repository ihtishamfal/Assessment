/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';

import uuid from 'react-uuid';
import parse from 'html-react-parser';
import { toast } from 'react-toastify';
import * as FormValidations from '../../utils/Validations';

import api from '../../api';
import Categories from './Categories';

const index = () => {
  const [formData, setFormData] = useState({
    categoryname: '',
    description: '',
  }); // state to set form data
  const [vehicleCategories, setVehicleCategories] = useState();
  const [error, setError] = useState({
    key: '',
    message: '',
  }); // states for validation errors

  const [editError, setEditError] = useState({
    key: '',
    message: '',
  }); // states for edit category validation errors

  // api for getting registered users
  const getVehicleCategories = async () => {
    try {
      const response = await api('get', 'categories');
      setVehicleCategories(response?.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.trace(err);
    }
  };

  useEffect(() => {
    getVehicleCategories();
  }, []);

  const setState = (key, value) => {
    const obj = {};
    obj[key] = value;
    setFormData({ ...formData, ...obj });
  };

  const addCategory = async () => {
    const isValidated = FormValidations.addCategory(formData);
    setError({
      key: isValidated?.key,
      message: isValidated?.message,
    });
    if (isValidated?.key) {
      return;
    }
    const obj = {
      id: uuid(),
      categoryname: formData?.categoryname,
      description: parse(formData?.description).props.children,
    };
    try {
      const response = await api('post', 'categories', obj);
      if (response.statusText === 'Created') {
        toast.success('Category Added...');
        setFormData({
          categoryname: '',
          description: '',
        });
        getVehicleCategories();
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.trace(err);
    }
  };
  return (
    <Categories
      setState={setState}
      error={error}
      setError={setError}
      editError={editError}
      setEditError={setEditError}
      formData={formData}
      vehicleCategories={vehicleCategories}
      addCategory={addCategory}
      getVehicleCategories={getVehicleCategories}
    />
  );
};

export default index;
