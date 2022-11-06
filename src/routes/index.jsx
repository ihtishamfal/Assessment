// Init
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RoutesObj from './Routes';

function Index() {
  const store = useSelector((authData) => authData?.AuthReducers.data.auth);
  return (
    <Routes>
      {store?.token
        ? RoutesObj?.AuthRoutes.map((val) => (
          <>
            <Route exact path={val.path} name={val.name} element={<val.element />} />
            <Route path="*" element={<Navigate replace to="/dashboard/registeredcars" />} />
          </>
        ))
        : RoutesObj?.SideBarRoutes.map((val) => (
          <>
            <Route exact path={val.path} name={val.name} element={<val.element />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </>
        ))}
    </Routes>
  );
}
export default Index;
