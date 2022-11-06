import React, { useEffect, useState } from 'react';
import api from '../../api';

import DataTableRegisteredCars from '../datagrid/DataTableRegisteredCars';

function ResgisteredCars() {
  const [registeredCars, setRegisteredCars] = useState();
  // api for getting registered users
  const getVehicleCategories = async () => {
    try {
      const response = await api('get', 'Cars');
      setRegisteredCars(response?.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.trace(err);
    }
  };
  const [registeredCarsData, setRegisteredCarsData] = useState([]);
  const getRegisteredCars = async () => {
    try {
      const response = await api('get', 'Cars');
      setRegisteredCarsData(response?.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.trace(err);
    }
  };
  useEffect(() => {
    getVehicleCategories();
    getRegisteredCars();
  }, []);
  return (
    <div className="d-flex flex-col h-100 align-items-start justify-start reg-cars-countainer">
      <h2>
        <span>R</span>
        egist
        <span>ered</span>
        &nbsp; Ca
        <span>rs:</span>
        {registeredCars?.length}
      </h2>
      <DataTableRegisteredCars registeredCarsData={registeredCarsData} />
    </div>
  );
}

export default ResgisteredCars;
