import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ImProfile } from "react-icons/im";
import Header from "./Header";
import { useUser } from "../services/useUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../services/DeleteApi"; // Ensure this path points to your `deleteUser` function

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!user?.id) {
      toast.error("User ID is missing. Cannot delete the account.");
      return;
    }
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUser(user.id); // Call the deleteUser function
      setShowDeleteModal(false);
      toast.success("Contul a fost șters cu succes!");
      navigate("/");
    } catch (error) {
      toast.error(`Eroare: ${error.message}`);
    }
  };

  return (
    <div className="grid grid-cols-5 relative h-screen bg-gray-50">
      <Sidebar open={open} />

      {open && (
        <div
          className="md:hidden fixed inset-0 w-[50%] ml-auto bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex flex-col md:col-span-4 col-span-5">
        <Header setOpen={setOpen} open={open} />

        <div className="p-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Profil</h1>
              <ImProfile className="text-[2rem]" />
            </div>

            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                  className="bg-gray-200 p-2 w-[50%]"
                  type="email"
                  id="email"
                  value={user?.email || ""}
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

              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-500 text-white rounded-lg 
                  hover:bg-red-600 transition-colors"
              >
                Șterge Cont
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setShowDeleteModal(false)}
          />
          <div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            bg-white rounded-2xl p-8 shadow-2xl z-50 w-[90%] max-w-md"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Șterge Cont</h3>
            <p className="text-gray-600 mb-6">
              Ești sigur că vrei să ștergi acest cont? Această acțiune nu poate fi anulată.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 
                  rounded-lg transition-colors"
              >
                Anulează
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg 
                  hover:bg-red-700 transition-colors"
              >
                Șterge Cont
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
