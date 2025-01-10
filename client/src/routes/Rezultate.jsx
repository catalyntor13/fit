import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { getClienti } from "../services/apiClienti";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import Spinner from "../Spinner";
import supabase from "../services/supabase";



const Rezultate = ( ) => {

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setUser(user);
      }
    };
    fetchUser();
  }, []);

  const headers = ["Nume", "Varsta", "Gen"];

  // Fetch clients data with React Query
  const { isLoading, data: clienti, error } = useQuery({
    queryKey: ['clienti', user?.id],
    queryFn: () => getClienti(user),
    enabled: !!user, // Only run query when user exists
  });

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;
 



  function buttonModal() {
    setOpenModal(prevState => !prevState);
 
  }

 return (
  <>
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
          <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Formular Clienti</h1>
               <select className="p-2">
                <option>Cele mai noi rezultate</option>
                <option>Cele mai vechi rezultate</option>
               </select>
            </div>
        
            <div className="overflow-x-auto rounded-xl">
            
              <table className="w-full border-collapse">
             
                <thead>
                  <tr>
                    {headers.map((header, index) => (
                      <th
                        key={index}
                        className="relative group bg-gray-50 text-left px-6 py-4 text-sm font-semibold text-gray-900 border-b border-gray-200"
                      >
                        <span className="truncate max-w-[150px] block">{header}</span>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-3 py-2 -top-10 left-0 shadow-lg transition-all duration-200 z-50">
                          {header}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
              
                <tbody className="divide-y divide-gray-200">
                 
                {clienti?.map((client) => (
  <tr key={client.id} className="hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4 text-sm text-gray-600">{client.nume}</td>
    <td className="px-6 py-4 text-sm text-gray-600">{client.varsta}</td>
    <td className="px-6 py-4 text-sm text-gray-600">{client.gen}</td>
    <td className="px-6 py-4">
      <button 
        onClick={buttonModal}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition-colors"
      >
        Rezultate
      </button>
    </td>
  </tr>
))}
                </tbody>
                {openModal && (
  <>
    {/* Modal Overlay */}
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity z-40"
      onClick={() => setOpenModal(false)}
    />
    
    {/* Modal Content */}
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-auto transform transition-all duration-300 scale-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">Rezultate Client</h3>
          <button
            onClick={() => setOpenModal(false)}
            className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          {/* Modal content goes here */}
          <div className="border-b-2 border-gray-100 pb-4">
            <h4 className="font-semibold text-gray-900">Care este starea ta actuală?</h4>
            <p className="mt-2 text-gray-600">Oboseala sau lipsa de energie</p>
          </div>
        </div>
      </div>
    </div>
  </>
)}



              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
}

export default Rezultate