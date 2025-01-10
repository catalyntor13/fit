import { useMutation } from "@tanstack/react-query";
import {logOut as logoutApi} from './LoginForm';
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export function useLogout(){
     const navigate = useNavigate();
     const queryClient = useQueryClient();
    const { mutate: logout, isLoading} = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
             queryClient.removeQueries();
            navigate('/autentificare/login', {replace: true});
        }
    });

    return { logout, isLoading }
}