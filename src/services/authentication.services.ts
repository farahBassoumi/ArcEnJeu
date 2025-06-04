import { supabase } from "../utils/supabaseClient";

export const login = async (email: string, password: string) => {
  try {
    email = "bassoumifaraah@gmail.com";
    password = "111111";
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return error;
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const logIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) throw error;
};
