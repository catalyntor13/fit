import supabase from './supabase';


// Login Function
export async function Login({email, password}) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
  
      if(error) throw new Error(error.message);
  
      return(data);
  
}


// Login with user, session from supabase
export async function getCurrentUser() {
  const {data: session} = await supabase.auth.getSession();

  if(!session) return null;

  const { data, error} = await supabase.auth.getUser();

  console.log(data)

  if(error) throw new Error(error.message);
  
      return data?.user;
}

// Logout function

export async function logOut() {
  const {error} = await supabase.auth.signOut();

  if(error) throw new Error(error.message);
}

