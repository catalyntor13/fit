import React, { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import Logout from '../autentificare/Logout';
import { useUser } from "../services/useUser";
import { NavLink } from "react-router-dom";



const Header = ({ setOpen, open }) => {
  const  { user } = useUser();
  const  { fullName } = user.user_metadata

    const [profile, setProfile] = useState(false);
    
    
      const openNav = () => {
        setOpen((prevState) => !prevState); // Toggle the sidebar
      };
    
    
      const openProfile = () => {
        setProfile((prevState) => !prevState);;
        console.log('Profile is open');
      }
      
      return (
        <div className="nav-one">
          <div className="bg-white m-4 p-4 rounded-xl shadow-md flex items-center justify-between transition-all duration-300 hover:shadow-lg">
            <button onClick={openNav} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              {!open ? <MdOutlineMenu className="md:hidden text-xl text-gray-600" /> : <IoCloseSharp className="text-xl text-gray-600" />}
            </button>
            
            <div className="flex items-center gap-4 relative">
              <span className="text-gray-700 font-medium">Bun venit {fullName}</span>
              <FaUserCircle onClick={openProfile} className="text-2xl text-gray-600 cursor-pointer hover:text-sky-600 transition-colors" />
              
              <div className={`${profile ? "translate-y-full opacity-100" : "translate-y-0 opacity-0 pointer-events-none"} 
                absolute right-0 -top-[6rem] bg-white rounded-xl shadow-lg w-56 p-3 transition-all duration-300 z-50`}>
                <NavLink to='/profile'> 
                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <CgProfile className="text-gray-600" />
                 <span className="text-sm text-gray-700">Profilul Meu</span>
                </div>
                </NavLink>
                <NavLink to='/settings'>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <CiSettings className="text-gray-600" />
                  <span className="text-sm text-gray-700">Setări</span>
                </div>
                </NavLink>
                <Logout />
              </div>
            </div>
          </div>
        </div>
      );
}

export default Header