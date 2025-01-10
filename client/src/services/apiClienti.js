import supabase from "./supabase"


export async function getClienti(user) {
   
const { data, error } = await supabase
.from('clienti')
.select('*')
.eq('antrenor', user.id);

if(error) {
    throw error('A aparut o eroare la aducerea datelor');

}

return data;

}


