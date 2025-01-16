import React, { useState } from "react";
import { useForm } from "react-hook-form";
import supabase from "../services/supabase"; // Ensure correct import of Supabase client
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

  // Watch for changes in the new password fields
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  // Handle the form submission
  const handlePasswordReset = async (data) => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      // Update the user's password
      const { error } = await supabase.auth.updateUser({
        password: data.password, // Provide the new password
      });

      if (error) {
        throw error;
      }

      // Show success toast
      toast.success("Your password has been updated!");

      // Redirect to login page
      navigate("/autentificare/login"); // 
    } catch (error) {
      setErrorMessage(error.message); // Display error message
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit(handlePasswordReset)} className="w-full max-w-md p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Reset Your Password
            </h1>
            <p className="text-center text-gray-600 mt-2">
              Enter your new password below.
            </p>
          </div>

          <div className="space-y-6">
            {/* New Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                {...register("password", {
                  required: "Please enter a new password",
                  minLength: { value: 6, message: "Password must be at least 6 characters long" },
                })}
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm New Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                {...register("confirmPassword", {
                  required: "Please confirm your new password",
                  minLength: { value: 6, message: "Password must be at least 6 characters long" },
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            {errorMessage && (
              <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="mt-6 w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-200"
            >
              Update Password
            </button>
          </div>

      
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
