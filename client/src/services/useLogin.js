import { useMutation } from '@tanstack/react-query';
import { Login } from './LoginForm';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
    const navigate = useNavigate();
  
    const { mutate: loginApi, isLoading, error } = useMutation({
      mutationFn: async ({ email, password }) => {
        try {
          const response = await Login({ email, password });
          return response;
        } catch (err) {
          // Transform Supabase error to our format
          const errorMessage = err?.message || 'Authentication failed';
          throw {
            email: 'Username este incorect',
            password: 'Parola nu este validă'
          };
        }
      },
      onSuccess: () => {
        navigate('/welcome', { replace: true });
        toast.success('Autentificare reușită, bun venit!');
      }
    });
  
    return { loginApi, isLoading, error };
}