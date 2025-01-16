import supabase from "./supabase";

export async function recoverPassword(email) {
    if (!email) {
        throw new Error('E-mailul este necesar pentru resetarea parolei');
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
        throw new Error(error.message || 'A apărut o eroare la resetarea parolei');
    }

    return data;
}
