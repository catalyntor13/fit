import React, { useState} from "react";
import { Sidebar } from "./Sidebar"; // Adjust the path as needed // Adjust the import path as needed
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useForm } from 'react-hook-form'
import { useUpdateUser } from "../services/useUpdate";
import Spinner from "../Spinner";
import toast from "react-hot-toast";


import Header from "./Header";


const Settings = () => {

  const [open, setOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen ] = useState(false);
 // const [isEmailOpen, setIsEmailOpen ] = useState(false);
  const {register, formState: { errors }, getValues, handleSubmit,} = useForm();
  const {updateUser, isUpdating} = useUpdateUser();

  
  function onSubmit({ password }) {
    updateUser({ password }, {
     onSuccess: () => {
       toast.success('Parola a fost schimbata cu succes')
     }
    })
  }

  if (isUpdating) return <Spinner/>
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
                <h1 className="text-2xl font-bold text-gray-800">Setari</h1>
               
              </div>
              
              <div className="grid md:grid-cols-1 gap-6">
                
                <div className="bg-gray-200 p-2 flex justify-between items-center cursor-pointer" onClick={() => setIsPasswordOpen(!isPasswordOpen)}>
                  <p>Schimba Parola</p>
                  {isPasswordOpen ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                </div>

                {isPasswordOpen &&
                  <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="transition-all duration-300 ease-linear">
                  
                    <div className="flex flex-col gap-2 mb-2">
                      <label htmlFor="password">Parola Noua</label>
                      <input className="bg-gray-100 p-2 w-[50%]" type="password" id="password" 
                        {...register("password", {
                          required: "Te rog sa completezi acest camp", 
                          minLength: {
                            value: 6,
                            message: "Parola trebuie sa aiba cel putin 6 caractere",
                          },
                          validate: (value) => 
                            value.trim() !== "" || "Parola nu poate fi goala",
                        })}
                      />
                         {errors.password && <div>{errors.password.message}</div>}
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                      <label htmlFor="RepeatPassword">Confirma Parola Noua</label>
                      <input className="bg-gray-100 p-2 w-[50%]" type="password" id="RepeatPassword" 
                      {...register("RepeatPassword", {required: "Te rog sa completezi acest camp", validate: (value) => value === getValues('password') || 'Parolele nu coincid'})}
                      />
                      {errors.RepeatPassword && <div>{errors.RepeatPassword.message}</div>}
                    </div>
                    <div><button className='px-8 py-4 bg-green-400 text-white rounded-xl hover:bg-green-400
                    transition-all duration-300 transform hover:scale-105 font-semibold text-sm 
                    shadow-lg hover:shadow-xl hover:shadow-sky-200'>Salveaza</button></div>
                        
                  </div> 
                  </form>
                }
                
               {/*} <div className="bg-gray-200 p-2 flex justify-between items-center cursor-pointer" onClick={() => setIsEmailOpen(!isEmailOpen)}>
                  <p>Schimba E-mail</p>
                  {isEmailOpen ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                </div>
                {isEmailOpen ? <div className="transition-all duration-300">
                  <div className="flex flex-col gap-2 mb-2">
                    <label htmlFor="email">E-mail Actual</label>
                    <input className="bg-gray-100 p-2 w-[50%]" type="text" id="email" value={email}/>
                  </div>
                  <div className="flex flex-col gap-2 mb-2">
                    <label htmlFor="password">Noul E-mail</label>
                    <input className="bg-gray-100 p-2 w-[50%]" type="password" id="password" placeholder="Introdu mail nou"/>
                  </div>
              
                  <div><button className='px-8 py-4 bg-green-400 text-white rounded-xl hover:bg-green-400
                  transition-all duration-300 transform hover:scale-105 font-semibold text-sm 
                  shadow-lg hover:shadow-xl hover:shadow-sky-200'>Salveaza</button></div>
                </div> : null} */}
                
              

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings