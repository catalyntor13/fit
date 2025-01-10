import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar"; // Adjust the path as needed // Adjust the import path as needed
import { IoIosPeople } from "react-icons/io";
import Header from "./Header";
import Spinner from "../Spinner";
import supabase from "../services/supabase";
import { getClienti } from "../services/apiClienti";
import { useQuery } from "@tanstack/react-query";



const Welcome = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

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

    // Fetch clients data with React Query
    const { isLoading, data: clienti, error } = useQuery({
      queryKey: ['clienti', user?.id],
      queryFn: () => getClienti(user),
      enabled: !!user, // Only run query when user exists
    });
  
    if (isLoading) return <Spinner />;
    if (error) return <div>Error: {error.message}</div>;
   


  return (
    <>
      <div className="grid grid-cols-5 relative h-screen bg-gray-50">
        {/* Sidebar with open state */}
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
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <div className="text-gray-500 hover:text-sky-600 transition-colors">
                  <IoIosPeople className="text-5xl" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <div className="bg-gradient-to-r from-sky-500 to-sky-600 p-6 rounded-xl text-white">
                  <h3 className="text-lg font-semibold mb-2">Total Clienți</h3>
                  <p className="text-3xl font-bold">{clienti?.length}
                </p>
                </div>
                
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 rounded-xl text-white">
                  <h3 className="text-lg font-semibold mb-2">Clienți Noi</h3>
                  <p className="text-3xl font-bold">89</p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
                  <h3 className="text-lg font-semibold mb-2">Progres Lunar</h3>
                  <p className="text-3xl font-bold">67%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
