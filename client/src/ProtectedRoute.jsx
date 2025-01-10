import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "./services/useUser";
import Spinner from "./Spinner";


export function ProtectedRoute( { children  }){

    const Navigate = useNavigate();
   
    
    // Load the autenticated user

    const { isLoading, isAuthenticated } = useUser();

    // If there is no autenticated user, redirect to the login page
    useEffect(() => {
        if(!isAuthenticated && !isLoading) Navigate('/autentificare/login');
    }, [isAuthenticated, isLoading, Navigate]);

    // While Loading, show a loading spinner
    if(isLoading) return <Spinner />;

    // If there is a user, render the page
    if(isAuthenticated) return <Outlet />;
};