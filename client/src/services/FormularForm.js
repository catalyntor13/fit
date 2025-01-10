import supabase from "./supabase";


export async function FormularForm(newFormular){
    const { data, error } = await supabase
    .from('clienti')
    .insert(newFormular)

    if(error) throw new Error(error.message);

    return data;
}