import { MdOutlineLibraryBooks } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { NavLink } from 'react-router-dom'
import { RiSurveyLine } from "react-icons/ri";
import { useUser } from "../services/useUser";


export const Sidebar = ({ open }) => {
    const  { user } = useUser();
  
  return (
    <div
      className={`bg-gradient-to-b from-sky-900 to-sky-800 h-full fixed md:inline-block md:relative 
      transition-all duration-500 shadow-xl
      ${open ? "translate-x-0 z-40" : "md:translate-x-[0%] translate-x-[-100%]"} z-0`}
    >
      <p className="text-2xl font-bold text-white text-center py-6 px-4 border-b border-sky-700/50">
        ActiveFit
      </p>
      
      <div className="menu-list px-3 py-4">
        <ul className="space-y-2">
          <NavLink to="/welcome">
            <li className="flex items-center gap-4 px-4 py-3 text-sky-100 rounded-xl
              hover:bg-sky-700/50 transition-all duration-300 ease-in-out">
              <MdOutlineDashboard className="text-xl" />
              <span className="font-medium">Dashboard</span>
            </li>
          </NavLink>

          <NavLink to={`/consultanta/${user.id}`}>
            <li className="flex items-center gap-4 px-4 py-3 text-sky-100 rounded-xl
              hover:bg-sky-700/50 transition-all duration-300 ease-in-out">
              <MdOutlineLibraryBooks className="text-xl" />
              <span className="font-medium">Formular</span>
            </li>
          </NavLink>

          <NavLink to="/rezultate">
            <li className="flex items-center gap-4 px-4 py-3 text-sky-100 rounded-xl
              hover:bg-sky-700/50 transition-all duration-300 ease-in-out">
              <RiSurveyLine className="text-xl" />
              <span className="font-medium">Rezultate</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};
