import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ImProfile } from "react-icons/im";
import Header from "./Header";
import { useUser } from "../services/useUser";

const Profile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useUser();

    const handleDelete = async () => {
      if (!user?.id) {
        alert('User ID is missing. Cannot delete the account.');
        return;
      }
  
      if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        try {
          await deleteUserAccount(user.id);
          alert('Your account has been deleted successfully.');
          window.location.reload(); // Redirect or refresh after account deletion
        } catch (error) {
          alert(`Error: ${error.message}`);
        }
      }
    };
    
    return (
        <>
            <div className="grid grid-cols-5 relative h-screen bg-gray-50">
                {/* Sidebar */}
                <Sidebar open={open} />
                {/* Overlay */}
                {open && (
                    <div
                        className="md:hidden fixed inset-0 w-[50%] ml-auto bg-black bg-opacity-30 backdrop-blur-sm z-40 transition-all duration-300"
                        onClick={() => setOpen(false)}
                    />
                )}

                <div className="flex flex-col md:col-span-4 col-span-5">
                    {/* Header */}
                    <Header setOpen={setOpen} open={open} />

                    <div className="nav-two p-6">
                        <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-2xl font-bold text-gray-800">Profile Page</h1>
                                <div className="text-gray-500 hover:text-sky-600 transition-colors">
                                    <ImProfile className="text-4xl" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="grid md:grid-rows-3 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="name">Nume Complet</label>
                                        <input
                                            className="bg-gray-200 p-2 w-[50%]"
                                            type="text"
                                            id="name"
                                            placeholder={user?.name}
                                            disabled
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="email">Adresa de Email</label>
                                        <input
                                            className="bg-gray-200 p-2 w-[50%]"
                                            type="text"
                                            id="email"
                                            placeholder="Email-ul tău"
                                            disabled
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="password">Parola</label>
                                        <input
                                            className="bg-gray-200 p-2 w-[50%]"
                                            type="password"
                                            id="password"
                                            placeholder="********"
                                            disabled
                                        />
                                    </div>

                                    <div>
                                        <button
                                            onClick={handleDelete}
                                            className="px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-500
                                            transition-all duration-300 transform hover:scale-105 font-semibold text-sm 
                                            shadow-lg hover:shadow-xl hover:shadow-sky-200"
                                        >
                                            Șterge Contul
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <p className="mb-4 uppercase">
                                        Abonamentul tău este activ până la data de 01 Februarie 2025
                                    </p>
                                    <button
                                        className="px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-500
                                        transition-all duration-300 transform hover:scale-105 font-semibold text-sm 
                                        shadow-lg hover:shadow-xl hover:shadow-sky-200"
                                    >
                                        Anulează Abonamentul
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
