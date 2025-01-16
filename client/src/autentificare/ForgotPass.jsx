import React from 'react';
import { useRecover } from '../services/useRecover';
import { useForm } from 'react-hook-form';
import Spinner from '../Spinner';

const ForgotPass = () => {
  const { recoverPassword, isRecovering } = useRecover();
  const { register, formState: { errors }, handleSubmit, reset } = useForm();

  const handleForgotPassword = ({ email }) => {
    console.log("Form Data:", email);
    recoverPassword(email, {
      onSettled: () => reset(),
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit(handleForgotPassword)} className="w-full max-w-md p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800">ActiveFit</h1>
            <p className="text-center text-gray-600 mt-2">Ai uitat parola?</p>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Introdu e-mail
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 my-5 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                type="email"
                id="email"
                {...register("email", {
                  required: "Te rog să completezi acest câmp",
                  validate: (value) =>
                    value.trim() !== "" || "E-mailul nu poate fi gol",
                })}
                disabled={isRecovering}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}

              <button
                type="submit"
                className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                disabled={isRecovering}
              >
                {isRecovering ? <Spinner/> : 'Trimite'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPass;
