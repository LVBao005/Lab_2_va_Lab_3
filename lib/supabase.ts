import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lbyxhhzzcqoacmjtimfy.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_iMHXfWH0hDIk81GOLh34YA__oztEfbI';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.warn('Supabase credentials missing from environment variables. Using fallback values.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
