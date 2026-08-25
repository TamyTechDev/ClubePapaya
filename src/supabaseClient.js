import { createClient } from '@supabase/supabase-js'

const rawUrl = import.meta.env.VITE_SUPABASE_URL
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Garante que a URL comece obrigatoriamente com http:// ou https://
const supabaseUrl = (rawUrl && rawUrl.startsWith('http')) 
  ? rawUrl 
  : 'https://zscxlfjzwfqiwquqjurq.supabase.co'

const supabaseAnonKey = rawKey || 'sb_publishable_KdD41evoWP61t1ZsOE7wwA_rq7rIs4B'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)