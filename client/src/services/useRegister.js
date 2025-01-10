import { useMutation } from '@tanstack/react-query';
import { SignUp as signupApi } from './SignUpForm';
import toast from 'react-hot-toast';

export function useRegister() {
    const {mutate: SignUp, isLoading } = useMutation({
        mutationFn: signupApi,
        onSuccess: (user) => {
            toast.success('User created successfully');
        }
    })

    return ({
        SignUp,
        isLoading
    })
}