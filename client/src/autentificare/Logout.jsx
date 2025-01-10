import { useLogout } from "../services/useLogout";

export default function Logout(){

    const { logout, isLoading} = useLogout();
   return (
    <button className="border-2 border-[#50abe5] p-1 m-2 rounded-xl w-full text-[#50abe5] hover:opacity-50"
            onClick={logout}>

    {!isLoading ? 'Logout' : 'Se Deconecteaza'}
    </button>
   )
}