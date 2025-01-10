import supabase from './supabase';

export async function SignUp({ fullName, email, password }) {
  // Step 1: Sign up the user in Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName }, // Optional: Add additional metadata to Supabase Auth
    },
  });

  if (error) throw new Error(error.message);

  // Extract the user ID
  const userId = data?.user?.id;
  if (!userId) throw new Error('Failed to retrieve user ID after signup.');

  // Step 2: Insert the user into the `antrenori` table
  const { error: profileError } = await supabase.from('antrenori').insert([
    { id: userId, email, name: fullName },
  ]);

  if (profileError) throw new Error(profileError.message);

  return data;
}

