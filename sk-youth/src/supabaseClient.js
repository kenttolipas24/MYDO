import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// If either of these is undefined, you get the "Key is required" error
export const supabase = createClient(supabaseUrl, supabaseAnonKey)