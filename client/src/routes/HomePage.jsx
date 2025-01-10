import React from 'react';
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <header className='bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
          <span className='text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent'>
            ActiveFit
          </span>
          <div className='space-x-4'>
            <NavLink to='/autentificare/login'>
              <button className='px-6 py-2.5 text-gray-600 hover:text-sky-600 transition-all duration-300 font-medium hover:scale-105'>
                Autentificare
              </button>
            </NavLink>
            <NavLink to='/autentificare/register'>
              <button className='px-6 py-2.5 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-all duration-300 font-medium hover:scale-105 shadow-lg hover:shadow-sky-200'>
                Înregistrare
              </button>
            </NavLink>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className='max-w-7xl mx-auto px-6 py-24'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
          <div className='space-y-8'>
            <h1 className='text-5xl font-bold text-gray-900 leading-tight'>
              Simplifică modul în care <span className="text-sky-600">îți înțelegi clienții!</span>
            </h1>
            <p className='text-xl text-gray-600 leading-relaxed'>
              Cu ajutorul acestui formular personalizat, poți colecta rapid informații esențiale despre greutatea, 
              alimentația și obiectivele clienților tăi. Transformă-ți abordarea și du-ți serviciile la 
              nivelul următor!
            </p>
            <div className="space-x-4">
              <NavLink to='/autentificare/register'>
                <button className='px-8 py-4 bg-sky-600 text-white rounded-xl hover:bg-sky-700 
                  transition-all duration-300 transform hover:scale-105 font-semibold text-lg 
                  shadow-lg hover:shadow-xl hover:shadow-sky-200'>
                  Începe gratuit
                </button>
              </NavLink>
            
            </div>
          </div>
          
          <div className='relative'>
            <img 
              src="https://images.unsplash.com/photo-1594882645126-14020914d58d"
              alt="Fitness Tracking"
              className='rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500
                hover:shadow-sky-200'
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-600/20 to-transparent rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;