import { useMutation } from '@tanstack/react-query';
import { UpdateCurrentUser  } from './UpdateApi';

export function useUpdateUser() {
    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: UpdateCurrentUser,
        onSuccess: () => {
            alert('Contul a fost actualizat cu success');
        },
        onError: (error) => {
            alert(`Eroare: ${error.message}`);
        },
    });

    return {
        updateUser,
        isUpdating,
    };
}