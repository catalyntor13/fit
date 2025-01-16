import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { recoverPassword as recoverPasswordAPI } from './recoverApi'; // Use correct import

export function useRecover() {
    const { mutate: recoverPassword, isLoading: isRecovering } = useMutation({
        mutationFn: recoverPasswordAPI, // Correctly reference the API function
        onSuccess: () => {
            toast.success('Un e-mail a fost trimis la adresa specificată');
        },
        onError: (error) => {
            toast.error(`Eroare: ${error.message}`);
        },
    });

    return {
        recoverPassword,
        isRecovering,
    };
}
