import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Certifique-se de que a palavra "export" está antes do "const"
export const supabase = createClient(supabaseUrl, supabaseAnonKey)