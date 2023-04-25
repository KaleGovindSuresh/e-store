import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BlankLayout from './layouts/blank-layout/BlankLayout';
import SecureLayout from './layouts/secure-layout/SecureLayout';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<BlankLayout />} />
        <Route path="secured/*" element={<SecureLayout />} />
      </Routes>
    </>
  );
}

export default App;