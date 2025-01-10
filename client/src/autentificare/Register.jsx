import React from 'react'
import { useForm } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { useRegister } from '../services/useRegister'

const Register = () => {
   const {SignUp, isLoading} = useRegister();
   const {register, formState: { errors}, getValues, handleSubmit, reset} = useForm();
  
   function onSubmit({fullName, email, password}) {
      SignUp({fullName, email, password}, {
        onSettled: reset,
      })
  }
   

   return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800">ActiveFit</h1>
            <p className="text-center text-gray-600 mt-2">Creează-ți un cont nou</p>
          </div>
  
          <div className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nume Complet
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                type="text"
                id="fullName"
                {...register("fullName", {
                  required: "Te rog sa completezi acest camp", 
                  validate: (value) => 
                    value.trim() !== "" || "Username nu poate fi gol",
                })}
              />
              {errors.fullName && (
                <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>
              )}
            </div>
  
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                type="email"
                id="email"
                {...register("email", {
                  required: "Te rog sa completezi acest camp", 
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Use regex object here
                    message: "Adresa de E-mail nu este valida"
                  }
                })}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
  
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Parolă
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                type="password"
                id="password"
                {...register("password", {required: "Te rog sa completezi acest camp", minLength :{
                  value: 6,
                  message: 'Parola trebuie sa contina minim 6 caractere'
                }})}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
  
            <div>
              <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
                Confirmare Parolă
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                type="password"
                id="repeatpassword"
                {...register("repeatpassword", {required: "Te rog sa completezi acest camp", validate: (value) => value === getValues('password') || 'Parolele nu coincid'})}
              />
              {errors.repeatpassword && (
                <p className="mt-2 text-sm text-red-600">{errors.repeatpassword.message}</p>
              )}
            </div>
          </div>
  
          <button
            className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          
          >
            Inregistrare
          </button>
  
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Ai deja un cont?{' '}
              <NavLink 
                to="/autentificare/login" 
                className="font-medium text-sky-600 hover:text-sky-500"
              >
                Autentifică-te
              </NavLink>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register