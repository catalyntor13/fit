import supabase from "./supabase";

export async function UpdateCurrentUser({ password }) {
    if (!password) {
        throw new Error("Either password or email must be provided.");
    }

    const updateData = {};
    if (password) updateData.password = password;

    const { data, error } = await supabase.auth.updateUser(updateData);

    if (error) {
        throw new Error(error.message);
    }

    return data;
}