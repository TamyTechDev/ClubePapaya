import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zscxlfjzwfqiwquqjurq.supabase.co'
// Cole abaixo a chave que você viu na aba "Legacy anon, service_role API keys" (começa com eyJ...)
const supabaseAnonKey = ':eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzY3hsZmp6d2ZxaXdxdXFqdXJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2NjkwNjUsImV4cCI6MjEwMzI0NTA2NX0.5fBQ_bHe7mNtZkKZt-EnxGJoto--_K7wyAqosozbIgk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)