import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

import Categories from '../categories';
import Carsmanagement from '../carsmanagement';
import RegisteredCars from '../registeredcars';

function Dashboard() {
  const { section } = useParams();
  return (
    <div className="dashboard_screen">
      <div className="db_sidebar_section">
        <Sidebar />
      </div>
      <div className="db_main_section">
        {section === 'categories' && <Categories />}
        {section === 'carsmanagement' && <Carsmanagement />}
        {section === 'registeredcars' && <RegisteredCars />}
      </div>
    </div>
  );
}

export default Dashboard;
