import { useMutation } from '@tanstack/react-query';
import { SignUp as signupApi } from './SignUpForm';
import toast from 'react-hot-toast';

export function useRegister() {
    const {mutate: SignUp, isLoading } = useMutation({
        mutationFn: signupApi,
        onSuccess: (user) => {
            toast.success('Contul a fost creat, te rog sa verifici emailul pentru a confirma contul');
        }
    })

    return ({
        SignUp,
        isLoading
    })
}