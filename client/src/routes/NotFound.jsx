import React from 'react';
import { NavLink } from 'react-router-dom';
import { BiErrorAlt } from 'react-icons/bi';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <BiErrorAlt className="text-8xl text-sky-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Oops!
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Ne pare rău, dar pagina pe care o cauți nu există.
        </p>

        <NavLink 
          to="/"
          className="inline-flex px-6 py-3 bg-sky-600 text-white rounded-xl 
            hover:bg-sky-700 transition-all duration-200 font-medium"
        >
          Înapoi Acasă
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;