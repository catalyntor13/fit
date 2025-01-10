// Importam dependintele
import React from 'react';
import { TypeForm } from './TypeForm';

const Formular = () => {

 
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <TypeForm/>
      </div>
    </div>
  );
};

export default Formular;
