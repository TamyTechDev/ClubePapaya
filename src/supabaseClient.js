import { createClient } from '@supabase/supabase-js'

// Garante que a URL seja uma string válida e evita quebrar o build
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zscxlfjzwfqiwquqjurq.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_KdD41evoWP61t1ZsOE7wwA_rq7rIs4B'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)